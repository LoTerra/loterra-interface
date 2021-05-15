<template>
  <div class="content-container">
    <LoTerraGame />
    <vs-card style="margin-bottom: 50px">
      <template #title>
        <h3>Combination</h3>
        <p>All your combination played for this lottery</p>
      </template>
      <template #text>
        <div v-for="(combo, key) in senderCombinations.combination" :key="key">
          {{ combo }}
        </div>
      </template>
    </vs-card>
    <vs-card style="margin-bottom: 50px">
      <template #title>
        <h3 class="jackpot-winner-reward">Latest jackpot rewards</h3>
        <p>Potential rewards</p>
        <div>
          <span class="jackpot-winner-reward"
            >{{ jackpotFormat }}<span style="font-size: 25px">UST</span></span
          >
        </div>
      </template>
      <template #text>
        <vs-table>
          <template #thead>
            <vs-tr>
              <vs-th> #Ranks </vs-th>
              <vs-th> Symbols </vs-th>
              <vs-th> Prizes </vs-th>
            </vs-tr>
          </template>
          <template #tbody>
            <vs-tr>
              <vs-td> #1 </vs-td>
              <vs-td> 6 </vs-td>
              <vs-td>
                <span class="jackpot-winner-reward"
                  >{{ prizeRank1
                  }}<span style="font-size: 25px">UST</span></span
                >
              </vs-td>
            </vs-tr>
            <vs-tr>
              <vs-td> #2 </vs-td>
              <vs-td> 5 </vs-td>
              <vs-td>
                <span class="jackpot-winner-reward"
                  >{{ prizeRank2
                  }}<span style="font-size: 25px">UST</span></span
                >
              </vs-td>
            </vs-tr>
            <vs-tr>
              <vs-td> #3 </vs-td>
              <vs-td> 4 </vs-td>
              <vs-td>
                <span class="jackpot-winner-reward"
                  >{{ prizeRank3
                  }}<span style="font-size: 25px">UST</span></span
                >
              </vs-td>
            </vs-tr>
            <vs-tr>
              <vs-td> #4 </vs-td>
              <vs-td> 3 </vs-td>
              <vs-td>
                <span class="jackpot-winner-reward"
                  >{{ prizeRank4
                  }}<span style="font-size: 25px">UST</span></span
                >
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
        <!--<h3 class="jackpot-winner-reward">Latest winners</h3>
        <div
          v-if="allWinners.length == 0"
          style="display: flex; justify-content: center"
        ></div>
        <vs-table>
          <template #thead>
            <vs-tr>
              <vs-th> #Ranks </vs-th>
              <vs-th> Numbers 🥳</vs-th>
            </vs-tr>
          </template>
          <template #tbody>
            <vs-tr v-for="(item, index) in allWinners.winner" :key="index">
              <vs-th v-if="item.rank > 0 && item.rank < 5">
                {{ item.rank }}
              </vs-th>
              <vs-th v-if="item.rank > 0 && item.rank < 5">
                {{ item.winners.length }}
              </vs-th>
            </vs-tr>
          </template>
          <template #notFound> No winners </template>
        </vs-table>-->
      </template>
    </vs-card>
  </div>
</template>

<script>
import { LCDClient, WasmAPI } from '@terra-money/terra.js'
import numeral from 'numeral'
import LoTerraGame from '~/components/LoTerraGame'

export default {
  components: {
    LoTerraGame,
  },
  data: () => ({
    allWinners: [],
    jackpotTotalReward: '0',
    prizePerRank: [],
    terraClient: '',
    senderCombinations: [],
  }),
  computed: {
    connected() {
      if (this.$store.state.station.senderAddress) {
        return true
      } else {
        return false
      }
    },
    jackpotFormat() {
      return numeral(this.jackpotTotalReward).format('0,0.00')
    },
    prizeRank1() {
      return numeral(
        (this.prizePerRank[0] * parseInt(this.jackpotTotalReward)) / 100
      ).format('0,0.00')
    },
    prizeRank2() {
      return numeral(
        (this.prizePerRank[1] * parseInt(this.jackpotTotalReward)) / 100
      ).format('0,0.00')
    },
    prizeRank3() {
      return numeral(
        (this.prizePerRank[2] * parseInt(this.jackpotTotalReward)) / 100
      ).format('0,0.00')
    },
    prizeRank4() {
      return numeral(
        (this.prizePerRank[3] * parseInt(this.jackpotTotalReward)) / 100
      ).format('0,0.00')
    },
  },
  watch: {
    connected() {
      this.loadTicket()
    },
  },
  created() {
    this.terraClient = new LCDClient({
      URL: this.$store.state.station.lcdUrl,
      chainID: this.$store.state.station.lcdChainId,
    })
    this.loadTicketPrice()
    this.loadWinners()
    this.loadAllCombination()
  },
  // middleware: 'terraConnect',
  methods: {
    async loadTicket() {
      const api = new WasmAPI(this.terraClient.apiRequester)
      const contractConfigInfo = await api.contractQuery(
        this.$store.state.station.loterraLotteryContractAddress,
        {
          config: {},
        }
      )

      const contractCombinationInfo = await api.contractQuery(
        this.$store.state.station.loterraLotteryContractAddress,
        {
          combination: {
            lottery_id: contractConfigInfo.lottery_counter,
            address: this.$store.state.station.senderAddress,
          },
        }
      )

      this.senderCombinations = contractCombinationInfo
    },
    loadTicketPrice() {
      const api = new WasmAPI(this.terraClient.apiRequester)
      api
        .contractQuery(
          this.$store.state.station.loterraLotteryContractAddress,
          {
            config: {},
          }
        )
        .then((config) => {
          console.log(config)
          this.$store.commit(
            'station/update_ticket_price',
            config.price_per_ticket_to_register
          )
          this.jackpotTotalReward = parseInt(config.jackpot_reward) / 1000000
          this.prizePerRank = config.prize_rank_winner_percentage
        })
    },
    loadWinners() {
      const api = new WasmAPI(this.terraClient.apiRequester)
      api
        .contractQuery(
          this.$store.state.station.loterraLotteryContractAddress,
          {
            winner: {},
          }
        )
        .then((winners) => {
          this.allWinners = winners
        })
    },
    loadAllCombination() {},
    loadWallet: () => {
      // eslint-disable-next-line no-unused-vars
      /*
      let x = terrax.apiRequester
      const f = await terrax.auth.accountInfo(
        'terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v'
      )

      console.log(f) */
    },
  },
}
</script>

<style>
.subtitle a {
  font-weight: 500;
  color: inherit;
}
.jackpot-winner-reward {
  background: linear-gradient(to right, rgb(242, 19, 93), #5b3cc4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 1.5rem;
  padding: 10px;
}
</style>
