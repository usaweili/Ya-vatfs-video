<template>
  <div class="main">
      <div class="search-wrap">
        <div class="search">
            <input type="text" placeholder="请输入搜索关键字 !" @keyup.enter="onSubmit" v-model="form.name" />
            <l-botton @click="onSubmit" v-model:loading="loading" > 搜索 </l-botton>
        </div>
      </div>
      <div class="list-wrap" v-if="lists.length > 0" :style="{'min-height': lists.length > 0 ? '100vh' : ''}" ref="list-wrap">
         <div class="list">
            <div class="list-item" @click="getDetail(item,index)" :style="{'animation-delay': index * 50+'ms'}" v-for="(item,index) in lists" :key="index" >
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
              <div class="video-info-list-item" :alt="item.title" :class="[item.active == true ? 'active' : '']" @click="playerVideo(item,index)" v-for="(item,index) in videoInfo.playUrl" :key="index" >
                {{ item.title }}
              </div>
            </div>
        </div>
      </div>
      <div class="video-wrap" ref="dplayer"></div>
    </popup>
  </div>
</template>

<script>


import videojs from "video.js"

import DPlayer from "DPlayer"

import api from "../common/http.api.js"

import popup from "../components/Popup.vue"

import lBotton from "../components/l-Button.vue"

export default {
  name: 'Main',
  components:{
      popup,
      lBotton
  },
  data() {
    return {
      count: 0,
      form: {
          name : ''
      },
      type: false,
      lists: [],
      videoInfo: {},
      loading: false
    }
  },
  methods:{
      async onSubmit(){
          try {
            this.loading =true;
            const { data } = await api.getSearch({  kw: this.form.name  })
            this.lists = data.data;
            this.loading = false;
            this.$nextTick(()=>{
              window.scrollTo({
                  top: document.querySelector('.list-wrap').offsetTop,
                  behavior: "smooth",
                })
            })
          } catch (error) {
            this.loading = false;
            window.alert('错误')
            console.error(error);
          }
      
          
      },
      async getDetail(item){
         
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
      getVideo(src) {
          this.dp = new DPlayer({
            container: this.$refs.dplayer,
            video: {
                url: src,
                type: 'hls',
            },
            pluginOptions: {
                hls: {
                    // hls config
                },
            },
        });
      },
      playerVideo(item,index){
        this.videoInfo.playUrl.forEach(listItem =>{
            listItem.active = false;
          })
        this.videoInfo.playUrl[index].active = true;
        this.getVideo(item.src);
       
      }
  }
}
</script>
