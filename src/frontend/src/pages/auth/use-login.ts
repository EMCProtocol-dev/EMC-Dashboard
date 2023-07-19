import { AuthClient } from '@dfinity/auth-client';
import { Principal } from '@dfinity/principal';
import { principalToAccountIdentifier } from './user-account-id';

let client: AuthClient;

type InternetIdentityLoginResponse = {
  _result: 0 | number;
  _desc?: string;
  data?: { principal?: string; account?: string };
};

type InternetPlugLoginResponse = {
  _result: 0 | number;
  _desc?: string;
  data?: { principal?: string; account?: string };
};

type InternetMeLoginResponse = {};

async function dfinityLogin() {
  if (!client) {
    client = await AuthClient.create();
  }
  return new Promise<InternetIdentityLoginResponse>((resolve) => {
    client.login({
      identityProvider: 'https://identity.ic0.app',
      windowOpenerFeatures:
        `left=${window.screen.width / 2 - 525 / 2}, ` +
        `top=${window.screen.height / 2 - 705 / 2},` +
        `toolbar=0,location=0,menubar=0,width=525,height=705`,
      onSuccess: () => {
        const identity = client.getIdentity();
        const principal = identity.getPrincipal();
        const account = principalToAccountIdentifier(principal);
        resolve({ _result: 0, _desc: '', data: { principal: principal.toString(), account } });
      },
      onError: (e) => resolve({ _result: 1, _desc: e?.toString() }),
    });
  });
}

async function internetIdentityLogin(): Promise<InternetIdentityLoginResponse> {
  if (!client) {
    client = await AuthClient.create();
  }

  let isAuthenticated = await client.isAuthenticated();

  if (isAuthenticated) {
    const identity = client.getIdentity();
    const principal = identity.getPrincipal();
    const account = principalToAccountIdentifier(principal);
    return { _result: 0, data: { principal: principal.toString(), account } };
  }

  const resp = await dfinityLogin();
  return resp;
}

async function plugLogin() {
  return new Promise<InternetPlugLoginResponse>(async (resolve) => {
    if (!window?.ic?.plug) {
      resolve({ _result: 1, _desc: 'plug is not defined' });
      return;
    }
    console.info('Plug and play!');
    try {
      await window.ic.plug.requestConnect();
      console.log('principalId:', window.ic.plug.principalId);
      console.log('accountId:', window.ic.plug.accountId);
      resolve({
        _result: 0,
        _desc: '',
        data: { principal: window.ic.plug.principalId, account: window.ic.plug.accountId },
      });
    } catch (e) {
      resolve({ _result: 1, _desc: e?.toString() });
    }
  });
}

export function useLogin() {
  return {
    internetIdentityLogin,
    plugLogin,
    // internetMeLogin,
  };
}
