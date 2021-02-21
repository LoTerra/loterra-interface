<template>
  <div class="center row">
    <vs-row justify="center">
      <vs-col lg="5" sm="12" xs="12">
        <vs-card>
          <template #title>
            <h3>LOTA</h3>
            <p>LOTA is the token of LoTerra</p>
          </template>
          <template #text>
            <ul>
              <li>Supply: 7 000 000</li>
              <li>price per LOTA: 1 UST</li>
              <li>Hard cap: 7 000 000 $</li>
              <li>Cw-20 token on Terra Luna</li>
            </ul>
            <p>
              Unsold LOTA token will remain locked forever on the smart contract
              after the public sale end.
            </p>
          </template>
        </vs-card>
      </vs-col>
      <vs-col lg="2" sm="12" xs="12"></vs-col>
      <vs-col lg="5" sm="12" xs="12"
        ><vs-card>
          <template #title>
            <h3>Public sale</h3>
            <p>Buy LOTA with UST and contribute to the jackpot Lottery</p>
          </template>
          <template #text>
            When you buy LOTA your UST will go to the jackpot.
          </template>
        </vs-card>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
export default {
  name: 'PublicSale',
}
</script>

<style scoped>
ul {
  margin-top: 20px;
  margin-bottom: 20px;
}
ul li {
  margin: 10px;
  text-align: left;
}
</style>
