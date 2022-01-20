export default {
  addCart(state, payload) {
    console.log(state,payload)
    state.cartCount = payload.count
  }
}