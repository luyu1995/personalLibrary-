import home from '../pages/home.vue'
import test from '../pages/test.vue'
import login from '../pages/login.vue'
import perfectUserInfo from '../pages/perfect_userInfo.vue'
import imgDetail from '../pages/img_detail.vue'
import production from '../pages/production.vue'
import collection from '../pages/collection.vue'
import collectionDetail from '../pages/collection_detail.vue'
const routes = [
  {
    path: '/',
    name: 'test',
    component: test,
  },
  {
    path: '/home',
    name: 'home',
    component: home,
  },
  {
    path: '/login',
    name: 'login',
    component: login,
  },
  {
    path: '/perfect_userInfo',
    name: 'perfect_userInfo',
    component: perfectUserInfo,
  },
  {
    path: '/img_detail',
    name: 'imgDetail',
    component: imgDetail,
  },
  {
    path: '/production',
    name: 'production',
    component: production,
  },
  {
    path: '/collection',
    name: 'collection',
    component: collection,
  },
  {
    path: '/collection_detail',
    name: 'collectionDetail',
    component: collectionDetail,
  },

]
// mode:'hash'
export default routes
