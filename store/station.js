export const state = () => ({
  senderAddress: '',
  loterraLotteryContractAddress: 'terra1y6k964pmqhnsyn2cver2dt2untnsch54fljmtg',
  lotaCw20ContractAddress: 'terra15zx3xekhcur8jckvn3dz59t65dh9wmu86yh30e',
  terrandContractAddress: 'terra1q88h7ewu6h3am4mxxeqhu3srt7zw4z5s20qu3k',
  lotaStakingContractAddress: 'terra193dh2k26knyrn03uzvwwua4q3lz80ww84lckl3',
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
