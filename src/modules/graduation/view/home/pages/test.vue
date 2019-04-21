<template>
  <div>
    <div>主题颜色</div>
    <div v-for="index in 8" :key="index" class="colorBox" @click="changeColor(index)"></div>
    <div id="echarts" style="width:800px;height: 800px;background-color: #d7d7d7"></div>
  </div>
</template>
<script>
  export default {
    data(){
      return{
          color:null,
          myChart:null,
          colorList:['#00a0e9','#23e914','#e7e922','#e92d19',' #e92dc2','#9d16e9','#0c10e9']
      }
    },
    mounted(){
      this.myChart = this.$echarts.init(document.getElementById('echarts'));
      // 指定图表的配置项和数据
      var option = {
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
          data:['销量']
        },
        xAxis: {
          data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
        },
        yAxis: {},
        color:['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20],
          itemStyle: {
            normal: {
              color:this.color
//              color: function(params) {
//                console.log(params)
//                var colorList = [
//                  '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
//                  '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
//                  '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
//                ];
//                return colorList[params.dataIndex]
//              },
            },
//            emphasis: {
//              color: new this.$echarts.graphic.LinearGradient(
//                0, 0, 0, 1,
//                [
//                  {offset: 0, color: '#2378f7'},
//                  {offset: 0.7, color: '#2378f7'},
//                  {offset: 1, color: '#83bff6'}
//                ]
//              ),
//              shadowColor: 'rgba(0, 0, 0, 0.4)',
//              shadowBlur: 20
//            }
          },
        }]
      };

      // 使用刚指定的配置项和数据显示图表。
      this.myChart.setOption(option);
    },
    methods:{
      changeColor(index){
        for(let i in this.colorList){
          if(index == i ){
            this.color = this.colorList[i]

          }

        }
        this.$echarts.init(document.getElementById('echarts'))
        console.log(this.color)
        var option = {
          title: {
            text: 'ECharts 入门示例'
          },
          tooltip: {},
          legend: {
            data:['销量']
          },
          xAxis: {
            data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
          },
          yAxis: {},
          color:['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
          series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20],
            itemStyle: {
              normal: {
                color:this.color
              },
            },
          }]
        };

        // 使用刚指定的配置项和数据显示图表。
        this.myChart.setOption(option);
//        this.color = '#9d16e9'
//        console.log(this.myChart)
//        this.myChart.option.series[0].itemStyle.normal.color = this.color
//        console.log(document.getElementsByClassName('colorBox')[index-1].style)

      }

    }

  }
</script>
<style scoped>
  .colorBox{
    width: 20px;
    height: 20px;
    float: left;
    margin: 5px;
    position: relative;
    left: 75px;
    top: -25px;
  }
  .colorBox:nth-child(1){
    background-color: #00a0e9;
  }
  .colorBox:nth-child(2){
    background-color: #23e914;
  }
  .colorBox:nth-child(3){
    background-color: #e7e922;
  }  .colorBox:nth-child(4){
       background-color: #e92d19;
     }
  .colorBox:nth-child(5){
    background-color: #e92dc2;
  }
  .colorBox:nth-child(6){
    background-color: #9d16e9;
  }
  .colorBox:nth-child(7){
    background-color: #0c10e9;
  }

</style>