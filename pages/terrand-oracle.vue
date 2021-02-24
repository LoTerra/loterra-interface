<template>
  <div class="content-container">
    <vs-alert id="alert-1" gradient danger>
      <template #title> Terrand oracle </template>
      Become a worker and earn UST from the jackpot rewards every time you add a
      needed round of randomness used by the lottery draw.
    </vs-alert>
    <div style="margin-bottom: 20px">
      <h3>Next round: {{ nextRound }}</h3>
      <a :href="'https://drand.cloudflare.com/public/' + nextRound"
        >Get the next randomness from official Drand</a
      >
    </div>
    <vs-card>
      <template #title>
        <h3>Terrand oracle</h3>
        <p style="margin-bottom: 25px">
          Adding randomness to Terrand smart contract
        </p>
      </template>
      <template #text>
        <div class="center content-inputs">
          <vs-input
            v-model="amount"
            block
            placeholder="Round"
            type="number"
            min="0"
            class="input-drand"
          >
            <template v-if="errorFormat" #message-danger>
              Wrong format
            </template></vs-input
          >

          <vs-input
            v-model="amount"
            block
            placeholder="Signature"
            type="text"
            class="input-drand"
          >
            <template v-if="errorFormat" #message-danger>
              Wrong format
            </template></vs-input
          >

          <vs-input
            v-model="amount"
            block
            placeholder="Previous signature"
            type="text"
            class="input-drand"
          >
            <template v-if="errorFormat" #message-danger>
              Wrong format
            </template></vs-input
          >
        </div>
      </template>
      <template #buttons>
        <div style="padding-bottom: 20px">
          <vs-button v-if="!connected" gradient danger block @click="station()">
            Connect Wallet
          </vs-button>
          <vs-button
            v-if="connected"
            danger
            gradient
            :loading="load"
            @click="buyLota"
          >
            Buy LOTA
          </vs-button>
        </div>
      </template>
    </vs-card>
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
export default {
  name: 'TerrandOracle',
}
</script>

<style scoped>
#alert-1 {
  width: 70%;
  margin-bottom: 25px;
  text-align: left;
}
.input-drand {
  margin-bottom: 20px;
}
</style>
