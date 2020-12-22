<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center headline">
          My App
        </div>
      <v-spacer/>
      <v-btn
        href="tel:0544878008"
        rounded
        outlined
      >
        <span class="mr-2">Contact Us</span>
        <v-icon>mdi-phone</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-fade-transition mode="out-in">
        <router-view />
      </v-fade-transition>
    </v-main>

    <v-overlay v-if="isAppLoading">
      <loader />
    </v-overlay>

  </v-app>
</template>

<script>
import { mapState } from 'vuex';
import Loader from './components/Loader.vue';
export default {
  name: "App",
  components: {
    Loader
  },
  computed: {
    ...mapState(['isAppLoading'])
  }
};
</script>
