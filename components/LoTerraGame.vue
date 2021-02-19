<template>
  <vs-card>
    <template #title>
      <h3>Play</h3>
      <p>Register a combination for next lottery draw.</p>
    </template>
    <template #text>
      <div class="center content-inputs mtop-50">
        <vs-row>
          <vs-col w="10"></vs-col>
          <vs-col w="2">
            <vs-tooltip warn left>
              <vs-button warn flat circle icon>
                <i class="bx bx-info-circle"></i>
              </vs-button>
              <template #tooltip> [0-9][a-f] </template>
            </vs-tooltip>
          </vs-col>
        </vs-row>
        <vs-input
          v-model="combination"
          type="text"
          shadow
          danger
          icon-after
          label-placeholder="Combination"
          maxlength="6"
        >
          <template #icon>
            <i class="bx bx-hash"></i>
          </template>
          <template v-if="1 == 2" #message-danger> Required </template>
        </vs-input>
      </div>
    </template>
    <template #buttons>
      <div class="p-20">
        <vs-button gradient danger @click="active = 0"> Buy ticket </vs-button>
      </div>
    </template>
  </vs-card>
</template>

<script>
export default {
  data: () => ({
    combination: '',
  }),
}
</script>

<style scoped>
.mtop-50 {
  margin-top: 50px;
}
.p-20 {
  padding: 20px;
}
.pb-15 {
  padding-bottom: 15px;
}
</style>
