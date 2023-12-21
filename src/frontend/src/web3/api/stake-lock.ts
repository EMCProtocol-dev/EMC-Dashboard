import ABI_RWAEMC from '@/web3/abi/emc';
import { Api } from './api';

type StakeOption = {
  account: string;
  start: number;
  cycles: number;
  cycleUnit: 0 | 1 | 2 | 3;
  amount: BigInt;
};

export class StakeLockApi extends Api {
  getAbi() {
    return ABI_RWAEMC;
  }

  async getLockedAmount({ account }: any) {
    return super.call({ method: 'getLockedAmount', data: [account] });
  }

  async getReleasableAmount({ account }: any) {
    return super.call({ method: 'getReleasableAmount', data: [account] });
  }

  async token() {
    return super.call({ method: 'token' });
  }

  async release({ account }: { account: string }) {
    return super.call({
      method: 'release',
      data: [account],
    });
  }

  async createVestingSchedule({ account, start, cycles, cycleUnit, amount }: StakeOption) {
    return super.call({
      method: 'createVestingSchedule',
      data: [account, start, cycles, cycleUnit, amount],
    });
  }
}
