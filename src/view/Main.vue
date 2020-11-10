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
                <div class="list-item-title ">
                    {{ item.name }}
                </div>
            </div>
         </div>
      </div>
    <popup :isShow="type" @close="e => type = e" />
  </div>
</template>

<script>

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
          name : ''
      },
      type: true,
      lists: []
    }
  },
  created(){
    console.log(api);
  },
  methods:{
      async onSubmit(){
          const { data } = await api.getSearch({  kw: '斗罗大陆'  })
          this.lists = data.data;
      },
      async getDetail(item){
          console.log(item);
          const { data } = await api.getDetail(item.vid);
          console.log(data);
          this.type = true;
      },
  }
}
</script>
