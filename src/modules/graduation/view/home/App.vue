<template>
  <div id="app">
    <el-header style="display: flex;background-color:rgba(31, 31, 31,0.9)" v-if="$route.path!='/login'">
      <img :src="require('../../source/images/logo.png')" style="width: 78px;height: 61px;display:flex">
      <div style="display: flex;margin-left: 148px; margin-top: 17px;">
        <div class="nav" >
          <a href="#header" > 首页</a>
          <a href="#exhibition"> 作品展示</a>
          <a href="#study"> 学习制作</a>
          <a href="#collection"> 收藏品</a>
          <a href="#meaasge"> 留言</a>
          <a href="#news"> 新闻资讯</a>
        </div>
        <div style="display: flex;justify-content: center;width: 200px;color:#fff">
          <el-input v-show="flag" size="mini" placeholder="请输入内容" v-model="searchValue"></el-input>
          <i class="icon iconfont icon-shousuo" style="font-size: 24px;margin-left:10px;margin-right: 26px;" @click="flag=!flag"></i>
        </div>
        <!--&lt;!&ndash;未登录&ndash;&gt;-->
        <div style="color: #fff">
          <i class="icon iconfont icon-denglu" style="fontSize:27px"></i>
          <a style="font-size: 14px;line-height: 35px;cursor: pointer;" v-show="!hiddenFlag" @click="login">登录/注册</a>
        </div>
      </div>
    </el-header>
    <router-view></router-view>
  </div>
</template>

<script>
  import {getUserInfo,getToken} from "../../../../utils/request";

  export default {
    name: 'app',
    data() {
      return {
        hiddenFlag:false,
        searchValue:'',
        flag:false,
      }
    },
    beforemounted() {
      if(getToken('access_token')){
        console.log("-----------")

      }
    },
    methods:{
      //登录
      login(){
        router.push("/login")
      },
      //显示搜索框
      showFlag(){
        this.flag=true,
        this.iFlag=false
      }
    }
  }
</script>

<style scoped>
  .nav a{
    text-decoration:none;
    out-line: none;
    color:white;
    font-size: 18px;
    letter-spacing: 5px;
    margin: auto 20px;
  }
  .nav a:hover{
    font-size: 18px;
    letter-spacing: 5px;
    margin: auto 20px;
    font-weight: bold;
    padding-bottom: 4px;
    border-bottom: 3px solid #000;
    cursor: pointer;
  }

</style>
