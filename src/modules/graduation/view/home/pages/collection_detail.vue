<template>
  <div id="collection-detail">
    <!--收藏品详情-->
    <div v-show="showFlag">
      <h3>商品详情</h3>
      <div style="border-top: 1px solid rgba(0,0,0,0.15);margin: 0 10%" >
        <div style="display: flex;justify-content: space-between;margin-top: 20px;padding: 25px 18px;">
          <div class="left-img">
            <img :src="$route.params.item.url" alt="" style="width: 100%">
          </div>
          <div class="right-info">
            <div style="display: flex;justify-content: space-between;padding: 0px 48px 0 152px">
              <span style="font-size: 20px;font-weight: bold;">作品信息</span>
            </div>
            <div style="">
              <span>￥{{$route.params.item.price}}</span>
              <span>原创</span>
              <span>{{$route.params.item.userName}}</span>
              <span>{{$route.params.item.name}}</span>
              <span>{{$route.params.item.info}}</span>
            </div>
            <el-button type="info" style="margin-left: 25%;margin-top: 28px; width: 60%;" @click="checkLogin">加入购物车</el-button>
          </div>
        </div>
      </div>
    </div>
    <div v-show="!showFlag" style="display: flex;justify-content: space-between;margin: 0 10%">
      <div class="order-left">
        <p style="text-align: left;font-size: 18px;font-weight: bold">商品订单</p>
        <div style="display: flex;">
          <img :src="$route.params.item.url" alt="" style="width: 100px;    height: 100px;border-radius: 5px">
          <div style="font-size: 12px;margin-top: -11px;margin-left: 10px;">
            <p>{{$route.params.item.name}}</p>
            <span>{{$route.params.item.info}}</span>
            <span>x1</span>
          </div>
        </div>
        <div style="width: 400px;margin-top: 10px;border-top: 2px solid rgba(204, 204, 204,0.5)"></div>
      </div>
      <div style="height: 430px;border-right: 2px solid #ccc;margin-top: 20px"></div>
      <div class="order-right">
        <p style="text-align: left;font-size: 18px;font-weight: bold">收货人信息</p>
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="收货人姓名：">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="手机号：">
            <el-input v-model="form.mobile"></el-input>
          </el-form-item>
          <el-form-item label="详细地址：">
            <el-input type="textarea" v-model="form.address"></el-input>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input type="textarea" v-model="form.note"></el-input>
          </el-form-item>
          <el-form-item label="订单总计：">
            <el-input type="textarea" v-model="form.price"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="submitOrder" style="width: 80%;margin-left: 20%;">提交订单</el-button>
      </div>

    </div>
  </div>
</template>
<script>
  import dateFormat from 'dateformat'
  import {request,getToken} from '/src/utils/request'
  import api from '../../../api/api'
  export default {
    data(){
      return{
        seller_id:'',
        form:{
          name:'',
          mobile:'',
          address:'',
          note:'',
          price:''
        },
        showFlag:true,
      }
    },
    mounted(){
      this.seller_id=getToken('access_token')
    },
    methods:{
      //提交订单
      async submitOrder(){
        let res=await request({
          url:api.addSellBill,
          method:'post',
          data:{
            name:this.form.name,
            goods_id:this.$route.params.item.id,
            seller_id:this.seller_id,
            adress:this.form.address,
            note:this.form.note,
            price:this.form.price,
            mobile:this.form.mobile
          }
        })
        console.log(res)
        if(res){

        }

      },
      //加入购物车
      checkLogin(){
        if(getToken ( 'access_token' )){
          this.showFlag=!this.showFlag
        }
        else{
          router.push("/login")
        }
      },
    }
  }
</script>
<style>
  #collection-detail .el-tabs__header{
    margin: 0 60px 0 210px;
  }
  #collection-detail .el-tabs__item{
    font-size: 20px;
    font-weight: bold;
  }
  #collection-detail .el-tabs__item:hover{
    color: #303133;
  }
  #collection-detail .el-tabs__item.is-active{
    color: #303133 !important;
    font-size: 22px;
  }
  #collection-detail .el-tabs__active-bar{
    background-color: #303133;
  }
  #collection-detail .el-button--primary.is-active, .el-button--primary:active{
    background: #CF680A;
    border-color: #CF680A;
  }
  #collection-detail .el-button--primary{
    background: #CF680A;
    border-color: #CF680A;
  }
</style>
<style scoped>
  h3{
    text-align: center;
  }
  .left-img{
    width: 50%;
    border-radius: 4px;
  }
  .right-info{
    width: 37%;
  }
  .right-info span{

  }
  .order-left{
    padding-right: 20px;
    width: 400px;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
  }
  .order-right{
    width: 500px;
    padding-left: 50px;
  }
  #collection-detail{
    width:100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

</style>