<template>
  <div class="content-container">
    <vs-alert id="alert-1" gradient danger>
      <template #title> Terrand oracle </template>
      Become a worker and earn UST from the jackpot rewards every time you add
      the next round of randomness used by the lottery draw, you also become the
      owner of this contribution and others Dapps can rewards you for using it.
    </vs-alert>
    <div style="margin-bottom: 30px; margin-top: 30px">
      <div v-if="!randomnessAlreadyAdded">
        <div style="display: flex">
          <div class="center">
            <vs-tooltip top>
              <vs-button
                flat
                danger
                href="https://docs.terrand.dev/#add-randomness"
                blank
              >
                <i class="bx bx-info-circle"></i>
              </vs-button>
              <template #tooltip> Click and go to Terrand docs </template>
            </vs-tooltip>
          </div>
          <h2 style="margin-bottom: 30px">
            <span style="font-size: 23px">Next round:</span>
            <a
              :href="'https://drand.cloudflare.com/public/' + nextRound"
              target="_blank"
              style="color: rgb(242, 19, 93); text-decoration: none"
              >{{ nextRound }}</a
            >
          </h2>
        </div>
      </div>
      <div v-if="randomnessAlreadyAdded">
        <p style="margin-bottom: 30px">
          Round ALREADY ADDED. Wait until determination of the next round
        </p>
      </div>
    </div>
    <vs-card>
      <template #title>
        <h3>Terrand oracle</h3>
        <p style="margin-bottom: 25px">
          Adding randomness to Terrand smart contract
        </p>
      </template>
      <template #text>
        <div class="center content-inputs">
          <vs-input
            v-model="inputRound"
            block
            placeholder="Round"
            type="number"
            min="0"
            class="input-drand"
          >
            <template v-if="errorFormat" #message-danger>
              Wrong format
            </template></vs-input
          >

          <vs-input
            v-model="inputSignature"
            block
            placeholder="Signature"
            type="text"
            class="input-drand"
          >
            <template v-if="errorFormat" #message-danger>
              Wrong format
            </template></vs-input
          >

          <vs-input
            v-model="inputPreviousSignature"
            block
            placeholder="Previous signature"
            type="text"
            class="input-drand"
          >
            <template v-if="errorFormat" #message-danger>
              Wrong format
            </template></vs-input
          >
        </div>
        <div style="padding-top: 20px">
          <vs-button v-if="!connected" gradient danger block @click="station()">
            Connect Wallet
          </vs-button>
          <vs-button
            v-if="connected"
            danger
            gradient
            :loading="load"
            block
            @click="terraAddRandomness"
          >
            Add randomness
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
  LCDClient,
  WasmAPI,
  MsgExecuteContract,
  StdFee,
} from '@terra-money/terra.js'

export default {
  name: 'TerrandOracle',
  data: () => ({
    activeDialogInfoNoWalletDetected: false,
    load: false,
    terraClient: '',
    nextRound: '',
    inputRound: '',
    inputSignature: '',
    inputPreviousSignature: '',
    randomnessAlreadyAdded: false,
  }),
  head: {
    title: 'Terrand oracle',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content:
          'Become a worker and earn UST from the jackpot rewards every time you add the next round...',
      },
    ],
  },
  computed: {
    round: {
      get() {
        return this.inputRound
      },
      set(d) {
        this.inputRound = d
      },
    },
    connected() {
      if (this.$store.state.station.senderAddress) {
        return true
      } else {
        return false
      }
    },
  },
  created() {
    this.terraClient = new LCDClient({
      URL: this.$store.state.station.lcdUrl,
      chainID: this.$store.state.station.lcdChainId,
    })
    this.queryRound()
    const extension = new Extension()
    extension.connect()
    /* const coinCoin = new Coin('uusd', 10000000)

    const msgPlay = new MsgExecuteContract(
      this.$store.state.station.senderAddress,
      'terra1pn20mcwnmeyxf68vpt3cyel3n57qm9mp289jta',
      {
        provide_liquidity: {
          assets: [
            {
              info: {
                token: {
                  contract_addr: 'terra1ez46kxtulsdv07538fh5ra5xj8l68mu8eg24vr',
                },
              },
              amount: '10000000',
            },
            {
              info: {
                native_token: {
                  denom: 'uusd',
                },
              },
              amount: '10000000',
            },
          ],
        },
      },
      [coinCoin]
    ) */
    /* const msgPlay = new MsgExecuteContract(
      this.$store.state.station.senderAddress,
      'terra1ez46kxtulsdv07538fh5ra5xj8l68mu8eg24vr',
      {
        increase_allowance: {
          spender: 'terra1pn20mcwnmeyxf68vpt3cyel3n57qm9mp289jta',
          amount: '10000000',
        },
      },
      [coinCoin]
    ) */
    /* const sends = new MsgSend(
      this.$store.state.station.senderAddress,
      this.$store.state.station.loterraLotteryContractAddress,
      { uluna: 1000000 }
    ) */

    // eslint-disable-next-line no-unused-vars
    /* const obj = new StdFee(1_000_000, { uusd: 200000 })
    extension.post({
      msgs: [msgPlay],
      gasPrices: obj.gasPrices(),
      gasAdjustment: 1.5,
    })
    extension.on((trxMsg) => {
      console.log('dfe')
      console.log(trxMsg)
    }) */
  },
  methods: {
    async queryRound() {
      const api = new WasmAPI(this.terraClient.apiRequester)

      const nextRoundObj = await api.contractQuery(
        this.$store.state.station.loterraLotteryContractAddressV2,
        {
          get_round: {},
        }
      )

      this.nextRound = nextRoundObj.next_round
      this.inputRound = nextRoundObj.next_round
      this.queryRandomnessExist()
    },
    async queryRandomnessExist(_nextRound) {
      const api = new WasmAPI(this.terraClient.apiRequester)
      const nextRandomnessObj = await api.contractQuery(
        this.$store.state.station.terrandContractAddress,
        {
          get_randomness: { round: this.nextRound },
        }
      )
      if (nextRandomnessObj.randomness) {
        this.randomnessAlreadyAdded = !this.randomnessAlreadyAdded
        this.inputRound = ''
      }
    },
    openNotification(title, text, seconds) {
      this.$vs.notification({
        position: 'bottom-right',
        title,
        text,
        duration: seconds,
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
    async terraAddRandomness() {
      // eslint-disable-next-line camelcase
      const msg = new MsgExecuteContract(
        this.$store.state.station.senderAddress,
        this.$store.state.station.terrandContractAddress,
        {
          drand: {
            round: parseInt(this.inputRound),
            previous_signature: this.inputPreviousSignature,
            signature: this.inputSignature,
          },
        }
      )
      /* const msgPlay = new MsgExecuteContract(
        this.$store.state.station.senderAddress,
        this.$store.state.station.loterraLotteryContractAddress,
        {
          play: {},
        }
      ) */
      const extension = new Extension()
      extension.connect()
      if (!extension.isAvailable) {
        this.activeDialogInfoNoWalletDetected = !this
          .activeDialogInfoNoWalletDetected
      } else {
        // out of gas: out of gas in location: Contract Execution; gasWanted: 3000000, gasUsed: 3001033: failed to simulate tx
        // const coin = new Coin('uusd', 1000000)
        // const data = new StdFee(10000000, [coin])
        // const obj = new StdFee(6_000_000, { uusd: 1500000 })
        const obj = new StdFee(7_000_000, { uusd: 2000000 })
        await extension.post({
          msgs: [msg],
          fee: obj,
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
            console.log(trxMsg)
            this.openNotification(
              'Transaction success',
              'Thank you for your contribution! 🍀',
              4000
            )
            this.load = false
            switchs = false
            this.inputRound = ''
            this.inputSignature = ''
            this.inputPreviousSignature = ''
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
.input-drand {
  margin-bottom: 20px;
}
</style>
