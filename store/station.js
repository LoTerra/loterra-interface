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
}
