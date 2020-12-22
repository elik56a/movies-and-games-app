<template>
  <span>
    <v-btn
      v-for="button in actionButtons"
      :key="button.text"
      class="mx-2 py-4 py-sm-0"
      :x-small="$vuetify.breakpoint.xsOnly"
      :x-large="$vuetify.breakpoint.smAndUp"
      outlined
      :color="button.color"
      @click="button.click()"
    >
      {{ button.text }}
      <v-icon small right> {{ button.icon }} </v-icon>
    </v-btn>
  </span>
</template>

<script>
export default {
  name: "ActionButtons",
  props: ['isSortAsc'],
  data() {
    return {
      actionButtons: [
        {
          text: "Clear",
          icon: "mdi-delete",
          color: "error",
          click: () => this.$emit('onClearSearchInput'),
        },
        {
          text: "Refresh",
          icon: "mdi-refresh",
          color: "success",
          click: () => this.$emit('refreshData'),
        },
        {
          text: "Sort",
          icon:  'mdi-arrow-down',
          color: "info",
          click: () => this.$emit('sortData', ),
        },
      ],
    };
  },
  watch: {
    isSortAsc(newVal) { // watch on this flag to change sort icon up or down
      const sortObj = this.actionButtons.find(el => el.text === 'Sort'); // get the sort button obj
      sortObj.icon = newVal ? 'mdi-arrow-down' : 'mdi-arrow-up'; // cahnge dynamicly the arrow icon
    }
  }
};
</script>