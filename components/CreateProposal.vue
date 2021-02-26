<template>
  <div>
    <div style="display: flex; justify-content: center">
      <vs-card>
        <template #title>
          <h3>DAO</h3>
          <p>Create proposal</p>
        </template>
        <template #text>
          <div class="center content-inputs">
            <textarea
              v-model="description"
              style="max-width: 300px; width: 300px; height: 100px"
              placeholder="Proposal description..."
            >
            It was a dark and stormy night...
            </textarea>
            <vs-select
              v-model="proposal"
              placeholder="Select"
              style="margin-bottom: 20px"
              danger
              block
            >
              <vs-option
                label="LotteryEveryBlockTime"
                value="LotteryEveryBlockTime"
              >
                Lottery every block time
              </vs-option>
              <vs-option
                label="DrandWorkerFeePercentage"
                value="DrandWorkerFeePercentage"
              >
                Drand worker fee percentage
              </vs-option>
              <vs-option
                label="JackpotRewardPercentage"
                value="JackpotRewardPercentage"
              >
                Jackpot reward percentage
              </vs-option>
              <vs-option label="AmountToRegister" value="AmountToRegister">
                Amount to register
              </vs-option>
              <vs-option label="PrizePerRank" value="PrizePerRank">
                Prize per rank
              </vs-option>
              <vs-option
                label="HolderFeePercentage"
                value="HolderFeePercentage"
              >
                Holder fee percentage
              </vs-option>
            </vs-select>
          </div>
        </template>
      </vs-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreateProposal',
}
</script>

<style scoped></style>
