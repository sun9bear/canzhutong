<template>
  <view class="page">
    <view v-if="loading" class="card">
      <text class="body">加载中…</text>
    </view>
    <view v-else-if="error" class="card">
      <text class="title">加载失败</text>
      <text class="body">{{ error }}</text>
    </view>
    <view v-else class="card">
      <text class="title">{{ title }}</text>
      <text class="meta">{{ meta }}</text>
      <text class="section-label">摘要</text>
      <text class="body">{{ summary }}</text>
      <view v-if="keyPoints.length" class="block">
        <text class="section-label">要点</text>
        <text v-for="(pt, i) in keyPoints" :key="i" class="point">· {{ pt }}</text>
      </view>
      <view v-if="eligibility" class="block">
        <text class="section-label">适用对象</text>
        <text class="body">{{ eligibility }}</text>
      </view>
      <view v-if="howToApply" class="block">
        <text class="section-label">如何办理</text>
        <text class="body">{{ howToApply }}</text>
      </view>
      <view v-if="bodyText" class="block">
        <text class="section-label">正文摘录</text>
        <text class="body">{{ bodyText }}</text>
      </view>
      <view v-if="sourceUrl" class="block">
        <text class="section-label">来源</text>
        <text class="body">{{ sourceName || sourceUrl }}</text>
        <text class="link" @click="openSource">打开原文链接</text>
      </view>
    </view>
    <view class="disclaimer"><text>{{ disclaimer }}</text></view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import {
  categoryLabel,
  getPolicyById,
  levelLabel,
  loadPoliciesCatalog,
} from "../../data/policies";

const loading = ref(true);
const error = ref("");
const title = ref("政策详情");
const meta = ref("");
const summary = ref("");
const keyPoints = ref<string[]>([]);
const eligibility = ref("");
const howToApply = ref("");
const bodyText = ref("");
const sourceName = ref("");
const sourceUrl = ref("");
const disclaimer = ref(
  "本应用整理自公开发布的法律法规和政府文件，供查询参考，不构成法律意见或官方答复。具体申办条件、标准和材料以户籍地或常住地残联、民政、人社、教育等部门最新文件为准。",
);

function openSource() {
  if (!sourceUrl.value) return;
  uni.setClipboardData({
    data: sourceUrl.value,
    success: () => {
      uni.showToast({ title: "链接已复制", icon: "none" });
    },
  });
}

onLoad(async (query) => {
  const id = (query?.id as string) || "";
  loading.value = true;
  error.value = "";
  try {
    const catalog = await loadPoliciesCatalog();
    if (catalog.disclaimer) disclaimer.value = catalog.disclaimer;
    const item = id ? getPolicyById(id) : undefined;
    if (item) {
      title.value = item.title;
      meta.value = [
        levelLabel(item.level, catalog),
        item.regionName,
        categoryLabel(item.category, catalog),
        item.status,
        item.docNo,
        item.issuedAt ? "发布 " + item.issuedAt : "",
      ]
        .filter(Boolean)
        .join(" · ");
      summary.value = item.summary || "暂无摘要。";
      keyPoints.value = item.keyPoints || [];
      eligibility.value = item.eligibility || "";
      howToApply.value = item.howToApply || "";
      bodyText.value = item.body || "";
      sourceName.value = item.sourceName || "";
      sourceUrl.value = item.sourceUrl || "";
    } else {
      title.value = "未找到政策";
      meta.value = id ? "id: " + id : "";
      summary.value = "该 id 不在当前政策库中，请返回列表重试。";
    }
  } catch (e) {
    error.value = e instanceof Error ? e.message : String(e);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.page { padding: 24rpx; }
.card { background: #fff; border-radius: 20rpx; padding: 28rpx; }
.title { display: block; font-size: 36rpx; font-weight: 700; }
.meta { display: block; color: #2563eb; margin: 12rpx 0 20rpx; font-size: 24rpx; }
.section-label { display: block; margin-top: 20rpx; font-weight: 600; color: #1d4ed8; font-size: 26rpx; }
.body { display: block; color: #334155; font-size: 28rpx; line-height: 1.7; margin-top: 8rpx; }
.point { display: block; color: #334155; font-size: 26rpx; line-height: 1.6; margin-top: 6rpx; }
.block { margin-top: 8rpx; }
.link { display: block; margin-top: 12rpx; color: #2563eb; font-size: 26rpx; }
.disclaimer { margin-top: 24rpx; color: #94a3b8; font-size: 22rpx; line-height: 1.7; }
</style>
