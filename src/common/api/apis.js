import createApis from '@/common/api';
const options = { headers: { 'Content-Type': 'application/json' } };

const apis = createApis({
    getProdCatAndTiTree: {
        url: '/lcgl-prj/phoneLims/getProdCatAndTiTree',
        method: 'get',
    },
}, '');

export default apis;