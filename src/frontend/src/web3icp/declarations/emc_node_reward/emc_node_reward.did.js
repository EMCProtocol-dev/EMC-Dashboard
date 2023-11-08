export const idlFactory = ({ IDL }) => {
  const emcResult = IDL.Variant({
    Ok: IDL.Nat,
    Err: IDL.Variant({
      StakeTooShort: IDL.Null,
      NodeAlreadyExist: IDL.Null,
      NodeNotExist: IDL.Null,
      UnknownError: IDL.Null,
      StakedBefore: IDL.Null,
      UnknowType: IDL.Null,
      InsufficientBalance: IDL.Null,
      StakeNotEnough: IDL.Null,
      CallerNotAuthorized: IDL.Null,
      DuplicatedValidation: IDL.Null,
      CanNotUnstake: IDL.Null,
      TokenTransferFailed: IDL.Null,
      NoStakeFound: IDL.Null,
      NotAValidator: IDL.Null,
    }),
  });
  const Time = IDL.Int;
  const Node = IDL.Record({
    nodeID: IDL.Text,
    owner: IDL.Principal,
    wallet: IDL.Principal,
    registered: Time,
    nodeType: IDL.Nat,
  });
  const FailedReward = IDL.Record({
    nodeID: IDL.Text,
    rewardAmount: IDL.Nat,
    computingPower: IDL.Nat,
    rewardDay: IDL.Int,
    wallet: IDL.Principal,
    validatedTimes: IDL.Nat,
    faildTime: Time,
    totalPower: IDL.Nat,
    dayPower: IDL.Nat,
  });
  const NodeValidationRequest = IDL.Record({
    validationTicket: IDL.Nat,
    power: IDL.Nat,
    targetNodeID: IDL.Text,
  });
  return IDL.Service({
    addRouter: IDL.Func([IDL.Principal], [emcResult], []),
    addValidator: IDL.Func([IDL.Principal], [emcResult], []),
    cancelRewardTask: IDL.Func([], [emcResult], []),
    exeuteReward: IDL.Func([], [emcResult], []),
    getCurrentDayReward: IDL.Func([], [IDL.Nat], ['query']),
    getNodeStatus: IDL.Func([], [IDL.Nat, IDL.Nat, IDL.Nat, IDL.Nat], ['query']),
    getOwner: IDL.Func([], [IDL.Principal], ['query']),
    isRouter: IDL.Func([IDL.Principal], [IDL.Bool], ['query']),
    isValidatorPrincipal: IDL.Func([IDL.Principal], [IDL.Bool], ['query']),
    launchRewardTask: IDL.Func([], [emcResult], []),
    listComputingNodes: IDL.Func([IDL.Nat, IDL.Nat], [IDL.Vec(Node)], ['query']),
    listRouterNodes: IDL.Func([], [IDL.Vec(Node)], ['query']),
    listRouters: IDL.Func([], [IDL.Vec(IDL.Tuple(IDL.Principal, Time))], ['query']),
    listValidatorNodes: IDL.Func([], [IDL.Vec(Node)], ['query']),
    listValidators: IDL.Func([], [IDL.Vec(IDL.Tuple(IDL.Principal, Time))], ['query']),
    myCurrentEPower: IDL.Func([IDL.Text], [IDL.Nat, IDL.Float64], ['query']),
    myNode: IDL.Func([IDL.Text], [IDL.Vec(Node)], ['query']),
    myStake: IDL.Func([IDL.Text], [IDL.Nat, IDL.Nat, IDL.Nat], ['query']),
    postDeposit: IDL.Func([], [emcResult], []),
    registerComputingNode: IDL.Func([IDL.Text, IDL.Principal], [emcResult], []),
    registerRouterNode: IDL.Func([IDL.Text, IDL.Principal], [emcResult], []),
    registerValidatorNode: IDL.Func([IDL.Text, IDL.Principal], [emcResult], []),
    removeRouter: IDL.Func([IDL.Principal], [emcResult], []),
    removeValidator: IDL.Func([IDL.Principal], [emcResult], []),
    selfbalance: IDL.Func([], [IDL.Nat], []),
    showFaildReward: IDL.Func([IDL.Nat, IDL.Nat], [IDL.Vec(FailedReward)], ['query']),
    showNodeRewardStatus: IDL.Func([IDL.Text], [IDL.Text, IDL.Nat, IDL.Nat], ['query']),
    showTotalRewardsStatus: IDL.Func([], [IDL.Nat, IDL.Nat, IDL.Nat, IDL.Nat], ['query']),
    stake: IDL.Func([IDL.Nat, IDL.Nat, IDL.Text], [emcResult], []),
    startTestnet: IDL.Func([], [emcResult], []),
    stopTestnet: IDL.Func([], [emcResult], []),
    submitComputingValidation: IDL.Func([IDL.Vec(NodeValidationRequest)], [emcResult], []),
    tryTodayReward: IDL.Func([], [IDL.Vec(IDL.Tuple(IDL.Text, IDL.Nat))], ['query']),
    unStake: IDL.Func([IDL.Text], [emcResult], []),
    unregisterComputingNode: IDL.Func([IDL.Text], [emcResult], []),
    unregisterRouterNode: IDL.Func([IDL.Text], [emcResult], []),
    unregisterValidatorNode: IDL.Func([IDL.Text], [emcResult], []),
    updateDayValidaionRounds: IDL.Func([IDL.Nat], [emcResult], []),
    whoAmI: IDL.Func([], [IDL.Principal], ['query']),
    withdrawTo: IDL.Func([IDL.Principal], [emcResult], []),
  });
};
export const init = ({ IDL }) => {
  return [];
};
