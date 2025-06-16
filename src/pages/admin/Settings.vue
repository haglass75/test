<template>
  <div class="settings" :key="forceUpdate">
    <h1>{{ t("settings.title") }}</h1>

    <!-- 디버깅 정보 -->
    <div
      style="
        background: #333;
        padding: 10px;
        margin-bottom: 20px;
        border-radius: 5px;
      ">
      <p style="color: #fff; margin: 0">현재 언어: {{ locale }}</p>
      <p style="color: #fff; margin: 0">선택된 언어: {{ selectedLang }}</p>
      <p style="color: #fff; margin: 0">강제 업데이트 키: {{ forceUpdate }}</p>
    </div>

    <!-- 알림 설정 -->
    <section class="card">
      <h2><i class="icon">🔔</i> {{ t("settings.notifications.title") }}</h2>
      <div
        v-for="(item, key) in notificationSettings"
        :key="key"
        class="setting-row">
        <div>
          <strong>{{ t(item.title) }}</strong>
          <p>{{ t(item.description) }}</p>
        </div>
        <input type="checkbox" v-model="item.enabled" />
      </div>
    </section>

    <!-- 테마 설정 -->
    <section class="card">
      <h2><i class="icon">🎨</i> {{ t("settings.theme.title") }}</h2>
      <div class="setting-row">
        <div>
          <strong>{{ t("settings.theme.darkMode.title") }}</strong>
          <p>{{ t("settings.theme.darkMode.description") }}</p>
        </div>
        <input type="checkbox" v-model="theme.darkMode" />
      </div>

      <div class="setting-row">
        <div>
          <strong>{{ t("settings.theme.colorTheme.title") }}</strong>
          <p>{{ t("settings.theme.colorTheme.description") }}</p>
        </div>
        <div class="color-options">
          <span
            v-for="color in colorOptions"
            :key="color"
            :style="{ backgroundColor: color }"
            :class="{ selected: theme.color === color }"
            @click="theme.color = color"
            class="color-circle" />
        </div>
      </div>
    </section>

    <!-- 시스템 설정 -->
    <section class="card">
      <h2><i class="icon">⚙️</i> {{ t("settings.system.title") }}</h2>
      <div class="setting-row">
        <div>
          <strong>{{ t("settings.system.autoSave.title") }}</strong>
          <p>{{ t("settings.system.autoSave.description") }}</p>
        </div>
        <input type="checkbox" v-model="system.autoSave" />
      </div>
      <div class="setting-row">
        <div>
          <strong>{{ t("settings.system.language.title") }}</strong>
          <p>{{ t("settings.system.language.description") }}</p>
        </div>
        <select v-model="selectedLang" @change="setLanguage(selectedLang)">
          <option value="ko">한국어</option>
          <option value="en">English</option>
          <option value="ja">日本語</option>
        </select>
      </div>
    </section>

    <!-- 데이터 관리 -->
    <section class="card">
      <h2><i class="icon">💾</i> {{ t("settings.data.title") }}</h2>
      <div class="setting-row">
        <div>
          <strong>{{ t("settings.data.backup.title") }}</strong>
          <p>{{ t("settings.data.backup.description") }}</p>
        </div>
        <button class="btn blue">{{ t("settings.data.backup.button") }}</button>
      </div>
      <div class="setting-row">
        <div>
          <strong>{{ t("settings.data.restore.title") }}</strong>
          <p>{{ t("settings.data.restore.description") }}</p>
        </div>
        <button class="btn green">
          {{ t("settings.data.restore.button") }}
        </button>
      </div>
    </section>

    <!-- 저장 버튼 -->
    <div class="save-button">
      <button class="btn blue">{{ t("settings.saveButton") }}</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";
import { SUPPORTED_LANGUAGES, forceChangeLanguage } from "../../i18n/index.js";

const { t, locale } = useI18n();
const selectedLang = ref(locale.value);
const forceUpdate = ref(0); // 강제 리렌더링을 위한 키

// 언어 변경 이벤트 리스너
const handleLanguageChange = (event) => {
  console.log("언어 변경 이벤트 수신:", event.detail);
  forceUpdate.value++;
};

// 컴포넌트 마운트 시 현재 언어 설정
onMounted(() => {
  selectedLang.value = locale.value;

  // 언어 변경 이벤트 리스너 등록
  if (typeof window !== "undefined") {
    window.addEventListener("language-changed", handleLanguageChange);
  }
});

// 컴포넌트 언마운트 시 이벤트 리스너 제거
onUnmounted(() => {
  if (typeof window !== "undefined") {
    window.removeEventListener("language-changed", handleLanguageChange);
  }
});

// 언어 변경 함수
const setLanguage = (lang) => {
  if (SUPPORTED_LANGUAGES.includes(lang)) {
    console.log("언어 변경 시도:", lang);

    // 강제 언어 변경 함수 사용
    forceChangeLanguage(lang);
    selectedLang.value = lang;

    // 강제 리렌더링
    forceUpdate.value++;

    console.log("언어 변경 완료:", lang);
  }
};

// 상태
const notificationSettings = {
  email: {
    title: "settings.notifications.email.title",
    description: "settings.notifications.email.description",
    enabled: ref(true),
  },
  push: {
    title: "settings.notifications.push.title",
    description: "settings.notifications.push.description",
    enabled: ref(true),
  },
  cancel: {
    title: "settings.notifications.cancel.title",
    description: "settings.notifications.cancel.description",
    enabled: ref(true),
  },
};

const theme = ref({
  darkMode: true,
  color: "#3498db",
});

const colorOptions = ["#3498db", "#2ecc71", "#e74c3c", "#f1c40f", "#9b59b6"];

const system = ref({
  autoSave: true,
});
</script>

<style scoped>
.settings {
  padding: 20px;
  color: #fff;
  background: #121a2f;
  font-family: sans-serif;
}

h1 {
  color: red;
  font-size: 24px;
  margin-bottom: 16px;
}

.card {
  background: #1e273b;
  padding: 16px;
  margin-bottom: 20px;
  border-radius: 10px;
}

h2 {
  font-size: 18px;
  margin-bottom: 12px;
}

.setting-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.setting-row p {
  font-size: 12px;
  margin: 4px 0 0;
  color: #bbb;
}

.color-options {
  display: flex;
  gap: 10px;
  margin-top: 8px;
}

.color-circle {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid transparent;
}

.color-circle.selected {
  border-color: #fff;
}

select {
  padding: 4px 8px;
  background: #2c3e50;
  color: #fff;
  border: none;
  border-radius: 5px;
}

.btn {
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  color: white;
}

.btn.blue {
  background: #3b82f6;
}

.btn.green {
  background: #10b981;
}

.save-button {
  display: flex;
  justify-content: flex-end;
}
</style>
