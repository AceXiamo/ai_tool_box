<template>
  <scroll-view :scroll-y="true" :lower-threshold="50" @scrolltolower="bottomHandle" class="main-container">
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
      <view class="ai-item" @click="toChat({})" v-if="itemConfig.showChat">
        <view class="top">
          <text>开始</text>
          <fui-icon name="right" fontWeight="bold" size="45" color="#6EBE61"></fui-icon>
        </view>
        <view class="bottom">
          <text class="remove-line">🔥 不如问问神奇海螺</text>
        </view>
      </view>
      <view class="ai-item" @click="toTranslator" v-if="itemConfig.showTranslator">
        <view class="top">
          <text>翻译</text>
          <fui-icon name="right" fontWeight="bold" size="45" color="#6EBE61"></fui-icon>
        </view>
        <view class="bottom">
          <text>💬 What’s this ?</text>
        </view>
      </view>
      <view class="ai-item" @click="toPolish" v-if="itemConfig.showPolish">
        <view class="top">
          <text>文本润色</text>
          <fui-icon name="right" fontWeight="bold" size="45" color="#6EBE61"></fui-icon>
        </view>
        <view class="bottom">
          <text>🕸️ ? ? ?</text>
        </view>
      </view>
      <view class="ai-item" @click="toEat" v-if="itemConfig.showEat">
        <view class="top">
          <text>吃什么？</text>
          <fui-icon name="right" fontWeight="bold" size="45" color="#6EBE61"></fui-icon>
        </view>
        <view class="bottom">
          <text>🍥 吃饭，但是AI !</text>
        </view>
      </view>
    </view>
    <view class="history-container" v-if="itemConfig.showHis">
      <view class="his-title">
        <fui-icon name="wait" fontWeight="bold" size="32" color="#007BFF"></fui-icon>
        <text>历史记录</text>
      </view>
      <view class="no-content" v-if="(his == null || his.length < 1) && !loading">
        <fui-icon name="warning-fill" fontWeight="bold" size="30" color="#FFAC5F"></fui-icon>
        <text>还没有对话，快去创建一个吧～</text>
      </view>
      <view class="his-list">
        <view class="his-item" v-for="(item, index) in his" :key="index" @click="toChat(item)">
          <view class="left">
            <text>{{ titleHandle(item) }}</text>
            <text>{{ item.createTime }}</text>
          </view>
          <view class="right">
            <fui-icon name="turningright" fontWeight="bold" size="32" color="#6EBE61"></fui-icon>
          </view>
        </view>

        <view class="content-loading" v-if="loading">
          <image class="loading-icon-svg" src="https://alioss.xiamoqwq.com/source/2023-03-20/loading_4.svg"
            mode="aspectFit"></image>
          <text>加载中，请稍后...</text>
        </view>
      </view>
    </view>
  </scroll-view>
</template>

<script>
import { getConfig, history } from "@/js/api";
import Cache from "@/js/cache";

export default {
  name: "main",
  data() {
    return {
      query: {
        pageNum: 1,
        pageSize: 10,
        type: 'chat'
      },
      his: [],
      config: {},
      itemConfig: {},
      loading: false,
      timer: null,
      flag: false
    }
  },
  created() {
    this.init()
  },
  methods: {
    bottomHandle() {
      if (this.timer || this.flag) return
      this.timer = setTimeout(() => {
        this.timer = null
      }, 50)
      this.query.pageNum++
      this.loadHis()
    },
    init() {
      this.his = []
      this.loadConfig()
      this.loadHis()
    },
    loadConfig() {
      let main = Cache.get('config_main')
      if (main) {
        this.config = main
      } else {
        getConfig({ key: 'main' }).then(res => {
          this.config = JSON.parse(res.data.configValue)
          Cache.set('config_main', this.config, '5m')
        })
      }
      let item = Cache.get('config_item')
      if (item) {
        this.itemConfig = item
      } else {
        getConfig({ key: 'item' }).then(res => {
          this.itemConfig = JSON.parse(res.data.configValue)
          Cache.set('config_item', this.itemConfig, '5m')
        })
      }
    },
    loadHis() {
      this.loading = true
      history(this.query).then(res => {
        const records = res.data['records']
        this.flag = records.length < this.query.pageSize
        setTimeout(() => {
          this.loading = false
          this.his = this.his.concat(records)
        }, 100)
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

.main-container {
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
}
</style>
