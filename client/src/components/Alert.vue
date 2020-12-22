<template>
  <v-dialog :hide-overlay="false" :max-width="400" v-model="show">
    <v-card>
      <v-toolbar
        :color="alertData.type"
        class="px-3 elevation-0"
        dark
        height="45"
      >
        {{ alertData.title }}
        <v-spacer />
        <v-btn @click.stop="show = false" icon>
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text class="pa-4">
       <div v-html="alertData.text">

       </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "Alert",
  props: ["alertData"],
  computed: {
    show: {
      get() {
        return this.alertData.visible;
      },
      set(value) {
        if (!value) this.$emit("close");
      },
    },
  },
};
</script>

<style>
</style>