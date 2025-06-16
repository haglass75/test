import "/src/assets/Main.scss";
import "/src/assets/tailwind.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import i18n from "./i18n";

console.log("main.js 시작");
console.log("i18n 인스턴스:", i18n);
console.log("i18n 현재 언어:", i18n.global.locale.value);
console.log("i18n 사용 가능한 언어:", Object.keys(i18n.global.messages.value));

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(i18n);

console.log("앱 마운트 전 i18n 상태 확인:");
console.log("- 현재 언어:", i18n.global.locale.value);
console.log("- fallback 언어:", i18n.global.fallbackLocale.value);
console.log("- 메시지 키:", Object.keys(i18n.global.messages.value));

app.mount("#app");

console.log("앱 마운트 완료");

if (import.meta.env.PROD) {
  app.config.devtools = false;
}
