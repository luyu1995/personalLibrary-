<template>
  <div id="production">
    <!--作品展示-->
    <el-carousel :interval="4000" type="card" height="260px">
      <el-carousel-item v-for="(item,index) in newProduction" :key="index">
        <img :src="item.url" >
      </el-carousel-item>
    </el-carousel>
    <div class="content">
      <el-card :body-style="{ padding: '0px' } "  v-for="(item , index ) in imgBox" :key="index"
               style="display: flex;margin-bottom:20px;width:90%;height: 240px;margin-left: 50px;" @click.native="imgDetail(item)">
        <img :src="item.url" class="image" >
        <div style="padding-left: 14px;align-self: flex-start">
          <strong>{{item.username}}</strong>
          <div class="bottom clearfix">
            <p>{{item.name}}</p>
            <time class="time">{{changeTime( item.ctime) }}</time>
          </div>
        </div>
      </el-card>
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
       newProduction:[],
       imgBox:[],
     }
   },
    mounted(){
     this.getData()
      this.getNewPro()
    },
    methods:{
      //获取推荐作品
      async getNewPro(){
        let res=await request({
          url:api.getAllgoods,
          method:'post',
          data:{
            isNew:1
          }
        })
        if(res && res.result){
          this.newProduction=res.result
        }
      },
      //获取全部数据
      async getData(){
        let res=await request({
          url:api.getAllgoods,
          method:'post',
          data:{
            type:"1"
          }
        })
        if(res && res.result){
          this.imgBox=res.result
        }
      },
      //点击进入图片详情页
      imgDetail(item){
        router.push({
          path:"/img_detail",
          name:'imgDetail',
          params: {
            item: item,
          }
        })
      },
      //转换时间
      changeTime(time){
        return dateFormat(time*1000,'yyyy-mm-dd')
      }
    }
  }
</script>
<style>
  #production .time {
    font-size: 13px;
    color: #999;
  }
  #production  .image {
    width: 350px;
    padding: 20px;
    display: block;
  }
  #production .el-card__body{
    display: flex;
    padding: 10px;
  }
</style>
<style scoped>
  .content{
    height: 600px;

  }
</style>