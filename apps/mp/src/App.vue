<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";

onLaunch(() => {
  console.log("[残助通] App Launch");
});
onShow(() => {
  console.log("[残助通] App Show");
});
onHide(() => {
  console.log("[残助通] App Hide");
});
</script>

<style>
page {
  background-color: #f7f8fa;
  color: #0f172a;
  font-size: 28rpx;
  line-height: 1.6;
}
</style>
