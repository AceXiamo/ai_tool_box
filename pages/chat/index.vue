<template>
  <view class="content">
    <view class="chat-container"
          :style="{height: (config.inputBottom == 0 ? (config.contentH - config.inputBottom) : (config.contentH - config.inputBottom + config.whiteLineH - 20)) + 'px'}">
      <view :style="{height: config.top + 'px'}" class="top-container"></view>
      <view class="main_title has-back" :style="{height: config.height + 'px'}">
        <view class="back" @click="back">
          <fui-icon name="arrowleft" fontWeight="bold" size="40" color="#7C3AED"></fui-icon>
        </view>
        <view class="title_text">
          <text>📝</text>
          <text>Chat</text>
        </view>
      </view>
      <view class="chat-list">
        <scroll-view :scroll-y="true" :scroll-top="scroll">
          <view class="chat-item" v-for="index of 20" :key="index">
            <view class="avatar">
              <image src="https://qwq.link/images/avatar.jpg" mode="aspectFit"></image>
            </view>
            <view class="chat-content">
              <text>关注永雏塔菲喵，关注永雏塔菲谢谢喵</text>
            </view>
          </view>
        </scroll-view>
      </view>
    </view>
    <view class="say-container"
          :style="{marginBottom: config.isAppleAndHasLine && config.inputBottom == 0 ? 'env(safe-area-inset-bottom)' : '40rpx', bottom: config.inputBottom + 'px'}">
      <view class="say-input">
        <input :adjust-position="false" @focus="inputFocus" @blur="inputBlur"/>
      </view>
      <view class="send-btn">
        <fui-icon name="pullup-fill" fontWeight="bold" size="45" color="#16A34A"></fui-icon>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: 'Hello',
      config: {
        top: 0,
        height: 0,
        isAppleAndHasLine: false,
        contentH: 0,
        windowH: 0,
        inputBottom: 0,
        whiteLineH: 0
      },
      index: 0,
      scroll: 0
    }
  },
  onLoad() {
    this.config.top = uni.getStorageSync('topValue')
    this.config.height = uni.getStorageSync('topHeight')
    this.config.isAppleAndHasLine = uni.getStorageSync('isAppleAndHasLine')
    this.config.windowH = uni.getSystemInfoSync().windowHeight
  },
  mounted() {
    this.inputHandle()
  },
  methods: {
    async inputHandle() {
      let res = await this.domRect('.say-container')
      this.config.contentH = res.top
      this.config.whiteLineH = this.config.windowH - res.bottom
    },
    back() {
      uni.navigateBack({})
    },
    inputFocus(e) {
      this.config.inputBottom = e.detail.height
      // this.scrollTop += 1; //滚到底部
    },
    inputBlur(e) {
      this.config.inputBottom = 0;
      // this.scrollTop += 1; //滚到底部
    },
    domRect(tag) {
      let query = wx.createSelectorQuery()
      return new Promise(resolve => {
        query.select(tag).boundingClientRect((rect) => {
          resolve(rect)
        }).exec()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "style";
</style>
