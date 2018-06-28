<template>
  <div id="about">
    <div style="padding: 0 10%;display: flex;align-items: center;flex-direction: column">
      <ueditor ref="ueditor"  @change="onChange" :value="contentInit" :ueditorPath="ueditorPath" style="display: flex;justify-content: center; "></ueditor>
      <el-button type="primary" size="small" @click="save" style="margin-top: 10px;width: 20%;">保存</el-button>
    </div>
  </div>
</template>
<script>
  import Ueditor from '/src/components/Ueditor/Ueditor.vue'

  export default {
    components: {
      Ueditor,
    },
    data(){
      return{
        contentInit:'',
        content:'',
        ueditorPath:window.smilecampus_config.frontend_url+'/'+window.smilecampus_config.modules.graduation.module_name+'/assets/ueditor/',
      }
    },
    methods:{
      //      获取文本值
      onChange({textCount,content,text}){
        this.content = content
      },
      //保存
     async save(){
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

      }
    }
  }
</script>
<style>
  #about{
    /*width: 80%;*/

  }
</style>