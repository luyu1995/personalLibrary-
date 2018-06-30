import Home from '../pages/home.vue'
import Login from '../pages/login.vue'
import newsManage from '../pages/news_manage.vue'
import wordManage from '../pages/word_manage.vue'
import photoManage from '../pages/photo_manage.vue'
import userManage from '../pages/user_manage.vue'
import about from '../pages/about.vue'
import order from '../pages/order.vue'
//https://router.vuejs.org/zh-cn/essentials/passing-props.html
const routes = [
  {
    path: '/home',
    name: 'home',
    redirect:'/news_manage',
    component: Home,
    children:[
      {
        path: '/news_manage',
        name: 'news_manage',
        component: newsManage,
      },
      {
        path: '/order',
        name: 'order',
        component: order,
      },
      {
        path: '/word_manage',
        name: 'word_manage',
        component: wordManage,
      },
      {
        path: '/photo_manage',
        name: 'photo_manage',
        component: photoManage,
      },
      {
        path: '/user_manage',
        name: 'user_manage',
        component: userManage,
      },
      {
        path: '/about',
        name: 'about',
        component: about,
      },
    ]
  },
  {
    path: '/',
    name: 'login',
    component: Login,
  },
]
// mode:'hash'
export default routes
