<template>
  <main class="container">
    <AppHeader />
    <AppRestaurantInfo :datasource="fooddata" />
  </main>
</template>

<script>
import AppHeader from "@/components/AppHeader.vue";
import AppRestaurantInfo from "@/components/AppRestaurantInfo.vue";
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["fooddata"])
  },
  components: {
    AppHeader,
    AppRestaurantInfo
  }
};
</script>

<style></style>
