import axios from "axios";
import { API_KEY, REACT_APP_VERSION } from "config/settings";
import parser from "ua-parser-js";

// Get local of the user-mobile
const returnLocale = () => {
    let locale = navigator.language;
    locale = locale.substring(0, 2);
    locale = locale === "fr" ? locale : "en";
    return locale;
};

const instanceApi = axios.create({
    timeout: 40000,
});

const instanceFormData = axios.create({
    timeout: 40000,
});

/**
 * Catch all request and add bearerToken
 */
const headerInterceptor = (config: any) => {
    const locale = returnLocale();
    const ua = parser(navigator.userAgent);

    config.headers = {
        "x-api-key": API_KEY,
        "x-origin": "ADMIN_APP",
        "x-device": ua.os.name,
        "x-app-version": REACT_APP_VERSION,
        "x-brand": ua.browser.name,
        "x-os-version": ua.os.version,
        "x-locale": locale,
        "Accept": "application/json",
        "Content-Type": "application/json",
    };

    const token = localStorage.getItem("@bearerToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
};

/**
 * Catch all request and add bearerToken
 */
const headerFormDataInterceptor = (config: any) => {
    const locale = returnLocale();
    const ua = parser(navigator.userAgent);

    config.headers = {
        "x-api-key": API_KEY,
        "x-origin": "ADMIN_APP",
        "x-device": ua.os.name,
        "x-app-version": REACT_APP_VERSION,
        "x-brand": ua.browser.name,
        "x-os-version": ua.os.version,
        "x-locale": locale,
        "Accept": "multipart/form-data",
        "Content-Type": "multipart/form-data",
    };

    const token = localStorage.getItem("@bearerToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
};
const headerErrorInterceptor = (error: any) => {
    return Promise.reject(error);
};

/**
 * Catch all response and add bearerToken
 */
const responseInterceptor = (res: any) => {
    return res;
};
const responseErrorInterceptor = () => (error: any) => {
    return Promise.reject(error);
};

const setupInterceptors = () => {
    instanceApi.interceptors.response.use(
        responseInterceptor,
        responseErrorInterceptor()
    );

    instanceApi.interceptors.request.use(
        headerInterceptor,
        headerErrorInterceptor
    );

    instanceFormData.interceptors.response.use(
        responseInterceptor,
        responseErrorInterceptor()
    );

    instanceFormData.interceptors.request.use(
        headerFormDataInterceptor,
        headerErrorInterceptor
    );
};

export { instanceApi, instanceFormData, setupInterceptors };
