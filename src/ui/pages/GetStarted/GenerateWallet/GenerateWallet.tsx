import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PageColumn } from 'src/ui/components/PageColumn';
import { PageHeading } from 'src/ui/components/PageHeading';
import { PageTop } from 'src/ui/components/PageTop';
import { accountPublicRPCPort, walletPort } from 'src/ui/shared/channels';
import { Button } from 'src/ui/ui-kit/Button';
import { Spacer } from 'src/ui/ui-kit/Spacer';
import { UIText } from 'src/ui/ui-kit/UIText';
import { VStack } from 'src/ui/ui-kit/VStack';
import { NavigationTitle } from 'src/ui/components/NavigationTitle';
import {
  DecorativeMessage,
  DecorativeMessageDone,
} from '../components/DecorativeMessage';

enum Step {
  loading,
  done,
}

export function GenerateWallet() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [steps, setSteps] = useState(() => new Set<Step>());
  const addStep = (step: Step) => setSteps((steps) => new Set(steps).add(step));

  const {
    mutate: generateMnemonicWallet,
    data,
    isLoading,
  } = useMutation(
    async () => {
      addStep(Step.loading);
      await new Promise((r) => setTimeout(r, 1000));
      const groupId = params.get('groupId');
      if (groupId) {
        return walletPort.request('addMnemonicWallet', { groupId });
      } else {
        return walletPort.request('generateMnemonic');
      }
    },
    {
      useErrorBoundary: true,
      onSuccess() {
        addStep(Step.done);
      },
    }
  );
  return (
    <PageColumn>
      <PageTop />
      <NavigationTitle title={null} />
      <PageHeading>Get Started</PageHeading>

      <Spacer height={32} />

      <VStack gap={16}>
        <VStack gap={8}>
          <DecorativeMessage
            text={
              <UIText kind="subtitle/m_reg">
                Wallet will be encrypted with your password
              </UIText>
            }
          />
          {steps.has(Step.loading) ? (
            <DecorativeMessage
              text={
                <UIText kind="subtitle/m_reg">
                  Hi 👋 We're generating your wallet and making sure it's
                  encrypted with your passcode. This should only take a couple
                  of minutes.
                </UIText>
              }
            />
          ) : null}
          {data?.address ? (
            <DecorativeMessageDone
              address={data.address}
              confettiOriginY={0.87}
            />
          ) : null}
        </VStack>
        {data ? null : (
          <Button
            onClick={() => {
              generateMnemonicWallet();
            }}
          >
            {isLoading ? 'Generating...' : 'Generate new Wallet'}
          </Button>
        )}
      </VStack>
      {data ? (
        <Button
          style={{ marginTop: 'auto', marginBottom: 16 }}
          onClick={async () => {
            await accountPublicRPCPort.request('saveUserAndWallet');
            if (data?.address) {
              await walletPort.request('setCurrentAddress', {
                address: data.address,
              });
            }
            navigate('/overview');
          }}
        >
          Finish
        </Button>
      ) : null}
    </PageColumn>
  );
}
