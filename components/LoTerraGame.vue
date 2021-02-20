<template>
  <div>
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
          <vs-button
            v-if="connected"
            :loading="load"
            gradient
            danger
            block
            @click="buyCombination()"
          >
            Buy ticket
          </vs-button>
          <vs-button v-if="!connected" gradient danger block @click="station()">
            Connect Wallet
          </vs-button>
        </div>
      </template>
    </vs-card>
  </div>
</template>

<script>
import {
  LCDClient,
  WasmAPI,
  MsgExecuteContract,
  Extension,
} from '@terra-money/terra.js'
export default {
  data: () => ({
    combination: '',
    load: false,
  }),
  computed: {
    connected() {
      if (this.$store.state.station.senderAddress) {
        return true
      } else {
        return false
      }
    },
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
      if (this.combination.length !== 6) {
        this.openNotification('Error', 'You need to register 6 symbols')
        return
      }
      const terra = new LCDClient({
        URL: this.$store.state.station.lcdUrl,
        chainID: this.$store.state.station.lcdChainId,
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
        extension.on((msgss) => {
          console.log(msgss)
          this.load = !this.load
        })
      }
      /* const msgg = new MsgSend(
        'terra1ddr7runxu5qqcawqjagkn6sa7kh7l940gq5cld',
        'terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v',
        { uusd: 1000 }
      ) */
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
