<template>
  <view class="content">
      <text class="title">{{ title }}</text>
      <u-tabbar
        :value="0"
        @change="(name) => (value6 = name)"
        :fixed="true"
        :placeholder="true"
        :safeAreaInsetBottom="true"
      >
        <u-tabbar-item text="首页" icon="home"></u-tabbar-item>
        <u-tabbar-item text="放映厅" icon="photo"></u-tabbar-item>
        <u-tabbar-item text="直播" icon="play-right"></u-tabbar-item>
        <u-tabbar-item text="我的" icon="account"></u-tabbar-item>
      </u-tabbar>
    </view>
</template>

<script>
import apis from '@/common/api/apis.js'
export default {
    data () {
        return {
            title: 'Hello'
        }
    },
    onLoad () {
        apis.getProdCatAndTiTree().then(res => {
            console.log('res=>', res);
        })
    },
    methods: {

    }
}
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin: 200rpx auto 50rpx auto;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
