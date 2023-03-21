<template>
  <view>
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
      <view class="no-content" v-if="(his == null || his.length < 1) && !loading">
        <fui-icon name="warning-fill" fontWeight="bold" size="30" color="#FFAC5F"></fui-icon>
        <text>还没有对话，快去创建一个吧～</text>
      </view>
      <view class="content-loading" v-if="loading">
        <image class="loading-icon-svg" src="https://alioss.xiamoqwq.com/source/2023-03-20/loading_4.svg" mode="aspectFit"></image>
        <text>加载中，请稍后...</text>
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
  </view>
</template>

<script>
import { history } from "@/js/api";

export default {
  name: "main",
  data() {
    return {
      query: {
        pageNum: 1,
        pageSize: 100,
        type: 'chat'
      },
      his: [],
      loading: false
    }
  },
  created() {
    this.loadHis()
  },
  methods: {
    loadHis() {
      this.loading = true
      history(this.query).then(res => {
        this.loading = false
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

<style scoped lang="scss">
@import "../style";
</style>
