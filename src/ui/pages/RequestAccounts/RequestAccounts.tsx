import React, { useCallback } from 'react';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import { PageColumn } from 'src/ui/components/PageColumn';
import { PageTop } from 'src/ui/components/PageTop';
import { walletPort, windowPort } from 'src/ui/shared/channels';
import { Media } from 'src/ui/ui-kit/Media';
import { Spacer } from 'src/ui/ui-kit/Spacer';
import { UIText } from 'src/ui/ui-kit/UIText';
import { truncateAddress } from 'src/ui/shared/truncateAddress';
import { VStack } from 'src/ui/ui-kit/VStack';
import { HStack } from 'src/ui/ui-kit/HStack';
import { Button } from 'src/ui/ui-kit/Button';
import { UnstyledButton } from 'src/ui/ui-kit/UnstyledButton';
import { BlockieImg } from 'src/ui/components/BlockieImg';

function useRedirectIfOriginAlreadyAllowed({
  origin,
  address,
  onIsAllowed,
}: {
  origin: string;
  address: string | undefined;
  onIsAllowed: () => void;
}) {
  useQuery(
    'getOriginPermissions',
    () => walletPort.request('getOriginPermissions'),
    {
      enabled: Boolean(address),
      useErrorBoundary: true,
      suspense: true,
      refetchOnWindowFocus: false,
      retry: false,
      onSuccess(result) {
        if (!address) {
          return;
        }
        const isAllowed = result[origin]?.addresses.includes(address);
        if (isAllowed) {
          onIsAllowed();
        }
      },
    }
  );
}

export function RequestAccounts() {
  const [params] = useSearchParams();
  const origin = params.get('origin');
  if (!origin) {
    throw new Error('origin get-parameter is required for this view');
  }
  const {
    data: wallet,
    isLoading,
    isError,
  } = useQuery('wallet/uiGetCurrentWallet', () => {
    return walletPort.request('uiGetCurrentWallet');
  });
  const handleConfirm = useCallback(() => {
    windowPort.confirm(Number(params.get('windowId')));
  }, [params]);

  useRedirectIfOriginAlreadyAllowed({
    origin,
    address: wallet?.address,
    onIsAllowed: handleConfirm,
  });

  if (isError) {
    return <p>Some Error</p>;
  }
  if (isLoading || !wallet) {
    return null;
  }
  const originName = new URL(origin).hostname;
  return (
    <PageColumn>
      <PageTop />
      <PageTop />
      <UIText kind="h/5_sb" style={{ textAlign: 'center' }}>
        Connect to {originName}
      </UIText>
      <Spacer height={24} />
      <div
        style={{
          backgroundColor: 'var(--neutral-100)',
          borderRadius: 8,
          padding: 8,
        }}
      >
        <Media
          image={<BlockieImg address={wallet.address} size={44} />}
          text={
            <UIText kind="caption/reg" color="var(--neutral-500)">
              Wallet
            </UIText>
          }
          detailText={
            <UIText kind="subtitle/l_reg">
              {truncateAddress(wallet.address, 4)}
            </UIText>
          }
        />
      </div>
      <Spacer height={16} />
      <UIText kind="body/s_reg" style={{ textAlign: 'center' }}>
        Only connect to sites that you trust
        <br />
        By connecting, you allow{' '}
        <span style={{ color: 'var(--primary)' }}>{originName}</span> to:
      </UIText>
      <Spacer height={16} />
      <div style={{ textAlign: 'center' }}>
        <VStack gap={8} style={{ display: 'inline-grid', textAlign: 'start' }}>
          <HStack gap={8} alignItems="center">
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                backgroundColor: 'var(--positive-300)',
              }}
            ></div>

            <UIText kind="body/s_reg" style={{ textAlign: 'center' }}>
              See your balance and activity
            </UIText>
          </HStack>
          <HStack gap={8} alignItems="center">
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                backgroundColor: 'var(--positive-300)',
              }}
            ></div>

            <UIText kind="body/s_reg" style={{ textAlign: 'center' }}>
              Request approval for transactions
            </UIText>
          </HStack>
        </VStack>
      </div>

      <VStack
        style={{ textAlign: 'center', marginTop: 'auto', paddingBottom: 32 }}
        gap={8}
      >
        <Button onClick={handleConfirm}>Approve</Button>
        <UnstyledButton
          style={{ color: 'var(--primary)' }}
          onClick={() => {
            windowPort.reject(Number(params.get('windowId')));
          }}
        >
          Reject
        </UnstyledButton>
      </VStack>
    </PageColumn>
  );
}
