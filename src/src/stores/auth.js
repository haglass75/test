// Pinia에서 스토어를 정의하기 위해 defineStore를 불러옴
import { defineStore } from "pinia";

// 'auth'라는 이름의 인증 스토어 정의
export const useAuthStore = defineStore("auth", {

  // 상태(state): 로그인 상태 및 사용자 정보 저장
  state: () => ({
  
    // 로컬스토리지에 저장된 로그인 상태를 불러와 초기값으로 사용
    isLoggedIn: localStorage.getItem("isLoggedIn") === "true",

    // 저장된 사용자 이름 또는 기본값 '' 
    // Pinia에서 userName으로 자동 저장
    userName: localStorage.getItem("userName") || "",

    // 저장된 이메일 또는 기본값 ''
    userEmail: localStorage.getItem("userEmail") || "",
  }),

  // 계산된 값(getters): 상태를 기반으로 값을 가공하여 제공
  getters: {
    // 사용자 이름 반환
    getUserName: (state) => state.userName,

    // 로그인 여부 반환
    getIsLoggedIn: (state) => state.isLoggedIn,
  },

  // 상태를 변경하는 메서드 정의
  actions: {

    // 로그인 처리 메서드
    // 보통 로그인 폼 데이터를 담아서 넘겨주는 객체
    // login() 함수를 호출할 때 userData를 전달하면, 함수 안에서 그 값을 받아서 사용
    // userData는 어디선가 직접 전달해줘야 해요.
    login(userData) {
      // 로그인 상태 true로 변경
      this.isLoggedIn = true;

      // 이메일에서 '@' 앞부분을 이름으로 설정
      // this.userName = userData.email.split("@")[0];
      this.userName = userData.name;

      // 이메일 저장
      this.userEmail = userData.email;

      // 로컬스토리지에 로그인 정보 저장
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userName", this.userName);
      localStorage.setItem("userEmail", this.userEmail);
      if (userData.phone) {
      localStorage.setItem("userPhone", userData.phone);
    }
    },
    // 로그아웃 처리 메서드
    logout() {
      // 상태 초기화
      this.isLoggedIn = false;
      this.userName = "";
      this.userEmail = "";

      // 로컬스토리지에서도 삭제
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userName");
      localStorage.removeItem("userEmail");
    },
    //회원가입
     async signup(formData) {
      // 로컬스토리지에 users 배열이 없으면 초기화
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      // 새 사용자 정보 추가
      users.push({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        address: formData.address,
        role: formData.role}),
        localStorage.setItem("users", JSON.stringify(users));

      // 로그인 상태로 전환하고 정보 저장
      this.login({
        name: formData.name,
        email: formData.email,
        phone: formData.phone, 
      });
       // 호출한 컴포넌트에서 then/catch로 처리할 수 있게 Promise 반환
      return Promise.resolve();
  },
},
});