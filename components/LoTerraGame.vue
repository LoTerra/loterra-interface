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

      LoTerra enables decentralized lottery on Terra Luna blockchain. Smart
      contract address:
      <b>{{ contractAddr }}</b
      >.
    </vs-alert>
    <div>
      <img
        src="jackpot.png"
        alt="jackpot img"
        style="height: auto; max-width: 1100px; width: 100%"
      />
    </div>

    <div class="jackpot">{{ jackpotTotal }}<span>UST</span></div>
    <div
      style="
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: flex-start;
      "
    >
      <a class="mobile" href="https://mobile.loterra.io/">
        <i class="bx bx-mobile-alt"></i>
        Terra Station Mobile
      </a>
    </div>
    <div
      style="
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: flex-start;
      "
    >
      <div style="margin-bottom: 50px">
        <vs-card style="margin: 0 auto">
          <template #title>
            <h3>Enter draw</h3>
            <p>Register your combination for next lottery draw.</p>
          </template>
          <template #text>
            <div class="center content-inputs mtop-50">
              <p>Latest winning combination</p>
              <div class="jackpot-timer">
                {{
                  latestWinningCombination ? latestWinningCombination : '...'
                }}
              </div>
              <p>Time left before next draw:</p>
              <p class="jackpot-timer">
                {{
                  lotteryTimestampDraw ? lotteryTimestampDraw : 'On sale soon!'
                }}
              </p>
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
                <vs-col w="4">
                  <vs-button
                    border
                    flat
                    danger
                    @click="generateRandomCombination()"
                  >
                    Random
                  </vs-button>
                </vs-col>
                <vs-col v-if="!connected" w="7"> </vs-col>
                <vs-col v-if="connected" w="7">
                  <vs-button border flat danger @click="randomToBag(10)">
                    Random x10
                  </vs-button>
                </vs-col>
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
            <div style="font-size: small; font-weight: normal">
              We recommend to not buy more than 200 tickets per transactions
              (gas limit)
            </div>
            <div class="p-20">
              <vs-button
                v-if="connected"
                :loading="load"
                gradient
                danger
                block
                animation-type="scale"
                @click="addToBasket()"
              >
                Add to bag
                <template #animate>
                  <i class="bx bxs-shopping-bag"></i>
                </template>
              </vs-button>
              <!--<vs-button
                v-if="connected"
                :loading="load"
                danger
                block
                gradient
                @click="claim()"
                >Claim jackpot rewards</vs-button
              >
              <vs-button
                v-if="connected"
                :loading="load"
                danger
                block
                gradient
                @click="collect()"
                >Collect jackpot rewards 🤑</vs-button
              >-->
              <vs-button
                v-if="!connected"
                gradient
                danger
                block
                @click="station()"
              >
                Connect Wallet
              </vs-button>
            </div>
          </template>
        </vs-card>
      </div>
      <div
        v-if="basket.length > 0"
        class="basket"
        style="display: flex; justify-content: center; margin-bottom: 50px"
      >
        <vs-card width="400px">
          <template #title>
            <h3>Bag</h3>
          </template>
          <template #text>
            <div style="max-height: 500px; padding: 20px; overflow-x: hidden">
              <div
                v-for="(item, index) in basket"
                :key="index"
                class="center content-inputs"
                style="
                  margin-top: 5px;
                  margin-bottom: 5px;
                  display: flex;
                  justify-content: space-between;
                "
              >
                <div class="jackpot-timer" style="margin-right: 25px">
                  {{ item }}
                </div>
                <div>
                  <vs-button
                    gradient
                    danger
                    block
                    @click="individualEmptyBasket(index)"
                  >
                    <i class="bx bxs-trash"></i>
                  </vs-button>
                </div>
              </div>
            </div>

            <vs-button
              v-if="connected && basket.length > 0"
              :loading="load"
              gradient
              danger
              block
              @click="buyCombination()"
            >
              Buy ticket 🍀
            </vs-button>
            <p>Total: {{ basketTotal }}UST</p>
            <vs-button
              v-if="!connected"
              :loading="load"
              gradient
              danger
              block
              @click="station()"
            >
              Connect Wallet
            </vs-button>
          </template>
        </vs-card>
      </div>
    </div>
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
    <div class="balance-title">Available balance for lottery</div>
    <div class="balance">{{ contractBalance }}<span>UST</span></div>
  </div>
</template>

<script>
import {
  LCDClient,
  WasmAPI,
  MsgExecuteContract,
  Extension,
  BankAPI,
  StdFee,
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
    contractBalanceInUusd: 0,
    contractBalance: '',
    countDown: 0,
    lotteryTimestampDraw: 0,
    timeLeftDraw: 0,
    claimAddr: '',
    latestWinningCombination: '',
    basket: [],
    pricePerTicket: '',
    jackpotAlloc: 0,
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
      return this.$store.state.station.loterraLotteryContractAddressV2
    },
    basketTotal() {
      const pricePerTicket = this.$store.state.station.ticketPrice / 1000000
      return numeral(this.basket.length * pricePerTicket).format('0,0.00')
    },
    jackpotTotal() {
      const pot = (this.contractBalanceInUusd * this.jackpotAlloc) / 100
      return numeral(pot / 1000000).format('0,0.00')
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
    this.terraClient = new LCDClient({
      URL: this.$store.state.station.lcdUrl,
      chainID: this.$store.state.station.lcdChainId,
    })
    this.getTimeDraw()
    this.contactBalance()
    this.contractInfo()
  },
  mounted() {
    this.active = true
  },
  methods: {
    addToBasket() {
      if (this.combination.length !== 6) {
        this.openNotification('Error', 'You need to register 6 symbols', 4000)
        return
      }
      this.basket.push(this.combination)
      this.combination = ''
    },
    individualEmptyBasket(index) {
      this.basket.splice(index, 1)
    },
    generateRandomCombination() {
      const combination = [
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
      ]
      let randomCombination = ''
      for (let x = 0; x < 6; x++) {
        const random = Math.floor(Math.random() * combination.length)
        randomCombination += combination[random]
      }
      this.combination = randomCombination
    },
    randomToBag(number) {
      for (let x = 0; x < number; x++) {
        this.generateRandomCombination()
        this.addToBasket()
      }
    },
    async claim() {
      const msg = new MsgExecuteContract(
        this.$store.state.station.senderAddress,
        this.$store.state.station.loterraLotteryContractAddressV2,
        {
          claim: {},
        }
      )
      const extension = new Extension()
      extension.connect()
      const obj = new StdFee(400_000, { uusd: 60000 })
      if (!extension.isAvailable) {
        this.activeDialogInfoNoWalletDetected = !this
          .activeDialogInfoNoWalletDetected
      } else {
        await extension.post({
          msgs: [msg],
          fee: obj,
          // gasPrices: obj.gasPrices(),
          // gasAdjustment: 2,
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
              'Reward claimed 🥳',
              4000
            )
            this.load = false
            switchs = false
          }
        })
        switchs = true
      }
    },
    async collect() {
      const msg = new MsgExecuteContract(
        this.$store.state.station.senderAddress,
        this.$store.state.station.loterraLotteryContractAddressV2,
        {
          collect: {},
        }
      )
      const extension = new Extension()
      extension.connect()
      // const obj = new StdFee(1_000_000, { uusd: 200000 })
      const obj = new StdFee(400_000, { uusd: 60000 })
      if (!extension.isAvailable) {
        this.activeDialogInfoNoWalletDetected = !this
          .activeDialogInfoNoWalletDetected
      } else {
        await extension.post({
          msgs: [msg],
          fee: obj,
          // gasPrices: obj.gasPrices(),
          // gasAdjustment: 2,
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
              'Reward collected 🥳',
              4000
            )
            this.load = false
            switchs = false
          }
        })
        switchs = true
      }
    },
    roundDown(num) {
      const full = num.toString()
      const reg = /([\d]+)/i
      const res = reg.exec(full)
      return res[1]
    },
    async getTimeDraw() {
      const terraClient = new LCDClient({
        URL: this.$store.state.station.lcdUrl,
        chainID: this.$store.state.station.lcdChainId,
      })
      const api = new WasmAPI(terraClient.apiRequester)
      const objBalance = await api.contractQuery(
        // this.$store.state.station.loterraLotteryContractAddressV2,
        'terra14mevcmeqt0n4myggt7c56l5fl0xw2hwa2mhlg0',
        {
          config: {},
        }
      )
      this.timeLeftDraw =
        new Date(objBalance.block_time_play * 1000) - Date.now()
      this.jackpotAlloc = objBalance.jackpot_percentage_reward
      console.log(this.timeLeftDraw)
      this.lotteryDraw()
    },
    lotteryDraw() {
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
    async contactBalance() {
      const bank = new BankAPI(this.terraClient.apiRequester)
      const allBalance = await bank.balance(
        // this.$store.state.station.loterraLotteryContractAddressV2
        'terra14mevcmeqt0n4myggt7c56l5fl0xw2hwa2mhlg0'
      )
      const ustBalance = allBalance.get('uusd').toData()
      this.contractBalanceInUusd = ustBalance.amount
      this.contractBalance = numeral(ustBalance.amount / 1000000).format(
        '0,0.00'
      )
      // bank.balance()
    },
    async contractInfo() {
      // eslint-disable-next-line camelcase
      const api = new WasmAPI(this.terraClient.apiRequester)
      const contractInfo = await api.contractQuery(
        this.$store.state.station.loterraLotteryContractAddressV2,
        {
          config: {},
        }
      )
      const lastCombination = await api.contractQuery(
        this.$store.state.station.loterraLotteryContractAddressV2,
        {
          winning_combination: { lottery_id: contractInfo.lottery_counter - 1 },
        }
      )
      this.latestWinningCombination = lastCombination

      this.pricePerTicket = contractInfo.price_per_ticket_to_register / 1000000
      const amountMinMax = numeral(this.pricePerTicket).format('0,0.00')
      this.$vs.notification({
        position: 'bottom-right',
        title: 'Lottery DAO',
        text: `Buy a combination for ${amountMinMax}UST and get a chance to win the jackpot! 🍀.`,
        duration: 8000,
        activeInfo: true,
      })
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
      if (this.basket.length <= 0) {
        this.openNotification(
          'Error',
          'You need to add some combination to your basket',
          4000
        )
        return
      }
      const extension = new Extension()
      extension.connect()
      const msg = new MsgExecuteContract(
        this.$store.state.station.senderAddress,
        // this.$store.state.station.loterraLotteryContractAddressV2,
        'terra14mevcmeqt0n4myggt7c56l5fl0xw2hwa2mhlg0',
        {
          register: {
            combination: this.basket,
          },
        },
        { uusd: this.basket.length * this.$store.state.station.ticketPrice }
      )
      // eslint-disable-next-line no-unused-vars
      // const obj = new StdFee(1_000_000, { uusd: 200000 })
      // const obj = new StdFee(6_000_000, { uusd: 1500000 })
      const addToGas = 5000 * this.basket.length
      const obj = new StdFee(600_000, { uusd: 90000 + addToGas })

      if (!extension.isAvailable) {
        this.activeDialogInfoNoWalletDetected = !this
          .activeDialogInfoNoWalletDetected
      } else {
        await extension.post({
          msgs: [msg],
          fee: obj,
          // gasPrices: obj.gasPrices(),
          // gasAdjustment: 1,
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
            this.combination = ''
            this.basket = []
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

.jackpot span {
  font-size: 1rem;
}

.jackpot-timer {
  background: linear-gradient(to right, rgb(242, 19, 93), #5b3cc4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 1.5rem;
  padding-bottom: 10px;
}
.jackpot-title {
  background: linear-gradient(to right, rgb(242, 19, 93), #5b3cc4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 1.5rem;
  padding-bottom: 10px;
}
.jackpot {
  background: linear-gradient(to right, rgb(242, 19, 93), #5b3cc4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 2.4rem;
  font-weight: bold;
  margin-top: -70px;
  padding-bottom: 30px;
}
.mobile {
  display: block;
}

@media (min-width: 667px) {
  .basket {
    margin-left: 20px;
  }
  .balance-title {
    background: linear-gradient(to right, rgb(242, 19, 93), #5b3cc4 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 1rem;
    padding-bottom: 10px;
  }
  .balance {
    background: linear-gradient(to right, rgb(242, 19, 93), #5b3cc4 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 1.3rem;
    padding-bottom: 30px;
  }
  .jackpot-title {
    background: linear-gradient(to right, rgb(242, 19, 93), #5b3cc4 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 2rem;
    padding-bottom: 10px;
  }
  .jackpot {
    background: linear-gradient(to right, rgb(242, 19, 93), #5b3cc4 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 5rem;
    padding-bottom: 30px;
    margin-top: -180px;
  }
  .jackpot span {
    font-size: 2rem;
  }
  .public-sale-title {
    border: transparent;
    color: #5b3cc4;
    font-size: 3rem;
    padding-bottom: 10px;
    background: transparent;
    text-decoration: none;
  }
  .mobile {
    border: transparent;
    color: rgb(23, 201, 100);
    font-size: 2rem;
    padding-bottom: 10px;
    background: transparent;
    text-decoration: none;
  }
}
</style>
