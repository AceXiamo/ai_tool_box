<template>
  <view class="content">
    <view :style="{height: top + 'px'}" class="top-container"></view>
    <view class="main_title" :style="{height: height + 'px'}">
      <view class="title_text">
        <text>🤖</text>
        <text>AI Tool Box</text>
      </view>
    </view>
    <view class="content-container">
      <view class="tips-container">
        <view class="tip-item">
          <view class="tip-title">
            <text>#</text>
            <text>About</text>
          </view>
          <view class="tip-content">
            <text class="tip-dot font-bold">众所周知，这应该是一个基于OpenAI的小工具 🫠</text>
            <text class="tip-dot font-bold">一些扩展实际上使用基础的对话就能够完成，而我喜欢折腾 😎</text>
          </view>
        </view>
        <view class="tip-item">
          <view class="tip-title">
            <text>#</text>
            <text>Web端</text>
          </view>
          <view class="tip-content">
            <text class="tip-dot color-blur-500">https://gpt.takina.ink</text>
          </view>
        </view>
        <view class="tip-item">
          <view class="tip-title">
            <text>#</text>
            <text>我的博客</text>
          </view>
          <view class="tip-content">
            <text class="tip-dot color-blur-500">https://takina.ink</text>
          </view>
        </view>
        <view class="tip-item">
          <view class="tip-title">
            <text>#</text>
            <text>More</text>
          </view>
          <view class="tip-content">
            <text class="tip-dot font-bold">留言 & 建议请转到博客 📝</text>
            <text class="tip-dot font-bold remove-line">持续划水中 ... 🧨️</text>
          </view>
        </view>
      </view>
      <view class="item-container">
        <view class="ai-item" @click="toChat({})">
          <view class="top">
            <text>开始</text>
            <fui-icon name="right" fontWeight="bold" size="45" color="#6EBE61"></fui-icon>
          </view>
          <view class="bottom">
            <text class="remove-line">🔥 不如问问神奇海螺</text>
          </view>
        </view>
        <view class="ai-item" @click="toTranslator">
          <view class="top">
            <text>翻译</text>
            <fui-icon name="right" fontWeight="bold" size="45" color="#6EBE61"></fui-icon>
          </view>
          <view class="bottom">
            <text>💬 What’s this ?</text>
          </view>
        </view>
        <view class="ai-item" @click="toPolish">
          <view class="top">
            <text>文本润色</text>
            <fui-icon name="right" fontWeight="bold" size="45" color="#6EBE61"></fui-icon>
          </view>
          <view class="bottom">
            <text>🕸️ ? ? ?</text>
          </view>
        </view>
        <view class="ai-item" @click="toEat">
          <view class="top">
            <text>吃什么？</text>
            <fui-icon name="right" fontWeight="bold" size="45" color="#6EBE61"></fui-icon>
          </view>
          <view class="bottom">
            <text>🍥 吃饭，但是AI !</text>
          </view>
        </view>
      </view>
      <view class="history-container">
        <view class="his-title">
          <fui-icon name="wait" fontWeight="bold" size="32" color="#007BFF"></fui-icon>
          <text>历史记录</text>
        </view>
        <view class="no-content" v-if="his == null || his.length < 1">
          <fui-icon name="warning-fill" fontWeight="bold" size="30" color="#FFAC5F"></fui-icon>
          <text>还没有对话，快去创建一个吧～</text>
        </view>
        <view class="his-list" v-else>
          <view class="his-item" v-for="(item, index) in his" :key="index" @click="toChat(item)">
            <view class="left">
              <text>{{ titleHandle(item) }}</text>
              <text>{{ item.createTime }}</text>
            </view>
            <view class="right">
              <fui-icon name="turningright" fontWeight="bold" size="32" color="#6EBE61"></fui-icon>
            </view>
          </view>
        </view>
      </view>
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
import { history } from '@/js/api'

export default {
  data() {
    return {
      title: 'Hello',
      top: 0,
      height: 0,
      isAppleAndHasLine: false,
      index: 0,
      query: {
        pageNum: 1,
        pageSize: 100,
        type: 'chat'
      },
      his: []
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
    this.loadHis()
  },
  onShareAppMessage() {},
  onShareTimeline() {},
  methods: {
    loadHis() {
      history(this.query).then(res => {
        this.his = res.data['records']
      })
    },
    titleHandle(item) {
      return JSON.parse(item['messageContent'])[0].content
    },
    toChat(item) {
      uni.setStorageSync("chat", item)
      uni.navigateTo({
        url: '/pages/chat/index'
      })
    },
    toTranslator() {
      uni.navigateTo({
        url: '/pages/translator/index'
      })
    },
    toPolish() {
      uni.navigateTo({
        url: '/pages/polish/index'
      })
    },
    toEat() {
      uni.navigateTo({
        url: '/pages/eat/index'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "style";
</style>
