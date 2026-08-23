<template>
  <view class="page">
    <view class="search">
      <input
        class="input"
        type="text"
        confirm-type="search"
        placeholder="搜索政策标题或关键词"
        :value="keyword"
        @input="onInput"
      />
    </view>
    <view v-if="loading" class="empty card">
      <text class="empty-title">加载中…</text>
      <text class="empty-desc">正在读取与 H5 相同的政策库数据。</text>
    </view>
    <view v-else-if="error" class="empty card">
      <text class="empty-title">加载失败</text>
      <text class="empty-desc">{{ error }}</text>
      <view class="retry" @click="reload">重试</view>
    </view>
    <view v-else-if="filtered.length === 0" class="empty card">
      <text class="empty-title">无匹配政策</text>
      <text class="empty-desc">试试其他关键词，或清空搜索查看全部。</text>
    </view>
    <navigator
      v-for="item in filtered"
      :key="item.id"
      :url="'/pages/policy-detail/index?id=' + item.id"
      class="card row"
    >
      <text class="title">{{ item.title }}</text>
      <text class="meta">{{ levelOf(item.level) }} · {{ item.regionName }}</text>
      <text class="summary">{{ item.summary }}</text>
    </navigator>
  </view>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { onShow } from "@dcloudio/uni-app";
import {
  levelLabel,
  loadPoliciesCatalog,
  type PolicyRecord,
} from "../../data/policies";

const keyword = ref("");
const loading = ref(true);
const error = ref("");
const items = ref<PolicyRecord[]>([]);

const onInput = (e: { detail?: { value?: string } }) => {
  keyword.value = e.detail?.value || "";
};

function levelOf(level: string) {
  return levelLabel(level);
}

const filtered = computed(() => {
  const q = keyword.value.trim();
  if (!q) return items.value;
  return items.value.filter((p) => {
    const hay = [p.title, p.shortTitle, p.summary, p.keywords, p.regionName, p.docNo].join(" ");
    return hay.includes(q);
  });
});

async function reload() {
  loading.value = true;
  error.value = "";
  try {
    const catalog = await loadPoliciesCatalog();
    items.value = catalog.policies;
  } catch (e) {
    error.value = e instanceof Error ? e.message : String(e);
    items.value = [];
  } finally {
    loading.value = false;
  }
}

onShow(() => {
  void reload();
});
</script>

<style scoped>
.page { padding: 24rpx; }
.search { margin-bottom: 20rpx; }
.input { background: #fff; border-radius: 16rpx; padding: 20rpx 24rpx; }
.card { background: #fff; border-radius: 20rpx; padding: 28rpx; margin-bottom: 20rpx; }
.empty-title { display: block; font-weight: 600; font-size: 30rpx; margin-bottom: 8rpx; }
.empty-desc { color: #64748b; font-size: 26rpx; }
.retry { margin-top: 16rpx; color: #2563eb; font-size: 28rpx; }
.row .title { display: block; font-weight: 600; font-size: 30rpx; }
.row .meta { display: block; color: #2563eb; font-size: 22rpx; margin: 8rpx 0; }
.row .summary { display: block; color: #64748b; font-size: 24rpx; }
</style>
