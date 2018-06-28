<template>
  <el-container>
    <el-main>
      <!--&lt;!&ndash;轮播图和主题内容&ndash;&gt;-->
      <div >
        <el-carousel  :interval="4000" height="400px" style="width: calc(100vw);">
          <el-carousel-item v-for="(item,index) in imgBox" :key="index">
            <img class="carousel" :src="item.url" style="width: 100%;height:400px">
          </el-carousel-item>
        </el-carousel>
        <Exhibition id="exhibition"></Exhibition>
        <Collection id="collection"></Collection>
        <Study id="study"></Study>
        <Message id="meaasge"></Message>
        <News id="news"></News>
      </div>
      <!--&lt;!&ndash;底部&ndash;&gt;-->
      <div id="footer">
        <div class="footer-top">

        </div>
        <div class="footer-bottom">
          <ul>
            <li>
              <strong>YWART.COM</strong>
              <a >精选</a>
              <a >原创艺术</a>
              <a >造艺</a>
              <a >藏艺术</a>
              <a >艺居生活</a>
              <a >我的珍藏</a>
            </li>
            <li>
              <strong>了解我们</strong>
              <a >关于我们</a>
              <a>工作机会</a>
              <a >网站地图</a>
            </li>
            <li>
              <strong>支持与帮助</strong>
              <a >如何购买</a>
              <a >物流说明</a>
              <a >联系我们</a>
            </li>
            <li>
              <strong>合作</strong>
              <a >作品征集</a>
              <a >合作伙伴入驻</a>
            </li>
          </ul>
        </div>
        <p style="margin-left: 174px">京ICP备123456789号 Copyright © 2015-2016 艺术网WWW.luyu.COM 版权所有</p>
      </div>

    </el-main>

  </el-container>
</template>
<script>
  import Exhibition from '../components/exhibition.vue'
  import Collection from '../components/collection.vue'
  import Study from '../components/study.vue'
  import Message from '../components/message.vue'
  import News from '../components/news.vue'

  export default {
    components:{
      Exhibition,
      Collection,
      Study,
      Message,
      News
    },
    data(){
      return{
        flag:false,
        iFlag:true,
        searchValue:'',
        imgBox:[
          {
            url:require('../../../source/images/nav1.jpg')
          },
          {
            url:require('../../../source/images/nav2.jpg')
          },
          {
            url:require('../../../source/images/nav3.jpg')
          },
          {
            url:require('../../../source/images/nav4.jpg')
          }
        ]
      }
    },
    mounted(){

    },
    methods:{
      //登录
      login(value){
          router.push({
            name:'login',
            params:{
              usertype:value
            }
          })
      },
      //显示搜索框
      showFlag(){
        this.flag=true,
        this.iFlag=false
      }
    }
  }
</script>
<style>
  .el-main{
    padding: 0 !important;
    overflow: hidden;
  }
</style>
<style scoped>
  @import '../../../assets/iconfont/iconfont.css';

  body {
    font-family: 'Open Sans', Helvetica, Segoe UI, Arial, sans-serif;
    font-size: 13px;
    line-height: 22px;
    overflow: hidden;
    transition: all .3s;
    color: #73848e;
  }

  #footer {
    width: 100%;
    margin: 0 auto;
    background-color: #34353d;
    padding: 70px 0 10px;
  }
  #footer ul{
    list-style-type: none;
    display: flex;
    justify-content: space-around;
  }
  #footer ul li{
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    margin-right: 130px;
    float: left;
    padding: 0;
    outline: none;
    font-family: 'PingFang SC', 'Microsoft YaHei', 'Helvetica', 'STHeitiSC-Light', 'Arial', 'sans-serif' !important;
  }
  #footer strong{
    padding-bottom: 22px;
    display: block;
    font-size: 18px;
    color: #fff;
  }
  #footer a,p{
    padding: 5px 0;
    display: block;
    text-decoration: none;
    font-size: 14px;
    color: #fff;
    font-family: 'PingFang SC', 'Microsoft YaHei', 'Helvetica', 'STHeitiSC-Light', 'Arial', 'sans-serif' !important;
  }
</style>