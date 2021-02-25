<template>
  <div class="content-container">
    <LoTerraGame />
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
