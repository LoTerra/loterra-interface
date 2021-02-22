<template>
  <div class="content-container">
    <vs-alert id="alert-1" gradient danger>
      <template #title> LOTA is the token of LoTerra </template>

      <b>LOTA is a DAO token</b>, he give power to vote proposal and manage the
      decentralized LoTerra ecosystem of lottery gaming's also holders can stake
      LOTA and earn 10% of lottery rewards. Public sale ratio is 1UST:1LOTA,
      100% sold UST is auto added to the jackpot and become available to the
      next draw. The current supply of LOTA is 7Mm so hard cap is $7Mm unsold
      will remain on the smart contract forever lowering the circulating supply.
    </vs-alert>

    <vs-card>
      <template #title>
        <h3>Public sale</h3>
        <p style="margin-bottom: 25px">
          Buy LOTA at ratio 1:1 with UST and contribute to the jackpot grow
        </p>
      </template>
      <template #text>
        <div class="center content-inputs">
          <vs-input
            v-model="amount"
            block
            label-placeholder="Amount in UST"
            type="number"
            min="0"
          />
          <p style="font-size: small">only UST is accepted</p>
        </div>
      </template>
      <template #buttons>
        <div style="padding-bottom: 20px">
          <vs-button danger gradient> Buy LOTA </vs-button>
        </div>
      </template>
    </vs-card>
  </div>
</template>

<script>
export default {
  name: 'PublicSale',
  data: () => ({
    amount: '',
  }),
}
</script>

<style scoped>
#alert-1 {
  width: 70%;
  margin-bottom: 25px;
  text-align: left;
}
</style>
