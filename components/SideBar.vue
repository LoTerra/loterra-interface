<template>
  <div class="hidden">
    <vs-navbar v-model="active" shadow center-collapsed>
      <template #left>
        <vs-button flat danger icon @click="activeSidebar = !activeSidebar">
          <i class="bx bx-menu"></i>
        </vs-button>
      </template>
      <!--      <vs-navbar-item :active="active == 'guide'" id="guide">
        Guide
      </vs-navbar-item>-->
      <template #right>
        <vs-button flat danger @click="activeDialog = !activeDialog">
          LOTA
        </vs-button>
        <vs-button gradient danger @click="station()"
          >Connect to a wallet</vs-button
        >
        <vs-switch v-model="active5" danger>
          <template #circle>
            <i v-if="!active5" class="bx bxs-moon"></i>
            <i v-else class="bx bxs-sun"></i>
          </template>
        </vs-switch>
      </template>
    </vs-navbar>
    <vs-sidebar v-model="active" absolute :open.sync="activeSidebar" danger>
      <template #logo>
        <!-- ...img logo -->
      </template>
      <vs-sidebar-item id="lottery">
        <template #icon>
          <i class="bx bxs-coupon"></i>
        </template>
        Lottery
      </vs-sidebar-item>
      <vs-sidebar-item id="public-sale">
        <template #icon>
          <i class="bx bx-coin"></i>
        </template>
        Public sale
      </vs-sidebar-item>
      <vs-sidebar-item id="trerrand-oracle">
        <template #icon>
          <i class="bx bx-dice-5"></i>
        </template>
        Terrand oracle
      </vs-sidebar-item>
      <vs-sidebar-group>
        <template #header>
          <vs-sidebar-item arrow>
            <template #icon>
              <i class="bx bx-dots-horizontal-rounded"></i>
            </template>
            More
          </vs-sidebar-item>
        </template>
        <vs-sidebar-item id="github">
          <template #icon>
            <i class="bx bxl-github"></i>
          </template>
          Github
        </vs-sidebar-item>
        <vs-sidebar-item id="docs-terrand">
          <template #icon>
            <i class="bx bxs-file-doc"></i>
          </template>
          Docs Terrand
        </vs-sidebar-item>
        <vs-sidebar-item id="docs-lottera">
          <template #icon>
            <i class="bx bxs-file-doc"></i>
          </template>
          Docs LoTerra
        </vs-sidebar-item>
      </vs-sidebar-group>
    </vs-sidebar>
    <!--Dialog info of LOTA tokens-->
    <div class="center">
      <vs-dialog v-model="activeDialog" width="550px" not-center>
        <template #header>
          <h4 class="not-margin">Welcome to your <b>LOTA</b> breakdown</h4>
        </template>
        <div class="con-content">
          <p>LoTerra token is called LOTA</p>
        </div>
        <template #footer>
          <div class="con-footer">
            <vs-button transparent @click="active = false">
              More info
            </vs-button>
          </div>
        </template>
      </vs-dialog>
    </div>
  </div>
</template>

<script>
import { LCDClient, Extension } from '@terra-money/terra.js'
export default {
  data: () => ({
    active: 'lottery',
    activeDialog: false,
    activeSidebar: false,
    wallet: '',
  }),
  methods: {
    station() {
      // eslint-disable-next-line no-undef,no-unused-vars
      const terra = new LCDClient({
        URL: 'https://tequila-lcd.terra.dev',
        chainID: 'tequila-0004',
      })
      const extension = new Extension()
      extension.connect()
      extension.on((w) => {
        this.wallet = w.address
        // console.log(w)
        // eslint-disable-next-line no-unused-vars
      })
      console.log(this.wallet)
      /* const coin = new Coin('uusd', '1000000')
      const coins = new Coins()
      coins.add(coin)
      const msgg = new MsgSend(
        'terra1ddr7runxu5qqcawqjagkn6sa7kh7l940gq5cld',
        'terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v',
        { uusd: 1000 }
      )
      const msg = extension.post({
        msgs: [msgg],
      })
      console.log(msg)
        Coin,
        Coins,
        MsgSend,
      */
    },
  },
}
</script>

<style scoped></style>
