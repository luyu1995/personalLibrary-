<template>
  <div id="news" >
    <span class="title">新闻资讯</span>
    <div class="news_content" style="background:#fff;width: 100%;height: 400px;background-repeat: no-repeat;background-size:100%;background-position: center center;" :style="{backgroundImage: 'url(' + newsBg + ')'}">
      <div style="    padding-top: 90px">
        <div v-for="(item,index) in dataList" :key="index" style="display: flex;justify-content: space-around" @click="gotoDetail(item.httpUrl)">
          <span style="display: inline-block;width: 200px;cursor:pointer;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">△ {{item.title}}</span>
          <span style="display: inline-block;width: 100px;font-size: 14px">{{item.publishName}}</span>
          <span style="display: inline-block;width: 100px;font-size: 14px">{{changeTime(item.ctime)}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {request} from '/src/utils/request'
  import api from '../../../api/api'
  import format from '/src/utils/format'
  import dateFormat from 'dateformat'
  import { uploadBaseURL } from '../../../../../config/config'

  export default {
    data(){
      return{
        newsBg:"",
        dataList:[],
      }
    },
    created(){
      this.newsBg=require('../../../source/images/news_bg.png')
    },
    async mounted(){
      let res = await request({
        url:api.newsSelect,
        method:'post',
      })
      if(res && res.result&& res.result.data){
        this.dataList=res.result.data
      }
    },
    methods:{
      changeTime(time){
        return dateFormat(time*1000,'yyyy-mm-dd')
      },
      //进入详情页面
      gotoDetail(httpUrl){
        window.open(httpUrl)
      }
    }
  }
</script>
<style >
  #news{
    margin-top: 40px;
  }
  #news  .title {
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
</style>