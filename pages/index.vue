<template>
  <div class="content-container">
    <LoTerraGame />
    <div
      style="
        margin-top: 50px;
        padding: 25px;
        background-color: white;
        margin: 25px;
        border-radius: 50px;
      "
    >
      <div>
        <h3 class="jackpot-winner-reward">Last jackpot rewards</h3>
        <p>Potential rewards</p>
        <div>
          <span class="jackpot-winner-reward">{{ jackpotFormat }}UST</span>
        </div>
        <div>
          <h3 class="jackpot-winner-reward">Prizes</h3>
          <div>
            #Rank1 6 symbols:
            <span class="jackpot-winner-reward">{{ prizeRank1 }}UST</span>
          </div>
          <div#Rank2 5 symbols:
            <span class="jackpot-winner-reward">{{ prizeRank2 }}UST</span>
          </div>
          <div>
            #Rank3 4 symbols:
            <span class="jackpot-winner-reward">{{ prizeRank3 }}UST</span>
          </div>
          <div>
            #Rank4 3 symbols:
            <span class="jackpot-winner-reward">{{ prizeRank4 }}UST</span>
          </div>
        </div>
      </div>
      <h3 class="jackpot-winner-reward">Last winners</h3>
      <div style="display: flex">
        <div v-for="(item, index) in allWinners.winner" :key="index">
          <div v-if="item.rank > 0 && item.rank < 5">
            <div
              style="
                display: flex;
                justify-content: center;
                align-items: center;
              "
            >
              <div class="jackpot-winner-reward">#Rank{{ item.rank }}</div>
              <div class="jackpot-winner-reward">
                {{ item.winners.length }}
                {{ item.winners.length == 1 ? 'winner' : 'winners' }}
              </div>
              <span>🥳</span>
            </div>
          </div>
        </div>
      </div>
    </div>
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
  }),
  computed: {
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
  created() {
    this.loadTicketPrice()
    this.loadWinners()
  },
  // middleware: 'terraConnect',
  methods: {
    loadTicketPrice() {
      const client = new LCDClient({
        URL: this.$store.state.station.lcdUrl,
        chainID: this.$store.state.station.lcdChainId,
      })
      const api = new WasmAPI(client.apiRequester)
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
      const client = new LCDClient({
        URL: this.$store.state.station.lcdUrl,
        chainID: this.$store.state.station.lcdChainId,
      })
      const api = new WasmAPI(client.apiRequester)
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
