<template>
    <transition name="popup">
    <div class="popup-wrap"  v-if="isShow" @click="closePopup" >
        <div class="popup" :class="[isBorderRadius ? 'radius' : '']" @click.stop="">
            <slot />
        </div>
    </div>
    </transition>
</template>

<script>
export default {
  name: 'Popup',
  props: {
      isBorderRadius: {
          type: Boolean,
           default(){
            return true
        }
      },
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
