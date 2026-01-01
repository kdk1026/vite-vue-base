import { ref } from "vue";
import { useRouter } from "vue-router";

export const useApi = (apiFunction, initialParams, callOnInit = true) => {
    const router = useRouter();

    const apiData = ref(null);
    const apiPaging = ref(null);
    const isLoading = ref(false);

    let prevParamsJson = '';

    const callApi = async (...params) => {
        const currentParams = params.length > 0 ? params : initialParams;

        if ( !(currentParams[0] instanceof FormData) ) {
            const paramsJson = JSON.stringify(currentParams);
            if (paramsJson === prevParamsJson) return;
            prevParamsJson = paramsJson;
        }

        isLoading.value = true;

        try {
            const res = await apiFunction(...currentParams);

            if ( res?.data ) {
                const { list, data, paging } = res.data;

                apiData.value = list ?? data ?? res.data;
                if (paging) apiPaging.value = paging;
            }

            return res?.data;
        } catch (error) {
            if ( error.status === 999 ) {
                router.push("/error-network");
            }

            console.log(error);
            throw error;
        } finally {
            isLoading.value = false;
        }
    };

    if ( callOnInit ) {
        callApi(...initialParams);
    }

    return {
        apiData, apiPaging, isLoading,
        callApi,
    };
}
