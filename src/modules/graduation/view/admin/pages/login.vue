<template>
    <div  id="loginBox"  :style="{backgroundImage: 'url(' + loginBg + ')' }" style="    height: calc(100vh);
    width: calc(100vw);
    overflow: hidden;">
      <div>
        <el-form style="width: 300px;  background-clip: padding-box;
       margin-left: 820px;
    margin-top: 174px;
    width: 300px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6" ref="formValidate" :model="formValidate" :rules="ruleValidate">
          <h3 class="title">后台管理</h3>
          <el-form-item label="" prop="username">
            <el-input v-model="formValidate.username" size="small" placeholder="请输入用户名" ></el-input>
          </el-form-item>
          <el-form-item label="" prop="password">
            <el-input v-model="formValidate.password" size="small" placeholder="请输入密码" type='password'  @keyup.13.native="enter($event)"></el-input>
          </el-form-item>
          <el-button type="primary" size="small" @click="handleSubmit('formValidate')" style="width:100%;margin-bottom: 20px;"
                     :loading="logining">登录
          </el-button>
        </el-form>
      </div>
    </div>
</template>
<script>
  import api from '../../../api/api'
  import {request} from '/src/utils/request'
  export default{
    data(){
      return{
        loginBg:'',
        logining: false,
        formValidate: {
          username:'',
          password : '',
        },
        ruleValidate: {
          username: [{
            required: true,
            message: '用户名不能为空',
            trigger: 'blur'
          }],
          password: [{
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
          }],
        }
      }
    },
    created(){
      this.loginBg=require('../../../source/images/admin_bg.jpg')
    },
    methods:{
      //      回车登录
      enter ( event ) {
        if ( event.keyCode == 13 ) {
          this.handleSubmit ('formValidate')
        }
      },
      //登录
      handleSubmit (name) {
        this.logining = true;
        let _this = this;
        this.$refs[name].validate(async (valid) => {
          if (valid) {
            if(this.formValidate.username=='admin'){
              let res = await request({
                url: api.userLogin,
                method: 'post',
                data: {
                  username:this.formValidate.username,
                  password:this.formValidate.password,
                }
              })
              this.logining = false;
              if (res&& res.code=='00000') {
                router.replace('/home')
              } else {
                this.$message.error(res.message);
              }
            }else{
              this.logining = false;
              this.$message.error('您没有权限！');
            }
          } else {
            this.$message.error('请输入用户名和密码!');
            this.logining = false;
          }
        })
      },
    }
  }
</script>
<style type="text/css">
  #loginBox .title {
    margin: 0px auto 20px auto;
    text-align: center;
    color: #505458;
  }
</style>
