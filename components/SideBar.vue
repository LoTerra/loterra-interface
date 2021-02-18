<template>
  <div class="hidden">
    <vs-navbar v-model="active" shadow square center-collapsed>
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
        <vs-button gradient danger>Connect to a wallet</vs-button>
        <vs-switch v-model="active5" danger>
          <template #circle>
            <i v-if="!active5" class="bx bxs-moon"></i>
            <i v-else class="bx bxs-sun"></i>
          </template>
        </vs-switch>
      </template>
    </vs-navbar>
    <vs-sidebar v-model="active" absolute :open.sync="activeSidebar">
      <template #logo>
        <!-- ...img logo -->
      </template>
      <vs-sidebar-item id="home">
        <template #icon>
          <i class="bx bx-home"></i>
        </template>
        Home
      </vs-sidebar-item>
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
export default {
  data: () => ({
    active: 'home',
    activeDialog: false,
    activeSidebar: false,
  }),
}
</script>

<style scoped></style>
