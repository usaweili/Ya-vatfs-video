<template>
    <div class="popup-wrap" v-if="isShow" @click="closePopup">
        <div class="popup" @click.stop=""></div>
    </div>
</template>

<script>
export default {
  name: 'Popup',
  props: {
      isShow: {
        type: Boolean,
        default(){
            return false
        }
      }
  },
  methods:{
      closePopup(){
          this.$emit('close',false)
      }
  }
}
</script>
