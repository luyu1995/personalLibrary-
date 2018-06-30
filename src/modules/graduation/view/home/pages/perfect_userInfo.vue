<template>
  <!--注册成功之后个人信息完善页面-->
  <div id="login" :style="{backgroundImage: 'url(' + loginBg + ')'}"
 style=" background-repeat: no-repeat; background-position: center center;background-size: cover;">
    <div >
      <div class="container w3layouts agileits" >
        <div class="register w3layouts agileits">
          <h2>基本信息完善</h2>
          <el-form :model="form" ref="formItem" style="padding:25px 60px;">
            <el-form-item >
              <el-input v-model="form.nick_name" placeholder="昵称" style=" padding: 0px 57px;    margin-left: -22%;margin-bottom: 20px" icon="icon iconfont icon-mima"></el-input>
            </el-form-item>
            <el-form-item >
              <el-input v-model="form.sex" placeholder="性别" style=" padding: 0px 57px;    margin-left: -22%;margin-bottom: 20px"></el-input>
            </el-form-item>
            <el-form-item >
              <el-input v-model="form.age" placeholder="年龄" style=" padding: 0px 57px;    margin-left: -22%;margin-bottom: 20px"></el-input>
            </el-form-item>
            <el-form-item >
              <el-input v-model="form.adress" placeholder="地址" style=" padding: 0px 57px;    margin-left: -22%;margin-bottom: 20px"></el-input>
            </el-form-item>
            <el-form-item >
              <el-input v-model="form.mobile" placeholder="手机号" style=" padding: 0px 57px;    margin-left: -22%;margin-bottom: 20px"></el-input>
            </el-form-item>
            <el-form-item >
              <el-input v-model="form.email" placeholder="邮箱" style=" padding: 0px 57px;    margin-left: -22%;margin-bottom: 20px"></el-input>
            </el-form-item>
            <el-button type="info" style="margin-left: -50px;width: 100%;" @click="saveUserInfo">保 存</el-button>
          </el-form>
          <div class="clear"></div>
        </div>
        <div class="clear"></div>
      </div>
    </div>

  </div>
</template>
<script>
  import {request} from "/src/utils/request";
  import  api from '../../../api/api'

  export default {
    data(){
      return{
        formItem:{
          username:'',
          password:''
        },
        form:{
          username:'',
          password:'',
          email:'',
          age:'',
          sex:''
        },
        loginBg:'',
      }
    },
    mounted(){
      console.log(this.$route.params.usertype)
    },
    methods:{
      //用户登录
      async saveUserInfo(){
        router.push('/')
//        let res = await request ( {
//          url: api.userLogin,
//          method: 'post',
//          data:{
//            username:this.formItem.username,
//            password:this.formItem.password
//          }
//        } )
//        if ( res ) {
//          if (res.code == '00000') {
//            this.$message.success("登陆成功!")
//            router.push('/')
//          }
//        }
      },
    },
    created(){
      this.loginBg=require('../../../source/images/loginbg.jpg')
    }
  }
</script>
<style scoped>
  @import '../../../assets/iconfont/iconfont.css';
  #login {
    height:calc(100vh);
    width: calc(100vw);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /*-- Reset Code --*/

  html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,dl,dt,dd,ol,nav ul,nav li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline;}
  article, aside, details, figcaption, figure,footer, header, hgroup, menu, nav, section {display: block;}
  ol,ul{list-style:none;padding:0;margin:0;}
  blockquote,q{quotes:none;}
  blockquote:before,blockquote:after,q:before,q:after{content:'';content:none;}
  table{border-collapse:collapse;border-spacing:0;}
  a{text-decoration:none;}
  .txt-rt{text-align:right;}
  .txt-lt{text-align:left;}
  .txt-center{text-align:center;}
  .float-rt{float:right;}
  .float-lt{float:left;}
  .clear{clear:both;}
  .pos-relative{position:relative;}
  .pos-absolute{position:absolute;}
  .vertical-base{vertical-align:baseline;}
  .vertical-top{vertical-align:top;}
  .underline{	padding-bottom:3px;	border-bottom: 1px solid #eee;}
  nav.vertical ul li{display:block;}
  nav.horizontal ul li{display: inline-block;}
  img{max-width:100%;}

  /*-- Reset Code --*/



  /*-- Index-Page-Styling --*/

  body {
    font-family: 'Roboto', sans-serif;
    text-align: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
    background-size: cover;
  }

  body a {
    transition:0.5s all;
    text-decoration: none;
  }

  h1 {
    font-size: 45px;
    font-weight: 500;
    letter-spacing: 4px;
    margin: 60px 0;
    color: #FFFFFF;
  }

  .container {
    width: 100%;
    margin: 0 auto;
    padding: 40px;
    background-color: rgba(10, 10, 10, 0.77);
    border: 2px ridge rgba(238, 238, 238, 0.13);
    border-radius: 5px;
    box-shadow:0 2px 15px 3px rgb(162, 161, 160);
    border-bottom: none;
    border-bottom-left-radius: initial;
    border-bottom-right-radius: initial;
  }

  .login {
    text-align: left;
    padding-right: 40px;
  }

  h2 {
    font-size: 35px;
    text-align: left;
    color: #FFF;
    font-weight: 100;
    margin-bottom: 20px;
  }

  .social-icons {
    margin-top: 20px;
    text-align: center;
  }

  .social-icons p {
    color: #CCC;
    margin-bottom: 15px;
  }

  .social-icons ul li {
    float: left;
    width: 32.9%;
  }
  .copyrights{text-indent:-9999px;height:0;line-height:0;font-size:0;overflow:hidden;}
  li.twt {
    margin: 0 2px;
  }

  .social-icons ul li a {
    display:block;
  }

  .social-icons ul li a span {
    vertical-align: middle;
    color: #fff;
    font-size: 15px;
  }

  .social-icons ul li span.icons {
    /*background: url('/src/modules/testVue/source/images/i1.png') no-repeat center;*/
    width: 30px;
    height: 30px;
    display: inline-block;
  }


  .social-icons ul li a:hover span.icons {
    transform: rotatey(360deg);
    transition: .5s all;
  }


  .send-button {
    margin-bottom: 20px;
  }

  .login a {
    color: #CCC;
  }

  .login a:hover {
    color: #FFF;
  }

  .register {
    width: 100%;
    padding-left: 40px;
    text-align: left;
  }

  .register p {
    color: #CCC;
    margin-bottom: 10px;
  }

  .register p a {
    color: #CCC;
  }

  .register p a:hover {
    color: #FFF;
  }

  /*-- Index-Page-Styling --*/









  /*--- Responsive Code ---*/



  @media screen and (max-width: 1920px) {
    h1 {
      margin: 100px 0;
    }
  }

  @media screen and (max-width: 1600px) {
    h1 {
      margin: 60px 0;
    }
  }

  @media screen and (max-width: 1440px) {
    .container {
      width: 53%;
    }
  }

  @media screen and (max-width: 1366px) {
    h1 {
      margin: 50px 0;
    }
    .container {
      width: 57%;
    }
  }

  @media screen and (max-width: 1280px) {
    .container {
      width: 60%;
    }
  }

  @media screen and (max-width: 1024px) {
    .container {
      width: 76%;
    }
  }

  @media screen and (max-width: 966px) {
    .container {
      width: 80%;
    }
    .footer {
      margin: 50px 20px 20px;
    }
  }

  @media screen and (max-width: 853px) {
    .login {
      padding-right: 36px;
    }
    .register {
      padding-left: 36px;
    }
    .social-icons ul li {
      width: 32.8%;
    }
    .register p {
      font-size: 14px;
    }
  }

  @media screen and (max-width: 800px) {
    h1 {
      font-size: 43px;
    }
    .login {
      padding-right: 35px;
    }
    .register {
      padding-left: 34px;
    }
    .social-icons ul li span.icons {
      width: 28px;
    }
  }

  @media screen and (max-width: 768px) {
    .container {
      width: 85%;
    }
    .register p {
      font-size: 13.8px;
    }
  }

  @media screen and (max-width: 736px) {
    h1 {
      font-size: 40px;
    }
    .container {
      width: 87%;
      padding: 35px;
    }
    .login {
      padding-right: 34px;
    }
    .register {
      padding-left: 33px;
    }
    .social-icons ul li a span {
      font-size: 14px;
    }
    .register p {
      font-size: 13.2px;
    }
  }

  @media screen and (max-width: 667px) {
    h1 {
      font-size: 35px;
      letter-spacing: 3px;
    }
    .container {
      width: 55%;
      padding: 50px;
    }
    .login {
      padding: 0;
      width: 100%;
      margin-bottom: 50px;
    }
    .register {
      padding: 40px 0 0 0;
      width: 100%;
      border: none;
      border-top: 1px solid #DDD;
    }
  }

  @media screen and (max-width: 603px) {
    h1 {
      letter-spacing: 2px;
    }
  }

  @media screen and (max-width: 568px) {
    h1 {
      letter-spacing: 1px;
      margin: 30px 0;
    }
    .container {
      width: 60%;
      padding: 40px;
    }
  }

  @media screen and (max-width: 533px) {
    h1 {
      font-size: 32px;
    }
  }

  @media screen and (max-width: 480px) {
    .container {
      width: 70%;
      padding: 35px;
    }
    .send-button input[type="submit"] {
      width: 50%;
      padding: 8px 0;
    }
  }

  @media screen and (max-width: 414px) {
    h1 {
      font-size: 30px;
    }
    .container {
      width: 75%;
      padding: 25px;
    }
    .login {
      margin-bottom: 30px;
    }
    h2 {
      font-size: 30px;
      margin-bottom: 15px;
    }
    .register {
      padding: 30px 0 0 0;
    }
    .footer p {
      font-size: 14px;
    }
  }

  @media screen and (max-width: 384px) {
    h1 {
      letter-spacing: 0px;
    }
  }

  @media screen and (max-width: 375px) {
    .social-icons ul li span.icons {
      width: 27px;
    }
    .register p {
      font-size: 13px;
      line-height: 23px;
    }
  }

  @media screen and (max-width: 360px) {
    .container {
      width: 80%;
      padding: 20px;
    }
  }

  @media screen and (max-width: 320px) {
    .social-icons ul li {
      width: 32.7%;
    }
    .social-icons ul li span.icons {
      width: 25px;
    }
    .social-icons ul li a span {
      font-size: 12.4px;
    }
  }



  /*--- Responsive Code ---*/
</style>