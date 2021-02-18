<template>
  <vs-card>
    <template #title>
      <h3>Play</h3>
      <p>Register a combination for next lottery draw.</p>
    </template>
    <template #text>
      <div class="center content-inputs mtop-50">
        <vs-input
          v-model="combination"
          shadow
          danger
          icon-after
          label-placeholder="Combination"
          maxlength="6"
        >
          <template #icon>
            <i class="bx bx-hash"></i>
          </template>
        </vs-input>
        <vs-tooltip warn left>
          <vs-button circle warn icon flat>
            <i class="bx bx-info-circle"></i>
          </vs-button>
          <template #tooltip> Combination: [0-9][a-f] </template>
        </vs-tooltip>
      </div>
    </template>
    <template #buttons>
      <div class="p-20">
        <vs-button gradient danger @click="active = 0">
          Buy combination
        </vs-button>
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
</style>
