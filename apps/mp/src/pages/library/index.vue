<template>
  <view class="page">
    <view class="search">
      <input
        class="input"
        type="text"
        confirm-type="search"
        placeholder="搜索政策标题或关键词（壳层占位）"
        :value="keyword"
        @input="onInput"
      />
    </view>
    <view v-if="filtered.length === 0" class="empty card">
      <text class="empty-title">政策库为空</text>
      <text class="empty-desc">当前为小程序壳，未内置金额/链接等种子数据。请对接主站 API 或静态 JSON 后再填充列表。</text>
    </view>
    <navigator
      v-for="item in filtered"
      :key="item.id"
      :url="'/pages/policy-detail/index?id=' + item.id"
      class="card row"
    >
      <text class="title">{{ item.title }}</text>
      <text class="meta">{{ item.level }}</text>
      <text class="summary">{{ item.summary }}</text>
    </navigator>
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { POLICY_PLACEHOLDERS } from "../../data/policies";

const keyword = ref("");
const onInput = (e: { detail?: { value?: string } }) => {
  keyword.value = e.detail?.value || "";
};

const filtered = computed(() => {
  const q = keyword.value.trim();
  if (!q) return POLICY_PLACEHOLDERS;
  return POLICY_PLACEHOLDERS.filter(
    (p) => p.title.includes(q) || p.summary.includes(q),
  );
});
</script>

<style scoped>
.page { padding: 24rpx; }
.search { margin-bottom: 20rpx; }
.input { background: #fff; border-radius: 16rpx; padding: 20rpx 24rpx; }
.card { background: #fff; border-radius: 20rpx; padding: 28rpx; margin-bottom: 20rpx; }
.empty-title { display: block; font-weight: 600; font-size: 30rpx; margin-bottom: 8rpx; }
.empty-desc { color: #64748b; font-size: 26rpx; }
.row .title { display: block; font-weight: 600; font-size: 30rpx; }
.row .meta { display: block; color: #2563eb; font-size: 22rpx; margin: 8rpx 0; }
.row .summary { display: block; color: #64748b; font-size: 24rpx; }
</style>
