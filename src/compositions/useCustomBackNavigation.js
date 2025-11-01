import { watch } from 'vue';
import { useRoute } from 'vue-router';

const SESSION_KEY_CURRENT_URI = 'currentURI';
const SESSION_KEY_PREV_URI = 'prevURI';
// 네비게이션 제어는 Vue Router의 Navigation Guard 사용
// 스크롤 복원 로직은 Vue Router의 scrollBehavior에서 처리

export function useCustomBackNavigation() {
    const route = useRoute();

    // URI 기록
    watch(() => route.path, (currentURI) => {
        const prevURI = sessionStorage.getItem(SESSION_KEY_CURRENT_URI);
        
        sessionStorage.setItem(SESSION_KEY_PREV_URI, prevURI || currentURI); 
        sessionStorage.setItem(SESSION_KEY_CURRENT_URI, currentURI);
    }, { immediate: true });
}