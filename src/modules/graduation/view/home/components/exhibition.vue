<template>
  <div id="exhibition">
    <span class="title">作品展示</span>
    <el-input @keydown.native="testone" ></el-input>
    <div class="content">
      <el-card :body-style="{ padding: '0px' } " v-for="(item , index ) in imgBox" :key="index"
               style="display: inline-block;margin: 0 20px;width: 400px;" @click.native="imgDetail(item)">
        <img :src="item.url" class="image" >
        <div style="padding: 14px;align-self: flex-start">
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
        imgBox:[]
      }
    },
    mounted(){
      this.getExhibition()
    },
    methods:{
      testone(){
        console.log("????????????")

      },
      //转换时间
      changeTime(time){
        return dateFormat(time*1000,'yyyy-mm-dd')
      },
      //获取图片
      async getExhibition(){
        let res=await request({
          url:api.getAllgoods,
          method:'post',
          data:{
            type:"1"
          }
        })
        if(res && res.result.data){
          let temp=[]
          for(let i in res.result.data){
            if(i<4){
              temp.push(res.result.data[i])
            }
          }
          this.imgBox=temp
        }

      },
      //点击进入详情页面
      imgDetail(item){
        router.push({
          path:"/img_detail",
          name:'imgDetail',
          params: {
            item: item,
          }
        })
      },
      //点击进入作品展示
      showProduction(){
        router.push("/production")
      }

    }

  }
</script>
<style>
  #exhibition .el-card__body{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  #exhibition{
    margin: 40px auto;
  }
  #exhibition .content{
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  #exhibition .title{
    cursor:pointer;
    letter-spacing: 3px;
    display: inline-block;
    vertical-align: middle;
    text-align: center;
    font-size: 26px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    color: #000000;
    margin-left: 16px;
  }
  #exhibition .time {
    font-size: 13px;
    color: #999;
  }
  #exhibition .image {
    width: 100%;
    display: block;
  }
  #exhibition .image:hover{
    transform: scale(1.05, 1.05);
    transition: all 0.3s linear;
    cursor:pointer;
  }
</style>