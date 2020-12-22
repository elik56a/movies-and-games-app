<template>
  <v-card :height="isGrid ? 450 : 250" width="100%" class="fill-height">
    <v-row>
      <v-col aling-item="center" :cols="isGrid ? 12 : 6">
        <v-hover v-slot:default="{ hover }">
          <poster-image
            :class="{ 'mx-2': !isGrid }"
            :aspect-ratio="isGrid ? 1.2 : 1.5"
            :src="item.Poster"
          >
            <v-fab-transition>
              <v-overlay absolute color="grey lighten-5" v-if="hover">
                <v-btn @click="goToItemPage(item)">
                  More Info
                  <v-icon right>mdi-information</v-icon>
                </v-btn>
              </v-overlay>
            </v-fab-transition>
          </poster-image>
        </v-hover>
      </v-col>
      <v-col :cols="isGrid ? 12 : 6">
        <div class="ma-2 headline">
          <span v-if="!editNameMode">
            {{ item.Title }}
          </span>
          <v-text-field
            hide-details
            outlined
            @blur="updateItemName($event)"
            :value="item.Title"
            v-else
        >
        <template #append-outer>
          <v-icon @click="editNameMode = false">mdi-close</v-icon>
        </template>
        </v-text-field>

          <tooltip text="Edit title" v-if="!editNameMode">
            <v-btn
              @click="editNameMode = true"
              icon
              color="info"
            >
            <v-icon>  mdi-square-edit-outline </v-icon>
            </v-btn>
          </tooltip>
        </div>
        <div class="font-italic mx-3">
          {{ item.Year }}
        </div>
      </v-col>
    </v-row>

    <alert @close="alertData.visible = false" v-bind="{ alertData }" />
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import alert from '@/mixins/alert';

export default {
  name: "ImageCard",
  props: ["item", "isGrid"],
  mixins: [alert],
  data() {
    return {
      editNameMode: false,
    };
  },
  methods: {
    goToItemPage(item) {
      this.$router.push({
        name: "Item Page",
        params: { item_id: this.item.imdbID, item_category: this.item.Type },
      });
    },
    async updateItemName(event) {
      const newName = event.target.value;
      if (newName === this.item.Title)
        //  in case no changes
        return;

      try {
        const {data: { success, newTitle }} = await this.$Api.post(`update-item/${this.item.imdbID}`, {
          Title: newName,
        });
        if (success) {
          this.setSuccessAlert({
            text: `The title successfully changed to: <em> ${newTitle} </em>`,
            title: 'Update Successfully'
         })
        }
        else return this.setErrorAlert()
      } catch (e) {
         this.setErrorAlert()
      }
    },
  },
  computed: {
    ...mapState(["selectedCategory"]),
  },
};
</script>
