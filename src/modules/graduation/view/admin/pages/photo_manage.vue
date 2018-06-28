<template>
  <div id="photoManage">
    <el-button type="primary" size="small" icon="el-icon-upload" @click="uploadDialog">上传</el-button>
    <el-table
      :data="tableData"
      style="width: 100%;margin-top: 20px">
      <el-table-column type="index" align="center" label="序号" width="100"></el-table-column>
      <el-table-column label="作品名称" align="center" prop="name" ></el-table-column>
      <el-table-column label="时间" align="center" prop="ctime" width="200">
        <template slot-scope="scope">{{changeTime(scope)}}</template>
      </el-table-column>
      <el-table-column label="图片用途" align="center" prop="type" width="200">
        <template slot-scope="scope">
          <span v-html="renderType(scope)"></span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="price" label="价格" width="160">
        <template slot-scope="scope">
          {{scope.row.price != null ? scope.row.price : '-'}}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="120">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click="editPhoto(scope)">编辑</el-button>
          <span style="color:#e8e8e8 ">|</span>
          <el-button
            size="mini"
            type="text"
            @click="deletePhoto(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="changeCurrentChange"
      :current-page.sync="currentPage"
      :total="total * 1"
      class="paging">
    </el-pagination>
    <!--上传dialog-->
    <el-dialog
      :title="title"
      ref="uploadPic"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :visible.sync="uploadDialogVisible">
      <el-form :model="formItem" ref="formItem" :rules="rules" label-width="100px" size="mini">
        <el-form-item label="作品名称：" prop="name" >
          <el-input  placeholder="请输入作品名称" v-model="formItem.name" ></el-input>
        </el-form-item>
        <el-form-item label="作者姓名：" prop="userName" >
          <el-input  placeholder="请输入作者姓名" v-model="formItem.userName" ></el-input>
        </el-form-item>
        <el-form-item label="上传作品：" >
          <el-upload
            ref="uploadPic"
            :multiple="false"
            :action="goodsUpload"
            list-type="picture-card"
            :file-list="photoList"
            :on-remove="handleRemove"
            :before-upload="beforeUpload"
            :on-success="uploadSuccess">
            <!--<img v-if="flag" :src="dialogImageUrl" class="avatar">-->
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="作品用途：" prop="type">
          <el-radio-group v-model="formItem.type" size="medium">
            <el-radio  label="1">仅作为作品展示</el-radio>
            <el-radio  label="0">仅作为藏品展示</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="藏品价格：" prop="price" v-if="formItem.type=='0'">
          <el-input-number v-model="formItem.price" :min="1"></el-input-number>
        </el-form-item>
        <el-form-item label="图片描述：" prop="describe" >
          <el-input type="textarea" placeholder="请输入内容" v-model="formItem.describe"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="clear">取 消</el-button>
        <el-button size="small" type="primary" @click="clickSure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import {request} from '/src/utils/request'
  import api from '../../../api/api'
  import _cloneDeep from 'lodash/cloneDeep'
  import dateFormat from 'dateformat'

  export default {
    data(){
      return{
        total:"",
        currentPage:1,
        fullUrl:'',
        flag:false,
        dialogImageUrl: '',
        photoList:[],
        dialogVisible: false,
        relUrl:'',
        formItem:{
          userName:'',
          name:'',
          type:'1',
          price:null,
          describe:'',
        },
        goodsUpload:api.goodsUpload,
        tableData:[],
        imageUrl:'',
        uploadDialogVisible:false,
        imageShow:false,
        title:'',
        id:'',
        rules:{
          type: [
            { required: true, message: '请选择图片用途',  trigger: 'change'},
          ],
          price: [
            { required: true, message: '请输入藏品价格',  trigger: 'blur'},
          ],
          name: [
            { required: true, message: '请输入作品名称',  trigger: 'blur'},
          ],
          photo: [
            { required: true, message: '请上传作品',  trigger: 'blur'},
          ],
        }
      }
    },
    mounted(){
      this.getAllPhoto()
    },
    methods:{
      changeCurrentChange(currentPage){
        this.currentPage=currentPage
        this.getAllPhoto()
      },
      //关闭前清空数据
      clear(){
        this.$refs['formItem'].resetFields()
        this.uploadDialogVisible=false
      },
      //转换图片用途
      renderType(scope){
        if(scope.row.type=='0'){
          return `<span><span style="width: 6px;height: 6px;display: inline-block;border-radius: 50%;background-color: #409EFF;margin-right: 5px"></span>仅作为藏品展示</span>`
        }else{
          return `<span><span style="width: 6px;height: 6px;display: inline-block;border-radius: 50%;background-color: #FFDD27;margin-right: 5px"></span>仅作为作品展示</span>`
        }
      },
      //获取全部图片
      async getAllPhoto(){
        let res=await request({
          url:api.getAllgoods,
          method:'post',
          data:{
            page_size:10,
            page:this.currentPage
          }
        })
        if(res&& res.result){
          this.tableData=res.result.data
          this.total=res.result.total
        }
      },
      //转换时间
      changeTime(scope){
        return dateFormat(scope.row.ctime*1000,'yyyy-mm-dd')
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      //点击上传按钮
      uploadDialog(){
          this.uploadDialogVisible=true
          this.photoList = []
          this.title="上传图片"
          this.formItem={
            name:'',
            type:'1',
            price:null,
            describe:'',
        }
      },
      //图片上传校验
      beforeUpload(file){
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
//图片上传成功
      async uploadSuccess(response,file,fileList){
        this.dialogImageUrl=response.result.url
        this.relUrl=response.result.rel_url
        this.fullUrl=response.result.url
      },
      //
      test(err, file, fileList){

      },
      //点击确定按钮
      clickSure(){
        if(this.title=='上传图片'){
          this.submitUpload()
        }else{
          this.editUpload()
        }
      },
      //图片上传
      async submitUpload(){
        this.$refs['formItem'].validate(async (valid) => {
          if (valid) {
            let res = await request({
              url: api.goodsAdd,
              method: 'post',
              data: {
                userName:this.formItem.userName,
                type: this.formItem.type,
                img: this.relUrl,
                info: this.formItem.describe,
                price: this.formItem.price,
                name: this.formItem.name,
                url: this.fullUrl
              }
            })
            if (res && res.code == "00000") {
              this.$message.success("操作成功")
              this.uploadDialogVisible = false
              this.getAllPhoto()
            }else {
              this.$message.error(res.message)
            }
          }
        })
      },
      //编辑图片上传
      async editUpload(){
        this.$refs['formItem'].validate(async (valid) => {
          if (valid) {
            let res = await request({
              url: api.goodsUpdate,
              method: 'post',
              data: {
                userName:this.formItem.userName,
                id:this.id,
                type: this.formItem.type,
                img: this.relUrl,
                info: this.formItem.describe,
                price: this.formItem.price,
                name: this.formItem.name,
                url: this.fullUrl
              }
            })
            if (res && res.code == "00000") {
              this.$message.success("操作成功")
              this.uploadDialogVisible = false
              this.getAllPhoto()
            }else {
              this.$message.error(res.message)
            }
          }
        })

      },
      //编辑图片信息
      editPhoto(scope){
        this.title="编辑图片"
        this.uploadDialogVisible=true
        this.flag=true
        let _this = this
        this.$nextTick(function(){
          _this.id=scope.row.id
          _this.formItem.price=scope.row.price
          _this.formItem.describe=scope.row.info
          _this.formItem.name=scope.row.name
          _this.formItem.type=scope.row.type+''
          _this.dialogImageUrl=scope.row.url
          let temp=[]
          temp.push(_cloneDeep(scope.row.url))
          console.log(temp)
          _this.$refs['uploadPic'].uploadFiles = temp
////          _this.dialogImageUrl = _this.$refs['uploadPic'].uploadFiles
        })
      },
      //删除图片信息
      async deletePhoto(scope){
        let res = await request({
          url: api.goodsDelete,
          method: 'post',
          data: {
            id:scope.row.id,
          }
        })
        if(res && res.code=="00000"){
          this.$message.success("操作成功")
          this.getAllPhoto()
        }else{
          this.$message.error(res.message)
        }
      }
    }
  }
</script>
<style scoped>
  #photoManage .el-radio{
    line-height: 0 !important;
  }
  .avatar {
    width: 148px;
    height: 148px;
    display: block;
  }
  .paging {
    float: right;
    margin: 20px 0 20px auto;
  }
</style>
<!--
<style>
  #photoManage .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  #photoManage .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  #photoManage .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  #photoManage .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>-->
