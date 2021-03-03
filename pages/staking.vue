<template>
  <div class="content-container">
    <div class="flex-staking">
      <!--<vs-card class="margin-content">
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
      </vs-card>-->
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
          <div>
            <vs-button gradient danger block @click="addAllowance()"
              >Allowance</vs-button
            >
          </div>
          <div
            style="display: flex; justify-content: flex-end; margin-top: 10px"
          >
            <div
              style="
                font-size: 13px;
                display: flex;
                align-items: center;
                flex-direction: column;
              "
            >
              <div style="display: flex; justify-content: flex-end">
                Allowance:
                {{ allowance }}
              </div>
              <div style="display: flex; justify-content: flex-end">
                Available:
                <vs-button
                  shadow
                  size="mini"
                  style="color: dodgerblue"
                  @click="lotaAll()"
                  >{{ lotaBalance }}</vs-button
                >
              </div>
            </div>
          </div>
          <div>
            <vs-button gradient danger block @click="stakeOrUnstake('stake')"
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
                @click="lotaAllBonded()"
                >{{ bondedLota }}</vs-button
              >
            </div>
          </div>
          <div>
            <vs-button gradient danger block @click="stakeOrUnstake('unstake')"
              >UnStake</vs-button
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
                @click="lotaAllUnBonded()"
                >{{ unBondedLota }}</vs-button
              >
            </div>
          </div>
          <div>
            <vs-button gradient danger block @click="claimUnBonded()"
              >Claim unStake</vs-button
            >
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
    allowance() {
      return numeral(this.$store.state.station.allowance / 1000000).format(
        '0,0.00'
      )
    },
    isAllowed() {
      if (this.allowance < this.value) {
        return false
      }
      return true
    },
    bondedLota() {
      return numeral(this.$store.state.station.bonded / 1000000).format(
        '0,0.00'
      )
    },
    unBondedLota() {
      return numeral(this.$store.state.station.unBonded / 1000000).format(
        '0,0.00'
      )
    },
  },
  created() {
    this.loadBonded()
    this.loadUnBonded()
    this.loadAllowance()
  },
  methods: {
    lotaAll() {
      this.value = this.$store.state.station.balanceOf
    },
    lotaAllBonded() {
      this.value = this.$store.state.station.bonded / 1000000
    },
    lotaAllUnBonded() {
      this.value = this.$store.state.station.unBonded / 1000000
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
        this.$store.state.station.lotaCw20ContractAddress,
        {
          allowance: {
            owner: 'terra1umd70qd4jv686wjrsnk92uxgewca3805dxd46p',
            spender: this.$store.state.station.lotaStakingContractAddress,
          },
        }
      )
      this.$store.commit('station/update_allowance', obj.allowance)
      console.log(obj)
    },
    loadUnBonded() {
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
              address: 'terra1umd70qd4jv686wjrsnk92uxgewca3805dxd46p',
            },
          }
        )
        this.$store.commit('station/update_un_bonded', obj.un_bonded)
        console.log(obj)
      })
    },
    loadBonded() {
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
              address: 'terra1umd70qd4jv686wjrsnk92uxgewca3805dxd46p',
            },
          }
        )
        this.$store.commit('station/update_bonded', obj.bonded)
        console.log(obj)
      })
    },
    async addAllowance() {
      const amount = parseInt(this.value * 1000000)
      const msg = new MsgExecuteContract(
        this.$store.state.station.senderAddress,
        this.$store.state.station.lotaCw20ContractAddress,
        {
          increase_allowance: {
            spender: this.$store.state.station.lotaStakingContractAddress,
            amount: amount.toString(),
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
    async claimUnBonded() {
      const msg = new MsgExecuteContract(
        this.$store.state.station.senderAddress,
        this.$store.state.station.lotaStakingContractAddress,
        {
          claim_un_staked: {},
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
    async stakeOrUnstake(cmd) {
      const amount = parseInt(this.value * 1000000)
      let msg
      if (cmd === 'stake') {
        msg = new MsgExecuteContract(
          this.$store.state.station.senderAddress,
          this.$store.state.station.lotaStakingContractAddress,
          {
            stake: { amount: amount.toString() },
          }
        )
      } else {
        msg = new MsgExecuteContract(
          this.$store.state.station.senderAddress,
          this.$store.state.station.lotaStakingContractAddress,
          {
            un_stake: { amount: amount.toString() },
          }
        )
      }
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
