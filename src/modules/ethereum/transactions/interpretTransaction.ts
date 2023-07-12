import { client } from 'defi-sdk';
import { rejectAfterDelay } from 'src/shared/rejectAfterDelay';
import type { IncomingTransactionWithChainId } from '../types/IncomingTransaction';
import type { InterpretResponse } from './types';

export function interpretTransaction(
  address: string,
  transaction: IncomingTransactionWithChainId
): Promise<InterpretResponse> {
  return Promise.race([
    rejectAfterDelay(10000),
    new Promise<InterpretResponse>((resolve) => {
      let value: InterpretResponse | null = null;

      const unsubscribe = client.subscribe<
        InterpretResponse,
        'interpret',
        'transaction'
      >({
        namespace: 'interpret',
        method: 'stream',
        body: {
          scope: ['transaction'],
          payload: {
            address,
            chain_id: transaction.chainId,
            currency: 'usd',
            transaction: {
              from: transaction?.from,
              to: transaction?.to,
              nonce: transaction?.nonce,
              chainId: transaction.chainId,
              gas: transaction?.gas,
              gasPrice: transaction?.gasPrice,
              maxFee: transaction?.maxFeePerGas,
              maxPriorityFee: transaction?.maxPriorityFeePerGas,
              value: transaction?.value,
              data: transaction?.data,
            },
          },
        },
        // Here we're using onMessage instead of onData because of
        // bug in defi-sdk (unsubscribe function is not always returned)
        onMessage: (event, data) => {
          if (event === 'done') {
            resolve(value as InterpretResponse);
            unsubscribe();
            return;
          }
          value = data.payload.transaction;
        },
      });
    }),
  ]);
}
