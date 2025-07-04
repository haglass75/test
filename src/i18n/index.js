import { createI18n } from "vue-i18n";

// 지원 언어 목록
export const SUPPORTED_LANGUAGES = ["ko", "en", "ja"];

// 번역 메시지
const messages = {
  ko: {
    settings: {
      title: "설정",
      notifications: {
        title: "알림 설정",
        email: {
          title: "이메일 알림",
          description: "새로운 예약 및 변경사항을 이메일로 받습니다.",
        },
        push: {
          title: "푸시 알림",
          description: "실시간 예약 알림을 받습니다.",
        },
        cancel: {
          title: "취소 알림",
          description: "예약 취소 시 알림을 받습니다.",
        },
      },
      theme: {
        title: "테마 설정",
        darkMode: {
          title: "다크 모드",
          description: "어두운 테마로 전환합니다.",
        },
        colorTheme: {
          title: "색상 테마",
          description: "인터페이스의 주요 색상을 선택합니다.",
        },
      },
      system: {
        title: "시스템 설정",
        autoSave: {
          title: "자동 저장",
          description: "변경사항을 자동으로 저장합니다.",
        },
        language: {
          title: "언어",
          description: "인터페이스 언어를 선택합니다.",
        },
      },
      data: {
        title: "데이터 관리",
        backup: {
          title: "데이터 백업",
          description: "모든 데이터를 백업합니다.",
          button: "백업하기",
        },
        restore: {
          title: "데이터 복원",
          description: "백업된 데이터를 복원합니다.",
          button: "복원하기",
        },
      },
      saveButton: "설정 저장",
      savedMessage: "설정이 저장되었습니다.",
    },
  },
  en: {
    settings: {
      title: "Settings",
      notifications: {
        title: "Notification Settings",
        email: {
          title: "Email Notifications",
          description: "Receive new reservations and changes via email.",
        },
        push: {
          title: "Push Notifications",
          description: "Receive real-time reservation notifications.",
        },
        cancel: {
          title: "Cancel Notifications",
          description: "Receive notifications when reservations are cancelled.",
        },
      },
      theme: {
        title: "Theme Settings",
        darkMode: {
          title: "Dark Mode",
          description: "Switch to dark theme.",
        },
        colorTheme: {
          title: "Color Theme",
          description: "Select the main color of the interface.",
        },
      },
      system: {
        title: "System Settings",
        autoSave: {
          title: "Auto Save",
          description: "Automatically save changes.",
        },
        language: {
          title: "Language",
          description: "Select interface language.",
        },
      },
      data: {
        title: "Data Management",
        backup: {
          title: "Data Backup",
          description: "Backup all data.",
          button: "Backup",
        },
        restore: {
          title: "Data Restore",
          description: "Restore backed up data.",
          button: "Restore",
        },
      },
      saveButton: "Save Settings",
      savedMessage: "Settings have been saved.",
    },
  },
  ja: {
    settings: {
      title: "設定",
      notifications: {
        title: "通知設定",
        email: {
          title: "メール通知",
          description: "新しい予約や変更をメールで受け取ります。",
        },
        push: {
          title: "プッシュ通知",
          description: "リアルタイムの予約通知を受け取ります。",
        },
        cancel: {
          title: "キャンセル通知",
          description: "予約キャンセル時に通知を受け取ります。",
        },
      },
      theme: {
        title: "テーマ設定",
        darkMode: {
          title: "ダークモード",
          description: "暗いテーマに切り替えます。",
        },
        colorTheme: {
          title: "カラーテーマ",
          description: "インターフェースのメインカラーを選択します。",
        },
      },
      system: {
        title: "システム設定",
        autoSave: {
          title: "自動保存",
          description: "変更を自動的に保存します。",
        },
        language: {
          title: "言語",
          description: "インターフェースの言語を選択します。",
        },
      },
      data: {
        title: "データ管理",
        backup: {
          title: "データバックアップ",
          description: "すべてのデータをバックアップします。",
          button: "バックアップ",
        },
        restore: {
          title: "データ復元",
          description: "バックアップしたデータを復元します。",
          button: "復元",
        },
      },
      saveButton: "設定を保存",
      savedMessage: "設定が保存されました。",
    },
  },
};

// Vercel 환경에 최적화된 초기 언어 설정
const getInitialLanguage = () => {
  // localStorage 완전 제거, 브라우저 언어 우선, 없으면 ko
  if (typeof window === "undefined") return "ko";
  const browserLang = navigator.language?.split("-")[0];
  if (SUPPORTED_LANGUAGES.includes(browserLang)) return browserLang;
  return "ko";
};

// i18n 인스턴스 생성
const i18n = createI18n({
  legacy: false,
  locale: getInitialLanguage(),
  fallbackLocale: "ko",
  messages,
  globalInjection: true,
  silentTranslationWarn: true,
  silentFallbackWarn: true,
  missingWarn: false,
  fallbackWarn: false,
});

// 강제 언어 변경 함수
export const forceChangeLanguage = (lang) => {
  if (SUPPORTED_LANGUAGES.includes(lang)) {
    console.log("강제 언어 변경:", lang);

    // i18n locale 변경
    i18n.global.locale.value = lang;

    // 강제 리렌더링을 위한 이벤트 발생
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("language-changed", {
          detail: { language: lang },
        })
      );

      // 페이지 리로드 없이 강제 업데이트
      document.dispatchEvent(new Event("DOMContentLoaded"));
    }

    console.log("강제 언어 변경 완료:", lang);
  }
};

export default i18n;
