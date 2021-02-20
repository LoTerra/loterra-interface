<template>
  <vs-card>
    <template #title>
      <h3>Enter draw</h3>
      <p>Register your combination for next lottery draw.</p>
    </template>
    <template #text>
      <div class="center content-inputs mtop-50">
        <vs-row>
          <vs-col w="10"></vs-col>
          <vs-col w="2">
            <vs-tooltip warn left>
              <vs-button warn flat circle icon>
                <i class="bx bx-info-circle"></i>
              </vs-button>
              <template #tooltip> last 6 symbols of hash type </template>
            </vs-tooltip>
          </vs-col>
        </vs-row>
        <vs-input
          v-model="combination"
          type="text"
          shadow
          danger
          icon-after
          label-placeholder="Combination"
          maxlength="6"
          disabled
        >
          <template #icon>
            <i class="bx bx-hash"></i>
          </template>
          <template v-if="1 == 2" #message-danger> Required </template>
        </vs-input>
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
        <vs-button gradient danger @click="active = 0"> Buy ticket </vs-button>
      </div>
    </template>
  </vs-card>
</template>

<script>
import { LCDClient, WasmAPI, MsgExecuteContract } from '@terra-money/terra.js'
export default {
  data: () => ({
    combination: '',
  }),
  mounted() {
    this.openNotification()
  },
  methods: {
    openNotification(title, text) {
      this.$vs.notification({
        position: 'bottom-center',
        title,
        text,
      })
    },
    addCombination(symbol) {
      if (this.combination.length < 6) this.combination += symbol
    },
    removeCombination() {
      this.combination = this.combination.slice(0, -1)
    },
    async buyCombination() {
      const terra = new LCDClient({
        URL: 'https://tequila-lcd.terra.dev',
        chainID: 'tequila-0004',
      })
      const api = new WasmAPI(terra.apiRequester)
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
      const msg_2 = new MsgExecuteContract(
        'terra1umd70qd4jv686wjrsnk92uxgewca3805dxd46p',
        'terra16nc2sxj0rgdm0utpe8gw8dn0eef4va4y9txnyt',
        {
          proposal: {
            description: 'testing all this things',
            proposal: 'LotteryEveryBlockTime',
            amount: '1200',
          },
        },
        { uusd: 1000 }
      )
      // const coin = new Coin('uusd', '1000000')
      // const coins = new Coins()
      // coins.add(coin)
      /* const msgg = new MsgSend(
        'terra1ddr7runxu5qqcawqjagkn6sa7kh7l940gq5cld',
        'terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v',
        { uusd: 1000 }
      ) */
      // eslint-disable-next-line no-unused-vars
      const msg = await extension.post({
        // eslint-disable-next-line camelcase
        msgs: [msg_2],
      })
      extension.on((msgss) => {
        console.log(msgss)
      })
    },
  },
}
</script>

<style scoped>
.mtop-50 {
  margin-top: 50px;
}
.p-20 {
  padding: 20px;
}
.pb-15 {
  padding-bottom: 15px;
}
</style>
