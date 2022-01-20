<template>
  <div class="detail-box">
    <s-header :title="'订单详情'"></s-header>
    <div class="order-stutas">
      <div class="stutas-all">
        <span class="stutas-title">订单状态：</span
        >{{ detail.orderStatusString }}
      </div>
      <div class="stutas-all">
        <span class="stutas-title">订单编号：</span>{{ detail.orderNo }}
      </div>
      <div class="stutas-all">
        <span class="stutas-title">下单时间：</span>{{ detail.createTime }}
      </div>
      <van-button
        v-if="[1, 2, 3].includes(detail.orderStatus)"
        style="margin-bottom: 10px"
        color="#1baeae"
        block
        @click="handleConfirmOrder(detail.orderNo)"
        >确认收货</van-button
      >
      <van-button
        v-if="detail.orderStatus == 0"
        style="margin-bottom: 10px"
        color="#1baeae"
        block
        @click="showPayFn"
        >去支付</van-button
      >
      <van-button
        v-if="!(detail.orderStatus < 0 || detail.orderStatus == 4)"
        block
        @click="cancelOrder(detail.orderNo)"
        >取消订单</van-button
      >
    </div>
    <div class="detail-price">
      <div>
        <span class="stutas-title">商品金额：</span>￥{{ detail.totalPrice }}
      </div>
      <div><span class="stutas-title">配送方式：</span>普通快递</div>
    </div>
    <div class="detail-card">
      <van-card
        v-for="(item, index) in detail.newBeeMallOrderItemVOS"
        :key="index"
        :num="item.goodsCount"
        :price="item.sellingPrice"
        desc="全场包邮"
        :title="item.goodsName"
        :thumb="item.goodsCoverImg"
      />
    </div>
    <van-popup v-model="show" position="bottom" :style="{ height: '26%' }">
      <van-button type="primary" @click="goPay(1)" color="#1baeae" block
        >支付宝支付</van-button
      >
      <van-button type="primary" @click="goPay(2)" block>微信支付</van-button>
    </van-popup>
  </div>
</template>

<script>
import { Dialog, Toast } from "vant";
import sHeader from "../components/SimpleHeader.vue";
import { getOrderDetail, cancelOrder, payOrder } from "../service/order";
export default {
  data() {
    return {
      orderNo: this.$route.query.id || "",
      detail: {},
      show: false,
    };
  },
  async mounted() {
    this.init();
  },
  components: {
    sHeader,
  },
  methods: {
    async goPay(value) {
      this.show = false;
      const { resultCode } = await payOrder({
        orderNo: this.orderNo,
        payType: value,
      });
      if (resultCode == 200) {
        this.init();
      }
    },
    async init() {
      Toast.loading({
        message: "加载中",
        forbidClick: true,
      });
      const { data } = await getOrderDetail(this.orderNo);
      this.detail = data;
      Toast.clear();
    },
    showPayFn() {
      console.log(this.show);
      this.show = true;
    },
    handleConfirmOrder(id) {
      Dialog.confirm({
        message: "是否确认收货？",
      }).then(() => {
        confirmOrder(id).then((res) => {
          if (res.resultCode == 200) {
            Toast("确认收货");
            this.init();
          }
        });
      });
    },
    cancelOrder(id) {
      Dialog.confirm({
        message: "确认取消订单？",
      }).then(() => {
        cancelOrder(id).then((res) => {
          if (res.resultCode == 200) {
            Toast("删除成功");
            this.init();
          }
        });
      });
    },
  },
};
</script>

<style lang="less" scoped>
.detail-box {
  background: #f7f7f7;
  margin-top: 50px;
  .order-stutas {
    background: #ffffff;
    padding: 10px 20px 20px 20px;
    font-size: 15px;
    .stutas-all {
      margin-bottom: 10px;
      .stutas-title {
        color: #999;
      }
    }

    .van-button {
      width: 100%;
    }
  }
  .detail-price {
    margin-top: 20px;
    background: #ffffff;
    padding: 20px;
    font-size: 15px;
    line-height: 30px;
    .stutas-title {
      color: #999;
    }
  }
  .detail-card {
    margin-top: 20px;
    .van-card {
      background: #ffffff;
      margin-top: 0;

      .van-card__content {
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
    }
  }
  .van-button {
    width: 90%;
    margin: 0 auto;
    margin-top: 20px;
  }
}
</style>