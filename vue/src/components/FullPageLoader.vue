<template>
  <div
    :class="{
      load: !hasLoaded,
      loading: isLoading
    }"
    class="loader"
  >
    <div>
      <v-progress-circular
        :size="80"
        :width="3"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>
  </div>
</template>

<style lang="scss">
.loader {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10000;
  background-color: rgba(255, 255, 255, 0.65);
  background-repeat: no-repeat;
  opacity: 0;
  transition: opacity 0.3s;

  &.load {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &.loading {
    opacity: 1;
  }
}
</style>

<script>
export default {
  props: {
    isLoading: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      hasLoaded: true,
      fadeOut: null
    }
  },
  watch: {
    isLoading: {
      immediate: true,
      handler(val) {
        if (val) {
          this.hasLoaded = false
          clearTimeout(this.fadeOut)
        } else {
          this.fadeOut = setTimeout(() => (this.hasLoaded = true), 300)
        }
      }
    }
  }
}
</script>
