<template>
  <div class="content-container">
    <vs-alert id="alert-1" gradient danger>
      <template #title> LOTA staking </template>
      Stake your LOTA and get up to 20% of jackpots if big winners shared among
      all LOTA stakers
    </vs-alert>
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
          <p>
            Unstake or stake your LOTA in order to get rewards and voting weight
          </p>
        </template>
        <template #text>
          <div v-if="!connected">
            <vs-button :loading="load" gradient danger block @click="station()">
              Connect Wallet
            </vs-button>
          </div>
          <div v-if="connected">
            <div class="center content-inputs">
              <div
                style="
                  font-size: 13px;
                  display: flex;
                  justify-content: flex-end;
                  align-items: center;
                "
              >
                Allowance:
                {{ allowance }}<span style="font-size: 11px">LOTA</span>
              </div>
              <vs-input
                v-model="value"
                block
                type="number"
                placeholder="Amount"
              />
            </div>
            <div>
              <div v-if="!isAllowed" style="margin-top: 10px">
                <div
                  style="font-size: 13px; display: flex; align-items: center"
                >
                  <div class="center">
                    <vs-tooltip>
                      <vs-button flat warn
                        ><i class="bx bx-info-circle"></i
                      ></vs-button>
                      <template #tooltip>
                        This transaction require increase allowance to continue
                      </template>
                    </vs-tooltip>
                  </div>
                  <vs-button
                    :loading="load"
                    gradient
                    danger
                    block
                    @click="addAllowance()"
                    >Approve</vs-button
                  >
                </div>
              </div>
              <div
                v-if="isAllowed"
                style="
                  display: flex;
                  justify-content: flex-end;
                  margin-top: 10px;
                "
              >
                <div
                  style="
                    font-size: 13px;
                    display: flex;
                    align-items: flex-end;
                    justify-content: flex-end;
                    flex-direction: column;
                  "
                >
                  <div
                    style="
                      display: flex;
                      justify-content: flex-end;
                      align-items: center;
                    "
                  >
                    Max:
                    <vs-button
                      shadow
                      size="mini"
                      style="color: dodgerblue"
                      :loading="loadAmount"
                      @click="lotaAll()"
                      >{{ lotaBalance
                      }}<span style="font-size: 11px">LOTA</span></vs-button
                    >
                  </div>
                </div>
              </div>
              <div v-if="isAllowed && insufficientBalance">
                <vs-button disabled gradient danger block>
                  Insufficient balance
                </vs-button>
              </div>
              <div v-if="isAllowed && !insufficientBalance">
                <vs-button
                  gradient
                  danger
                  block
                  :loading="load"
                  @click="stakeOrUnstake('stake')"
                  >Stake</vs-button
                >
              </div>
              <div
                v-if="isAllowed"
                style="
                  display: flex;
                  justify-content: flex-end;
                  margin-top: 10px;
                "
              >
                <div
                  style="font-size: 13px; display: flex; align-items: center"
                >
                  <div class="center">
                    <vs-tooltip>
                      <vs-button flat warn
                        ><i class="bx bx-info-circle"></i
                      ></vs-button>
                      <template #tooltip>
                        Unbonding period of 100000 blocks
                      </template>
                    </vs-tooltip>
                  </div>
                  Max:
                  <vs-button
                    shadow
                    size="mini"
                    style="color: dodgerblue"
                    :loading="loadAmount"
                    @click="lotaAllBonded()"
                    >{{ bondedLota
                    }}<span style="font-size: 11px">LOTA</span></vs-button
                  >
                </div>
              </div>
              <div v-if="isAllowed && insufficientToUnstake">
                <vs-button disabled gradient danger block>
                  Insufficient balance
                </vs-button>
              </div>
              <div v-if="isAllowed && !insufficientToUnstake">
                <vs-button
                  gradient
                  danger
                  block
                  :loading="load"
                  @click="stakeOrUnstake('unstake')"
                  >Unstake</vs-button
                >
              </div>
            </div>
          </div>
        </template>
      </vs-card>
      <vs-card>
        <template #title>
          <h3>Claiming</h3>
          <p>Claim unbonded LOTA and UST rewards</p>
        </template>
        <template #text>
          <div v-if="!connected">
            <vs-button :loading="load" gradient danger block @click="station()">
              Connect Wallet
            </vs-button>
          </div>
          <div v-if="connected">
            <div
              style="
                display: flex;
                justify-content: flex-end;
                margin-top: 10px;
                align-items: center;
              "
            >
              <div style="font-size: 13px; display: flex; align-items: center">
                <div class="center">
                  <vs-tooltip>
                    <vs-button flat warn
                      ><i class="bx bx-info-circle"></i
                    ></vs-button>
                    <template #tooltip> Claim all unbonded LOTA </template>
                  </vs-tooltip>
                </div>
                Available:
                <vs-button shadow size="mini" :loading="loadAmount"
                  >{{ unBondedLota
                  }}<span style="font-size: 11px">LOTA</span></vs-button
                >
              </div>
            </div>
            <div>
              <vs-button
                :loading="load"
                gradient
                danger
                block
                @click="claimUnBonded()"
                >Claim unstake</vs-button
              >
            </div>
            <div
              style="
                display: flex;
                justify-content: flex-end;
                margin-top: 10px;
                align-items: center;
              "
            >
              <div style="font-size: 13px; display: flex; align-items: center">
                <div class="center">
                  <vs-tooltip>
                    <vs-button flat warn
                      ><i class="bx bx-info-circle"></i
                    ></vs-button>
                    <template #tooltip> Claim all your rewards UST </template>
                  </vs-tooltip>
                </div>
                Available:
                <vs-button shadow size="mini" :loading="loadAmount"
                  >{{ reward
                  }}<span style="font-size: 11px">UST</span></vs-button
                >
              </div>
            </div>
            <div>
              <vs-button
                :loading="load"
                gradient
                danger
                block
                @click="claimReward()"
                >Claim rewards</vs-button
              >
            </div>
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
    loadAmount: false,
    activeDialogInfoNoWalletDetected: false,
    releaseBlock: 0,
  }),
  head: {
    title: 'Staking',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content:
          'Stake your LOTA and get up to 20% of jackpots if big winners shared among all LOTA stakers',
      },
    ],
  },
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
      if (this.$store.state.station.allowance / 1000000 < this.value) {
        return false
      }
      return true
    },
    insufficientBalance() {
      if (this.$store.state.station.balanceOf < this.value) {
        return true
      }
      return false
    },
    insufficientToUnstake() {
      if (this.$store.state.station.bonded / 1000000 < this.value) {
        return true
      }
      return false
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
    reward() {
      return numeral(this.$store.state.station.reward / 1000000).format(
        '0,0.00'
      )
    },
    connected() {
      if (this.$store.state.station.senderAddress) {
        return true
      } else {
        return false
      }
    },
    blockInfo() {
      return this.$store.state.station.blockInfo
    },
  },
  created() {
    this.loadBonded()
    this.loadUnBonded()
    this.loadAllowance()
    this.loadReward()
    this.queryBalance()
    this.queryBlockHeight()
  },
  methods: {
    lotaAll() {
      this.value = this.$store.state.station.balanceOf
    },
    lotaAllBonded() {
      this.value = this.$store.state.station.bonded / 1000000
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
    queryBlockHeight() {
      const terraClient = new LCDClient({
        URL: this.$store.state.station.lcdUrl,
        chainID: this.$store.state.station.lcdChainId,
      })
      this.$store.commit(
        'station/update_block_info',
        terraClient.tendermint.blockInfo()
      )
    },
    loadAllowance() {
      const terraClient = new LCDClient({
        URL: this.$store.state.station.lcdUrl,
        chainID: this.$store.state.station.lcdChainId,
      })
      const api = new WasmAPI(terraClient.apiRequester)
      const extension = new Extension()
      extension.connect()
      extension.once(async (w) => {
        const obj = await api.contractQuery(
          this.$store.state.station.lotaCw20ContractAddress,
          {
            allowance: {
              owner: w.address || this.$store.state.station.senderAddress,
              spender: this.$store.state.station.lotaStakingContractAddress,
            },
          }
        )
        this.$store.commit('station/update_allowance', obj.allowance)
        console.log(obj)
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
    loadUnBonded() {
      /* const msg = new MsgExecuteContract(
        'terra1umd70qd4jv686wjrsnk92uxgewca3805dxd46p',
        this.$store.state.station.lotaStakingContractAddress,
        {
          payout_reward: {},
        },
        { uusd: '10000000000' }
      )
      const extensions = new Extension()
      extensions.connect()
      await extensions.post({
        msgs: [msg],
      })
      extensions.on((trxMsg) => {
        console.log(trxMsg)
      }) */
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
              address: w.address || this.$store.state.station.senderAddress,
            },
          }
        )
        this.$store.commit('station/update_un_bonded', obj.un_bonded)
        this.releaseBlock = obj.period || 0
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
              address: w.address || this.$store.state.station.senderAddress,
            },
          }
        )
        this.$store.commit('station/update_bonded', obj.bonded)
        console.log(obj)
      })
    },
    loadReward() {
      const terraClient = new LCDClient({
        URL: this.$store.state.station.lcdUrl,
        chainID: this.$store.state.station.lcdChainId,
      })
      const api = new WasmAPI(terraClient.apiRequester)
      const extension = new Extension()
      extension.connect()
      extension.once(async (w) => {
        try {
          const obj = await api.contractQuery(
            this.$store.state.station.lotaStakingContractAddress,
            {
              get_holder: {
                address: w.address || this.$store.state.station.senderAddress,
              },
            }
          )
          this.$store.commit('station/update_reward', obj.available)
          console.log(obj)
        } catch (e) {
          console.log(e)
        }
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
            this.loadAmount = true
            setTimeout(() => {
              this.loadBonded()
              this.loadUnBonded()
              this.loadAllowance()
              this.loadReward()
              this.queryBalance()
              this.loadAmount = false
            }, 7000)
          }
        })
        switchs = true
      }
    },
    async claimReward() {
      const msg = new MsgExecuteContract(
        this.$store.state.station.senderAddress,
        this.$store.state.station.lotaStakingContractAddress,
        {
          claim_reward: {},
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
              'Reward claim success',
              4000
            )
            this.load = false
            switchs = false
            this.loadAmount = true
            setTimeout(() => {
              this.loadBonded()
              this.loadUnBonded()
              this.loadAllowance()
              this.loadReward()
              this.queryBalance()
              this.loadAmount = false
            }, 7000)
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
              'Unbonded claim success',
              4000
            )
            this.load = false
            switchs = false
            this.loadAmount = true
            setTimeout(() => {
              this.loadBonded()
              this.loadUnBonded()
              this.loadAllowance()
              this.loadReward()
              this.queryBalance()
              this.loadAmount = false
            }, 7000)
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
              cmd === 'stake' ? 'Staking success' : 'Unstaking success',
              4000
            )
            this.load = false
            switchs = false
            this.loadAmount = true
            setTimeout(() => {
              this.loadBonded()
              this.loadUnBonded()
              this.loadAllowance()
              this.loadReward()
              this.queryBalance()
              this.loadAmount = false
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
.flex-staking {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
}
.margin-content {
  margin: 25px;
}
#alert-1 {
  width: 70%;
  margin-bottom: 25px;
  text-align: left;
}
</style>
