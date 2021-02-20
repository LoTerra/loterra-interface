export const state = () => ({
  senderAddress: '',
  loterraLotteryContractAddress: 'terra16nc2sxj0rgdm0utpe8gw8dn0eef4va4y9txnyt',
  lcdUrl: 'https://tequila-lcd.terra.dev',
  lcdChainId: 'tequila-0004',
})

export const mutations = {
  update(state, _address) {
    state.senderAddress = _address
  },
}
