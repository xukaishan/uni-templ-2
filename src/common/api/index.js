import { defineConfig, createInstance, createApis } from '@littlekai/easy-api-uni';


function streamType(config) {
    return ['blob', 'arraybuffer', 'stream'].includes(config.responseType);
}

function responseCodeFormat(code) {
    // 代表成功的code todo
    return code;
}

/**
 * 响应format
 * @param response
 * @param format
 * @returns
 */
function responseFormat(response, format = false) {
    // 如果http状态码正常，则直接返回数据
    if (response && (response.status === 200 || response.status === 304)) {
        if (format && (response.data.errcode || response.data.code)) {
            return {
                errcode: response.data.errcode || responseCodeFormat(response.data.code),
                errmsg: response.data.errmsg || response.data.msg,
                data: response.data.data,
            };
        } else {
            if (streamType(response.config)) { // 流类型直接返回
                return response;
            }
            return response.data;
        }
    }

    // 异常状态下，保持格式统一
    return {
        errcode: response.status,
        errmsg: '请检查网络或稍后重试(' + response.status + ')',
        statusText: response.statusText,
        data: response.data,
    };
}

defineConfig({
    timeout: 30000,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    responseFormat, // responseFormat is used to transform the request's response
    // ...  your other axios config
});

export const instance = createInstance();

// 请求拦截器
instance.interceptors.request.use(
    config => {
        if (!config.headers) {
            config.headers = defaultOpts.headers;
        }
        config.headers['qz-token'] = '';
        return config;
    },
    error => {
        return Promise.error(error);
    },
);

// 响应拦截器
instance.interceptors.response.use(
    response => {
        if (response.status === 200 || response.status === 304) {
            console.log('response interceptors=>', response);

            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    // 服务器状态码不是200的情况
    error => {
        const response = { status: -404, statusText: '本地网络错误' };
        return Promise.reject(error.response || response);
    },
);

export default createApis;
