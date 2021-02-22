<template>
  <div
    style="
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    "
  >
    <vs-alert
      id="alert-1"
      v-model="active"
      :progress="progress"
      gradient
      danger
    >
      <template #title> LoTerra </template>

      LoTerra enable decentralized lottery on Terra Luna blockchain, do not
      trust read the code. Smart contract address:
      <b>{{ contractAddr }}</b>
    </vs-alert>
    <div class="jackpot-title">Jackpot</div>
    <div class="jackpot">{{ contractBalance }}<span>UST</span></div>
    <vs-card>
      <template #title>
        <h3>Enter draw</h3>
        <p>Register your combination for next lottery draw.</p>
      </template>
      <template #text>
        <div class="center content-inputs mtop-50">
          <h2
            style="
              margin-bottom: 50px;
              border: 0.1px black solid;
              border-radius: 20px;
              padding: 5px;
            "
            warn
          >
            {{ combination ? combination : 'Combination' }}
          </h2>
          <vs-row>
            <vs-col w="2">
              <vs-button border flat danger @click="addCombination('0')">
                0
              </vs-button>
            </vs-col>
            <vs-col w="2">
              <vs-button border flat danger @click="addCombination('1')">
                1
              </vs-button>
            </vs-col>
            <vs-col w="2">
              <vs-button border flat danger @click="addCombination('2')">
                2
              </vs-button>
            </vs-col>
            <vs-col w="2">
              <vs-button border flat danger @click="addCombination('3')">
                3
              </vs-button>
            </vs-col>
            <vs-col w="2">
              <vs-button border flat danger @click="addCombination('4')">
                4
              </vs-button>
            </vs-col>
            <vs-col w="2">
              <vs-button border flat danger @click="addCombination('5')">
                5
              </vs-button>
            </vs-col>
            <vs-col w="2">
              <vs-button border flat danger @click="addCombination('6')">
                6
              </vs-button>
            </vs-col>
            <vs-col w="2">
              <vs-button border flat danger @click="addCombination('7')">
                7
              </vs-button>
            </vs-col>
            <vs-col w="2">
              <vs-button border flat danger @click="addCombination('8')">
                8
              </vs-button>
            </vs-col>
            <vs-col w="2">
              <vs-button border flat danger @click="addCombination('9')">
                9
              </vs-button>
            </vs-col>
            <vs-col w="2">
              <vs-button border flat danger @click="addCombination('a')">
                a
              </vs-button>
            </vs-col>
            <vs-col w="2">
              <vs-button border flat danger @click="addCombination('b')">
                b
              </vs-button>
            </vs-col>
            <vs-col w="2">
              <vs-button border flat danger @click="addCombination('c')">
                c
              </vs-button>
            </vs-col>
            <vs-col w="2">
              <vs-button border flat danger @click="addCombination('d')">
                d
              </vs-button>
            </vs-col>
            <vs-col w="2">
              <vs-button border flat danger @click="addCombination('e')">
                e
              </vs-button>
            </vs-col>
            <vs-col w="2">
              <vs-button border flat danger @click="addCombination('f')">
                f
              </vs-button>
            </vs-col>
            <vs-col w="2">
              <vs-button border flat danger @click="removeCombination">
                <i class="bx bxs-tag-x"></i>
              </vs-button>
            </vs-col>
          </vs-row>
        </div>
      </template>
      <template #buttons>
        <div class="p-20">
          <vs-button
            v-if="connected"
            :loading="load"
            gradient
            danger
            block
            @click="buyCombination()"
          >
            Buy ticket 🍀
          </vs-button>
          <vs-button v-if="!connected" gradient danger block @click="station()">
            Connect Wallet
          </vs-button>
        </div>
      </template>
    </vs-card>
    <!--<vs-alert id="alert-1" gradient danger>
      <template #title> LoTerra </template>

      LoTerra enable decentralized lottery on Terra Luna blockchain, do not
      trust read the code smart contract address:
      <b>{{ contractAddr }}</b>
    </vs-alert>-->
    <!--    <p style="margin-top: 25px; position: absolute; bottom: 0">
      Contract address: {{ contractAddr }}
    </p>-->
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
  MsgExecuteContract,
  Extension,
  BankAPI,
} from '@terra-money/terra.js'

import numeral from 'numeral'
export default {
  data: () => ({
    combination: '',
    load: false,
    activeDialogInfoNoWalletDetected: false,
    active: false,
    time: 10000,
    progress: 0,
    terraClient: '',
    contractBalance: '',
  }),
  computed: {
    connected() {
      if (this.$store.state.station.senderAddress) {
        return true
      } else {
        return false
      }
    },
    contractAddr() {
      return this.$store.state.station.loterraLotteryContractAddress
    },
  },
  watch: {
    active(val) {
      if (val) {
        const interval = setInterval(() => {
          this.progress++
        }, this.time / 100)

        setTimeout(() => {
          this.active = false
          clearInterval(interval)
          this.progress = 0
        }, this.time)
      }
    },
  },
  created() {
    this.terraClient = new LCDClient({
      URL: this.$store.state.station.lcdUrl,
      chainID: this.$store.state.station.lcdChainId,
    })
  },
  mounted() {
    this.$vs.notification({
      position: 'bottom-right',
      title: 'Lottery DAO',
      text: `Buy a combination for 1UST and get a chance to win the jackpot! 🍀.`,
      duration: 8000,
      activeInfo: true,
    })
    this.active = true
    this.contactBalance()
  },
  methods: {
    async contactBalance() {
      const bank = new BankAPI(this.terraClient.apiRequester)
      const allBalance = await bank.balance(
        'terra1umd70qd4jv686wjrsnk92uxgewca3805dxd46p'
      )
      const ustBalance = allBalance.get('uusd').toData()
      this.contractBalance = numeral(ustBalance.amount / 1000000).format(
        '0,0.00'
      )
      // bank.balance()
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
    openNotification(title, text, seconds) {
      this.$vs.notification({
        position: 'bottom-right',
        title,
        text,
        duration: seconds,
      })
    },
    addCombination(symbol) {
      if (this.combination.length < 6) this.combination += symbol
    },
    removeCombination() {
      this.combination = this.combination.slice(0, -1)
    },
    async buyCombination() {
      if (this.combination.length !== 6) {
        this.openNotification('Error', 'You need to register 6 symbols', 4000)
        return
      }
      const api = new WasmAPI(this.terraClient.apiRequester)
      console.log(
        await api.contractInfo('terra16nc2sxj0rgdm0utpe8gw8dn0eef4va4y9txnyt')
      )
      console.log(
        await api.contractQuery(
          'terra16nc2sxj0rgdm0utpe8gw8dn0eef4va4y9txnyt',
          {
            config: {},
          }
        )
      )
      // eslint-disable-next-line camelcase
      const msg = new MsgExecuteContract(
        this.$store.state.station.senderAddress,
        this.$store.state.station.loterraLotteryContractAddress,
        {
          register: {
            combination: this.combination,
          },
        },
        { uusd: 1000000 }
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
            this.openNotification('Transaction success', 'Good luck! 🍀', 4000)
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
.mtop-50 {
  margin-top: 50px;
}
.p-20 {
  padding: 20px;
}
.pb-15 {
  padding-bottom: 15px;
}
.jackpot {
  background: linear-gradient(to right, rgb(242, 19, 93), #5b3cc4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 3rem;
  padding-bottom: 30px;
}
.jackpot span {
  font-size: 2rem;
}
.jackpot-title {
  background: linear-gradient(to right, rgb(242, 19, 93), #5b3cc4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 2rem;
  padding-bottom: 10px;
}
</style>
