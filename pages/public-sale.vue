<template>
  <div class="content-container">
    <vs-alert id="alert-1" gradient danger>
      <template #title> LOTA is the DAO token of LoTerra </template>

      LOTA give power to vote proposal and manage the decentralized LoTerra
      ecosystem of lottery gaming's also holders can stake LOTA and earn 10% of
      lottery rewards. Public sale ratio is 1:1 UST -> LOTA, all 100% sold UST
      is auto added to the jackpot and become available to the next draw. The
      current supply of LOTA is 7Mm so hard cap is $7Mm unsold will remain on
      the smart contract forever lowering the circulating supply. Creators will
      keep 30% of 7Mm LOTA for developing the LoTerra ecosystem.
    </vs-alert>

    <iframe
      width="560"
      height="315"
      src="https://www.youtube.com/embed/Qcvyrf0g3kg"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
    <vs-card style="margin-top: 25px; margin-bottom: 25px">
      <template #title>
        <h3>Public sale</h3>
        <p style="margin-bottom: 25px">
          Buy LOTA at ratio 1:1 with UST and contribute to the jackpot grow
        </p>
      </template>
      <template #text>
        <div class="center content-inputs">
          <vs-input
            v-model="amount"
            block
            label-placeholder="Amount in UST"
            type="number"
            min="0"
          >
            <template v-if="errorFormat" #message-danger>
              Wrong format
            </template></vs-input
          >
          <p style="font-size: small">only UST is accepted</p>
        </div>
      </template>
      <template #buttons>
        <div style="padding-bottom: 20px">
          <vs-button v-if="!connected" gradient danger @click="station()">
            Connect Wallet
          </vs-button>
          <vs-button
            v-if="connected"
            danger
            gradient
            :loading="load"
            @click="buyLota"
          >
            Buy LOTA
          </vs-button>
        </div>
      </template>
    </vs-card>
    <vs-dialog v-model="activeDialogInfoNoWalletDetected" non-center>
      <template #header>
        <h4 class="not-margin">Setup needed</h4>
      </template>
      <div class="con-content">
        <p>
          The LoTerra Dapp requires
          <a href="https://www.google.com/intl/en_en/chrome/" target="_blank"
            >Google Chrome</a
          >
          and
          <a
            target="_blank"
            href="https://chrome.google.com/webstore/detail/terra-station/aiifbnbfobpmeekipheeijimdpnlpgpp"
          >
            Terra Station wallet</a
          >
          Extension to be installed.
        </p>
      </div>
    </vs-dialog>
  </div>
</template>

<script>
import {
  Extension,
  MsgExecuteContract,
  LCDClient,
  WasmAPI,
} from '@terra-money/terra.js'
export default {
  name: 'PublicSale',
  data: () => ({
    amount: '',
    errorFormat: false,
    formatAmount: 0,
    load: false,
    activeDialogInfoNoWalletDetected: false,
  }),
  computed: {
    connected() {
      if (this.$store.state.station.senderAddress) {
        return true
      } else {
        return false
      }
    },
  },
  watch: {
    amount(val) {
      console.log(parseFloat(val))
      if (isNaN(parseFloat(val))) {
        this.errorFormat = !this.errorFormat
      } else {
        this.formatAmount = parseFloat(this.amount) * 1000000
        this.errorFormat = false
      }
    },
  },
  methods: {
    openNotification(title, text, seconds) {
      this.$vs.notification({
        position: 'bottom-right',
        title,
        text,
        duration: seconds,
      })
    },
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
              address: w.address || this.$store.state.station.senderAddress,
            },
          }
        )
        this.$store.commit(
          'station/update_balance',
          objBalance.balance / 1000000
        )
      })
    },
    station() {
      const extension = new Extension()
      extension.connect()
      if (!extension.isAvailable) {
        this.activeDialogInfoNoWalletDetected = !this
          .activeDialogInfoNoWalletDetected
      } else {
        console.log(extension.isAvailable)
        extension.once((w) => {
          this.$store.commit('station/update', w.address)
        })
      }
    },
    async buyLota() {
      if (this.formatAmount <= 0) {
        this.$vs.notification({
          position: 'bottom-right',
          title: 'Error',
          text: `Wrong format.`,
          duration: 4000,
          activeInfo: true,
        })
        return
      }

      const msg = new MsgExecuteContract(
        this.$store.state.station.senderAddress,
        this.$store.state.station.loterraLotteryContractAddress,
        {
          public_sale: {},
        },
        { uusd: this.formatAmount }
      )
      const extension = new Extension()
      extension.connect()
      if (!extension.isAvailable) {
        this.activeDialogInfoNoWalletDetected = !this
          .activeDialogInfoNoWalletDetected
      } else {
        await extension.post({
          msgs: [msg],
        })
        let switchs = true
        this.load = true
        extension.on((trxMsg) => {
          console.log(trxMsg)
          if (!trxMsg.success && switchs) {
            this.openNotification(
              'Transaction error',
              trxMsg.error.message,
              30000
            )
            this.load = false
            switchs = false
          }
          if (trxMsg.success && switchs) {
            this.openNotification(
              'Transaction success',
              'Welcome to the DAO, do not forget to stake your LOTA.',
              4000
            )
            this.load = false
            switchs = false
            setTimeout(() => {
              this.queryBalance()
            }, 7000)
          }
        })
        switchs = true
      }
    },
  },
}
</script>

<style scoped>
#alert-1 {
  width: 70%;
  margin-bottom: 25px;
  text-align: left;
}
</style>
