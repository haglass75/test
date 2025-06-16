<template>
  <div class="settings">
    <h1>{{ t("settings.title") || "설정" }}</h1>

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
      <p style="color: #fff; margin: 0">
        테스트 번역: {{ t("settings.title") }}
      </p>
    </div>

    <!-- 알림 설정 -->
    <section class="card">
      <h2>
        <i class="icon">🔔</i>
        {{ t("settings.notifications.title") || "알림 설정" }}
      </h2>
      <div
        v-for="(item, key) in notificationSettings"
        :key="key"
        class="setting-row">
        <div>
          <strong>{{ t(item.title) || item.title }}</strong>
          <p>{{ t(item.description) || item.description }}</p>
        </div>
        <input type="checkbox" v-model="item.enabled" />
      </div>
    </section>

    <!-- 테마 설정 -->
    <section class="card">
      <h2>
        <i class="icon">🎨</i> {{ t("settings.theme.title") || "테마 설정" }}
      </h2>
      <div class="setting-row">
        <div>
          <strong>{{
            t("settings.theme.darkMode.title") || "다크 모드"
          }}</strong>
          <p>
            {{
              t("settings.theme.darkMode.description") ||
              "어두운 테마로 전환합니다."
            }}
          </p>
        </div>
        <input type="checkbox" v-model="theme.darkMode" />
      </div>

      <div class="setting-row">
        <div>
          <strong>{{
            t("settings.theme.colorTheme.title") || "색상 테마"
          }}</strong>
          <p>
            {{
              t("settings.theme.colorTheme.description") ||
              "인터페이스의 주요 색상을 선택합니다."
            }}
          </p>
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
      <h2>
        <i class="icon">⚙️</i> {{ t("settings.system.title") || "시스템 설정" }}
      </h2>
      <div class="setting-row">
        <div>
          <strong>{{
            t("settings.system.autoSave.title") || "자동 저장"
          }}</strong>
          <p>
            {{
              t("settings.system.autoSave.description") ||
              "변경사항을 자동으로 저장합니다."
            }}
          </p>
        </div>
        <input type="checkbox" v-model="system.autoSave" />
      </div>
      <div class="setting-row">
        <div>
          <strong>{{ t("settings.system.language.title") || "언어" }}</strong>
          <p>
            {{
              t("settings.system.language.description") ||
              "인터페이스 언어를 선택합니다."
            }}
          </p>
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
      <h2>
        <i class="icon">💾</i> {{ t("settings.data.title") || "데이터 관리" }}
      </h2>
      <div class="setting-row">
        <div>
          <strong>{{
            t("settings.data.backup.title") || "데이터 백업"
          }}</strong>
          <p>
            {{
              t("settings.data.backup.description") ||
              "모든 데이터를 백업합니다."
            }}
          </p>
        </div>
        <button class="btn blue">
          {{ t("settings.data.backup.button") || "백업하기" }}
        </button>
      </div>
      <div class="setting-row">
        <div>
          <strong>{{
            t("settings.data.restore.title") || "데이터 복원"
          }}</strong>
          <p>
            {{
              t("settings.data.restore.description") ||
              "백업된 데이터를 복원합니다."
            }}
          </p>
        </div>
        <button class="btn green">
          {{ t("settings.data.restore.button") || "복원하기" }}
        </button>
      </div>
    </section>

    <!-- 저장 버튼 -->
    <div class="save-button">
      <button class="btn blue">
        {{ t("settings.saveButton") || "설정 저장" }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from "vue";
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n();

const selectedLang = ref(locale.value);

// 컴포넌트 마운트 시 현재 언어 설정
onMounted(() => {
  console.log("Settings 컴포넌트 마운트, 현재 언어:", locale.value);
  selectedLang.value = locale.value;
});

const setLanguage = async (lang) => {
  try {
    console.log("언어 변경 시도:", lang);
    console.log("변경 전 locale.value:", locale.value);

    // i18n locale 변경
    locale.value = lang;

    // localStorage 저장
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("language", lang);
      console.log("localStorage에 저장됨:", lang);
    }

    // selectedLang 업데이트
    selectedLang.value = lang;

    // DOM 업데이트 대기
    await nextTick();

    // 강제 리렌더링을 위한 추가 처리
    if (typeof window !== "undefined") {
      // 브라우저 환경에서만 실행
      const event = new CustomEvent("languageChanged", {
        detail: { language: lang },
      });
      window.dispatchEvent(event);

      // 페이지 리로드 없이 강제 업데이트
      document.dispatchEvent(new Event("DOMContentLoaded"));
    }

    console.log("변경 후 locale.value:", locale.value);
    console.log("언어 변경 완료:", lang);

    // 추가 확인
    setTimeout(() => {
      console.log("1초 후 locale.value 확인:", locale.value);
      console.log("1초 후 selectedLang.value 확인:", selectedLang.value);
    }, 1000);
  } catch (error) {
    console.error("언어 설정 중 오류:", error);
    // 오류가 발생해도 locale은 변경
    locale.value = lang;
    selectedLang.value = lang;
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
