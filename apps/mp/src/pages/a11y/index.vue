<template>
  <view class="page">
    <view class="card">
      <text class="title">无障碍说明</text>
      <text class="p">残助通小程序壳面向残障用户与照护者，后续将逐步对齐主站无障碍能力，包括：</text>
      <view class="list">
        <text class="li">· 大字号 / 高对比阅读模式</text>
        <text class="li">· 减少动效与清晰焦点</text>
        <text class="li">· 语音朗读与语音输入（视端能力）</text>
        <text class="li">· 语义化结构与足够触控热区</text>
      </view>
      <text class="p">当前为脚手架阶段：页面使用系统导航栏与原生组件，便于微信开发者工具审阅结构。完整无障碍开关请先使用主站 H5「无障碍」面板。</text>
      <text class="p muted">如在使用中遇到障碍，欢迎通过主站反馈。紧急情况请拨打 110 / 120；政策咨询可拨打 12385。</text>
    </view>
  </view>
</template>

<script setup lang="ts"></script>

<style scoped>
.page { padding: 24rpx; }
.card { background: #fff; border-radius: 20rpx; padding: 28rpx; }
.title { display: block; font-size: 36rpx; font-weight: 700; margin-bottom: 16rpx; }
.p { display: block; margin: 12rpx 0; color: #334155; font-size: 28rpx; line-height: 1.7; }
.list { margin: 12rpx 0 8rpx; }
.li { display: block; color: #0f172a; font-size: 28rpx; line-height: 1.8; }
.muted { color: #64748b; font-size: 24rpx; }
</style>
