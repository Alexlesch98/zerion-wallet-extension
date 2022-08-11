import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Background } from 'src/ui/components/Background';
import { NavigationTitle } from 'src/ui/components/NavigationTitle';
import { PageBottom } from 'src/ui/components/PageBottom';
import { PageColumn } from 'src/ui/components/PageColumn';
import { PageHeading } from 'src/ui/components/PageHeading';
import { PageTop } from 'src/ui/components/PageTop';
import { accountPublicRPCPort } from 'src/ui/shared/channels';
import { Button } from 'src/ui/ui-kit/Button';
import { Spacer } from 'src/ui/ui-kit/Spacer';
import { UIText } from 'src/ui/ui-kit/UIText';
import { VStack } from 'src/ui/ui-kit/VStack';

export function CreateAccount() {
  const navigate = useNavigate();
  const [formError, setFormError] = useState<null | {
    type: string;
    message: string;
  }>(null);
  const createUserMutation = useMutation(
    ({ password }: { password: string }) => {
      return accountPublicRPCPort.request('createUser', { password });
    },
    {
      onSuccess() {
        navigate('/get-started');
      },
    }
  );
  return (
    <Background backgroundKind="white">
      <PageColumn>
        <PageTop />
        <NavigationTitle title={null} />
        <PageHeading>Create Password</PageHeading>
        <UIText kind="subtitle/s_reg" color="var(--neutral-500)">
          Protect your wallet by setting a password
        </UIText>
        <Spacer height={24} />
        <form
          onChange={() => setFormError(null)}
          onSubmit={(event) => {
            event.preventDefault();
            const password = new FormData(event.currentTarget).get(
              'password'
            ) as string | undefined;
            const repeatedPassword = new FormData(event.currentTarget).get(
              'confirmPassword'
            ) as string | undefined;
            if (!password) {
              return;
            }
            if (repeatedPassword !== password) {
              setFormError({
                type: 'confirmPassword',
                message: "Passwords don't match",
              });
              return;
            }
            createUserMutation.mutate({ password });
          }}
        >
          <VStack gap={16}>
            <VStack gap={4}>
              <UIText kind="subtitle/s_reg" color="var(--neutral-500)">
                Password
              </UIText>
              <input
                autoFocus={true}
                type="password"
                name="password"
                placeholder="password"
                required={true}
                style={{
                  backgroundColor: 'var(--neutral-200)',
                  padding: '7px 11px',
                  border: '1px solid var(--neutral-200)',
                  borderRadius: 8,
                }}
              />
              {createUserMutation.error ? (
                <UIText kind="caption/reg" color="var(--negative-500)">
                  {(createUserMutation.error as Error).message ||
                    'unknown error'}
                </UIText>
              ) : null}
            </VStack>
            <VStack gap={4}>
              <UIText kind="subtitle/s_reg" color="var(--neutral-500)">
                Confirm Password
              </UIText>
              <input
                type="password"
                name="confirmPassword"
                placeholder="enter the password again"
                required={true}
                style={{
                  backgroundColor: 'var(--neutral-200)',
                  padding: '7px 11px',
                  border: '1px solid var(--neutral-200)',
                  borderRadius: 8,
                }}
              />
              {formError?.type === 'confirmPassword' ? (
                <UIText kind="caption/reg" color="var(--negative-500)">
                  {formError.message}
                </UIText>
              ) : null}
            </VStack>
            <Button>Confirm</Button>
          </VStack>
        </form>
        <PageBottom />
      </PageColumn>
    </Background>
  );
}
