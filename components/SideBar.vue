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
        <vs-button @click="station()" gradient danger
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
import { Extension, Wallet } from '@terra-money/terra.js'
export default {
  data: () => ({
    active: 'lottery',
    activeDialog: false,
    activeSidebar: false,
  }),
  methods: {
    station() {
      console.log('ok')
      // eslint-disable-next-line no-unused-vars
      const wallet = new Wallet()
      const extension = new Extension()
      extension.connect()
      extension.on('connect', (w) => {
        console.log(w)
        w = wallet
      })
      // extension.connect()
    },
  },
}
</script>

<style scoped></style>
