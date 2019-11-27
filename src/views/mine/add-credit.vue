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
            <p class="f17 fw400 mb5">13666365656</p>
            <div class="f12">
              <p class="tag">当前余额0元</p>
              <p class="tag">2019.12.12到期，已开启自动续费</p>
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
            :class="{active:current === item}"
            v-for="item in 3"
            :key="item"
            @click="current = item">
            <div class="flex-none package-title">每月专享88折</div>
            <div class="flex-col aic jcc flex-auto">
              <p class="cf2 f14 b">连续包月</p>
              <p class="cf2 fw400">循环存储3天 录像</p>
              <p class="f400 c7c deleted-text">￥9.9</p>
              <p class="mc-yellow f16 b">￥8.8</p>
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
        <van-checkbox class="mc-yellow"
          v-model="payWay">
          <p class="c32 b">支付宝</p>
        </van-checkbox>
      </div>
      <div class="card btn-wrapper flex-col">
        <div class="mb10">
          <van-button class="btn">立即开通</van-button>
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
  </div>
</template>

<script>
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
      current: '',
      autoRenew: false,
      isRead: false,
      payWay: '',
    };
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
