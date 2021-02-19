<template>
  <div>
    <header class="content-logos">
      <SideBar />
    </header>
    <body class="container">
      <LoTerraGame />
    </body>
    <footer>
      <div><Rank /></div>
    </footer>
  </div>
</template>

<script>
import SideBar from '~/components/SideBar'
import LoTerraGame from '~/components/LoTerraGame'
import Rank from '~/components/Rank'
// eslint-disable-next-line no-unused-vars

export default {
  components: {
    SideBar,
    LoTerraGame,
    Rank,
  },
  middleware: 'terraConnect',
  mounted() {
    this.loadWallet()
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
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.subtitle a {
  font-weight: 500;
  color: inherit;
}

.content-logos {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 500px;
}
</style>
