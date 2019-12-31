<template>
  <!-- 充值 -->
  <div class="add-credit">
    <van-nav-bar
      class="flex-none"
      style="border-bottom:1px solid #EBEDFF"
      title="充值"
      left-text="返回"
      left-arrow
      :border="false"
      @click-left="$router.back()" />
    <div>
      <div class="header mb15">
        <div class="user-info flex">
          <div class="avatar mr10 flex-none"></div>
          <div class="flex-col jcb lh1 cf2">
            <p class="f17 fw400 mb5">{{userInfo.phoneNum}}</p>
            <div class="f12">
              <p class="tag">当前余额0元</p>
              <!-- <p class="tag">2019.12.12到期，已开启自动续费</p> -->
            </div>
          </div>
        </div>
        <div class="menu flex jcb">
          <div
            class="flex-col aic cf2 b"
            v-for="item in menus"
            :key="item.name">
            <div class="menu-icon mb5"></div>
            <p>{{item.name}}</p>
          </div>
        </div>
      </div>
      <div class="card">
        <van-cell
          :border="false"
          :clickable="false"
          class="card-title mb10"
          title="云套餐购买"
          is-link value="更多" />
        <div class="flex jcb mb10">
          <div
            class="package-item flex-col"
            :class="{active:current.id === item.id}"
            v-for="item in packageList"
            :key="item.id"
            @click="current = item">
            <div class="flex-none package-title">每月专享{{item.discount*100}}折</div>
            <div class="flex-col aic jcc flex-auto">
              <p class="cf2 f14 b">{{item.name}}</p>
              <p class="cf2 fw400">{{item.detail}}</p>
              <p class="f400 c7c deleted-text">￥{{item.originalPrice}}</p>
              <p class="mc-yellow f16 b">￥{{item.price}}</p>
            </div>
          </div>
        </div>
        <div>
          <van-checkbox class="mc-yellow"
            v-model="autoRenew">到期后自动续费，可随时取消</van-checkbox>
        </div>
      </div>
      <!-- 优惠券 -->
      <div class="card fee flex aic jcb">
        <p class="c32 f13 b">优惠券</p>
        <p class="c7c f13 b">当前套餐不支持</p>
      </div>
      <!-- 优惠券 -->
      <div class="card pay-way flex aic jcb">
        <p class="c32 f13 b">支付方式</p>
        <p class="c32 b">微信</p>
        <!-- <van-checkbox class="mc-yellow"
          v-model="payWay">
        </van-checkbox> -->
      </div>
      <div class="card btn-wrapper flex-col">
        <div class="mb10">
          <van-button class="btn"
            @click="buyNow">立即开通</van-button>
        </div>
        <div class="flex jcc">
          <van-checkbox class="tc" shape="square"
            v-model="isRead">
            <span class="c58">我已阅读并同意</span>《云服务购买协议》
            <span class="c58">和</span>《自动续费协议》
          </van-checkbox>
        </div>

      </div>
    </div>
    <!-- 支付二维码弹框 -->
    <van-popup v-model="qrCodePopupVisible"
      closeable
      :close-on-click-overlay="false"
      @close="checkTimes = 999">
      <div class="qrcode-wrapper flex aic jcc">
        <img :src="qrCodeImg" />
      </div>
      <p class="p20 tc b">请使用截屏功能将二维码保存至相册，然后在微信中使用扫一扫，从相册选取二维码完成支付</p>
      <!-- <div class="tc mb10">
        <van-button
          @click="saveQrCode">下载二维码到相册</van-button>
      </div> -->
    </van-popup>
  </div>
</template>

<script>
import {
  rechargePackageList,
  createOrder,
  submitOrder,
  getQrCode,
  payResult,
} from '@/api/';

const menus = [
  {
    name: '套餐转移',
  },
  {
    name: '优惠券',
  },
  {
    name: '兑换码',
  },
  {
    name: '购买记录',
  },
];
export default {
  data() {
    return {
      menus,
      current: {},
      autoRenew: false,
      isRead: false,
      payWay: '微信',
      packageList: [],
      qrCodePopupVisible: false,
      qrCodeImg: '',
      checkTimes: 0, // 查询次数
      userInfo: {},
    };
  },
  mounted() {
    this.userInfo = JSON.parse(localStorage.getItem('USERINFO')) || {};
    this.getPackageList();
  },
  methods: {
    // 获取套餐列表
    async getPackageList() {
      Toast.loading({
        duration: 0,
        message: '正在加载...',
        overlay: true,
      });
      const resp = await rechargePackageList({
        limit: '3',
      });
      if (resp.code === '1') {
        const { list } = resp.result;
        this.packageList = list;
        [this.current] = list;
        Toast.clear();
      } else {
        Toast(resp.msg);
      }
    },
    // 立即开通
    buyNow() {
      // 判断是否阅读协议
      if (!this.isRead) {
        Toast('必须同意《云服务购买协议》和《自动续费协议》');
        return;
      }
      // 创建订单
      this.createOrder();
    },

    /**
     * 创建订单
     */
    async createOrder() {
      Toast.loading({
        duration: 0,
        message: '正在生成订单...',
        overlay: true,
      });
      const resp = await createOrder({
        packagesID: String(this.current.id),
      });
      if (resp.code === '1') {
        const { orderNum } = resp.result;
        // 提交订单
        this.submitOrder({
          ip: '192.168.31.137',
          orderNum,
        });
      } else {
        Toast(resp.msg);
      }
    },

    /**
     * 提交订单
     */
    async submitOrder(options) {
      Toast.loading({
        duration: 0,
        message: '正在提交订单...',
        overlay: true,
      });
      const resp = await submitOrder(options);
      if (resp.code === '1') {
        const { orderNum } = resp.result;
        // 获取支付二维码
        this.getQrCode(orderNum);
      } else {
        Toast(resp.msg);
      }
    },

    /**
     * 获取支付二维码
     */
    async getQrCode(orderNum) {
      Toast.loading({
        duration: 0,
        message: '正在生成支付二维码...',
        overlay: true,
      });
      const resp = await getQrCode({
        orderNum,
      });
      this.qrCodeImg = `data:image/png;base64,${btoa(
        new Uint8Array(resp).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          '',
        ),
      )}`;
      this.qrCodePopupVisible = true;
      Toast.clear();
      // 查询支付状态
      this.checkTimes = 0;
      this.checkPayStatus(orderNum);
    },

    // 保存二维码
    saveQrCode() {
      // 通过创建a标签实现
      const link = document.createElement('a');
      link.href = this.qrCodeImg;
      // 对下载的文件命名
      link.download = `${+new Date()}qrcode.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },

    /**
     * 查询支付状态
     */
    async checkPayStatus(orderNum) {
      const resp = await payResult({
        orderNum,
      });
      if (resp.code === '1') {
        const { status, content } = resp.result;
        if (status === '2') {
          // 未支付
          if (this.checkTimes < 10) {
            setTimeout(
              () => {
                this.checkPayStatus(orderNum); // 再次查询
                this.checkTimes++;
              },
              this.checkTimes < 2 ? 3000 : 1000,
            );
          }
        } else {
          this.qrCodePopupVisible = false;
          Dialog.alert({
            title: content,
            showCancelButton: false,
          });
        }
      } else {
        Toast(resp.msg);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.van-nav-bar {
  background: #181b2d;
}
.header {
  background: rgba(33, 36, 49, 1);
  border-radius: 0px 0px 25px 25px;
}
.user-info {
  padding: 20px 36px;
  background: rgba(24, 27, 45, 1);
  border-radius: 0px 0px 20px 20px;
}
.avatar {
  width: 44px;
  height: 44px;
  background: rgba(189, 203, 241, 1);
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
}
.tag {
  border: 1px solid #dcb99e;
  display: inline-block;
  padding: 5px 8px;
  border-radius: 3px;
  margin-bottom: 5px;
}
.menu {
  padding: 20px 50px;
}
.menu-icon {
  width: 32px;
  height: 32px;
  background: rgba(124, 124, 124, 1);
  opacity: 1;
}
.card {
  margin: 0;
  border-radius: 25px 25px 0px 0px;
  padding: 15px 20px;
  margin-bottom: 10px;
}
.fee,
.pay-way,
.btn-wrapper {
  border-radius: 0;
}
.card-title {
  font-size: 14px;
  font-weight: bold;
  color: rgba(50, 50, 50, 1);
  padding: 0;
}
.mc-yellow {
  color: #dfad86;
}
.package-item {
  width: 104px;
  height: 120px;
  background: #424c67;
  border: 2px solid rgba(197, 172, 153, 1);
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.3s;
  &.active {
    background: #202439;
  }
}
.package-title {
  background: rgba(181, 144, 115, 1);
  border: 2px solid rgba(197, 172, 153, 1);
  border-radius: 0px 0px 10px 0px;
  display: inline-block;
  align-self: baseline;
  padding: 3px 5px;
  color: #f2f2f2;
}
.deleted-text {
  text-decoration: line-through;
}
.btn {
  width: 100%;
  height: 28px;
  line-height: 28px;
  background: rgba(28, 22, 18, 1);
  border-radius: 5px;
  font-size: 12px;
  font-weight: bold;
  color: rgba(220, 185, 158, 1);
}
.van-checkbox {
  display: flex;
  align-items: center;
}
.qrcode-wrapper {
  width: 300px;
  height: 300px;
  margin-top: 30px;
  img {
    width: 100%;
  }
}
</style>
<style lang="scss">
.add-credit {
  .van-cell__value {
    color: #585858;
    font-weight: bold;
  }
  .van-cell__right-icon {
    color: #585858;
    font-weight: bold;
  }
  .van-checkbox__icon--checked .van-icon {
    background: #dfad86;
    border-color: #dfad86;
  }
  .van-checkbox__label {
    color: #dfad86;
    font-weight: 400;
  }
  .van-cell--clickable:active {
    background: unset;
  }
}
</style>
