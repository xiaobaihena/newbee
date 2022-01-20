import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {Button, Form, Field, Toast, Icon, Swipe, SwipeItem, SwipeCell, Tab, PullRefresh, Tabs, List, GoodsAction, GoodsActionIcon, GoodsActionButton, CheckboxGroup, Checkbox, SubmitBar, Stepper, Popup, AddressList, AddressEdit,Card, Dialog  } from 'vant'
import 'lib-flexible/flexible'
import md5 from 'js-md5'
import { prefix } from '@/common/js/utils'

Vue.use(Form).use(Field).use(Toast).use(Button).use(Icon)
.use(Swipe).use(SwipeItem).use(SwipeCell).use(Tab)
.use(PullRefresh).use(Tabs).use(List).use(GoodsAction)
.use(GoodsActionIcon).use(GoodsActionButton)
.use(CheckboxGroup).use(Checkbox).use(SubmitBar)
.use(Stepper).use(Popup).use(AddressList).use(AddressEdit).use(Card)
.use(Dialog)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.prototype.$md5 = md5;
Vue.prototype.prefix = prefix;
window.vRouter = router