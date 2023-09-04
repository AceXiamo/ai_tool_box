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
          <text>✏️</text>
          <text>Chat</text>
        </view>
      </view>
      <view class="chat-list">
        <scroll-view :scroll-y="true" :scroll-top="scroll">
          <view :class="['chat-item', 'chat-item-in', item.role == 'user'?'reverse-item':'']" v-for="(item, index) in list"
                :key="index">
            <view class="avatar">
              <image
                  :src="item.role == 'user' ? (avatar || 'https://qwq.link/images/avatar.jpg')
                  : 'https://image.qwq.link/images/2023/03/12/ma_logo.png'"
                  mode="aspectFill"></image>
            </view>
            <view class="chat-content">
              <zero-markdown-view :themeColor="'#007AFF'" :markdown="item.content"></zero-markdown-view>
            </view>
          </view>
        </scroll-view>
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
import { avatarHandle, getLoginUser } from "@/js/global";

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
      scroll: 0,
      list: [],
      text: '',
      messageId: '',
      flag: '',
      avatar: ''
    }
  },
  onLoad() {
    this.config.top = uni.getStorageSync('topValue')
    this.config.height = uni.getStorageSync('topHeight')
    this.config.isAppleAndHasLine = uni.getStorageSync('isAppleAndHasLine')
    this.config.windowH = uni.getSystemInfoSync().windowHeight

    this.init()
  },
  mounted() {
    this.inputHandle()
  },
  methods: {
    init() {
      this.avatar = avatarHandle(getLoginUser().avatar)

      const res = uni.getStorageSync("chat")
      if (JSON.stringify(res) != '{}') {
        this.messageId = res.id
        this.list = JSON.parse(res['messageContent'])
      }
    },
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
    },
    inputBlur(e) {
      this.config.inputBottom = 0;
    },
    domRect(tag) {
      let query = wx.createSelectorQuery()
      return new Promise(resolve => {
        query.select(tag).boundingClientRect((rect) => {
          resolve(rect)
        }).exec()
      })
    },
    submit() {
      if (this.flag) return;
      if (!this.text) {
        this.$refs.toast.show({
          text: '没有输入任何内容 🥲'
        })
        return
      }
      let msg = {
        role: 'user',
        content: this.text
      }
      this.list.push(msg)
      this.text = ''

      let data = {
        messageId: this.messageId,
        type: 'chat',
        body: {
          model: 'gpt-3.5-turbo',
          messages: this.list
        }
      }
      this.flag = true
      aiSend(data, this.$refs.toast).then((res) => {
        this.list.push(res.data.body)
        this.messageId = res.data.messageId
      }).finally(() => {
        this.flag = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "style";
</style>
