<template>
  <div class="main">
      <div class="search" :style="{ top : lists.length > 0 ? '10%' : '50%' }">
          <input type="text" placeholder="请输入搜索关键字 !" v-model="form.name" />
          <button @click="onSubmit">搜索</button>
      </div>
      <div class="list-wrap">
         <div class="list">
            <div class="list-item" @click="getDetail(item)" :style="{'animation-delay': index * 50+'ms'}" v-for="(item,index) in lists" :key="index" >
                <img class="list-item-cover" :src="item.pic">
                <div class="list-item-title">
                    {{ item.name }}
                </div>
            </div>
         </div>
      </div>
    <popup :isShow="type" @close="e => type = e">
      <div class="video-info-wrap">
        <div class="video-info-cover">
          <img class="video-info-cover__iamge" :src="videoInfo.pic" :alt="videoInfo.label">
        </div>
        <div class="video-info">
            <div class="video-info__title">
              {{ videoInfo.name }}
            </div>
            <div class="video-info-list">
              <div class="video-info-list-item" @click="playerVideo(item)" v-for="(item,index) in videoInfo.playUrl" :key="index" >
                {{ item.title }}
              </div>
            </div>
        </div>
      </div>
      <div class="video-wrap" id="dplayer"></div>
    </popup>
  </div>
</template>

<script>

import Dplayer from 'Dplayer' 

import api from "../common/http.api.js"

import popup from "../components/Popup.vue"
export default {
  name: 'Main',
  components:{
      popup
  },
  data() {
    return {
      count: 0,
      form: {
          name : '斗罗大陆'
      },
      type: false,
      lists: [],
      videoInfo: {},
      src: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      // this.getVideo();
    });
  },
  methods:{
      async onSubmit(){
          const { data } = await api.getSearch({  kw: this.form.name  })
          this.lists = data.data;
      },
      async getDetail(item){
          console.log(item);
         
          const { data } = await api.getDetail(item.vid);
          this.type = true;
           this.poster = data.pic;
          this.videoInfo = data;
          let arr = [];
          for (const iterator in this.videoInfo.playUrl) {
            arr.push({ title: iterator , src: this.videoInfo.playUrl[iterator]  })
          }
          this.videoInfo.playUrl = arr;
      },
      getVideo() {
        this.myVideo = videojs("myVideo", {
          bigPlayButton: true,
          textTrackDisplay: false,
          posterImage: false,
          errorDisplay: false,
          hls: {
            withCredentials: true
          }
        });
      },
      playerVideo(item){

        const dp = new Dplayer({
            container: document.getElementById('dplayer'),
            video: {
              type: 'hls',
              url:  item.src
            },
        });

        dp.play()
        console.log(dp);

       
  
        // console.log(this.myVideo);
      }
  }
}
</script>
