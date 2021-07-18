export const state = () => ({
  senderAddress: '',
  // TESTNET
  // loterraLotteryContractAddress: 'terra14usn4a3cnexvlu0wq0ta6lm2sdstzdre5aqa6u',
  // LOCAL
  loterraLotteryContractAddressV2:
    'terra14mevcmeqt0n4myggt7c56l5fl0xw2hwa2mhlg0',
  loterraLotteryContractAddress: 'terra1e7hzp3tnsswpfcu6gt4wlgfm20lcsqqywhaagu',
  // terra1h587jntrh2gdxp3t0cwnv65te6qtndly8reh7j
  // terra189z82xyj324yd2lzusarj4fs53ww7h4atxa0v5
  // terra1q9wpfnu0m256rx5l30k30flwwzu36qrn3y9nm4
  // terra1a7gsygvka09dtew98zuxdcnrsypx3x7evasras
  // TESTNET
  // lotaCw20ContractAddress: 'terra1veahtdq4qvt4dkl58r8v89a35vjmzjj8e5pn3s',
  // LOCAL
  lotaCw20ContractAddress: 'terra1ez46kxtulsdv07538fh5ra5xj8l68mu8eg24vr',
  terrandContractAddress: 'terra17hsftucasxf5leyax47unm84hqnvr0yhusy6xt',
  // TESTNET
  // lotaStakingContractAddress: 'terra1lklaag0h9jhyekjvajwqc7h3406dlldnamtx9j',
  // LOCAL
  lotaStakingContractAddress: 'terra1342fp86c3z3q0lksq92lncjxpkfl9hujwh6xfn',
  lcdUrl: 'https://lcd.terra.dev',
  lcdChainId: 'columbus-4',
  ticketPrice: '',
  balanceOf: '',
  allowance: '',
  bonded: '',
  unBonded: '',
  reward: '',
  blockInfo: '',
})

export const mutations = {
  update(state, _address) {
    state.senderAddress = _address
  },
  update_ticket_price(state, _price) {
    state.ticketPrice = _price
  },
  update_balance(state, _balance) {
    state.balanceOf = _balance
  },
  update_allowance(state, _allowance) {
    state.allowance = _allowance
  },
  update_bonded(state, _bonded) {
    state.bonded = _bonded
  },
  update_un_bonded(state, _unBonded) {
    state.unBonded = _unBonded
  },
  update_reward(state, _reward) {
    state.reward = _reward
  },
  update_block_info(state, _blockInfo) {
    state.blockInfo = _blockInfo
  },
}
