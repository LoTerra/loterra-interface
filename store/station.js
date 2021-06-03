export const state = () => ({
  senderAddress: '',
  loterraLotteryContractAddress: 'terra1e7hzp3tnsswpfcu6gt4wlgfm20lcsqqywhaagu',
  lotaCw20ContractAddress: 'terra1ez46kxtulsdv07538fh5ra5xj8l68mu8eg24vr',
  terrandContractAddress: 'terra17hsftucasxf5leyax47unm84hqnvr0yhusy6xt',
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
