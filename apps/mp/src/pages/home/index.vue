<template>
  <view class="page">
    <view class="hero">
      <text class="brand">残助通</text>
      <text class="tagline">查得清政策，问得清权利</text>
    </view>
    <view class="card">
      <text class="card-title">快捷入口</text>
      <view class="actions">
        <navigator url="/pages/library/index" open-type="switchTab" class="action">政策库</navigator>
        <navigator url="/pages/ask/index" open-type="switchTab" class="action">问一问</navigator>
        <navigator url="/pages/a11y/index" class="action">无障碍说明</navigator>
      </view>
    </view>
    <view class="card">
      <text class="card-title">政策速览</text>
      <view v-if="loading" class="empty"><text>加载中…</text></view>
      <view v-else-if="error" class="empty"><text>{{ error }}</text></view>
      <view v-else-if="policies.length === 0" class="empty">
        <text>暂无精选政策。</text>
      </view>
      <navigator
        v-for="item in policies"
        :key="item.id"
        :url="'/pages/policy-detail/index?id=' + item.id"
        class="policy-row"
      >
        <text class="policy-title">{{ item.title }}</text>
        <text class="policy-summary">{{ item.summary }}</text>
      </navigator>
    </view>
    <view class="disclaimer"><text>{{ disclaimer }}</text></view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onShow } from "@dcloudio/uni-app";
import {
  listFeaturedPolicies,
  loadPoliciesCatalog,
  type PolicyRecord,
} from "../../data/policies";

const loading = ref(true);
const error = ref("");
const policies = ref<PolicyRecord[]>([]);
const disclaimer = ref(
  "本应用整理自公开发布的法律法规和政府文件，供查询参考，不构成法律意见或官方答复。具体申办条件、标准和材料以户籍地或常住地残联、民政、人社、教育等部门最新文件为准。",
);

onShow(async () => {
  loading.value = true;
  error.value = "";
  try {
    const catalog = await loadPoliciesCatalog();
    if (catalog.disclaimer) disclaimer.value = catalog.disclaimer;
    policies.value = listFeaturedPolicies();
  } catch (e) {
    error.value = e instanceof Error ? e.message : String(e);
    policies.value = [];
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.page { padding: 32rpx; }
.hero { margin-bottom: 32rpx; }
.brand { display: block; font-size: 48rpx; font-weight: 700; color: #0f172a; }
.tagline { display: block; margin-top: 8rpx; color: #64748b; font-size: 28rpx; }
.card { background: #fff; border-radius: 20rpx; padding: 28rpx; margin-bottom: 24rpx; box-shadow: 0 4rpx 24rpx rgba(15, 23, 42, 0.04); }
.card-title { display: block; font-size: 32rpx; font-weight: 600; margin-bottom: 20rpx; }
.actions { display: flex; flex-wrap: wrap; gap: 16rpx; }
.action { background: #eff6ff; color: #1d4ed8; padding: 16rpx 24rpx; border-radius: 999rpx; font-size: 26rpx; }
.empty { color: #64748b; font-size: 26rpx; }
.policy-row { display: block; padding: 20rpx 0; border-top: 1px solid #e2e8f0; }
.policy-title { display: block; font-weight: 600; }
.policy-summary { display: block; color: #64748b; font-size: 24rpx; margin-top: 6rpx; }
.disclaimer { margin-top: 16rpx; color: #94a3b8; font-size: 22rpx; line-height: 1.7; }
</style>
