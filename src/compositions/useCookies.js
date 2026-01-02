/**
 * @example
 * const { setCookie, getCookie, removeCookie } = useCookies();
 * 
 * @returns 
 */
export const useCookies = () => {
    /**
     * 일반 쿠키 생성
     * @param {string} name 
     * @param {string} value 
     * @param {boolean} isLocal 
     * @param {object} options 
     * @returns 
     */
    const setCookie = (name, value, isLocal, options) => {
        const shouldUseSecure = !isLocal;

        const updatedOptions = {
            ...options,
            secure: shouldUseSecure ? true : options.secure
        };

        return $cookies.set(
            name,
            value,
            updatedOptions.expire,
            updatedOptions.path,
            updatedOptions.domain,
            updatedOptions.secure,
            updatedOptions.sameSite
        );
    };

    /**
     * 쿠키 값 가져오기
     * @param {string} name 
     */
    const getCookie = (name) => {
        return $cookies.get(name);
    };

    /**
     * 쿠키 삭제
     * @param {string} name 
     * @param {boolean} isLocal 
     * @param {object} options 
     * @returns 
     */
    const removeCookie = (name, isLocal, options) => {
        const shouldUseSecure = !isLocal;
        const updatedOptions = { 
            ...options, 
            ...(shouldUseSecure && { secure: true }) 
        };

        return $cookies.remove(
            name, 
            updatedOptions.path,
            updatedOptions.domain,
            updatedOptions.secure,
            updatedOptions.sameSite
        );
    };

    /**
     * Array 쿠키 생성
     * @param {string} name 
     * @param {Array} array 
     * @param {boolean} isLocal 
     * @param {object} options 
     */
    const setArrayInCookie = (name, array, isLocal, options) => {
        if ( array && Array.isArray(array) && array.length > 0 ) {
            //JSON.stringify(array) 자동으로 해줌
            setCookie(name, array, isLocal, options);
        }
    };

    /**
     * Object 쿠키 생성
     * @param {string} name 
     * @param {object} object 
     * @param {boolean} isLocal 
     * @param {object} options 
     */
    const setObjectInCookie = (name, object, isLocal, options) => {
        if ( object && !Array.isArray(object) && Object.keys(object).length > 0 ) {
            //JSON.stringify(object) 자동으로 해줌
            setCookie(name, object, isLocal, options);
        }
    };

    return {
        setCookie,
        getCookie,
        removeCookie,
        setArrayInCookie,
        setObjectInCookie
    }
};