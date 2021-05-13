export const state = () => ({
  senderAddress: '',
  // TESTNET
  // loterraLotteryContractAddress: 'terra14usn4a3cnexvlu0wq0ta6lm2sdstzdre5aqa6u',
  // LOCAL
  loterraLotteryContractAddress:
    process.env
      .LOTTERY_CONTRACT_ADDR /* 'terra1n9g0nf3fgx094zxgwx6h4wzkzh476l7uxy08jj' */,
  // TESTNET
  // lotaCw20ContractAddress: 'terra1veahtdq4qvt4dkl58r8v89a35vjmzjj8e5pn3s',
  // LOCAL
  lotaCw20ContractAddress:
    process.env
      .CW20_CONTRACT_ADDR /* 'terra1v000amr8a59r88p33ec2kk9xqe047g7zzqqaf4' */,
  terrandContractAddress:
    process.env
      .TERRAND_CONTRACT_ADDR /* 'terra1vgjrv99xcmgt8m7cw9udmcvyww7sqxqjucvue6' */,
  // TESTNET
  // lotaStakingContractAddress: 'terra1lklaag0h9jhyekjvajwqc7h3406dlldnamtx9j',
  // LOCAL
  lotaStakingContractAddress:
    process.env
      .STAKING_CONTRACT_ADDR /* 'terra12nvjq4uw3ajuzzpkeejep4nsc97w66tu9jret2' */,
  lcdUrl: process.env.LCD_URL /* 'https://tequila-lcd.terra.dev' */,
  lcdChainId: process.env.LCD_CHAIN_ID /* 'tequila-0004' */,
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
