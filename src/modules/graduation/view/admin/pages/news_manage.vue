<template>
  <div id="newsManage">
    <el-row>
      <el-col :span="24">
        <el-button type="primary" size="small" icon="el-icon-plus" @click="addData">添加</el-button>
        <el-button type="primary" size="small" icon="el-icon-search" @click="clickSearch">搜索</el-button>
        <el-button type="primary" size="small" icon="el-icon-check" @click="getAllNews">全部新闻</el-button>
      </el-col>
      <el-col :span="24">
        <el-table :data="tableData" style="width: 100%;margin-top: 20px">
          <el-table-column
            type="index"
            align="center"
            label="序号"
            width="100">
          </el-table-column>
          <el-table-column
            label="新闻标题"
            prop="title"
            align="center"
            width="280">
            <template slot-scope="scope" >
              <el-tooltip class="item" effect="dark" :content="scope.row.title" placement="top">
                <span style="width: 100px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{ scope.row.title }}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            label="作者"
            prop="publishName"
            align="center"
            width="200">
          </el-table-column>
          <el-table-column
            label="发布时间"
            prop="ctime"
            align="center"
            width="200">
            <template slot-scope="scope">
              {{changeTime(scope)}}
            </template>
          </el-table-column>
          <el-table-column
            label="新闻内容"
            align="center"
            prop="content">
            <template slot-scope="scope">
              <a @click="showDetail(scope)"  style="overflow:hidden; text-overflow:ellipsis;white-space:nowrap;cursor:pointer">{{scope.row.content}}</a>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="text"
                         @click="editNews(scope)">编辑</el-button>
              <span style="color:#e8e8e8 ">|</span>
              <el-button size="mini"
                         type="text"
                         @click="deleteNews(scope)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @current-change="changeCurrentChange"
          :current-page.sync="currentPage"
          :total="total * 1"
          class="paging">
        </el-pagination>
      </el-col>
    </el-row>
    <!--内容详情-->
    <el-dialog title="内容详情" :visible.sync="contentDetailVisible"  :close-on-click-modal="false"
               :close-on-press-escape="false">
        <p>新闻标题：{{newTitle}}</p>
        <p>内容详情：{{content}}</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="contentDetailVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
    <!--搜索-->
    <el-dialog title="搜索" :visible.sync="searchVisible" :close-on-click-modal="false"
               :close-on-press-escape="false" >
      <el-form :model="formItem" ref="formItem">
        <el-form-item label="搜索条件" :label-width="formLabelWidth">
          <el-input v-model="formItem.content" size="small" placeholder="搜索范围为新闻标题、作者、内容"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="searchVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="sureSearch">确 定</el-button>
    </span>
    </el-dialog>
    <!--编辑、添加-->
    <el-dialog :title="title" :visible.sync="editFormVisible" :close-on-click-modal="false"
               :close-on-press-escape="false" >
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="新闻标题" prop="title" :label-width="formLabelWidth">
          <el-input v-model="form.title" size="small" placeholder="请输入新闻标题"></el-input>
        </el-form-item>
        <el-form-item label="作者" :label-width="formLabelWidth">
          <el-input v-model="form.publishName"  size="small" placeholder="请输入作者姓名"></el-input>
        </el-form-item>
        <el-form-item label="新闻内容简介" :label-width="formLabelWidth">
          <el-input v-model="form.content"  size="small" type="textarea"  placeholder="请输入新闻内容"></el-input>
        </el-form-item>
        <el-form-item label="原文网址" :label-width="formLabelWidth">
          <el-input placeholder="请输入内容" size="small" v-model="form.httpUrl">
            <template slot="prepend">Https://</template>
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="clearData">取 消</el-button>
        <el-button type="primary" size="small" @click="sureEdit('form')">确 定</el-button>
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
          title:'',
          content:'',
          ctimeValue:'',
          httpUrl:'',
          publishName:''
        },
        editFormVisible:false,
        title:'',
        newTitle:'',
        formItem:{
          content:'',
        },
        formLabelWidth:'100px',
        tableData:[],
        content:'',
        searchVisible:false,
        contentDetailVisible:false,
        rules:{
          title: [
            { required: true, message: '请输入新闻标题', trigger: 'blur' },
          ],
        },
        id:''
      }
    },
    mounted(){
         this.getAllNews()
    },
    methods:{
      //点击搜索按钮
      clickSearch(){
        this.searchVisible=true
        this.formItem.content=""
      },
      //跳转页面
      changeCurrentChange(currentPage){
        this.currentPage=currentPage
        this.getAllNews()
      },
      //获取全部新闻
      async getAllNews(){
        let res =await request({
          url:api.newsSelect,
          method:'post',
          data:{
            page:this.currentPage,
            page_size:10
          }
        })
        if(res && res.result&& res.result.data){
          this.tableData=res.result.data
          this.total=res.result.total
        }
      },
      //转换时间
      changeTime(scope){
        return dateFormat(scope.row.ctime*1000,'yyyy-mm-dd')
      },
      //内容详情
      showDetail(scope){
        this.contentDetailVisible=true
        this.content=scope.row.content
        this.newTitle=scope.row.title
      },
      //搜索新闻
      async sureSearch(){
        let res =await request({
          url:api.newsSelect,
          method:'post',
          data:{
            content:this.formItem.content,
          }
        })
        if(res && res.result&& res.result.data){
          this.searchVisible=false
          this.tableData=res.result.data
          this.total=res.result.total
          this.currentPage=1
        }
      },
      //添加新闻
      addData(){
        this.title="添加新闻"
        this.editFormVisible=true
        this.form.title='',
        this.form.content=''
        this.form.httpUrl = ""
        this.form.publishName=""
      },
      //点击编辑按钮
      async editNews(scope){
        this.title="修改新闻信息"
        this.editFormVisible=true
        this.form.title = scope.row.title
        this.form.content = scope.row.content
        this.form.httpUrl = scope.row.httpUrl.substring(8)
        console.log( this.form.httpUrl)
        this.form.publishName = scope.row.publishName
        this.id=scope.row.id
//        this.form.ctimeValue=dateFormat(scope.row.ctime * 1000,'yyyy-mm-dd')
      },
      //编辑新闻
      async sureEdit(formName){
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
             if(this.title=="添加新闻"){
               let res = await request({
                 url:api.newsAdd,
                 method:'post',
                 data:{
                   title: this.form.title,
                   content: this.form.content,
                   publishName:this.form.publishName,
                   httpUrl:'https://'+this.form.httpUrl
                 }
               })
               if(res ){
                 this.$message({type: 'success', message: '添加成功!'});
                 this.editFormVisible=false
                 this.currentPage=1
                 this.getAllNews()
               }else {
                 this.$message(res.message)
               }
             }else {
               let res = await request({
                 url: api.newsUpdate,
                 method: 'post',
                 data: {
                   id: this.id,
                   title: this.form.title,
                   content: this.form.content,
                   publishName:this.form.publishName,
                   httpUrl:'https://'+this.form.httpUrl
                 }
               })
               if (res) {
                 this.$message({type: 'success', message: '修改成功!'});
                 this.editFormVisible = false
                 this.currentPage=1
                 this.getAllNews()
               } else {
                 this.$message(res.message)
               }
             }
          }else{
            this.$message({type: 'error', message: '表单验证失败!'});
          }
        });
      },
      //删除新闻
      async deleteNews(scope){
        this.$confirm('是否确定删除', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
           let res =await request({
             url:api.newsDelete,
             method:'post',
             data:{
               id:scope.row.id
             }
           })
           if(res){
             this.$message({
               type: 'success',
               message: '删除成功!'
             });
             this.currentPage=1
             this.getAllNews()
           }
        }).catch(() => {
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
  .paging {
    float: right;
    margin: 20px 0 20px auto;
  }
</style>
