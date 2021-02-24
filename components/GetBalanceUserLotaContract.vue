<template>
  <div>{{ balanceOf }}</div>
</template>

<script>
import { LCDClient, WasmAPI } from '@terra-money/terra.js'
import numeral from 'numeral'
export default {
  name: 'GetBalanceUserLotaContract',
  props: {
    userAddress: String,
  },
  data: () => ({
    balanceOf: '0',
  }),
  created() {
    const terraClient = new LCDClient({
      URL: this.$store.state.station.lcdUrl,
      chainID: this.$store.state.station.lcdChainId,
    })
    const api = new WasmAPI(terraClient.apiRequester)
    this.queryBalance(api)
  },
  methods: {
    async queryBalance(api) {
      console.log(
        await api.contractInfo(
          this.$store.state.station.lotaCw20ContractAddress
        )
      )
      const objBalance = await api.contractQuery(
        this.$store.state.station.lotaCw20ContractAddress,
        {
          balance: {
            address: this.userAddress,
          },
        }
      )

      this.balanceOf = numeral(objBalance.balance / 1000000).format('0,0.00')
    },
  },
}
</script>

<style scoped></style>
