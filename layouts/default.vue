<template>
  <div>
    <header class="content-logos">
      <SideBar />
    </header>
    <Nuxt />
    <footer>
      <div><Rank /></div>
    </footer>
  </div>
</template>
<script>
import SideBar from '~/components/SideBar'
import Rank from '~/components/Rank'

export default {
  components: {
    SideBar,
    Rank,
  },
}
</script>
<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 23px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background-color: #ffdee9;
  background-image: linear-gradient(0deg, #ffdee9 0%, #ffffff 100%);
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
body {
  overflow: hidden;
  width: 100%;
  height: 100%;
}
html,
body {
  overflow-y: scroll;
}
input {
  font-size: 24px;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
.content-container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  text-align: center;
  margin-top: 50px;
}

.content-logos {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 500px;
  margin-bottom: 60px;
}
</style>
