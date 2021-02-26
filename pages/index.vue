<template>
  <div class="content-container">
    <LoTerraGame />
    <div class="row" style="width: 100%; margin-top: 50px">
      <!--<vs-row justify="space-around">
        <vs-col lg="2" sm="12">
          <vs-card>
            <template #title>
              <h3>Winner 6 symbols #rank1</h3>
              <p></p>
            </template>
            <template #text>
              <div style="display: flex; flex-direction: column">
                <div>terra1umd70q...dxd46p</div>
                <div>terra1umd70q...dxd46p</div>
              </div>
            </template>
          </vs-card>
        </vs-col>
        <vs-col lg="2" sm="12">
          <vs-card>
            <template #title>
              <h3>Winner 5 symbols #rank2</h3>
              <p></p>
            </template>
            <template #text>
              <div style="display: flex; flex-direction: column">
                <div>terra1umd70q...dxd46p</div>
                <div>terra1umd70q...dxd46p</div>
              </div>
            </template>
          </vs-card>
        </vs-col>
        <vs-col lg="2" sm="12">
          <vs-card>
            <template #title>
              <h3>Winner 4 symbols #rank3</h3>
              <p></p>
            </template>
            <template #text>
              <div style="display: flex; flex-direction: column">
                <div>terra1umd70q...dxd46p</div>
                <div>terra1umd70q...dxd46p</div>
              </div>
            </template>
          </vs-card>
        </vs-col>
        <vs-col lg="2" sm="12">
          <vs-card>
            <template #title>
              <h3>Winner 3 symbols #rank4</h3>
              <p></p>
            </template>
            <template #text>
              <div style="display: flex; flex-direction: column">
                <div>terra1umd70q...dxd46p</div>
                <div>terra1umd70q...dxd46p</div>
              </div>
            </template>
          </vs-card>
        </vs-col>
      </vs-row>-->
    </div>
  </div>
</template>

<script>
import { Extension } from '@terra-money/terra.js'
import LoTerraGame from '~/components/LoTerraGame'
// eslint-disable-next-line no-unused-vars

export default {
  components: {
    LoTerraGame,
  },
  // middleware: 'terraConnect',
  mounted() {
    // eslint-disable-next-line no-unused-vars
    const extension = new Extension()
    extension.connect()
    console.log(extension.isAvailable)
  },
  methods: {
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
</style>
