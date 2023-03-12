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
          <view class="item" @click="removeThis(item)" v-for="(item, index) in list" :key="index">{{ item }}</view>
          <view class="add item" @click="showModal">
            <fui-icon name="plus" fontWeight="bold" size="30" color="#2563EB"></fui-icon>
            <text>添加</text>
          </view>
        </view>
        <view class="select-more">
          <view @click="addThis(item)" class="item" v-for="(item, index) in normal" :key="index">{{ item }}</view>
        </view>
        <view class="confirm-button">
          <fui-button type="primary" width="200rpx" height="70rpx" size="28" :disabled="flag" :loading="flag" @click="submit">提交 🍥</fui-button>
        </view>
        <view class="result-title">
          <fui-icon name="screen" fontWeight="bold" size="45" color="#7C3AED"></fui-icon>
          <text>Result</text>
        </view>
        <view class="to-container translator-result">
          <zero-markdown-view :themeColor="'#007AFF'"
                              :markdown="result || '这里将会展示分析结果 🍃'"></zero-markdown-view>
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
            <input type="text" v-model="food" placeholder="请输入 🍜"/>
          </view>
          <view class="bottom-button">
            <fui-button background="#D1D5DB" width="100rpx" height="50rpx" size="24" @click="show = false">返回
            </fui-button>
            <fui-button type="primary" width="100rpx" height="50rpx" size="24" @click="addFood">确定</fui-button>
          </view>
        </view>
      </view>
    </uni-transition>
    <fui-toast ref="toast"></fui-toast>
  </view>
</template>

<script>
import LbPicker from 'uni-lb-picker'
import { aiSend } from "@/js/api";

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
      normal: [
        '苹果 🍎',
        '香蕉 🍌',
        '面条 🍜',
        '米饭 🍚',
        '鱼 🐟',
        '咖啡 ☕️',
        '牛奶 🥛',
        '鸡蛋 🥚',
        '汉堡 🍔',
        '薯条 🍟'
      ],
      list: [],
      result: '',
      show: false,
      food: '',
      flag: false
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
    removeThis(item) {
      this.list.splice(this.list.indexOf(item), 1)
    },
    back() {
      uni.navigateBack({})
    },
    submit() {
      if (this.flag) return;
      if (this.list.length < 1) {
        this.$refs.toast.show({
          text: '没有添加任何内容食物 🥲'
        })
        return
      }
      let suffix = "这是我所吃的食物，请对我给出的这些食物进行分析，然后提供一些建议"
      let message = ""
      this.list.forEach(v => {
        message += v + '，'
      })
      message += suffix
      let data = {
        messageId: this.messageId,
        type: 'eat',
        body: {
          model: 'gpt-3.5-turbo',
          messages: [{
            role: 'user',
            content: message
          }]
        }
      }
      this.flag = true
      aiSend(data).then((res) => {
        this.result = res.data.body.content
        this.flag = false
      })
    },
    showModal() {
      this.show = true
    },
    addFood() {
      if (this.list.indexOf(this.food) > -1)  {
        this.$refs.toast.show({
          text: this.food + ' 已添加 🤔'
        })
      } else {
        this.list.push(this.food)
        this.show = false
        this.food = ''
      }
    },
    addThis(item) {
      if (this.list.indexOf(item) > -1)  {
        this.$refs.toast.show({
          text: item + ' 已添加 🤔'
        })
        return
      }
      this.list.push(item)
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
