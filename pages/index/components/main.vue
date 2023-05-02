<template>
  <view>
    <view class="tips-container" v-if="config.show">
      <view class="tip-item" v-for="(info, index) in config.content" :key="index">
        <view class="tip-title">
          <text>#</text>
          <text>{{ info.tag }}</text>
        </view>
        <view class="tip-content">
          <text v-for="(item, index2) in info.items" :key="index2" :class="item.class">{{ item.text }}</text>
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
import { getConfig, history } from "@/js/api";

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
      config: {},
      loading: false
    }
  },
  created() {
    getConfig({key: 'main'}).then(res => {
      this.config = JSON.parse(res.data.configValue)
    })
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
