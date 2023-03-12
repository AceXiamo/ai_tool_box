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
          <text>🍟</text>
          <text>XX今天吃什么 ?</text>
        </view>
      </view>
      <view class="scroll-container">
        <view class="tips">
          <text>提供你所食用的一些食物，比如 蔬菜 🥬，水果 🍉，零食 🌰 等等，由AI来对你的食谱进行分析</text>
          <text class="remove-line">健康饮食，从我做起 😠</text>
        </view>
        <view class="result-title">
          <fui-icon name="edit-fill" fontWeight="bold" size="45" color="#7C3AED"></fui-icon>
          <text>吃了 ? 🤔</text>
        </view>
        <view class="food-container">
          <view class="add item" @click="showModal">
            <fui-icon name="plus" fontWeight="bold" size="30" color="#2563EB"></fui-icon>
            <text>添加</text>
          </view>
        </view>
        <view class="confirm-button">
          <fui-button type="primary" width="200rpx" height="70rpx" size="28" @click="submit">提交 🍥</fui-button>
        </view>
        <view class="result-title">
          <fui-icon name="screen" fontWeight="bold" size="45" color="#7C3AED"></fui-icon>
          <text>Result</text>
        </view>
        <view class="to-container translator-result">
          <text :style="{color: result?'':'#D1D5DB'}">{{ result || '这里将会展示分析结果 🍃' }}</text>
        </view>
      </view>
    </view>

    <uni-transition ref="ani" custom-class="transition" :mode-class="['fade']"
                    :show="show">
      <view class="the-modal">
        <view class="modal-container">
          <view class="close-icon">
            <fui-icon name="close" fontWeight="bold" size="40" color="#7C3AED"></fui-icon>
          </view>
          <view class="food-input">
            <input type="text" placeholder="请输入 🍜"/>
          </view>
          <view class="bottom-button">
            <fui-button background="#D1D5DB" width="100rpx" height="50rpx" size="24" @click="show = false">返回
            </fui-button>
            <fui-button type="primary" width="100rpx" height="50rpx" size="24">确定</fui-button>
          </view>
        </view>
      </view>
    </uni-transition>
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
      list: [],
      result: '',
      show: false,
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
        text: '没有输入任何内容 🥲'
      })
    },
    showModal() {
      this.show = true
    }
  }
}
</script>

<style lang="scss" scoped>
@import "style";
@import "@/css/translator.scss";
.modal-ani {
  &-enter-active, &-leave-active {
    transition: opacity 0.5s;
  }

  &-enter, &-leave-to {
    opacity: 0;
  }
}
</style>
