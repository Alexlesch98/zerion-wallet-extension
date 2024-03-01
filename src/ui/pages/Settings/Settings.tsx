import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { AngleRightRow } from 'src/ui/components/AngleRightRow';
import { PageBottom } from 'src/ui/components/PageBottom';
import { PageColumn } from 'src/ui/components/PageColumn';
import { PageTop } from 'src/ui/components/PageTop';
import { ViewSuspense } from 'src/ui/components/ViewSuspense';
import { accountPublicRPCPort } from 'src/ui/shared/channels';
import { HStack } from 'src/ui/ui-kit/HStack';
import { Media } from 'src/ui/ui-kit/Media';
import { Toggle } from 'src/ui/ui-kit/Toggle';
import { UIText } from 'src/ui/ui-kit/UIText';
import { VStack } from 'src/ui/ui-kit/VStack';
import WalletIcon from 'jsx:src/ui/assets/wallet.svg';
import LockIcon from 'jsx:src/ui/assets/lock.svg';
import GlobeIcon from 'jsx:src/ui/assets/globe.svg';
import QuestionIcon from 'jsx:src/ui/assets/question-hint.svg';
import BulbIcon from 'jsx:src/ui/assets/bulb.svg';
import PremiumIcon from 'jsx:src/ui/assets/premium.svg';
import DarkModeLampIcon from 'jsx:src/ui/assets/dark-mode-lamp.svg';
import NetworksIcon from 'jsx:src/ui/assets/network.svg';
import SecurityIcon from 'jsx:src/ui/assets/security.svg';
import ToolsIcon from 'jsx:src/ui/assets/hummer.svg';
import { version } from 'src/shared/packageVersion';
import { apostrophe, middot } from 'src/ui/shared/typography';
import { AppearancePage } from 'src/ui/features/appearance/AppearancePage';
import { usePreferences } from 'src/ui/features/preferences';
import { useGlobalPreferences } from 'src/ui/features/preferences/usePreferences';
import { useAddressParams } from 'src/ui/shared/user-address/useAddressParams';
import { SettingsDnaBanners } from 'src/ui/DNA/components/DnaBanners';
import { NavigationTitle } from 'src/ui/components/NavigationTitle';
import { BugReportButton } from 'src/ui/components/BugReportButton';
import { Background } from 'src/ui/components/Background';
import { Frame } from 'src/ui/ui-kit/Frame/Frame';
import { ListItemAnchor, ListItemLink } from 'src/ui/ui-kit/List/ListItem';
import { UnstyledAnchor } from 'src/ui/ui-kit/UnstyledAnchor';
import { StickyBottomSheet } from 'src/ui/ui-kit/StickyBottomSheet';
import { Button } from 'src/ui/ui-kit/Button';
import { BackupFlowSettingsSection } from '../BackupWallet/BackupSettingsItem';
import { Security } from '../Security';

function SettingsMain() {
  const { singleAddressNormalized } = useAddressParams();
  const navigate = useNavigate();
  const logout = useMutation({
    mutationFn: () => accountPublicRPCPort.request('logout'),
  });
  return (
    <Background backgroundKind="white">
      <PageColumn>
        <PageTop />
        <VStack gap={16}>
          <BackupFlowSettingsSection />
          <Frame>
            <VStack gap={0}>
              <ListItemLink to="/wallets">
                <AngleRightRow>
                  <HStack gap={8} alignItems="center">
                    <WalletIcon />
                    <UIText kind="body/regular">Manage Wallets</UIText>
                  </HStack>
                </AngleRightRow>
              </ListItemLink>
              <ListItemLink to="/connected-sites">
                <AngleRightRow>
                  <HStack gap={8} alignItems="center">
                    <GlobeIcon />
                    <UIText kind="body/regular">Connected Sites</UIText>
                  </HStack>
                </AngleRightRow>
              </ListItemLink>
              <ListItemLink to="/networks">
                <AngleRightRow>
                  <HStack gap={8} alignItems="center">
                    <NetworksIcon />
                    <UIText kind="body/regular">Networks</UIText>
                  </HStack>
                </AngleRightRow>
              </ListItemLink>
              <ListItemLink to="/settings/developer-tools">
                <AngleRightRow>
                  <HStack gap={8} alignItems="center">
                    <ToolsIcon />
                    <UIText kind="body/regular">Developer Tools</UIText>
                  </HStack>
                </AngleRightRow>
              </ListItemLink>
            </VStack>
          </Frame>
          <Frame>
            <VStack gap={0}>
              <ListItemLink to="/settings/security">
                <AngleRightRow>
                  <HStack gap={8} alignItems="center">
                    <SecurityIcon />
                    <UIText kind="body/regular">Security</UIText>
                  </HStack>
                </AngleRightRow>
              </ListItemLink>
              <ListItemLink to="/settings/appearance">
                <AngleRightRow>
                  <HStack gap={8} alignItems="center">
                    <DarkModeLampIcon />
                    <UIText kind="body/regular">Appearance</UIText>
                  </HStack>
                </AngleRightRow>
              </ListItemLink>
            </VStack>
          </Frame>
          <Frame>
            <VStack gap={0}>
              <ListItemAnchor
                href="https://help.zerion.io/en/collections/5525626-zerion-extension"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AngleRightRow kind="link">
                  <HStack gap={8} alignItems="center">
                    <QuestionIcon style={{ width: 24, height: 24 }} />
                    <UIText kind="body/regular">Support & Feedback</UIText>
                  </HStack>
                </AngleRightRow>
              </ListItemAnchor>
              <BugReportButton />
              <ListItemAnchor
                href="http://zerion.io/premium"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AngleRightRow kind="link">
                  <HStack gap={8} alignItems="center">
                    <PremiumIcon />
                    <UIText kind="body/regular">Zerion Premium</UIText>
                  </HStack>
                </AngleRightRow>
              </ListItemAnchor>
              <ListItemAnchor
                href="https://app.getbeamer.com/zerion/en?category=extension"
                target="_blank"
                rel="noopener noreferrer"
              >
                <AngleRightRow kind="link">
                  <HStack gap={8} alignItems="center">
                    <BulbIcon />
                    <UIText kind="body/regular">What's New</UIText>
                  </HStack>
                </AngleRightRow>
              </ListItemAnchor>
            </VStack>
          </Frame>
          <SettingsDnaBanners address={singleAddressNormalized} />
          <UIText kind="small/regular" color="var(--neutral-500)">
            <HStack gap={4} alignItems="center" justifyContent="center">
              <UnstyledAnchor
                target="_blank"
                rel="noopener noreferrer"
                href="https://s3.amazonaws.com/cdn.zerion.io/assets/privacy.pdf"
                className="hover:underline"
              >
                Privacy
              </UnstyledAnchor>
              <span>{middot}</span>
              <UnstyledAnchor
                target="_blank"
                rel="noopener noreferrer"
                href="https://s3.amazonaws.com/cdn.zerion.io/assets/terms.pdf"
                className="hover:underline"
              >
                Terms of use
              </UnstyledAnchor>
              <span>{middot}</span>
              <span>{`v${version}`}</span>
            </HStack>
          </UIText>
        </VStack>
        <StickyBottomSheet>
          <VStack gap={0} style={{ padding: 16 }}>
            <Button
              kind="primary"
              onClick={async () => {
                await logout.mutateAsync();
                navigate('/login');
              }}
            >
              <HStack gap={8} alignItems="center" justifyContent="center">
                <LockIcon style={{ color: 'var(--white)' }} />
                <UIText kind="body/accent" color="var(--white)">
                  {logout.isLoading ? 'Locking...' : 'Lock Wallet'}
                </UIText>
              </HStack>
            </Button>
          </VStack>
        </StickyBottomSheet>
      </PageColumn>
    </Background>
  );
}

function ToggleSettingLine({
  checked,
  onChange,
  text,
  detailText,
}: {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  text: NonNullable<React.ReactNode>;
  detailText: React.ReactNode | null;
}) {
  return (
    <HStack gap={4} justifyContent="space-between" style={{ padding: 12 }}>
      <Media
        image={null}
        text={<UIText kind="body/accent">{text}</UIText>}
        vGap={0}
        detailText={
          detailText ? (
            <UIText kind="small/regular" color="var(--neutral-500)">
              {detailText}
            </UIText>
          ) : null
        }
      />
      <Toggle checked={checked} onChange={onChange} />
    </HStack>
  );
}

function DeveloperTools() {
  const { globalPreferences, setGlobalPreferences } = useGlobalPreferences();
  const { preferences, setPreferences } = usePreferences();

  return (
    <Background backgroundKind="white">
      <PageColumn>
        <NavigationTitle title="Developer Tools" />
        <PageTop />
        <VStack gap={16}>
          <Frame>
            <VStack gap={0}>
              <ToggleSettingLine
                text="Enable Testnets"
                checked={globalPreferences?.enableTestnets ?? false}
                onChange={(event) => {
                  setGlobalPreferences({
                    enableTestnets: event.target.checked,
                  });
                }}
                detailText={
                  <span>
                    Enables viewing and interacting with test
                    <br />
                    networks
                  </span>
                }
              />
              <ListItemLink to="/settings/developer-tools/testnets">
                <AngleRightRow>
                  <UIText kind="body/accent">Testnet Faucets</UIText>
                </AngleRightRow>
              </ListItemLink>
            </VStack>
          </Frame>
          <Frame>
            <ToggleSettingLine
              text="Custom Nonce"
              checked={preferences?.configurableNonce ?? false}
              onChange={(event) => {
                setPreferences({
                  configurableNonce: event.target.checked,
                });
              }}
              detailText={
                <span>
                  Set your own unique nonce to control
                  <br />
                  transaction order
                </span>
              }
            />
          </Frame>
          <Frame>
            <ToggleSettingLine
              text="Recognizable Connect Buttons"
              checked={globalPreferences?.recognizableConnectButtons || false}
              onChange={(event) => {
                setGlobalPreferences({
                  recognizableConnectButtons: event.target.checked,
                });
              }}
              detailText={
                <span>
                  When enabled, we add Zerion Wallet label to connect buttons in
                  DApps so that they{apostrophe}re easier to spot
                </span>
              }
            />
          </Frame>
        </VStack>
        <PageBottom />
      </PageColumn>
    </Background>
  );
}

function TestnetFaucets() {
  return (
    <Background backgroundKind="white">
      <PageColumn>
        <NavigationTitle title="Developer Tools" />
        <PageTop />
        <Frame>
          <VStack gap={0}></VStack>
        </Frame>
      </PageColumn>
    </Background>
  );
}

export function Settings() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ViewSuspense>
            <SettingsMain />
          </ViewSuspense>
        }
      />
      <Route
        path="/developer-tools"
        element={
          <ViewSuspense>
            <DeveloperTools />
          </ViewSuspense>
        }
      />
      <Route
        path="/developer-tools/testnets"
        element={
          <ViewSuspense>
            <TestnetFaucets />
          </ViewSuspense>
        }
      />
      <Route
        path="/appearance"
        element={
          <ViewSuspense>
            <AppearancePage />
          </ViewSuspense>
        }
      />
      <Route
        path="/security/*"
        element={
          <ViewSuspense>
            <Security />
          </ViewSuspense>
        }
      />
    </Routes>
  );
}
