import { getCart } from '../service/cart'

export default {
  async updateCart(ctx) {
    console.log(ctx)
    const {data} = await getCart()
    ctx.commit('addCart', {
      count: data.length || 0
    })
  }
}