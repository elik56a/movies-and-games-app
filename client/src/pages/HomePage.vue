<template>
  <v-container>
    <v-row justify="center">
      <!-- List of items section and grid/list btn -->
      <v-col cols="12" sm="3">
        <list-of-items v-if="data && data.length" :items="data" />
        <v-divider class="my-5" />
        <v-btn
          class="hidden-xs-only"
          large
          @click="isGrid = !isGrid"
          block
          color="primary"
          outlined
        >
          {{ isGrid ? "List View" : "Grid View" }}
          <v-icon right>{{
            isGrid ? "mdi-format-list-checkbox" : "mdi-grid"
          }}</v-icon>
        </v-btn>
      </v-col>

      <!-- Search area & action buttons -->
      <v-col cols="12" offset-sm="1" sm="8">
        <v-row>
          <v-col cols="12" sm="4">
            <v-text-field
              v-model="searchText"
              append-icon="mdi-magnify"
              label="Serach"
              outlined
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="8">
            <action-buttons
              @onClearSearchInput="searchText = ''"
              @refreshData="getPageData"
              :is-sort-asc="isSortAsc"
              @sortData="[(isSortAsc = !isSortAsc), sortData($event)]"
            />
          </v-col>

          <!-- Items card area-->
          <v-col
            cols="12"
            :sm="isGrid ? 4 : 11"
            v-for="(item, i) in filterdData"
            :key="i"
          >
            <item-card
              @updateTitleName="item.Title = $event"
              :is-grid="isGrid"
              :item="item"
            />
          </v-col>

          <!-- Fetch data error alert and no found data in serach alert -->
          <v-col cols="11" v-if="toShowAlert">
            <v-alert
              text
              elevation="4"
              prominent
              :type="isError ? 'error' : 'info'"
            >
              <div class="mx-5">
                {{
                  isError
                    ? "Sorry, error happen when get page data"
                    : "No data found for this search, please change your text"
                }}
              </div>
            </v-alert>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
//get app state
import { mapState } from "vuex";

// helper functions
import { formatDateWithSlash } from "@/utils/formatDates";

// page components
import ListOfItems from "./components/ListOfItems";
import ActionButtons from "./components/ActionButtons";
import ItemCard from "./components/ItemCard.vue";

export default {
  name: "homePage",
  components: {
    ListOfItems,
    ActionButtons,
    ItemCard,
  },
  data: () => ({
    //flags
    isLoadingPage: false,
    isError: false,
    isGrid: false,
    isSortAsc: true,

    //data
    data: [],
    searchText: "",
  }),
  methods: {
    sortData() {
      if (this.isSortAsc)
        this.data.sort((a, b) => a.Title.localeCompare(b.Title));
      else this.data.sort((a, b) => b.Title.localeCompare(a.Title));
    },
    async getPageData() {
      try {
        this.$store.commit("UPDATE_APP_LOADER", true);
        const { data } = await this.$Api.get("main-data");
        this.$store.commit("UPDATE_APP_LOADER", false);
        this.setPageData(data);
      } catch (e) {
        this.isError = true; // flag to display error alert
        console.error(`error when fetch data : ${e}`);
      }
    },
    setPageData(data) {
      this.data = data.results.map((el) => ({
        // change only the Year attr to be formated
        ...el,
        Year: formatDateWithSlash(el.Year),
      }));

      this.sortData(); // by defalut set asc sorting
    },
  },
  computed: {
    ...mapState(["selectedCategory", "isAppLoading"]),
    itemsBySelectedCategory() {
      if (!this.selectedCategory) return this.data; // in case user didnt select any category - return all data
      return this.data.filter((el) => el.Type === this.selectedCategory); // get only the relevant
    },
    filterdData() {
      if (!this.searchText) return this.itemsBySelectedCategory;

      // filter data by name or year
      return this.itemsBySelectedCategory.filter(
        (el) =>
          el.Title.toLowerCase().includes(this.searchText.toLowerCase()) ||
          el.Year.includes(this.searchText)
      );
    },
    toShowAlert() {
      return (
        !this.isAppLoading && (this.filterdData.length > 0 || this.isError)
      );
    },
  },
  created() {
    this.getPageData();
    this.isGrid = this.$vuetify.breakpoint.xsOnly;
  },
};
</script>