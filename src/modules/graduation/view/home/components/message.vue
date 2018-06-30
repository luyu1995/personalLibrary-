<template>
  <div id="meaasge">
    <span class="title">留言</span>
    <div class="content">
      <div class="content-left">
        <el-form ref="form" :model="form" label-width="80px" :rules="rules" inline style="margin-top: 125px">
          <el-form-item label="昵称">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item prop="email" label="邮箱" >
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item prop="content" label="留言内容" >
            <el-input v-model="form.content" type="textarea"   :rows="1"></el-input>
          </el-form-item>
        </el-form>

      </div>
      <div class="content-right">
        <div class="submit-content-one"  >
          <div style="font-size: 35px;color: white" @click="onSubmit">提交</div>
          <span style="font-size: 38px;color: white" @click="onSubmit">Go</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {request} from '/src/utils/request'
  import api from '../../../api/api'
  import dateFormat from 'dateformat'

  export default {
    data(){
      return{
        form:{
          username:'',
          email:'',
          content:''
        },
        rules:{
          email:[
                  { required: true,type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
                ],
          content:[
            {required: true, message: '请输入内容', trigger: 'blur'}
          ]
        }
      }
    },
    methods:{
      //用户留言
      onSubmit(){
        this.$refs["form"].validate(async (valid) => {
          if (valid) {
            let res = await request({
              url:api.wordAdd,
              method:'post',
              data:{
                name: this.form.username,
                content: this.form.content,
                email:this.form.email
              }
            })
            if(res && res.code=="00000"){
              this.$message.success("留言成功")
              this.form.username=""
              this.form.content=""
              this.form.email=""
            }

          }
        })
      }
    }

  }
</script>
<style>
  #meaasge .el-form-item__label{
    color:#fff !important;
  }
  #meaasge .el-input__inner{
    height: 33px;
  }
  #meaasge .el-textarea{
    vertical-align: middle;
  }
</style>
<style scoped>
  .submit-content-one{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 300px;
    transition: all, 1s;
  }
  .title {
    letter-spacing: 3px;
    display: inline-block;
    vertical-align: middle;
    text-align: center;
    font-size: 26px;
    font-weight: 600;
    font-style: normal;
    font-stretch: normal;
    color: #000000;
    margin-left: 16px;
  }
  .content{
    margin-top:20px;
    width: 100%;
    height: 300px;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
  .content-left{
    background: #444444;
    width: 70%;
  }
  .content-right{
    background: #1f1f1f;
    width: 30%;
    position:relative;
  }
  .submit-content-one:hover{
    width: 100%;
    height: 300px;
    position:relative;
    animation:mymove 3s infinite;
  }
  @keyframes mymove{
    from {background: #1f1f1f;}
    to {background: #CF680A;}
  }
</style>