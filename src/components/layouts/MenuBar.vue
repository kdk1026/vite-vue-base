<template>
    <nav class="nav-style">
        <ul class="ul-style">
            <li class="li-style">
                <router-link to="/" class="a-style">홈</router-link>
                <router-link to="/vuex" class="a-style">Vuex</router-link>
            </li>
        </ul>
    </nav>
</template>

<script setup>

</script>

<style scoped>
/* 1. nav 스타일 (메뉴바 전체 컨테이너) */
.nav-style {
    background-color: #333;     /* 배경색 */
    padding: 10px 0;                /* 상하 패딩 */
    color: white;               /* 텍스트 기본 색상 */
    text-align: center;             /* 중앙 정렬 */
}

/* 2. ul 스타일 (리스트 컨테이너) */
.ul-style {
    list-style: none;
    padding: 0;
    margin: 0;
    /* 항목들을 중앙에 정렬하기 위해 flex 사용 */
    display: flex;
    justify-content: center;        /* 중앙 정렬 */
}

/* 3. li 스타일 (개별 메뉴 항목 컨테이너) */
.li-style {
    /* li 내의 Link들을 flex로 가로로 나열 */
    display: flex;
    padding: 0;
    margin: 0;
    align-items: center;
}

/* 4. Link 스타일 (개별 링크) */
.a-style {
    color: white;           /* 링크 색상 */
    text-decoration: none;      /* 밑줄 제거 */
    /* **여백 확보**: 좌우에 충분한 패딩을 주어 항목 간 간격을 만듭니다. */
    padding: 0 20px;            /* '0' (상하), '20px' (좌우) */
    cursor: pointer;            /* 마우스 커서 */
}
</style>