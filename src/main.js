import "/src/assets/Main.scss";
import "/src/assets/tailwind.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import i18n from "./i18n";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(i18n);

app.mount("#app");

if (import.meta.env.PROD) {
  app.config.devtools = false;
}
