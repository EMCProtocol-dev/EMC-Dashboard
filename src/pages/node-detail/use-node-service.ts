import { Web3Utils } from '@/web3/utils';
import { ApiManager } from '@/web3/api';
import { StakeNodeApi } from '@/web3/api/stake-node';
import { Web3Service } from '@/web3';
import { getDefaultNetwork } from '@/web3/network';

export type NodeMetadata = { typeName: string; maxStakeAmount: bigint };

export const useNodeService = () => {
  let stakeNodeApi: StakeNodeApi | null = null;

  function setStakeNodeApi(api: StakeNodeApi) {
    stakeNodeApi = api;
  }

  async function queryStake(nodeId: string) {
    if (!stakeNodeApi) {
      return null;
    }
    const { data: _stakeInfo } = await stakeNodeApi!.nodeInfo({ nodeId });
    const [_bindStakeAccount, _totalStaked, _currentStaked, _totalUnstaked] = _stakeInfo || [];
    const result = { bindStakeAccount: '', totalStaked: 0n, currentStaked: 0n, totalUnstaked: 0n };
    result.bindStakeAccount = _bindStakeAccount || '';
    result.totalStaked = _totalStaked || 0n;
    result.currentStaked = _currentStaked || 0n;
    result.totalUnstaked = _totalUnstaked || 0n;
    return result;
  }

  return {
    isValidator(status: number | string) {
      return status === 11;
    },
    isRPC(status: number | string) {
      return status === 12;
    },
    isRelay(status: number | string) {
      return status === 13;
    },
    getNodeMetadata(status: number | string): NodeMetadata | undefined {
      const metadatas: any = {
        0: { typeName: 'Initial', maxStakeAmount: BigInt('1000000000000000000000') },
        1: { typeName: 'Computing', maxStakeAmount: BigInt('1000000000000000000000') },
        11: { typeName: 'Validator', maxStakeAmount: BigInt('50000000000000000000000') },
        12: { typeName: 'RPC', maxStakeAmount: BigInt('5000000000000000000000') },
        13: { typeName: 'Relay', maxStakeAmount: BigInt('5000000000000000000000') },
      };
      return metadatas[status];
    },
    setStakeNodeApi,
    queryStake,
  };
};
