<template>
  <view class="content">
    <view :style="{ height: top + 'px' }" class="top-container"></view>
    <view class="main_title" :style="{ height: height + 'px' }">
      <view class="title_text">
        <text>{{ title[index].icon }}</text>
        <text>{{ title[index].text }}</text>
      </view>
    </view>
    <view class="content-container">
      <Main ref="main" :class="['page-default', index === 0 ? '' : 'hide-page']"></Main>
      <User ref="user" :class="['page-default', index === 1 ? '' : 'hide-page']"></User>

      <view class="menu-container" :style="{ marginBottom: isAppleAndHasLine ? 'env(safe-area-inset-bottom)' : '40rpx' }">
        <view :class="['menu-item', index === 0 ? 'item-selected' : '']" @click="menuClick(0)">
          <view class="item-bg">
            <fui-icon name="home-fill" fontWeight="bold" size="40"></fui-icon>
            <text>Home</text>
          </view>
        </view>
        <view :class="['menu-item', index === 1 ? 'item-selected' : '']" @click="menuClick(1)">
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
  components: { User, Main },
  data() {
    return {
      top: 0,
      height: 0,
      isAppleAndHasLine: false,
      index: 0,
      title: [
        { icon: '🤖', text: 'AI Tool Box' },
        { icon: '🏕', text: 'My' }
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
  },
  onShareAppMessage() { },
  onShareTimeline() { },
  methods: {
    menuClick(index) {
      if (index == 0) {
        this.$refs.main.init()
      } else {
        this.$refs.user.init()
      }
      this.index = index
    }
  }
}
</script>

<style lang="scss" scoped>
@import "style";
</style>
