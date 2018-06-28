<template>
  <div id="page-detail">
    <h2 style="padding-bottom: 10px;margin-bottom: 14px; border-bottom: 1px solid #e7e7eb">
      {{$route.params.item.name}}</h2>
    <!--发表时间-->
    <span class="information">{{changeTime($route.params.item.ctime)}}</span>
    <!--发表人-->
    <span class="information">{{$route.params.item.userName}}</span>
    <div class="content">
      <img :src="$route.params.item.url" alt="" style="width: 68%;">
      <div style="width: 68%;margin-top: 20px">
        {{$route.params.item.info}}
      </div>
    </div>
  </div>
</template>
<script>
  import dateFormat from 'dateformat'
  import {request} from '/src/utils/request'
  import api from '../../../api/api'
  export default {
    name: 'imgDetail',
    data() {
      return {}
    },
    mounted() {
      if(this.$route.params.item.userName==null||this.$route.params.item.userName==""){
          this.$route.params.item.userName="佚名"
      }
    },
    methods:{
      //转换时间
      changeTime(time){
        return dateFormat(time*1000,'yyyy-mm-dd')
      },
      //
    }
  }
</script>
<style>
  #page-detail {
    width: 60%;
    margin-top: 20px;
    transform: translateX(-50%);
    position: absolute;
    left: 50%
  }
</style>
<style scoped>
  .content {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }

  .information {
    display: inline-block;
    vertical-align: middle;
    margin-right: 8px;
    margin-bottom: 10px;
    font-size: 16px;
    color: #8c8c8c
  }

</style>
