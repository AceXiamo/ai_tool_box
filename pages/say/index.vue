<template>
  <view class="content">
    <view class="page-container"
          :style="{height: config.windowH - config.inputBottom + 'px'}">
      <view :style="{height: config.top + 'px'}" class="top-container"></view>
      <view class="main_title has-back" :style="{height: config.height + 'px'}">
        <view class="back" @click="back">
          <fui-icon name="arrowleft" fontWeight="bold" size="40" color="#7C3AED"></fui-icon>
        </view>
        <view class="title_text">
          <text>📨</text>
          <text>Say</text>
        </view>
      </view>
      <view class="scroll-container">
        <view class="tips">
          <text>这里是留言板 👏</text>
        </view>
      </view>
    </view>
    <view class="say-container"
          :style="{marginBottom: config.isAppleAndHasLine && config.inputBottom == 0 ? 'env(safe-area-inset-bottom)' : '40rpx', bottom: config.inputBottom + 'px'}">
      <view class="say-input">
        <input :adjust-position="false" v-model="text" @focus="inputFocus" @blur="inputBlur"/>
      </view>
      <view class="send-btn" @click="submit">
        <fui-icon name="pullup-fill" fontWeight="bold" size="45" color="#16A34A"></fui-icon>
        <view :class="['send-loading', flag?'send-loading-show':'']">
          <img src="https://alioss.xiamoqwq.com/source/2023-03-03/loading_3.svg" alt=""/>
        </view>
      </view>
    </view>
    <fui-toast ref="toast"></fui-toast>
  </view>
</template>

<script>
import { aiSend } from "@/js/api";
export default {
  data() {
    return {
      config: {
        top: 0,
        height: 0,
        isAppleAndHasLine: false,
        contentH: 0,
        windowH: 0,
        inputBottom: 0,
        whiteLineH: 0
      },
    }
  },
  onLoad() {
    this.config.top = uni.getStorageSync('topValue')
    this.config.height = uni.getStorageSync('topHeight')
    this.config.isAppleAndHasLine = uni.getStorageSync('isAppleAndHasLine')
    this.config.windowH = uni.getSystemInfoSync().windowHeight
  },
  mounted() {
  },
  methods: {
    back() {
      uni.navigateBack({})
    },
  }
}
</script>

<style lang="scss" scoped>
@import "style";
@import "@/css/translator.scss";
</style>
