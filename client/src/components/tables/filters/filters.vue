<template lang="html">
  <component v-bind:is="filterName"></component>
</template>

<script>
import userFilter from "@/components/tables/filters/userFilter";
import pupilFilter from "@/components/tables/filters/pupilFilter";
import cityFilter from "@/components/tables/filters/cityFilter";
import kshpFilter from "@/components/tables/filters/kshpFilter";
import categoriesBufetFilter from "@/components/tables/filters/categoriesBufetFilter";
import schoolFilter from "@/components/tables/filters/schoolFilter";

export default {
  props: ["filterName"],
  components: {
    userFilter,
    pupilFilter,
    cityFilter,
    kshpFilter,
    categoriesBufetFilter,
    schoolFilter
  }
};
</script>

<style lang="css" scoped></style>
