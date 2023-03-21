<template>
  <view>
    <view class="user-container">
      <view class="user-content" @click="userEdit">
        <image class="avatar" :src="avatar" mode="aspectFit"></image>
        <text>{{ nickname }}</text>
        <view class="more">
          <text>{{ createTime }}</text>
        </view>
        <view class="status-dot"></view>
      </view>
      <view class="right-content">
        <image class="fire-svg" mode="aspectFit"
               src="https://alioss.xiamoqwq.com/source/2023-03-21/loading_5.svg"></image>
        <view class="todo font">
          <text>//</text>
          <text>TODO</text>
        </view>
        <view class="tip-item font">
          <text>//</text>
          <text>点击左侧卡片以修改</text>
        </view>
        <view class="top-r-dot">
          <view></view>
          <view></view>
          <view></view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import dayjs from "dayjs";
import { avatarHandle, getLoginUser } from "@/js/global";

export default {
  name: "user",
  data() {
    return {
      nickname: '',
      avatar: '',
      createTime: '-'
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      let user = getLoginUser()
      this.avatar = avatarHandle(user.avatar)
      this.nickname = user.nickname
      this.createTime = dayjs(user.createTime).format('YYYY-MM-DD')
    },
    userEdit() {
      uni.navigateTo({
        url: '/pages/user-edit/index'
      })
    }
  }
}

// TODO
</script>

<style scoped lang="scss">
@import "../style";
</style>
