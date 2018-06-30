<template>
  <div id="adminHome">
    <div class="menu">
      <span style="line-height: 2; font-size: 23px;font-weight: bold;margin-left: 20px;">后台管理</span>
      <div style="position: absolute;top: 6px;right:30px;z-index:100">
        <el-button  type="text" style="height: 44px;" @click.native="gotoWeb">返回前台页面</el-button>
        <el-button  type="text" style="height: 44px;" @click.native="logOut">退出</el-button>
      </div>
    </div>
    <el-row class="tac">
      <el-col :span="3">
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
        router >
          <el-menu-item index="/news_manage">
            <i class="icon iconfont icon-xinwenguanli"></i>
            <span slot="title">新闻管理</span>
          </el-menu-item>
          <el-menu-item index="/word_manage">
            <i class="icon iconfont icon-liuyan"></i>
            <span slot="title">留言管理</span>
          </el-menu-item>
          <el-menu-item index="/user_manage">
            <i class="icon iconfont icon-iconset0202"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
          <el-menu-item index="/photo_manage">
            <i class="icon iconfont icon-image"></i>
            <span slot="title">图片管理</span>
          </el-menu-item>
          <el-menu-item index="/order">
            <i class="icon iconfont icon-dingdandaifukuan"></i>
            <span slot="title">订单列表</span>
          </el-menu-item>
          <el-menu-item index="/about">
            <i class="icon iconfont icon-gongsixinxi1"></i>
            <span slot="title">公司简介</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="21" style="padding: 20px">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default{
    data(){
      return{

      }
    },
    mounted(){
      console.log(this.$route.path)
    },
    methods:{
      //前往前台页面
      gotoWeb(){
          window.open('http://localhost:8888/graduation/home/index.html#/','_self')
      },
      //退出登录
      logOut(){
        this.$confirm('你确定要退出系统吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          this.out()
          router.replace ( '/' );
          return false
        }).catch(() => {
        });
      },
      async out(){
        // let res = await request ( {
        //   url: smilecampus.log_out,
        //   method: 'get',
        // } )
        // if ( res ) {
        //   if (res.code == '00000') {
        //     window.sessionStorage.removeItem( 'adminInfo' )
        //   }
        // }
      }
    }
  }
</script>
<style scoped>
  @import '../../../assets/iconfont/iconfont.css';

  .menu {
    position: relative;
    z-index: 5;
    height: 3rem;
    background-color: #fff;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
    font-weight: 200;
  }
  #adminHome i{
    font-size: 17px;
    margin-right: 5px;
  }
</style>
