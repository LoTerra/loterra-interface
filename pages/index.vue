<template>
  <div>
    <header class="content-logos">
      <SideBar />
    </header>
    <body class="container">
      <div class="center">
        <LoTerraGame />
      </div>
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
export default {
  components: {
    SideBar,
    LoTerraGame,
    Rank,
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
