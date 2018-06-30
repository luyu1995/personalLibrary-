<template>
  <div id="login" :style="{backgroundImage: 'url(' + loginBg + ')' }">
    <div >
      <div class="container w3layouts agileits" >
        <div class="login" v-show="!registerFlag">
          <h3 style="color:rgba(10,10,10,0.77);text-align: center">登 录</h3>
          <el-form :model="formItem" id="userLogin" ref="formItem"  :rules="rulesLogin" label-width="80px" label-position="right">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="formItem.username"  size="small" placeholder="用户名"  ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="formItem.password"  size="small" type="password" placeholder="密码" ></el-input>
            </el-form-item>
              <el-button type="info"  size="small" style="margin-left: 39px;margin-top: 20px;width: 90%;" @click="userLogin('formItem')">登 录</el-button>
          </el-form>
          <div class="social-icons w3layouts agileits">
            <span style="color: rgba(10,10,10,0.77)">还没有账号？<a style="color: #CF680A" @click="registerFlag=true">请注册</a></span>
            <p>- 其他方式登录 -</p>
            <ul>
              <li class="qq"><a href="#">
              <span class="icons w3layouts agileits">
               <img :src="require('../../../source/images/QQ.png')">
              </span>
                <span class="text w3layouts agileits">QQ</span></a></li>
              <li class="weixin w3ls"><a href="#">
              <span class="icons w3layouts">
                   <img :src="require('../../../source/images/weixin.png')">
              </span>
                <span class="text w3layouts agileits">微信</span></a></li>
              <li class="weibo aits"><a href="#">
              <span class="icons agileits">
                   <img :src="require('../../../source/images/weibo.png')">
              </span>
                <span class="text w3layouts agileits">微博</span></a></li>
              <div class="clear"> </div>
            </ul>
          </div>
          <div class="clear"></div>
        </div>
        <div class="register w3layouts agileits" v-show="registerFlag">
          <h3 style="color: rgba(10,10,10,0.77);text-align: center">注 册</h3>
          <el-form :model="form" ref="form" id="userRegister" :rules="rulesRegister"
                   label-width="70px" style="padding:0 60px;" label-position="right">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="form.username" size="small" placeholder="用户名" ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="form.password"  size="small" type="password" placeholder="密码" ></el-input>
            </el-form-item>
            <el-form-item label="昵称" prop="nick_name">
              <el-input v-model="form.nick_name"  size="small" placeholder="昵称" ></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-radio-group v-model="form.sex" >
                <el-radio label="0">男</el-radio>
                <el-radio label="1">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="年龄">
              <el-input-number v-model="form.age"  size="mini" :min="1" :max="140" style="width: 100%"></el-input-number>
            </el-form-item>
            <el-form-item label="邮箱" >
              <el-input v-model="form.email"  size="small" placeholder="邮箱" ></el-input>
            </el-form-item>
            <el-button type="info" style="margin-left: 37px;margin-top: 28px;width: 90%;"  size="small" @click="userRegister('form')">注 册</el-button>
          </el-form>
          <div class="clear"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {request,saveToken,getToken} from "/src/utils/request";
  import  api from '../../../api/api'

  export default {
    data(){
      return{
        registerFlag:false,
        formItem:{
          username:'',
          password:''
        },
        form:{
          username:'',
          password:'',
          email:'',
          age:'',
          sex:'',
          nick_name:''
        },
        loginBg:'',
        rulesRegister:{
          username:[
            { required: true, message: '请输入用户名', trigger: 'blur' ,whitespace: true},
            ],
          password:[
            { required: true, message: '请输入密码', trigger: 'blur',whitespace: true },
            { min: 6, message: '至少为六位字符', trigger: 'blur' }
          ],
          nick_name:[
            { required: true, message: '请输入昵称', trigger: 'blur',whitespace: true },
          ],
        },
        rulesLogin:{
          username:[
            { required: true, message: '请输入用户名', trigger: 'blur' ,whitespace: true},
          ],
          password:[
            { required: true, message: '请输入密码', trigger: 'blur',whitespace: true },
          ],
        }
      }
    },
    mounted(){
        console.log(this.$route.params.usertype)
    },
    methods:{
      //用户登录
      async userLogin(formItem){
        this.$refs[formItem].validate(async (valid) => {
          if (valid) {
            let res = await request({
              url: api.userLogin,
              method: 'post',
              data: {
                username: this.formItem.username,
                password: this.formItem.password
              }
            })
              if (res.code == '00000') {
                this.$message.success("登陆成功!")
                saveToken( res.result[0].id,'access_token')
                this.$store.commit('userInfo', res.result[0])
                router.push({
                  path:'/',
                  name:'home',
                  params:{
                    success:true
                  }
                })
              }else{

              }
          }else{
            this.$message.error("请输入必填项！")
          }
        })
      },
      //用户注册
      async userRegister(form){
        this.$refs[form].validate(async (valid) => {
          if (valid) {
            let res = await request({
              url: api.userRegister,
              method: 'post',
              data: {
                username: this.form.username,
                password: this.form.password,
                email: this.form.email,
                sex: this.form.sex,
                age: this.form.age,
                nick_name: this.form.nick_name,
                admin_level:'1'
              }
            })
            if (res && res.result) {
              this.$message.success("注册成功!")
            }
          }else{
            this.$message.error("请输入必填项！")
          }
        })
      }
    },
    created(){
      this.loginBg=require('../../../source/images/loginbg.jpg')
    }
  }
</script>
<style>
  #userRegister form{
    font:none;
  }
  #userRegister .el-form-item{
    margin-bottom: 20px
  }
  #userRegister .el-form-item__label{
    color: rgba(10,10,10,0.77);
  }
  #userRegister .el-radio__label{
    color: rgba(10,10,10,0.77);
  }
  #userLogin .el-form-item{
    margin-bottom: 20px
  }
</style>
<style scoped>
  @import '../../../assets/iconfont/iconfont.css';
  #login {
    height:calc(100vh);
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /*-- Reset Code --*/

  article, aside, details, figcaption, figure,footer, header, hgroup, menu, nav, section {display: block;}
  ol,ul{list-style:none;padding:0;margin:0;}
  blockquote,q{quotes:none;}
  blockquote:before,blockquote:after,q:before,q:after{content:'';content:none;}
  table{border-collapse:collapse;border-spacing:0;}
  a{text-decoration:none;}
  .clear{clear:both;}
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
  .container {
    width: 100% !important;
    margin: 0 auto;
    padding: 10px 40px 30px;
    background-color: rgba(253,253,253,0.97);
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
  .social-icons {
    margin-top: 20px;
    text-align: center;
  }

  .social-icons p {
    color: rgba(10,10,10,0.47);
    margin-bottom: 15px;
  }

  .social-icons ul li {
    float: left;
    width: 32.9%;
  }
  .social-icons ul li a {
    display:block;
  }

  .social-icons ul li a span {
    vertical-align: middle;
    color: rgba(10,10,10,0.77);
    font-size: 15px;
  }

  .social-icons ul li span.icons {
    width: 30px;
    height: 30px;
    display: inline-block;
  }


  .social-icons ul li a:hover span.icons {
    transform: rotatey(360deg);
    transition: .5s all;
  }

  .login a {
    color: #CCC;
  }

  .login a:hover {
    color: #FFF;
  }

  .register {
    width: 100%;
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

</style>