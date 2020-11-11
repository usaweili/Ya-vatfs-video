<template>
  <button @click="$emit('click')"> 
    <div class="loadingio-spinner-rolling-3tp4llk6hzy" v-if="loading">
      <div class="ldio-yj7nunc9efi">
        <div></div>
      </div>
    </div>
    <slot v-else />
  </button>

</template>

<script>
export default {
  name: 'l-Button',
  props: {
    loading: {
      type: Boolean,
      defalut: false
    }
  },
  data() {
    return {
      count: 0
    }
  }
}
</script>
