<script>
	export default {
		onLaunch: function() {
      // 处理顶部高度
      let res = wx.getMenuButtonBoundingClientRect()
      uni.setStorageSync('topValue', res.top)
      uni.setStorageSync('topHeight', res.height)

      // 底部小白条处理
      res = wx.getSystemInfoSync()
      let isAppleAndHasLine = false
      if (res.model.toLowerCase().includes("ip")) {
        const regex = /\d+/g;
        const matches = res.model.match(regex);
        if (matches && matches.length > 0) {
          isAppleAndHasLine = matches[0] > 8
        } else {
          isAppleAndHasLine = res.model.toLowerCase().includes('x')
        }
      }
      uni.setStorageSync('isAppleAndHasLine', isAppleAndHasLine)
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
  @import '@/css/style.scss';
</style>
