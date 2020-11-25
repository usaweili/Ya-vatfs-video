<template>
  <div class="video-info-wrap" v-if="videoInfo">
    <div class="video-wrap" ref="dplayer"></div>
    <div class="video-info-more">
            <div class="video-info-cover">
                <img
                class="video-info-cover__iamge"
                :src="videoInfo.pic"
                :alt="videoInfo.label"
                />
            </div>
            <div class="video-info">
                <div class="video-info-list">
                <div
                    v-for="(item, index) in videoInfo.playUrl"
                    class="video-info-list-item"
                    :alt="item.title"
                    :class="[item.active == true ? 'active' : '']"
                    @click="playerVideo(item, index)"
                    
                    :key="index"
                >
                    {{ item.title }}
                </div>
                </div>
            </div>
        </div>
    </div>
   
</template>

<script>
import DPlayer from "dplayer";

import api from "../common/http.api.js";

export default {
    props:{
        id: {
            type: String,
            require: true
        },
    },
  name: "Home",
  data(){
      return {
        videoInfo: null,
        playerUrl: null,
        DPlayer: null
      }
  },
  created(){
      this.fetchData()
  },
  methods:{
      async fetchData(){
          const { data } = await api.getDetail(this.id);
        this.type = true;
        this.poster = data.pic;
        this.videoInfo = data;
        let arr = [];
        for (const iterator in this.videoInfo.playUrl) {
            arr.push({ title: iterator, src: this.videoInfo.playUrl[iterator] , active :false });
        }
        arr[0].active = true;
        this.playerUrl = arr[0].src;
        this.videoInfo.playUrl = arr;
        this.initPlay()
      },
      initPlay(){
          this.$nextTick(()=>{
              this.DPlayer = new DPlayer({
                container: this.$refs['dplayer'],
                video: {
                    url: this.playerUrl
                },
            });
          })
      },
      playerVideo(item, index) {
        console.log(index);
        this.videoInfo.playUrl.forEach(item => {
            item.active = false;
        });
        this.playerUrl = item.src;
        this.videoInfo.playUrl[index].active = true;
        this.initPlay()
      }
  }
};
</script>
