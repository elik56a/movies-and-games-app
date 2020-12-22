<template>
  <v-img
    :aspect-ratio="aspectRatio"
    contain
    lazy-src="@/assets/default-placeholder.png"
    :src="getSrc"
  >
    <slot />
  </v-img>
</template>

<script>
export default {
  name: "PosterImage",
  props: ["src", "aspectRatio"],
  computed: {
      getSrc() {
        console.log(this.src)
        if(this.src && this.src !== 'N/A')
          return this.src;

          return require('@/assets/no-available.png');
      }
  }
};
</script>