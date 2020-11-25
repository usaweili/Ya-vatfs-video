<template>
  <el-menu unique-opened router :default-active="$route.path" mode="horizontal">
     <el-menu-item @click="$router.push(item.path)" :index="item.path" v-for="(item,index) in routers" :key="index" >{{ item.name }} </el-menu-item >
    </el-menu>
  <div class="main-view"><router-view></router-view></div>
</template>
<script>

import api from "../common/http.api.js";

export default {
  name: "Main",
  data() {
    return {
      routers: [
        {
          path: '/',
          name: '首页'
        },
        {
          path: '/player/:id',
          name: '播放器'
        },
        {
          path: '/history',
          name: '历史记录'
        },
      ]
    };
  }
};
</script>

