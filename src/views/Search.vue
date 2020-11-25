<template>
   <div class="main">
    <div class="search-wrap">
      <div class="search">
        <input
          type="text"
          placeholder="请输入名称 !"
          @keyup.enter="onSubmit"
          v-model="form.name"
        />
        <el-button type="primary" size="medium" :loading="loading" @click="onSubmit" round> 搜索 </el-button>
      </div>
    </div>

    <div class="tabs-wrap" v-if="activeName">
      <el-tabs v-model="activeName">
      <el-tab-pane :label="tab.name" :name="tab.name" v-for="(tab,i) in lists" :key="i">
        <div class="list-wrap" v-if="tab.child.length > 0" :style="{'min-height': tab.child.length > 0 ? '100vh' : ''}" ref="list-wrap">
         <div class="list">
            <div class="list-item" @click="getDetail(item,index)" :style="{'animation-delay': index * 50+'ms'}" v-for="(item,index) in tab.child" :key="index" >
                <img class="list-item-cover" :src="item.pic">
                <div class="list-item-title">
                    {{ item.name }}
                </div>
            </div>
         </div>
      </div>
      </el-tab-pane>
    </el-tabs>
    </div>
  </div>
</template>

<script>
import api from "@/common/http.api.js";
export default {
  name: "search",
  data(){
      return {
          form: {
                name: "",
               
            },
             lists: null,
                tabs:[],
                activeName: null,
                videoInfo: {},
                loading: false
    }
  },
  methods:{
      async onSubmit() {
      try {
        this.loading = true;
        const { data } = await api.getSearch({ kw: this.form.name });
        this.loading = false;
        if (data.data.length == 0) {
          return  this.$notify.error({ title: '错误', message: '没有找到相关内容!'  });
        }
        const arr = {};
        data.data.forEach(item =>{
          if(arr[`key_${item.siteId}`] == undefined) {
            arr[`key_${item.siteId}`] = {};
            arr[`key_${item.siteId}`].child = [];
          };
          arr[`key_${item.siteId}`].child.push(item)
        });
        const datas = [];
        // 后端写得好 前端头发掉得少
        Object.keys(arr).forEach(item =>{ datas.push({ name : item , child : arr[item].child })});
        if(datas[0].name !== '') this.activeName = datas[0].name;
        this.lists = datas;
        this.$nextTick(() => {
          window.scrollTo({
            top: document.querySelector(".tabs-wrap").offsetTop,
            behavior: "smooth"
          });
        });
      } catch (error) {
        this.loading = false;
        window.alert("错误");
        console.error(error);
      }
    },
    async getDetail(item) {
      console.log(item);
      this.$router.push({
        name: 'Player',
        params:{
          id: item.vid
        }
      })
    },
    getVideo(src) {
      this.dp = new DPlayer({
        container: this.$refs.dplayer,
        video: {
          url: src,
          type: "hls"
        },
        pluginOptions: {
          hls: {
            // hls config
          }
        }
      });
    },
    
  }
};
</script>
