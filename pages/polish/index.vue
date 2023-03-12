<template>
  <view class="content">
    <view class="polish-container"
          :style="{height: config.windowH - config.inputBottom + 'px'}">
      <view :style="{height: config.top + 'px'}" class="top-container"></view>
      <view class="main_title has-back" :style="{height: config.height + 'px'}">
        <view class="back" @click="back">
          <fui-icon name="arrowleft" fontWeight="bold" size="40" color="#7C3AED"></fui-icon>
        </view>
        <view class="title_text">
          <text>📝</text>
          <text>Polish</text>
        </view>
      </view>
      <view class="scroll-container">
        <view class="tips">
          <text>太长的文段暂时不支持，Max 500</text>
          <text>或者等待后期发布新对 Release 🔥</text>
        </view>
        <view class="from-container translator-result">
          <fui-textarea placeholder="请输入需要润色的内容" maxlength="500" height="300rpx" v-model="text" :borderBottom="false" :isCounter="true"></fui-textarea>
        </view>
        <view class="confirm-button">
          <fui-button type="primary" width="200rpx" height="70rpx" size="28" @click="submit">润色 📄</fui-button>
        </view>
        <view class="result-title">
          <fui-icon name="screen" fontWeight="bold" size="45" color="#7C3AED"></fui-icon>
          <text>Result</text>
        </view>
        <view class="to-container translator-result">
          <text :style="{color: result?'':'#D1D5DB'}">{{ result || '这里将会展示润色结果 🍃' }}</text>
        </view>
      </view>
    </view>
    <fui-toast ref="toast"></fui-toast>
  </view>
</template>

<script>
import LbPicker from 'uni-lb-picker'
export default {
  components: {
    LbPicker
  },
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
      text: '',
      result: ''
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
    submit() {
      this.$refs.toast.show({
        text: '没有输入需要润色的内容 🥲'
      })
    },
  }
}
</script>

<style lang="scss" scoped>
@import "style";
@import "@/css/translator.scss";
</style>
