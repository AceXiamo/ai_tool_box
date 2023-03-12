<template>
  <view class="content">
    <view class="translator-container"
          :style="{height: config.windowH - config.inputBottom + 'px'}">
      <view :style="{height: config.top + 'px'}" class="top-container"></view>
      <view class="main_title has-back" :style="{height: config.height + 'px'}">
        <view class="back" @click="back">
          <fui-icon name="arrowleft" fontWeight="bold" size="40" color="#7C3AED"></fui-icon>
        </view>
        <view class="title_text">
          <text>📚</text>
          <text>Translator</text>
        </view>
      </view>
      <view class="scroll-container">
        <view class="tips">
          <text>虽然说都能用对话实现，不过姑且还是区分了不同的模型</text>
          <text>目前列举了几种常见语种的互译，如需添加请留言或者等待后期发布新的 Release 📨</text>
          <text>以上 📝</text>
        </view>
        <view class="translator-select">
          <view class="select-item" @click="showLanguageFromPicker">
            <lb-picker ref="languageFromPicker" cancel-color="#D1D5DB" confirm-color="#10B981" radius="14rpx" :list="fromList" v-model="from">
              <view class="language-text">{{ from }}</view>
            </lb-picker>
            <fui-icon name="turningdown" fontWeight="bold" size="30" color="#D1D5DB"></fui-icon>
          </view>
          <view class="the-icon">
            <fui-icon name="switch" fontWeight="bold" size="40" color="#7C3AED"></fui-icon>
          </view>
          <view class="select-item" @click="showLanguageToPicker">
            <lb-picker ref="languageToPicker" cancel-color="#D1D5DB" confirm-color="#10B981" radius="14rpx" :list="toList" v-model="to">
              <view class="language-text">{{ to }}</view>
            </lb-picker>
            <fui-icon name="turningdown" fontWeight="bold" size="30" color="#D1D5DB"></fui-icon>
          </view>
        </view>
        <view class="from-container translator-result">
          <fui-textarea placeholder="请输入需要翻译的内容" maxlength="300" height="300rpx" v-model="text" :borderBottom="false" :isCounter="true"></fui-textarea>
        </view>
        <view class="confirm-button">
          <fui-button type="primary" width="200rpx" height="70rpx" size="28" :disabled="flag" :loading="flag" @click="submit">翻译 📄</fui-button>
        </view>
        <view class="result-title">
          <fui-icon name="screen" fontWeight="bold" size="45" color="#7C3AED"></fui-icon>
          <text>Result</text>
        </view>
        <view class="to-container translator-result">
          <zero-markdown-view :themeColor="'#007AFF'"
                              :markdown="result || '这里将会展示翻译结果 🍃'"></zero-markdown-view>
        </view>
      </view>
    </view>
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
      fromList: ['自动识别', '英语', '汉语', '日语', '德语'],
      toList: ['英语', '汉语', '日语', '德语'],
      from: '自动识别',
      to: '英语',
      text: '',
      result: '',
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
    back() {
      uni.navigateBack({})
    },
    submit() {
      if (this.flag) return;
      if (!this.text) {
        this.$refs.toast.show({
          text: '没有输入需要翻译的内容 🥲'
        })
        return
      }
      let suffix = "，"
      // if (this.from === '自动识别') {
      //   suffix += "我不知道这段文字是哪种语言，"
      // } else {
      //   suffix += "这是一段" + this.from + "，"
      // }
      suffix += "请帮我将其翻译成" + this.to
      let message = "'" + this.text + "'" + suffix;
      let data = {
        messageId: this.messageId,
        type: 'translator',
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
    showLanguageFromPicker() {
      this.$refs.languageFromPicker.show()
    },
    showLanguageToPicker() {
      this.$refs.languageToPicker.show()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "style";
@import "@/css/translator.scss";
</style>
