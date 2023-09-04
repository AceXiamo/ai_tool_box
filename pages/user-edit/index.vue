<template>
  <view class="content">
    <view class="edit-user-container"
          :style="{height: config.windowH - config.inputBottom + 'px'}">
      <view :style="{height: config.top + 'px'}" class="top-container"></view>
      <view class="main_title has-back" :style="{height: config.height + 'px'}">
        <view class="back" @click="back">
          <fui-icon name="arrowleft" fontWeight="bold" size="40" color="#7C3AED"></fui-icon>
        </view>
        <view class="title_text">
          <text>🌴</text>
          <text>Edit</text>
        </view>
      </view>

      <view class="user-container">
        <view class="form-item">
          <view>昵称:</view>
          <input class="nick-input" type="nickname" placeholder="请输入昵称" v-model="nickname" @change="nickChange" />
        </view>
        <view class="form-item">
          <view>头像:</view>
          <button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
            <image class="avatar" :src="avatar" mode="aspectFill"></image>
            <view class="camera" v-if="!avatar">
              <u-icon name="camera-fill" size="20" color="rgb(211, 212, 214)"></u-icon>
            </view>
            <view class="re" v-else>
              <text>更换头像</text>
            </view>
          </button>
        </view>
      </view>
      <view class="submit-btn" @click="submit">保存</view>
    </view>
    <fui-toast ref="toast"></fui-toast>
  </view>
</template>

<script>
import LbPicker from 'uni-lb-picker'
import { aiSend, updateUserInfo } from "@/js/api";
import { avatarHandle, getLoginUser, updateCacheUser } from "@/js/global";
import { host } from "@/js/request";
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
      nickname: '',
      avatar: '',
      openId: ''
    }
  },
  onLoad() {
    this.config.top = uni.getStorageSync('topValue')
    this.config.height = uni.getStorageSync('topHeight')
    this.config.isAppleAndHasLine = uni.getStorageSync('isAppleAndHasLine')
    this.config.windowH = uni.getSystemInfoSync().windowHeight
    this.init()
  },
  methods: {
    init() {
      let user = getLoginUser()
      this.openId = user.openId
      this.nickname = user.nickname
      this.avatar = avatarHandle(user.avatar)
    },
    back() {
      uni.navigateBack({})
    },
    onChooseAvatar(e) {
      this.avatar = e.detail.avatarUrl
    },
    async submit() {
      let data = {}
      if (!this.avatar.includes("https://")) {
        let res = await this.uploadAvatar()
        if (res.code === 500) {
          this.$refs.toast.show({
          text: res.msg
        })
          return
        }
        this.avatar = avatarHandle(res.msg)
        data.avatar = res.msg
      }
      data.nickname = this.nickname
      data.openId = this.openId
      updateUserInfo(data, this.$refs.toast).then(() => {
        updateCacheUser(data)
        this.$refs.toast.show({
          text: '更新成功 🌈'
        })
        setTimeout(() => {
          this.back()
        }, 1000)
      })
    },
    uploadAvatar() {
      return new Promise((resolve, reject) => {
        uni.uploadFile({
          url: host + "/file/upload", //仅为示例，非真实的接口地址
          filePath: this.avatar,
          name: 'file',
          header: {
            Authorization: getLoginUser().token
          },
          success: (result) => {
            resolve(JSON.parse(result.data))
          }
        });
      })
    },
    nickChange(e) {
      if (e.detail.value) this.nickname = e.detail.value
    }
  }
}
</script>

<style lang="scss" scoped>
@import "style";
</style>
