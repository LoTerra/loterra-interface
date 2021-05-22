export const state = () => ({
  senderAddress: '',
  // TESTNET
  // loterraLotteryContractAddress: 'terra14usn4a3cnexvlu0wq0ta6lm2sdstzdre5aqa6u',
  // LOCAL
  loterraLotteryContractAddress: 'terra1a7gsygvka09dtew98zuxdcnrsypx3x7evasras',
  // TESTNET
  // lotaCw20ContractAddress: 'terra1veahtdq4qvt4dkl58r8v89a35vjmzjj8e5pn3s',
  // LOCAL
  lotaCw20ContractAddress: 'terra1jycglrkn0q3ffpxm0tzdjajjt2su27dx2trelu',
  terrandContractAddress: 'terra1vgjrv99xcmgt8m7cw9udmcvyww7sqxqjucvue6',
  // TESTNET
  // lotaStakingContractAddress: 'terra1lklaag0h9jhyekjvajwqc7h3406dlldnamtx9j',
  // LOCAL
  lotaStakingContractAddress: 'terra1ltak0zrdt7wk4294zr8xmevkjmhl7msejgt0t5',
  lcdUrl: 'https://tequila-lcd.terra.dev',
  lcdChainId: 'tequila-0004',
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
