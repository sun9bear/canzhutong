<template>
  <view class="page">
    <view class="card">
      <text class="title">问一问</text>
      <text class="desc">智能咨询壳层。接入主站 LLM / 会话 API 前，仅展示输入与提示。</text>
      <textarea
        class="textarea"
        :value="question"
        maxlength="500"
        placeholder="例如：两项补贴怎么申请？我能领吗？"
        @input="onInput"
      />
      <button class="btn" type="primary" @click="onAsk">提交问题</button>
      <text v-if="hint" class="hint">{{ hint }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";

const question = ref("");
const hint = ref("");

const onInput = (e: { detail?: { value?: string } }) => {
  question.value = e.detail?.value || "";
};

const onAsk = () => {
  const q = question.value.trim();
  if (!q) {
    hint.value = "请先输入问题。";
    return;
  }
  hint.value = "小程序壳尚未对接问答 API。请在主站 H5「问一问」体验完整能力，或后续配置后端地址。";
  uni.showToast({ title: "暂未对接 API", icon: "none" });
};
</script>

<style scoped>
.page { padding: 24rpx; }
.card { background: #fff; border-radius: 20rpx; padding: 28rpx; }
.title { display: block; font-size: 34rpx; font-weight: 700; }
.desc { display: block; color: #64748b; margin: 12rpx 0 24rpx; font-size: 26rpx; }
.textarea { width: 100%; min-height: 220rpx; background: #f8fafc; border-radius: 16rpx; padding: 20rpx; box-sizing: border-box; }
.btn { margin-top: 24rpx; background: #2563eb; }
.hint { display: block; margin-top: 20rpx; color: #b45309; font-size: 24rpx; }
</style>
