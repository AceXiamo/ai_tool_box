<template>
  <view class="content">
    <view :style="{height: top + 'px'}" class="top-container"></view>
    <view class="main_title" :style="{height: height + 'px'}">
      <view class="title_text">
        <text>{{ title[index].icon }}</text>
        <text>{{ title[index].text }}</text>
      </view>
    </view>
    <view class="content-container">
      <Main v-if="index === 0"></Main>
      <User ref="user" v-else-if="index === 1"></User>
      <view class="menu-container" :style="{marginBottom: isAppleAndHasLine ? 'env(safe-area-inset-bottom)' : '40rpx'}">
        <view :class="['menu-item', index === 0?'item-selected':'']" @click="index = 0">
          <view class="item-bg">
            <fui-icon name="home-fill" fontWeight="bold" size="40"></fui-icon>
            <text>Home</text>
          </view>
        </view>
        <view :class="['menu-item', index === 1?'item-selected':'']" @click="index = 1">
          <view class="item-bg">
            <fui-icon name="my-fill" fontWeight="bold" size="40"></fui-icon>
            <text>My</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { loginHandle, loginVerify } from "@/js/global";
import Main from "./components/main";
import User from "./components/user";

export default {
  components: {User, Main},
  data() {
    return {
      top: 0,
      height: 0,
      isAppleAndHasLine: false,
      index: 0,
      title: [
        {icon: '🤖', text: 'AI Tool Box'},
        {icon: '🏕', text: 'My'}
      ]
    }
  },
  onLoad() {
    this.top = uni.getStorageSync('topValue')
    this.height = uni.getStorageSync('topHeight')
    this.isAppleAndHasLine = uni.getStorageSync('isAppleAndHasLine')
  },
  async onShow() {
    if (!loginVerify()) {
      await loginHandle()
    }
    if (this.index == 1) {
      this.$refs.user.init()
    }
  },
  onShareAppMessage() {},
  onShareTimeline() {},
  methods: {
    menuClick(index) {
      this.index = index
    }
  }
}
</script>

<style lang="scss" scoped>
@import "style";
</style>
