<template>
  <view class="page">
    <view class="card">
      <text class="title">{{ title }}</text>
      <text class="meta">{{ meta }}</text>
      <text class="body">{{ body }}</text>
    </view>
    <view class="disclaimer"><text>本应用整理自公开发布的法律法规和政府文件，供查询参考，不构成法律意见或官方答复。具体申办条件、标准和材料以户籍地或常住地残联、民政、人社、教育等部门最新文件为准。</text></view>
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import { getPolicyById } from "../../data/policies";

const title = ref("政策详情");
const meta = ref("");
const body = ref("未找到对应政策。壳层未内置政策正文，请从主站数据源加载。");

onLoad((query) => {
  const id = (query?.id as string) || "";
  const item = id ? getPolicyById(id) : undefined;
  if (item) {
    title.value = item.title;
    meta.value = item.level;
    body.value = item.summary || "暂无摘要。";
  } else if (id) {
    title.value = "未找到政策";
    meta.value = `id: ${id}`;
    body.value = "占位列表为空或 id 无效。请对接主站政策数据后再试。";
  }
});
</script>

<style scoped>
.page { padding: 24rpx; }
.card { background: #fff; border-radius: 20rpx; padding: 28rpx; }
.title { display: block; font-size: 36rpx; font-weight: 700; }
.meta { display: block; color: #2563eb; margin: 12rpx 0 20rpx; font-size: 24rpx; }
.body { display: block; color: #334155; font-size: 28rpx; line-height: 1.7; }
.disclaimer { margin-top: 24rpx; color: #94a3b8; font-size: 22rpx; line-height: 1.7; }
</style>
