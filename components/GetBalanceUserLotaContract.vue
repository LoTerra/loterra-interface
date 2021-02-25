<template>
  <div>{{ balanceOf }}</div>
</template>

<script>
import { LCDClient, WasmAPI, Extension } from '@terra-money/terra.js'
import numeral from 'numeral'
export default {
  name: 'GetBalanceUserLotaContract',
  data: () => ({
    balanceOf: '0',
  }),
  mounted() {
    this.queryBalance()
  },
  methods: {
    queryBalance() {
      const terraClient = new LCDClient({
        URL: this.$store.state.station.lcdUrl,
        chainID: this.$store.state.station.lcdChainId,
      })
      const api = new WasmAPI(terraClient.apiRequester)
      console.log('121' + this.$store.state.station.lotaCw20ContractAddress)
      const extension = new Extension()
      extension.connect()
      extension.once(async (w) => {
        const objBalance = await api.contractQuery(
          this.$store.state.station.lotaCw20ContractAddress,
          {
            balance: {
              address: w.address,
            },
          }
        )

        this.balanceOf = await numeral(objBalance.balance / 1000000).format(
          '0,0.00'
        )
      })
    },
  },
}
</script>

<style scoped></style>
