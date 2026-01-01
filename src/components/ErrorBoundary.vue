<template>
    <div>
        <slot v-if="!hasError"></slot>

        <div v-else role="alert" class="container-style">
            <h2 style="color: #721c24;">🚨 오류가 발생했습니다 🚨</h2>
            <p>애플리케이션을 사용하는 동안 문제가 발생했습니다.</p>

            <!-- 에러 메시지 표시 (선택 사항) -->
            <details style="white-space: pre-wrap; margin: 15px 0; min-width: 80%; overflow: auto; text-align: left;">
                <summary style="cursor: pointer; font-weight: bold;">오류 상세 정보 보기</summary>
                <pre style="color: #721c24; background-color: #f5c6cb; padding: 10px; border-radius: 4px;">
                    {{ error?.message }}
                </pre>
            </details>

            <button
                class="button-style"
                @click="handleGoHome"
            >
                🏠 홈으로 돌아가기
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, onErrorCaptured } from 'vue';
import { useRouter } from 'vue-router';

// 오류 상태를 저장할 반응형 변수
const hasError = ref(false);
const error = ref(null);

const router = useRouter();

// 자식 컴포넌트에서 발생한 오류를 포착하는 훅
onErrorCaptured((err, instance, info) => {
    console.error("Vue Error Captured:", err, instance, info);
    hasError.value = true;
    error.value = err;

    // false를 반환하면 오류가 더 이상 상위로 전파되는 것을 막습니다. (바운더리 역할)
    return false; 
});

// 오류 상태를 초기화하고 자식 컴포넌트를 다시 렌더링하는 함수
const resetError = () => {
    hasError.value = false;
    error.value = null;
};

const handleGoHome = () => {
    resetError();
    router.push('/');
};
</script>

<style scoped>
.container-style {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    text-align: center;
    background-color: #f8d7da;
    color: #721c24;
    padding: 20px;
    border-radius: 8px;
    border: 1px solid #f5c6cb;
}

.button-style {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    transition: background-color 0.3s;
}
</style>