<template>
  <div>{{ balanceOf }}</div>
</template>

<script>
import { LCDClient, WasmAPI, Extension } from '@terra-money/terra.js'
import numeral from 'numeral'
export default {
  name: 'GetBalanceUserLotaContract',
  computed: {
    balanceOf() {
      return this.$store.state.station.balanceOf
    },
  },
  created() {
    this.queryBalance()
  },
  methods: {
    queryBalance() {
      const terraClient = new LCDClient({
        URL: this.$store.state.station.lcdUrl,
        chainID: this.$store.state.station.lcdChainId,
      })
      const api = new WasmAPI(terraClient.apiRequester)
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
        this.$store.state.station.balanceOf = await numeral(
          objBalance.balance / 1000000
        ).format('0,0.00')
      })
    },
  },
}
</script>

<style scoped></style>
