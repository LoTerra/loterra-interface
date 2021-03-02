<template>
  <div class="content-container">
    <div class="flex-staking">
      <vs-card class="margin-content">
        <template #title>
          <h3>LOTA Wallet</h3>
          <p>In construction...</p>
        </template>
        <template #text>
          <div class="center content-inputs" style="margin-top: 10px">
            <vs-input v-model="sendTo" type="text" placeholder="Send to" />
          </div>
          <div
            style="display: flex; justify-content: flex-end; margin-top: 10px"
          >
            <div style="font-size: 13px; display: flex; align-items: center">
              Available:
              <vs-button
                shadow
                size="mini"
                style="color: dodgerblue"
                @click="sendAll()"
                >{{ lotaBalance }}</vs-button
              >
            </div>
          </div>
          <div class="center content-inputs">
            <vs-input v-model="amountToSend" type="number" placeholder="Amount"
              ><template #icon>
                <span style="font-size: 13px">LOTA</span>
              </template></vs-input
            >
          </div>
          <div class="center content-inputs" style="margin-top: 10px">
            <vs-input
              v-model="memo"
              type="text"
              placeholder="Memo (Optional)"
            />
          </div>
          <div style="margin-top: 10px">
            <vs-button gradient danger block>Send</vs-button>
          </div>
          <div
            style="display: flex; justify-content: flex-end; margin-top: 10px"
          >
            <div style="font-size: 13px; display: flex; align-items: center">
              Available:
              <vs-button
                shadow
                size="mini"
                style="color: dodgerblue"
                @click="sendAll()"
                >{{ lotaBalance }}</vs-button
              >
            </div>
          </div>
          <div>
            <vs-button gradient danger block>Claim rewards</vs-button>
          </div>
        </template>
      </vs-card>
      <vs-card class="margin-content">
        <template #title>
          <h3>Staking</h3>
          <p>In construction...</p>
        </template>
        <template #text>
          <p>Stake</p>
          <div class="center content-inputs">
            <vs-input v-model="value" type="number" placeholder="Stake" />
          </div>
          <div
            style="display: flex; justify-content: flex-end; margin-top: 10px"
          >
            <div style="font-size: 13px; display: flex; align-items: center">
              Available:
              <vs-button
                shadow
                size="mini"
                style="color: dodgerblue"
                @click="sendAll()"
                >{{ lotaBalance }}</vs-button
              >
            </div>
          </div>
          <div>
            <vs-button gradient danger block @click="stakeLota()"
              >Stake</vs-button
            >
          </div>
          <div
            style="display: flex; justify-content: flex-end; margin-top: 10px"
          >
            <div style="font-size: 13px; display: flex; align-items: center">
              Available:
              <vs-button
                shadow
                size="mini"
                style="color: dodgerblue"
                @click="sendAll()"
                >{{ lotaBalance }}</vs-button
              >
            </div>
          </div>
          <div>
            <vs-button gradient danger block>UnStake</vs-button>
          </div>
          <div
            style="display: flex; justify-content: flex-end; margin-top: 10px"
          >
            <div style="font-size: 13px; display: flex; align-items: center">
              Available:
              <vs-button
                shadow
                size="mini"
                style="color: dodgerblue"
                @click="sendAll()"
                >{{ lotaBalance }}</vs-button
              >
            </div>
          </div>
          <div>
            <vs-button gradient danger block>Claim unStake</vs-button>
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
  LCDClient,
  WasmAPI,
  Extension,
  MsgExecuteContract,
} from '@terra-money/terra.js'
import numeral from 'numeral'
export default {
  name: 'Staking',
  data: () => ({
    value: '',
    active: true,
    amountToSend: '',
    sendTo: '',
    memo: '',
    load: false,
    activeDialogInfoNoWalletDetected: false,
  }),
  computed: {
    lotaBalance() {
      return numeral(this.$store.state.station.balanceOf).format('0,0.00')
    },
  },
  created() {
    this.loadStaking()
    this.loadAllowance()
  },
  methods: {
    sendAll() {
      this.amountToSend = this.$store.state.station.balanceOf
    },
    openNotification(title, text, seconds) {
      this.$vs.notification({
        position: 'bottom-right',
        title,
        text,
        duration: seconds,
      })
    },
    async loadAllowance() {
      const terraClient = new LCDClient({
        URL: this.$store.state.station.lcdUrl,
        chainID: this.$store.state.station.lcdChainId,
      })
      const api = new WasmAPI(terraClient.apiRequester)
      const extension = new Extension()
      extension.connect()
      extension.once(async (w) => {})
      const obj = await api.contractQuery(
        this.$store.state.station.lotaStakingContractAddress,
        {
          allowance: {
            owner: 'terra1umd70qd4jv686wjrsnk92uxgewca3805dxd46p',
            spender: this.$store.state.station.lotaCw20ContractAddress,
          },
        }
      )
      console.log(obj)
    },
    loadStaking() {
      const terraClient = new LCDClient({
        URL: this.$store.state.station.lcdUrl,
        chainID: this.$store.state.station.lcdChainId,
      })
      const api = new WasmAPI(terraClient.apiRequester)
      const extension = new Extension()
      extension.connect()
      extension.once(async (w) => {
        const obj = await api.contractQuery(
          this.$store.state.station.lotaStakingContractAddress,
          {
            get_holder: {
              address: w.address,
            },
          }
        )
        console.log(obj)
      })
    },
    async stakeLota() {
      const amount = parseInt(this.value * 1000000)
      const msg = new MsgExecuteContract(
        this.$store.state.station.senderAddress,
        this.$store.state.station.lotaStakingContractAddress,
        {
          stake: { amount: amount.toString() },
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
              'Staking success',
              4000
            )
            this.load = false
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
.flex-staking {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
}
.margin-content {
  margin: 25px;
}
</style>
