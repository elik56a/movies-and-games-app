<template>
  <v-container class="fiil-heigth">
    <v-row aling="center" justify="center">
      <v-col cols="12" sm="8">
        <v-btn @click="$router.back()" class="mb-5" color="primary">
          <v-icon left> mdi-arrow-left</v-icon>
          Back
        </v-btn>

        <v-card>
          <v-row>
            <v-col cols="12" sm="6">
              <poster-image aspect-ratio="1" :src="item.Poster" />
            </v-col>
            <v-col cols="12" sm="6">
              <v-card-title>
                {{ item.Title }}
              </v-card-title>
              <v-card-text>
                {{ item.Year }}
                <br />
                <v-rating
                  :value="4.5"
                  color="amber"
                  dense
                  half-increments
                  readonly
                  size="14"
                ></v-rating>
                <div class="my-3">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Id
                  quisquam odit molestiae exercitationem facilis quod. Quisquam,
                  voluptates nobis sit, enim velit non alias sunt quia vero
                  libero modi labore doloremque.
                </div>
              </v-card-text>
              <v-card-actions class="mt-4">
                <v-btn color="info" outlined> Share </v-btn>
                <v-btn color="orange" outlined> Explore </v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <alert @close="alertData.visible = false" v-bind="{ alertData }" />
  </v-container>
</template>

<script>
import { formatDateWithSlash } from "@/utils/formatDates";
import alert from "@/mixins/alert";
export default {
  name: "ItemPage",
  mixins: [alert],
  data() {
    return {
      item: {},
    };
  },
  methods: {
    async getPageData() {
      try {
        const itemId = this.$route.params.item_id;
        this.$store.commit("UPDATE_APP_LOADER", true);
        const { data } = await this.$Api.get(`get-item/${itemId}`);
        this.$store.commit("UPDATE_APP_LOADER", false);
        this.setPageData(data);
      } catch (e) {
        console.error(`error when fetch data: ${e}`);
        this.setErrorAlert();
      }
    },
    setPageData(data) {
      this.item = data;
      this.item.Year = formatDateWithSlash(this.item.Year);
    },
  },
  created() {
    this.getPageData();
  },
};
</script>
