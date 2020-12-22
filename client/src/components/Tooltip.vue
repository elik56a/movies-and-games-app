<template>
  <v-tooltip bottom="bottom" :max-width="300" color="primary darken-1">
    <template v-slot:activator="{ on }">
      <span style="cursor: pointer" v-on="on">
        <slot />
      </span>
    </template>

    {{ text }}
  </v-tooltip>
</template>

<script>
export default {
    name: 'Tooltip',
    props: ['text']
};
</script>

<style>
</style>