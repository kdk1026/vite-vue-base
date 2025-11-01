import { ref, watch, onMounted } from "vue";
import { useRouter } from "vue-router";

export function useApi(apiFunction, initialParams = [], callOnInit = true) {
    const router = useRouter();

    const apiParams = ref(initialParams);
    const apiData = ref(null);
    const apiPaging = ref(null);
    const prevParams = ref(null);

    const callApi = async (params = apiParams.value) => {
        if ( params[0] instanceof FormData ) {
            //
        } else {
            try {
                if ( JSON.stringify(params) === JSON.stringify(prevParams.value) ) {
                    return;
                }
                prevParams.value = params;
            } catch (error) {
                console.error("JSON 문자열 변환 실패:", error);  
            }
        }

        try {
            const res = await apiFunction(...params);

            if ( res && res.data ) {
                if ( res.data.list ) {
                    apiData.value = res.data.list;
                } else if ( res.data.data ) {
                    apiData.value = res.data.data;
                } else {
                    apiData.value = res.data;
                }
    
                if ( res.data.paging ) {
                    apiPaging.value = res.data.paging;
                }
            }

            return res ? res.data : nul;
        } catch (error) {
            if ( error.status === 999 ) {
                router.push("/error-network");
            }

            console.log(error);
        }
    };

    watch(() => initialParams, (newParams) => {
        try {
            if ( JSON.stringify(apiParams.value) !== JSON.stringify(newParams) ) {
                apiParams.value = newParams;
            }
        } catch (error) {
            console.error("JSON 문자열 변환 실패:", error);  
        }
    });

    if ( callOnInit ) {
        onMounted(() => {
            callApi(apiParams.value);
        });
    }

    return {
        apiData, apiPaging,
        callApi,
    };
}
