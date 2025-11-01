import { createRouter, createWebHashHistory } from "vue-router";
import Main from "@/pages/sample/Main.vue";
import Vuex from "@/pages/sample/Vuex.vue";

const routes = [
    { path: '/', component: Main },
    { path: '/vuex', component: Vuex }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        // Vue Router의 표준 스크롤 복원
        if ( savedPosition ) {
            return new Promise((resolve) => {
                const delay = to.path === '/' ? 2000 : 1000;
                setTimeout(() => {
                    resolve(savedPosition);
                }, delay);
            });
        }
        return { top: 0, left: 0 };
    }
});

const moveMainTarget = [
    '/communication/partner/complete',
    '/communication/visit-before-inquire/complete',
    '/communication/visit-after-inquire/write', '/communication/visit-after-inquire/complete',
    '/login/email'
];

/**
 * 💡 전역 before Guard 설정
 * Navigation Guard는 to, from, next 함수를 인수로 받습니다.
 * - to: 이동할 대상 라우트 객체
 * - from: 현재 라우트 객체
 * - next: 탐색을 제어하는 함수
 */
router.beforeEach((to, from, next) => {
    // 세션 스토리지에서 이전/현재 URI를 가져옵니다.
    const SESSION_KEY_CURRENT_URI = 'currentURI';
    const SESSION_KEY_PREV_URI = 'prevURI';
    
    // 네비게이션 타입이 'POP'인지 확인하는 것은 from과 to의 히스토리 스택 순서로 간접적으로 알 수 있지만,
    // React 코드의 의도(브라우저의 뒤로가기)에 따라 세션 스토리지를 활용합니다.
    const prevURI = sessionStorage.getItem(SESSION_KEY_PREV_URI);

    // 1. 특정 경로에서 뒤로가기 시 메인으로 강제 리디렉션
    if (moveMainTarget.includes(prevURI) && to.path === from.path) {
        // 'POP' 네비게이션이 발생했고, 이전 페이지가 'moveMainTarget'에 포함되는 경우
        // from.path와 to.path가 같다는 것은 브라우저가 POP을 시도했지만, 
        // 우리가 훅에서 저장한 URI 기록에 따르면 이전 URI가 특정 경로였다는 것을 의미합니다.
        
        // 200ms 지연 후 메인으로 리디렉션
        setTimeout(() => {
            // next('/') 대신 `router.replace`를 사용하여 Navigation Guard 외부에서 처리하는 것이 
            // 가드 내부의 복잡성을 줄이고 비동기적인 리디렉션 요구사항을 충족합니다.
            router.replace('/'); 
        }, 200);

        // 현재 탐색을 취소하고 `setTimeout` 내부에서 리디렉션을 처리합니다.
        return; // next()를 호출하지 않고 탐색을 취소합니다.
    }

    const currentURI = sessionStorage.getItem(SESSION_KEY_CURRENT_URI);
    
    // 2. 현재 URI가 메인 페이지일 때 다시 메인으로 강제 리디렉션
    // React 코드에서는 `handlePopState`가 호출될 때 `currentURI === '/'`이면 
    // `Maps('/', { replace: true })`를 호출하고 `return` 했습니다.
    // 이는 사용자가 메인 페이지에서 뒤로 가기를 시도할 때, 메인 페이지에 머무르도록 하는 효과를 냅니다.
    if (currentURI === '/' && to.path === from.path) {
        // from과 to가 모두 메인 페이지인 경우, 브라우저가 뒤로가기를 시도했으나
        // 히스토리 스택에 남아있는 경우입니다.
        setTimeout(() => {
            router.replace('/'); 
        }, 200);
        return; // 탐색 취소
    }

    // 위의 조건에 해당하지 않으면 탐색을 정상적으로 진행합니다.
    next();
});

export { router }