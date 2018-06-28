<template>
  <div id="study">
    <span class="title">学习制作</span>
    <div style="display:flex;justify-content: space-between;margin-top: 20px">
        <d-player :video="{
                  url:movieUrl,
                  pic:imgUrl}"
                  :screenshot="true"
                  :loop="false"
                  preload="none"
                  class="dPlayer"
                  :contextmenu="[]"
                  ref="player">
        </d-player>
        <div style="width:1000px;">
          <el-card shadow="hover" style="height: 330px;overflow: auto">
            <p>主讲人：王志明</p>
            <p>时长：2分43秒</p>
              <p>1. 执笔</p>
              <p>误区1：过分用力握笔</p>
              <p>很多朋友在学写字之前就已经听说过“力透纸背”“入木三分”之类形容运笔有力的词语了，于是就先入为主，
                自然而然地认为写字的时候，就应该用力握笔，死死地把笔抓牢。
              因为握笔过分用力，写起字来就会不够灵活、运笔艰难，写出来的字显得生硬而没有灵性。
              这个误区流毒甚广，远至东晋著名书法家都被黑了。</p>
            <p>王献之幼时学于父（王羲之），其次学张芝。据说，羲之曾经从背后掣拔其笔，试测他的笔力，叹云：“此儿后当复有大名！”
              可见王羲之很早就对他寄予厚望。（摘自：博宝艺术网：王献之《中秋帖》）
            </p>
            <p>正确执笔方式： 五指执笔法</p>
            <p>图中所示的是五指执笔法。（图源自网络）</p>
            <img :src="require('../../../source/images/write.png')" alt="">
            <p>过往书家对五指执笔有文字上的说明，但相对不直观，故不作重复。如果这一幅静态的图片未能让你了解执笔的方法，
              可以待会拖到后面看书法家在写字的时候如何执笔的视频。在此说明的是，运笔过程笔左右挥舞是正常的，但不应当歪斜，倾倒到一边去。</p>
            <p>
              执笔位置 ：字越大，执笔应当越高
            </p>
            <p>
              执笔的位置和所写字的大小相关，一般而言，字越大，笔所需挥洒的范围越大，
              执笔就应当越高。通常而言，同等大小的字，行书执笔位置比楷书高，草书执笔位置比行书高。
            </p>
          </el-card>
        </div>
    </div>
  </div>
</template>
<script>
  import format from '/src/utils/format'
  import { uploadBaseURL } from '../../../../../config/config'
  import VueDPlayer from '/src/components/dplayer/Dplayer.vue'
  export default {
    components:{
      'd-player' : VueDPlayer,
    },
    data(){
      return{
        movieUrl:require('../../../assets/movie/mv.mp4'),
        imgUrl:require('../../../source/images/handwrite.jpg')
      }
    },
  }
</script>
<style scoped>
  .dPlayer {
    width: 800px;
    height: 330px
  }
  #study{
    margin-bottom: 40px;
  }
  .title {
    letter-spacing: 3px;
    display: inline-block;
    vertical-align: middle;
    text-align: center;
    font-size:26px;
    font-weight: 600;
    font-style: normal;
    font-stretch: normal;
    color: #000000;
    margin-left: 16px;
  }
  .content-left{
    margin-top: 20px;
  }
</style>