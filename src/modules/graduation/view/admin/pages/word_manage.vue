<template>
  <div id="newsManage">
    <el-row>
      <el-col :span="24">
        <el-button type="primary" size="small" icon="el-icon-search" @click="clickSearch">搜索</el-button>
        <el-button type="primary" size="small" icon="el-icon-search" @click="getAllWord">全部留言</el-button>
      </el-col>
      <el-col :span="24">
        <el-table :data="tableData" width="100%" style="margin-top: 20px">
          <el-table-column type="index" label="序号" align="center" width="100"></el-table-column>
          <el-table-column label="留言者" prop="name" align="center" width="200"></el-table-column>
          <el-table-column label="email" prop="email" align="center" width="240"></el-table-column>
          <el-table-column label="内容" min-width="200" align="center" prop="content">
            <template slot-scope="scope">
              <el-tooltip v-if="scope.row.content" class="item" effect="dark" :content="scope.row.content" placement="top-start">
                <span style="width: 100px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">{{ scope.row.content }}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="160" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="showWordsDetail(scope)">查看详情</el-button>
              <span style="color:#e8e8e8 ">|</span>
              <el-button size="mini" type="text"  @click="deleteWords(scope)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
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
        <el-form-item label="留言者" :label-width="formLabelWidth">
          <el-input v-model="formItem.name" placeholder="请输入留言者"></el-input>
        </el-form-item>
        <el-form-item label="留言内容" :label-width="formLabelWidth">
          <el-input v-model="formItem.content" placeholder="请输入留言内容"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="searchVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="sureSearch">确 定</el-button>
    </span>
    </el-dialog>
    <!--查看详情-->
    <el-dialog  title="查看留言详情" :visible.sync="contentDetailVisible" :close-on-click-modal="false"
               :close-on-press-escape="false" >
      <el-form :model="form" ref="form">
        <el-form-item label="留言者:" prop="title" :label-width="formLabelWidth">
          <span>{{form.name}}</span>
        </el-form-item>
        <el-form-item label="留言内容:" :label-width="formLabelWidth">
          <span>{{form.content}}</span>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button  size="small" type="primary" @click="contentDetailVisible = false">关 闭</el-button>
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
        searchVisible:false,
        currentPage:1,
        form:{
          name:'',
          content:''
        },
        content:'',
        showFormVisible:false,
        formItem:{
          name:'',
          content:''
        },
        formLabelWidth:'200px',
        tableData:[],
        contentDetailVisible:false,
        total:''
      }
    },
    mounted(){
       this.getAllWord()
    },
    methods:{
      //点击搜索按钮
      clickSearch(){
        this.searchVisible=true
        this.formItem.name=""
        this.formItem.content=""
      },
      //获取全部留言
      async getAllWord(){
         let res =await request({
           url:api.wordSelect,
           method:'post',
           data:{
             page:this.currentPage,
             page_size:10
           }
         })
        if(res && res.result&&res.result.data){
          this.tableData=res.result.data
          this.total=res.result.total
        }
      },
      //转换时间
      changeTime(scope){
        return dateFormat(scope.row,'yyyy-mm-dd')
      },
      //查看详情
      showWordsDetail(scope){
        this.contentDetailVisible=true
        this.form=_cloneDeep(scope.row)
      },
      //搜索留言
      async sureSearch(){
        let res =await request({
          url:api.wordSelect,
          method:'post',
          data:{
              name:this.formItem.name,
            content:this.formItem.content
          }
        })
        if(res && res.result&& res.result.data){
          this.$message.success('操作成功')
          this.searchVisible=false
          this.currentPage=1
          this.tableData=res.result.data
          this.total=res.result.total
        }
      },
      //删除留言
      async deleteWords(scope){
        this.$confirm('是否确定删除', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
           let res =await request({
             url:api.wordDelete,
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
              this.getAllWord()
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
        this.showFormVisible = false
      },
      //跳转页面
      changeCurrentChange(currentPage){
        this.currentPage=currentPage
        this.getAllWord()
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
