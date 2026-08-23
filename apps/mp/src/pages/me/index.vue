<template>
  <view class="page">
    <view class="card">
      <text class="title">我的</text>
      <text class="desc">微信登录为占位实现。未配置 AppID 时会明确提示，不会静默失败。</text>
      <button class="btn" type="primary" :loading="loading" @click="onLogin">微信登录（占位）</button>
      <text v-if="status" class="status">{{ status }}</text>
    </view>
    <view class="card links">
      <navigator url="/pages/a11y/index" class="link">无障碍说明</navigator>
      <navigator url="/pages/library/index" open-type="switchTab" class="link">前往政策库</navigator>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getMpAppId, stubWxLogin } from "../../utils/auth";

const loading = ref(false);
const status = ref(
  getMpAppId()
    ? `已检测到 VITE_MP_APPID（长度 ${getMpAppId().length}），可尝试登录。`
    : "未配置 AppID",
);

const onLogin = async () => {
  loading.value = true;
  try {
    const result = await stubWxLogin();
    if (result.ok) {
      status.value = `已取得临时 code（长度 ${result.code.length}）。尚未对接后端换取会话。`;
      uni.showToast({ title: "已取得 code", icon: "none" });
    } else {
      status.value = result.message;
      uni.showModal({
        title: "无法登录",
        content: result.message,
        showCancel: false,
      });
    }
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.page { padding: 24rpx; }
.card { background: #fff; border-radius: 20rpx; padding: 28rpx; margin-bottom: 20rpx; }
.title { display: block; font-size: 34rpx; font-weight: 700; }
.desc { display: block; color: #64748b; margin: 12rpx 0 24rpx; font-size: 26rpx; }
.btn { background: #2563eb; }
.status { display: block; margin-top: 20rpx; color: #334155; font-size: 24rpx; white-space: pre-wrap; }
.links .link { display: block; padding: 20rpx 0; color: #2563eb; border-bottom: 1px solid #e2e8f0; }
.links .link:last-child { border-bottom: none; }
</style>
