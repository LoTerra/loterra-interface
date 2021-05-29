<template>
  <div class="hidden">
    <vs-navbar v-model="active" center-collapsed height="100px">
      <template #left>
        <vs-button flat danger icon @click="activeSidebar = !activeSidebar">
          <i class="bx bx-menu"></i>
        </vs-button>
      </template>
      <!--      <vs-navbar-item :active="active == 'guide'" id="guide">
        Guide
      </vs-navbar-item>-->
      <template #right>
        <vs-button flat success> Contract-v2 mainnet </vs-button>
        <vs-button
          :loading="load"
          flat
          danger
          @click="activeDialog = !activeDialog"
        >
          <GetBalanceUserLotaContract /><span style="font-size: 15px"
            >LOTA</span
          >
        </vs-button>

        <vs-button v-if="!humanAddress" gradient danger @click="station()"
          >Connect to a wallet</vs-button
        >
        <vs-button
          v-if="humanAddress"
          shadow
          @click="activeDialogInfoConnection = !activeDialogInfoConnection"
          >{{ shortAddress }}</vs-button
        >
        <!--<i class="bx bxs-planet bx-md bx-burst-hover"></i>-->
        <!--        <vs-switch v-model="active5" danger>
          <template #circle>
            <i v-if="!active5" class="bx bxs-moon"></i>
            <i v-else class="bx bxs-sun"></i>
          </template>
        </vs-switch>-->
      </template>
    </vs-navbar>
    <vs-sidebar v-model="active" absolute :open.sync="activeSidebar" danger>
      <template #logo>
        <!-- ...img logo -->
      </template>
      <vs-sidebar-item id="lottery" to="/">
        <template #icon>
          <i class="bx bxs-coupon"></i>
        </template>
        Lottery
      </vs-sidebar-item>
      <vs-sidebar-item id="public-sale" to="/public-sale">
        <template #icon>
          <i class="bx bxs-coin"></i>
        </template>
        Public sale
      </vs-sidebar-item>
      <vs-sidebar-item id="staking" to="/staking">
        <template #icon>
          <i class="bx bxs-coin-stack"></i>
        </template>
        Staking
      </vs-sidebar-item>
      <vs-sidebar-item id="trerrand-oracle" to="/terrand-oracle">
        <template #icon>
          <i class="bx bxs-dice-5"></i>
        </template>
        Terrand oracle
      </vs-sidebar-item>
      <vs-sidebar-item id="dao" to="/dao">
        <template #icon>
          <i class="bx bxs-planet"></i>
        </template>
        DAO
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
        <vs-sidebar-item id="docs-terrand" href="https://docs.terrand.dev/">
          <template #icon>
            <i class="bx bxs-file-doc"></i>
          </template>
          Docs Terrand
        </vs-sidebar-item>
        <vs-sidebar-item id="docs-lottera" href="https://docs.loterra.io/">
          <template #icon>
            <i class="bx bxs-file-doc"></i>
          </template>
          Docs LoTerra
        </vs-sidebar-item>
      </vs-sidebar-group>
      <template #footer>
        <vs-row justify="space-between">
          <a
            href="https://github.com/LoTerra"
            target="_blank"
            style="text-decoration: none"
          >
            <vs-avatar badge-color="danger" badge-position="top-right" pointer>
              <i class="bx bxl-github"></i> </vs-avatar
          ></a>
          <a
            href="https://twitter.com/LoTerra_LOTA"
            target="_blank"
            style="text-decoration: none"
          >
            <vs-avatar badge-color="danger" badge-position="top-right" pointer>
              <i class="bx bxl-twitter"></i> </vs-avatar
          ></a>
          <a
            href="https://t.me/LoTerra"
            target="_blank"
            style="text-decoration: none"
          >
            <vs-avatar badge-color="danger" badge-position="top-right" pointer>
              <i class="bx bxl-telegram"></i>
            </vs-avatar>
          </a>
        </vs-row>
      </template>
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
            <vs-button transparent danger blank href="https://docs.loterra.io/">
              More info
            </vs-button>
          </div>
        </template>
      </vs-dialog>
    </div>
    <vs-dialog v-model="activeDialogInfoConnection" non-center>
      <template #header>
        <h4 class="not-margin">{{ shortAddress }}</h4>
      </template>
      <template #footer>
        <div class="con-footer">
          <vs-button icon danger transparent>
            <i class="bx bx-copy"></i> Copy
          </vs-button>
          <vs-button icon danger transparent @click="logout">
            <i class="bx bx-log-out"></i> Disconnect
          </vs-button>
        </div>
      </template>
    </vs-dialog>
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
import { Extension } from '@terra-money/terra.js'
// import GetBalanceUserLotaContract from '../components/GetBalanceUserLotaContract'
export default {
  components: {
    GetBalanceUserLotaContract: () =>
      import('../components/GetBalanceUserLotaContract'),
  },
  props: {
    load: Boolean,
  },
  data: () => ({
    active: 'lottery',
    activeDialog: false,
    activeSidebar: false,
    activeDialogInfoConnection: false,
    activeDialogInfoNoWalletDetected: false,
    wallet: '',
  }),
  computed: {
    humanAddress() {
      return this.$store.state.station.senderAddress
    },
    shortAddress() {
      const addressPart1 = this.$store.state.station.senderAddress.substring(
        0,
        7
      )
      const addressPart2 = this.$store.state.station.senderAddress.substring(
        this.$store.state.station.senderAddress.length - 4,
        this.$store.state.station.senderAddress.length
      )
      return addressPart1 + '...' + addressPart2
    },
  },
  methods: {
    station() {
      const extension = new Extension()
      extension.connect()
      if (!extension.isAvailable) {
        this.activeDialogInfoNoWalletDetected = !this
          .activeDialogInfoNoWalletDetected
      } else {
        console.log(extension.isAvailable)
        extension.once((w) => {
          this.$store.commit('station/update', w.address)
        })
      }
    },
    logout() {
      this.$store.state.station.senderAddress = ''
      this.activeDialogInfoConnection = !this.activeDialogInfoConnection
    },
  },
}
</script>

<style scoped></style>
