export const state = () => ({
  address: '',
})

export const mutations = {
  update(state, _address) {
    state.address = _address
  },
}
