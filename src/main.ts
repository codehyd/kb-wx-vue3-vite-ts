import { createSSRApp } from "vue";
import App from "./App.vue";
import store, { localSetup } from "./store";

import "./static/css/index.less";

export function createApp() {
  const app = createSSRApp(App);
  app.use(store);
  localSetup();
  return {
    app,
  };
}
