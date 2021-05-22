<template>
  <div class="content-container">
    <vs-alert id="alert-1" gradient danger>
      <template #title> LOTA is the DAO token of LoTerra </template>

      LOTA give power to vote proposals and manage the decentralized LoTerra
      ecosystem of lottery gaming also holders can stake LOTA and earn lottery
      rewards if big winners, up to 20% fixed at 10% at launch. Public sale max
      LOTA supply is 7Mm ratio 1:1 UST -> LOTA, 100% sold UST is used to finance
      the jackpot and become available to the next draw. Hard cap is $7Mm at the
      end of public sale unsold LOTA will remain locked on the smart contract
      lowering the circulating supply. Creators will keep 15% of 7Mm LOTA for
      development and project funding to expand the LoTerra ecosystem.
    </vs-alert>

    <iframe
      width="560"
      height="315"
      src="https://www.youtube.com/embed/Qcvyrf0g3kg"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
    <p
      v-if="remainingBalance > 0"
      class="jackpot-timer"
      style="margin-top: 20px"
    >
      Remaining LOTA
    </p>
    <p v-if="remainingBalance > 0" class="jackpot-timer">
      {{ remaining_balance }}
    </p>
    <vs-card style="margin-top: 25px; margin-bottom: 25px">
      <template #title>
        <h3>Public sale</h3>
        <p style="margin-top: 10px">Time left before public sale end:</p>
        <p class="jackpot-timer">
          {{
            lotteryTimestampDraw ? lotteryTimestampDraw : 'Public sale closed'
          }}
        </p>
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
        <div style="padding-top: 20px">
          <vs-button v-if="!connected" gradient danger block @click="station()">
            Connect Wallet
          </vs-button>
        </div>
        <div style="padding-top: 20px">
          <vs-button
            v-if="connected"
            danger
            gradient
            :loading="load"
            block
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
  StdFee,
} from '@terra-money/terra.js'
import numeral from 'numeral'
export default {
  name: 'PublicSale',
  data: () => ({
    amount: '',
    errorFormat: false,
    formatAmount: 0,
    load: false,
    activeDialogInfoNoWalletDetected: false,
    lotteryTimestampDraw: 0,
    timeLeftDraw: 0,
    remainingBalance: 0,
  }),
  head: {
    title: 'Public sale',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content:
          'Public sale max\n' +
          '      LOTA supply is 7Mm ratio 1:1 UST -> LOTA, 100% sold UST is used to finance\n' +
          '      the jackpot and become available to the next draw...',
      },
    ],
  },
  computed: {
    connected() {
      if (this.$store.state.station.senderAddress) {
        return true
      } else {
        return false
      }
    },
    remaining_balance() {
      return numeral(this.remainingBalance).format('0,0.00')
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
    timeLeftDraw() {
      const days = this.roundDown(this.timeLeftDraw / 86400000)
      const hours = this.roundDown((this.timeLeftDraw % 86400000) / 3600000)
      const min = this.roundDown(
        ((this.timeLeftDraw % 86400000) % 3600000) / 60000
      )
      const sec = this.roundDown(
        (((this.timeLeftDraw % 86400000) % 3600000) % 60000) / 1000
      )
      const dayFormat = days < 10 ? '0' + days : days
      const hourFormat = hours < 10 ? '0' + hours : hours
      const minFormat = min < 10 ? '0' + min : min
      const secFormat = sec < 10 ? '0' + sec : sec

      this.lotteryTimestampDraw =
        dayFormat + ' ' + hourFormat + ' ' + minFormat + ' ' + secFormat
    },
  },
  created() {
    this.queryLoTerraBalance()
  },
  mounted() {
    this.timeLeftDraw = new Date(1684781197 * 1000) - Date.now()
    this.PublicSaleEnd()
  },
  methods: {
    roundDown(num) {
      const full = num.toString()
      const reg = /([\d]+)/i
      const res = reg.exec(full)
      return res[1]
    },
    PublicSaleEnd() {
      // this.getTimeDraw()
      // var timestamp = (Date.now() + 1000 * 60 * 60 * 24 * 3) - Date.now();
      let int
      if (this.timeLeftDraw > 0) {
        int = setInterval(() => {
          this.timeLeftDraw -= 1000
          // this.lotteryDraw()
        }, 1000)
      } else {
        this.timeLeftDraw = 0
        clearInterval(int)
      }
      // Hours part from the timestamp
      // const hours = date.getHours()
      // Minutes part from the timestamp
      // const minutes = '0' + date.getMinutes()
      // Seconds part from the timestamp
      // const seconds = '0' + date.getSeconds()
    },
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
    queryLoTerraBalance() {
      const terraClient = new LCDClient({
        URL: this.$store.state.station.lcdUrl,
        chainID: this.$store.state.station.lcdChainId,
      })
      const api = new WasmAPI(terraClient.apiRequester)
      const extension = new Extension()
      extension.connect()
      extension.on(async (w) => {
        const objBalance = await api.contractQuery(
          this.$store.state.station.lotaCw20ContractAddress,
          {
            balance: {
              address: this.$store.state.station.loterraLotteryContractAddress,
            },
          }
        )
        this.remainingBalance = (objBalance.balance - 1050000000000) / 1000000
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
      const obj = new StdFee(10_000_000, { uusd: 1500000 })
      if (!extension.isAvailable) {
        this.activeDialogInfoNoWalletDetected = !this
          .activeDialogInfoNoWalletDetected
      } else {
        await extension.post({
          msgs: [msg],
          gasPrices: obj.gasPrices(),
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
              this.queryLoTerraBalance()
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
.jackpot-timer {
  background: linear-gradient(to right, rgb(242, 19, 93), #5b3cc4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 1.5rem;
  padding-bottom: 10px;
}
</style>
