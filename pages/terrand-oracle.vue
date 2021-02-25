<template>
  <div class="content-container">
    <vs-alert id="alert-1" gradient danger>
      <template #title> Terrand oracle </template>
      Become a worker and earn UST from the jackpot rewards every time you add a
      needed round of randomness used by the lottery draw.
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
    <div
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      "
    >
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
        </template>
        <template #buttons>
          <div style="padding-bottom: 20px">
            <vs-button
              v-if="!connected"
              gradient
              danger
              block
              @click="station()"
            >
              Connect Wallet
            </vs-button>
            <vs-button
              v-if="connected"
              danger
              gradient
              :loading="load"
              @click="terraAddRandomness"
            >
              Add randomness
            </vs-button>
          </div>
        </template>
      </vs-card>
    </div>
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
  },
  methods: {
    async queryRound() {
      const api = new WasmAPI(this.terraClient.apiRequester)

      const nextRoundObj = await api.contractQuery(
        this.$store.state.station.loterraLotteryContractAddress,
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
        extension.on((trxMsg) => {
          console.log(trxMsg)
          this.load = !this.load
          if (!trxMsg.success && switchs) {
            this.openNotification(
              'Transaction error',
              trxMsg.error.message,
              30000
            )
            switchs = false
          }
          if (trxMsg.success && switchs) {
            this.openNotification(
              'Transaction success',
              'Thank you for your contribution! 🍀',
              4000
            )
            switchs = false
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
