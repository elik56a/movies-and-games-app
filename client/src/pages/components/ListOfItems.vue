<template>
  <v-list rounded>
    <v-subheader>CATEGORIES</v-subheader>

    <v-divider class="mb-3"/>
    <v-list-item-group  color="primary">
      <v-list-item
       v-for="(val, key, index) in itemsCategoriesAndCount"
        :key="index" 
        @click="updateSelectedCategory(key)">
        <v-list-item-content>
          <v-list-item-title>
            {{ key | capitalize }}
           <small> ({{ val }}) </small>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  name: "ListOfItems",
  props: ["items"],
  data() {
    return {
      itemsCategoriesAndCount: {},
    };
  },
  methods: {
    updateSelectedCategory(category){
      this.$store.commit('UPDATE_SELECTED_CATEGORY', category); // upadate store with selected category - to be availble in all app components
    }
  },
  created() {
    // Create an object that containt the categorys as key, and the count as value  
    return this.items.forEach((item) => {
      if(this.itemsCategoriesAndCount[`${item.Type}`] == undefined )
        this.itemsCategoriesAndCount[`${item.Type}`] = 1;
      else 
         this.itemsCategoriesAndCount[`${item.Type}`] += 1;
    });
  },
};
</script>