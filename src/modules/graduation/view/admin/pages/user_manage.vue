<template>
  <div id="userManage">
        <el-button type="primary" size="small" icon="el-icon-search" @click="searchVisible=true">搜索</el-button>
        <el-button type="primary" size="small" icon="el-icon-search" @click="getAllUsers">全部用户</el-button>
        <el-table :data="tableData" style="width: 100%;margin-top: 20px">
          <el-table-column label="用户名" prop="username" align="center" width="140"></el-table-column>
          <el-table-column label="性别" width="120" align="center" prop="sex">
            <template slot-scope="scope">
              <span v-if="scope.row.sex=='0'"><i class="icon iconfont icon-nan"></i></span>
              <span v-else> <i class="icon iconfont icon-nv"></i></span>
            </template>
          </el-table-column>
          <el-table-column label="年龄" align="center" width="120" prop="age"></el-table-column>
          <el-table-column label="邮箱"  prop="email"  align="center" ></el-table-column>
          <el-table-column label="是否禁言" width="100"  align="center"  prop="disabled">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.disabled" @change='changeDisabled(scope)' :active-value="1" :inactive-value="0"></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100"  align="center" >
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="editUser(scope)">编辑</el-button>
              <span style="color:#e8e8e8 ">|</span>
              <el-button size="mini" type="text" @click="deleteUser(scope)" :disabled="scope.row.username=='admin'">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
    <el-pagination
      @current-change="changeCurrentChange"
      :current-page.sync="currentPage"
      :total="total * 1"
      class="paging">
    </el-pagination>
    <!--搜索-->
    <el-dialog title="搜索" :visible.sync="searchVisible" :close-on-click-modal="false"
               :close-on-press-escape="false" >
      <el-form :model="formItem" ref="formItem">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="formItem.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-radio-group v-model="formItem.sex" >
            <el-radio label="0">男</el-radio>
            <el-radio label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="searchVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="sureSearch">确 定</el-button>
    </span>
    </el-dialog>
    <!--编辑-->
    <el-dialog :title="title" :visible.sync="editFormVisible" :close-on-click-modal="false"
               :close-on-press-escape="false" >
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="用户名" prop="username" :label-width="formLabelWidth">
          <el-input v-model="form.username" disabled placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-radio-group v-model="form.sex" >
            <el-radio label="0">男</el-radio>
            <el-radio label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth" >
          <el-input-number v-model="form.age" size="small" :min="1" :max="100" label="年龄"></el-input-number>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="form.email"  placeholder="请输入新闻内容"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="clearData">取 消</el-button>
        <el-button size="small" type="primary" @click="sureUser('form')">确 定</el-button>
    </span>
    </el-dialog>
  </div>
</template>
<script>
  import {request} from '/src/utils/request'
  import api from '../../../api/api'
  import dateFormat from 'dateformat'
  import _cloneDeep from "lodash/cloneDeep"
  export default{
    data(){
      return{
        currentPage:1,
        total:'',
        form:{
          username:'',
          email:'',
          age:1,
          sex:'0',
          disabled:0
        },
        editFormVisible:false,
        title:'',
        formItem:{
          username:'',
          sex:'',
        },
        formLabelWidth:'100px',
        tableData:[],
        content:'',
        searchVisible:false,
        contentDetailVisible:false,
        rules:{
          username: [
            { required: true, message: '用户名不能为空', trigger: 'blur' },
          ],
          email: [
            { required: true, message: 'email不能为空', trigger: 'blur' },
          ],
        },
        id:''
      }
    },
    mounted(){
       this.getAllUsers()
    },
    methods:{
      changeCurrentChange(currentPage){
        this.currentPage=currentPage
        this.getAllUsers()
      },
      //删除用户
      deleteUser(scope){
        this.$confirm('是否确定删除', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let res =await request({
            url:api.userDelete,
            method:'post',
            data:{
              id:scope.row.id
            }
          })
          if(res && res.code=="00000"){
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getAllUsers()
          }
        }).catch(() => {
        });
      },
      //修改状态
      async changeDisabled(scope){
        let _this=this
        _this.$nextTick(async  function (){
          let res = await request({
            url:api.userDisabled,
            method:'post',
            data:{
              id:scope.row.id,
            }
          })
          if(res && res.result){
            this.getAllUsers()
            this.$message.success('修改成功!');
          }else{
            this.$message(res.message);
          }
        })

      },
      //获取全部用户
      async getAllUsers(){
        let res =await request({
          url:api.userSelect,
          method:'post',
          data:{
            page_size:10,
            page:this.currentPage
          }
        })
        if(res && res.result){
          this.tableData=res.result.data
          this.total=res.result.total
        }
      },
      //转换时间
      changeTime(scope){
        return dateFormat(scope.row,'yyyy-mm-dd')
      },
      //内容详情
      showDetail(scope){
        this.contentDetailVisible=true
        this.content=scope.row.content
      },
      //搜索用户
      async sureSearch(){
        let res =await request({
          url:api.userSelect,
          method:'post',
          data:{
            username:this.formItem.username,
            sex:this.formItem.sex,
          }
        })
        if(res && res.result){
          this.searchVisible=false
          this.tableData=res .result.data
          this.total=res.result.total
        }
      },
      //点击编辑按钮
      async editUser(scope){
        this.title="修改用户信息"
        this.editFormVisible=true
        this.form=_cloneDeep(scope.row)
        this.id=scope.row.id
      },
      //确定编辑用户
      async sureUser(formName){
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
               let res = await request({
                 url: api.userUpdate,
                 method: 'post',
                 data: {
                   id: this.id,
                   username: this.form.username,
                   email: this.form.email,
                   age: this.form.age,
                   sex: this.form.sex,
                 }
               })
               if (res) {
                 this.$message({type: 'success', message: '修改成功!'});
                 this.editFormVisible = false
                 this.currentPage=1
                 this.getAllUsers()
               } else {
                 this.$message(res.message)
               }
          }else{
            this.$message({type: 'error', message: '表单验证失败!'});
          }
        });
      },
      //清空数据
      clearData(){
        let _this = this
        _this.$nextTick(function () {
          _this.$refs['form'].resetFields();
        })
        this.editFormVisible = false
      }
    }
  }
</script>
<style scoped>
 #userManage .iconfont{
   font-size: 32px;
 }
 .paging {
   float: right;
   margin: 20px 0 20px auto;
 }
</style>
