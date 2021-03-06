<template>
  <div class="content-container">
    <vs-alert id="alert-1" gradient danger>
      <template #title> DAO </template>
      Vote proposals and contribute to LoTerra ecosystem
    </vs-alert>
    <div
      v-if="pollData.length > 0"
      style="
        display: flex;
        justify-content: flex-start;
        width: 100%;
        flex-wrap: wrap;
        margin-top: 50px;
      "
    >
      <vs-card
        v-for="(item, index) in pollData"
        :key="index"
        style="margin: 25px"
      >
        <template #title>
          <h3>Proposal number: {{ index + 1 }}</h3>
          <p>{{ item.description }}</p>
        </template>
        <template #text>
          <div
            style="
              display: flex;
              margin-top: 20px;
              margin-bottom: 20px;
              flex-direction: column;
              text-align: left;
            "
          >
            <div>
              Creator:
              <span class="color-proposal" style="font-size: 12px">{{
                item.creator
              }}</span>
            </div>
            <div>
              End block height:
              <span class="color-proposal">{{ item.end_height }}</span>
            </div>
            <div>
              Amount:
              <span class="color-proposal">{{ item.amount }}</span>
            </div>
            <div>
              Status: <span class="color-proposal">{{ item.status }}</span>
            </div>
            <div>
              Prize per rank:
              <span class="color-proposal">{{ item.prize_per_rank }}</span>
            </div>
            <div>
              Proposal:
              <span class="color-proposal">{{
                item.proposal == 'AmountToRegister'
                  ? 'Amount to register a combination'
                  : item.proposal
              }}</span>
            </div>
            <div>
              Yes votes:
              <span class="color-proposal">{{ item.yes_vote }}</span>
            </div>
            <div>
              No votes:
              <span class="color-proposal">{{ item.no_vote }}</span>
            </div>
          </div>
        </template>
        <template v-if="item.status == 'InProgress'" #buttons>
          <div
            v-if="!connected"
            style="display: flex; justify-content: space-around"
          >
            <vs-button gradient danger block @click="station()">
              Connect Wallet
            </vs-button>
          </div>
          <span v-if="connected">vote</span>
          <div
            v-if="connected"
            style="display: flex; justify-content: space-around"
          >
            <vs-button danger gradient @click="vote(true, index + 1)">
              YES</vs-button
            >
            <vs-button danger gradient @click="vote(false, index + 1)">
              NO</vs-button
            >
          </div>
          <div
            v-if="connected"
            style="display: flex; justify-content: space-around"
          >
            <vs-button danger flat @click="rejectProposal(index + 1)"
              >Creator reject proposal</vs-button
            >
          </div>
        </template>
      </vs-card>
    </div>
    <div v-else>No poll data found.</div>
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
  WasmAPI,
  LCDClient,
  MsgExecuteContract,
  Extension,
  StdFee,
} from '@terra-money/terra.js'
export default {
  name: 'Dao',
  data: () => ({
    description: '',
    proposal: '',
    textarea: '',
    pollCount: 0,
    pollData: [],
    activeDialogInfoNoWalletDetected: false,
  }),
  head: {
    title: 'DAO',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Vote proposals and contribute to LoTerra ecosystem',
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
  },
  created() {
    this.queryProposalAmount()
  },
  methods: {
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
    openNotification(title, text, seconds) {
      this.$vs.notification({
        position: 'bottom-right',
        title,
        text,
        duration: seconds,
      })
    },
    async queryProposalAmount() {
      const terraClient = new LCDClient({
        URL: this.$store.state.station.lcdUrl,
        chainID: this.$store.state.station.lcdChainId,
      })
      const api = new WasmAPI(terraClient.apiRequester)
      const contractInfo = await api.contractQuery(
        this.$store.state.station.loterraLotteryContractAddressV2,
        {
          config: {},
        }
      )
      this.pollCount = contractInfo.poll_count
      for (let x = 1; x <= this.pollCount; x++) {
        const contractInfo = await api.contractQuery(
          this.$store.state.station.loterraLotteryContractAddressV2,
          {
            get_poll: { poll_id: x },
          }
        )
        console.log(contractInfo)
        this.pollData.push(contractInfo)
      }
    },
    async rejectProposal(pollId) {
      // eslint-disable-next-line camelcase
      const msg = new MsgExecuteContract(
        this.$store.state.station.senderAddress,
        this.$store.state.station.loterraLotteryContractAddressV2,
        {
          reject_poll: {
            poll_id: pollId,
          },
        }
      )
      const extension = new Extension()
      extension.connect()
      // const obj = new StdFee(1_000_000, { uusd: 1500000 })
      const obj = new StdFee(400_000, { uusd: 60000 })
      if (!extension.isAvailable) {
        this.activeDialogInfoNoWalletDetected = !this
          .activeDialogInfoNoWalletDetected
      } else {
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
            this.openNotification(
              'Transaction success',
              `proposal ${pollId} rejected`,
              4000
            )
            this.combination = ''
            switchs = false
            this.load = false
          }
        })
        switchs = true
      }
    },
    async vote(approve, pollId) {
      // eslint-disable-next-line camelcase
      const msg = new MsgExecuteContract(
        this.$store.state.station.senderAddress,
        this.$store.state.station.loterraLotteryContractAddressV2,
        {
          vote: {
            poll_id: pollId,
            approve,
          },
        }
      )
      const extension = new Extension()
      extension.connect()
      // const obj = new StdFee(1_000_000, { uusd: 1500000 })
      const obj = new StdFee(400_000, { uusd: 60000 })

      if (!extension.isAvailable) {
        this.activeDialogInfoNoWalletDetected = !this
          .activeDialogInfoNoWalletDetected
      } else {
        await extension.post({
          msgs: [msg],
          fee: obj,
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
            this.openNotification('Transaction success', 'You voted!', 4000)
            this.combination = ''
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
  margin-top: 25px;
}
.color-proposal {
  background: linear-gradient(to right, rgb(242, 19, 93), #5b3cc4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 1rem;
  padding-bottom: 10px;
}
</style>
