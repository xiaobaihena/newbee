<template>
  <div class="cart-box">
    <s-header :title="'购物车'"></s-header>
    <div class="cart-body">
      <van-checkbox-group
        @change="groupChange"
        v-model="result"
        ref="checkboxGroup"
      >
        <van-swipe-cell
          :right-width="50"
          v-for="(item, index) in list"
          :key="index"
        >
          <div class="good-item">
            <van-checkbox :name="item.cartItemId" />
            <div class="good-img">
              <img :src="prefix(item.goodsCoverImg)" alt="" />
            </div>
            <div class="good-desc">
              <div class="good-title">
                <span>{{ item.goodsName }}</span>
                <span>x{{ item.goodsCount }}</span>
              </div>
              <div class="good-btn">
                <div class="price">¥{{ item.sellingPrice }}</div>
                <van-stepper
                  integer
                  :min="1"
                  :value="item.goodsCount"
                  :name="item.cartItemId"
                  async-change
                  @change="onChange"
                />
              </div>
            </div>
          </div>
          <van-button
            slot="right"
            square
            icon="delete"
            type="danger"
            class="delete-button"
            @click="deleteGood(item.cartItemId)"
          />
        </van-swipe-cell>
      </van-checkbox-group>
    </div>
    <van-submit-bar
      v-if="list.length > 0"
      class="submit-all"
      :price="total * 100"
      button-text="结算"
      @submit="onSubmit"
    >
      <van-checkbox @click="allCheck" v-model="checkAll">全选</van-checkbox>
    </van-submit-bar>
    <div class="empty" v-if="!list.length">
      <van-icon name="smile-o" />
      <div class="title">购物车空空空如也</div>
      <van-button color="#1baeae" type="primary" @click="goTo" block
        >前往首页</van-button
      >
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import sHeader from "@/components/SimpleHeader";
import { getCart, deleteCartItem } from "../service/cart";
export default {
  name: "Cart",
  components: {
    sHeader,
  },
  data() {
    return {
      list: [],
      result: [],
      checkAll: true,
    };
  },
  mounted() {
    this.init();
  },
  computed: {
    total: function () {
      let sum = 0;
      let _list = this.list.filter((item) =>
        this.result.includes(item.cartItemId)
      );
      _list.forEach((item) => {
        sum += item.goodsCount * item.sellingPrice;
      });
      return sum;
    },
  },
  methods: {
    goTo() {
      this.$router.push({ path: "home" });
    },
    async init() {
      Toast.loading({ message: "加载中...", forbidClick: true });
      const { data } = await getCart({ pageNumber: 1 });
      this.list = data;
      this.result = data.map((item) => item.cartItemId);
      Toast.clear();
    },
    async deleteGood(id) {
      const { data } = await deleteCartItem(id);
      this.$store.dispatch("updateCart");
      this.init();
    },
    async onChange(value, detail) {
      if (
        this.list.filter((item) => item.cartItemId == detail.name)[0]
          .goodsCount == value
      )
        return;
      Toast.loading({ message: "修改中...", forbidClick: true });
      const params = {
        cartItemId: detail.name,
        goodsCount: value,
      };
      const { data } = await modifyCart(params);
      this.list.forEach((item) => {
        if (item.cartItemId == detail.name) {
          item.goodsCount = value;
        }
      });
      Toast.clear();
    },
    groupChange(result) {
      if (result.length == this.list.length) {
        this.checkAll = true;
      } else {
        this.checkAll = false;
      }
      this.result = result;
    },
    async onSubmit() {
      const params = JSON.stringify(this.result);
      console.log(params);

      this.$router.push({ path: `create-order?cartItemIds=${params}` });
    },
    allCheck(value) {
      // 判断 checkAll ，如果已是全选状态，checkAll 将变为false，所以清空 result 内的变量，价格变为 0
      // 如果是非全选状态checkAll 将变为 true，直接将 list 下的 id 塞进 result 变量里，total 会自动变为相应的价格
      if (this.checkAll) {
        this.result = this.list.map((item) => item.cartItemId);
      } else {
        this.result = [];
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "../common/style/mixin";
.cart-box {
  .cart-body {
    margin: 60px 0 100px 0;
    padding-left: 10px;
    .good-item {
      display: flex;
      .good-img {
        img {
          .wh(100px, 100px);
        }
      }
      .good-desc {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 1;
        padding: 20px;
        .good-title {
          display: flex;
          justify-content: space-between;
        }
        .good-btn {
          display: flex;
          justify-content: space-between;
          .price {
            font-size: 16px;
            color: red;
            line-height: 28px;
          }
          .van-icon-delete {
            font-size: 20px;
            margin-top: 4px;
          }
        }
      }
    }
    .delete-button {
      width: 50px;
      height: 100%;
    }
  }
  .submit-all {
    margin-bottom: 50px;
    .van-checkbox {
      margin-left: 10px;
    }
    .van-submit-bar__text {
      margin-right: 10px;
    }
    .van-submit-bar__button {
      background: @primary;
    }
  }
  .empty {
    width: 50%;
    margin: 0 auto;
    text-align: center;
    margin-top: 200px;
    .van-icon-smile-o {
      font-size: 50px;
    }
    .title {
      font-size: 16px;
      margin-bottom: 20px;
    }
  }
}
</style>

<style lang="less">
@import "../common/style/mixin";
.van-checkbox__icon--checked .van-icon {
  background-color: @primary;
  border-color: @primary;
}
</style>