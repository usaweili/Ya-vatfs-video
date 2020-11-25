<template>
  <router-view :key="$route.path" />
</template>

<script>
import Main from "./views/Main.vue";

export default {
  name: "App",
  data(){
    return {
      
    }
  },
  created(){
    console.log();
  },
  components: {
    Main
  }
};
</script>
