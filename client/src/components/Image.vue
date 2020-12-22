<template>
  <v-img
    :aspect-ratio="aspectRatio"
    contain
    lazy-src="@/assets/no-available.png"
    :src="src"
  >
    <slot />
  </v-img>
</template>

<script>
export default {
  name: "PosterImage",
  props: ["src", "aspectRatio"],
};
</script>