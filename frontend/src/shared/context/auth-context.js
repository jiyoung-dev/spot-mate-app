import { createContext } from 'react';

// 사용자 인증상태를 위한 컨택스트 함수. 인자로 초기화할 객체들을 정의함
export const AuthContext = createContext({
    isLoggedIn: false,
    token: null,
    userId: null,
    login: () => {},
    logout: () => {},
});
