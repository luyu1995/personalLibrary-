<template>
  <div id="collection">
    <span class="title" @click="showCollection">收藏拍卖区</span>
    <div class="content">
        <div class="content-left" v-for="(item,index) in imgBoxLeft " style="display: inline-block">
          <img :src="item.url" class="left-img-style" @click="goToDetail(item)">
          <div class="img-background" @click="goToDetail(item)">
            <div class="show-content">
              <p>{{item.name}}</p>
              <p>{{item.userName}}</p>
              <p>{{item.info}}</p>
              <p>￥{{item.price}}</p>
            </div>
          </div>
        </div>

      <div class="content-right">
        <div class="right-image" v-for="(item,index) in imgBox " :key="index" style="display: inline-block">
          <img :src="item.url" class="my-div" @click="goToDetail(item)">
          <div class="right-img-background" @click="goToDetail(item)">
            <div class="show-content-right">
              <p>{{item.name}}</p>
              <p>{{item.userName}}</p>
              <p>{{item.info}}</p>
              <p>￥{{item.price}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {request} from '/src/utils/request'
  import api from '../../../api/api'
  import dateFormat from 'dateformat'
  import 'jquery'
  export default {
    data(){
      return{
        imgBoxLeft:[],
        imgBox:[]
      }
    },
    mounted(){
      this.getCollection()
    },
    methods:{
      //获取收藏品
      async getCollection(){
        let res=await request({
          url:api.getAllgoods,
          method:'post',
          data:{
            type:"0"
          }
        })
        if(res && res.result){
          let temp=[]
          let tempLeft=[]
          for(let i in res.result.data){
            if(i<2){
              tempLeft.push(res.result.data[i])
            }else if(i>=2 && i<10){
              temp.push(res.result.data[i])
            }
          }
          this.imgBox=temp
          this.imgBoxLeft=tempLeft
        }

      },
      //跳转到收藏品详情页
      showCollection(){
        router.push("/collection")
      },
      //跳转到藏品详情
      goToDetail(item){
        router.push({
          path:"/collection_detail",
          name:'collectionDetail',
          params: {
            item: item,
          }
        })
      }
    }
  }
</script>
<style scoped>
  .show-content{
    width: 300px;
    margin-top: 25%;
  }
  .show-content p{
    text-align: center;
    font-size: 12px;
  }
  .show-content-right{
    width: 140px;
    margin-top: 25%;
  }
  .show-content-right p{
    text-align: center;
    font-size: 12px;
  }
  #collection{
    margin: 40px auto 0;
  }
  #collection .title {
    cursor:pointer;
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
  #collection .content{
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
   .my-div{
    width: 140px;
    height: 140px;
    margin: 0 10px;
    border-radius: 3%;
  }
   .right-img-background{
     position: absolute;
     top: 0;
     left: 10px;
     width: 140px;
     height: 140px;
     background-color: rgba(0,0,0,0.5);
     z-index: 100;
     display: none;
     border-radius: 3%;
     transform: scale(1.05, 1.05);
     transition: all 0.3s linear;
   }
  .right-image:hover .right-img-background{
    display: block;
    color: white;
    text-align: center;
    transform: scale(1.05, 1.05);
    transition: all 0.3s linear;
  }
  .right-image{
    /*width: 400px;*/
    /*height: 350px;*/
    position: relative;
  }
  #collection .content-right{
    display: flex;
    justify-content: flex-end;
    flex-flow:row wrap ;
  }
  .right-image:hover img{
    cursor:pointer;
    transform: scale(1.05, 1.05);
    transition: all 0.3s linear;
  }
  .img-background{
    position: absolute;
    top: 0;
    left: 20px;
    width:300px;
    height: 300px;
    background-color: rgba(0,0,0,0.5);
    z-index: 100;
    display: none;
    border-radius: 3%;
    transform: scale(1.05, 1.05);
    transition: all 0.3s linear;
  }
  .content-left{
    width: 400px;
    height: 350px;
    position: relative;
  }
  .content-left:hover .img-background{
    display: block;
    color: white;
    text-align: center;
  }
  .content-left:hover img{
    cursor:pointer;
    transform: scale(1.05, 1.05);
    transition: all 0.3s linear;
  }
  .left-img-style{
    width: 300px;
    height: 300px;
    margin: 0 20px;
    border-radius: 3%;
  }

</style>