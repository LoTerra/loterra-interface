export const state = () => ({
  senderAddress: '',
  loterraLotteryContractAddress: 'terra16nc2sxj0rgdm0utpe8gw8dn0eef4va4y9txnyt',
  lotaCw20ContractAddress: 'terra14uz5zc4cykug48rrjfmjh9mlucr2p35dqx09yn',
  terrandContractAddress: 'terra1q88h7ewu6h3am4mxxeqhu3srt7zw4z5s20qu3k',
  lcdUrl: 'https://tequila-lcd.terra.dev',
  lcdChainId: 'tequila-0004',
})

export const mutations = {
  update(state, _address) {
    state.senderAddress = _address
  },
}
