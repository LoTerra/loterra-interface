export const state = () => ({
  senderAddress: '',
  // TESTNET
  // loterraLotteryContractAddress: 'terra14usn4a3cnexvlu0wq0ta6lm2sdstzdre5aqa6u',
  // LOCAL
  loterraLotteryContractAddressV2:
    'terra17ye8hudklh22nyulrpg43x2wl002yqjwdxqh09',
  loterraLotteryContractAddress: 'terra1t30f7e8dkdsvnjdt83ap4xaefluwe2e3ee88lx',
  // terra1h587jntrh2gdxp3t0cwnv65te6qtndly8reh7j
  // terra189z82xyj324yd2lzusarj4fs53ww7h4atxa0v5
  // terra1q9wpfnu0m256rx5l30k30flwwzu36qrn3y9nm4
  // terra1a7gsygvka09dtew98zuxdcnrsypx3x7evasras
  // TESTNET
  // lotaCw20ContractAddress: 'terra1veahtdq4qvt4dkl58r8v89a35vjmzjj8e5pn3s',
  // LOCAL
  lotaCw20ContractAddress: 'terra1n77yvtdgjsdy87as5l5d77qaa8puqp2k6g2gxg',
  terrandContractAddress: 'terra1vgjrv99xcmgt8m7cw9udmcvyww7sqxqjucvue6',
  // TESTNET
  // lotaStakingContractAddress: 'terra1lklaag0h9jhyekjvajwqc7h3406dlldnamtx9j',
  // LOCAL
  lotaStakingContractAddress: 'terra1xexrqpl259g2lkrcpcw8ketfll5cllsm27n0px',
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
