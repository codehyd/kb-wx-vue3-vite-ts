<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
onLaunch(() => {
  // 微信云开发
  wx.cloud.init({
    env: "kaibobusiness-6gryb1zf97f97973",
    traceUser: true,
  });
});
// onShow(() => {
//   console.log("App Show");
// });
// onHide(() => {
//   console.log("App Hide");
// });
</script>
<style></style>
