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
          <view class="chat-item" v-for="(item, index) in list" :key="index">
            <view class="avatar">
              <image src="https://qwq.link/images/avatar.jpg" mode="aspectFit"></image>
            </view>
            <view class="chat-content">
              <zero-markdown-view :themeColor="'#007AFF'" :markdown="item.html"></zero-markdown-view>
            </view>
          </view>
        </scroll-view>
      </view>
    </view>
    <view class="say-container"
          :style="{marginBottom: config.isAppleAndHasLine && config.inputBottom == 0 ? 'env(safe-area-inset-bottom)' : '40rpx', bottom: config.inputBottom + 'px'}">
      <view class="say-input">
        <input :adjust-position="false" @focus="inputFocus" @blur="inputBlur"/>
      </view>
      <view class="send-btn">
        <fui-icon name="pullup-fill" fontWeight="bold" size="45" color="#16A34A"></fui-icon>
      </view>
    </view>
  </view>
</template>

<script>
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
      list: [
        {
          role: 'user',
          html: "可以帮我写一段Java的HelloWorld示例吗"
        },
        {
          role: 'assistant',
          html: "\n\n```java\npublic class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, world!\");\n    }\n}\n```\n或者更简单地：\n```java\nclass HelloWorld {\n    public static void main(String args[]) {\n        System.out.println(\"Hello, world!\");\n    }\n}\n```"
        }
      ],
    }
  },
  onLoad() {
    this.config.top = uni.getStorageSync('topValue')
    this.config.height = uni.getStorageSync('topHeight')
    this.config.isAppleAndHasLine = uni.getStorageSync('isAppleAndHasLine')
    this.config.windowH = uni.getSystemInfoSync().windowHeight
  },
  mounted() {
    this.inputHandle()
  },
  methods: {
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import "style";
</style>
