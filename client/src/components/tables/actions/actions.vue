<template lang="html">
  <component v-bind:is="actionName"></component>
</template>

<script>
import userAction from "@/components/tables/actions/userAction";
import pupilAction from "@/components/tables/actions/pupilAction";
import cityAction from "@/components/tables/actions/cityAction";
import kshpAction from "@/components/tables/actions/kshpAction";
import categoriesBufetAction from "@/components/tables/actions/categoriesBufetAction";
import schoolAction from "@/components/tables/actions/schoolAction";
import bufetAction from "@/components/tables/actions/bufetAction";

export default {
  props: ["actionName"],
  components: {
    userAction,
    pupilAction,
    cityAction,
    kshpAction,
    categoriesBufetAction,
    schoolAction,
    bufetAction
  }
};
</script>

<style lang="css" scoped></style>
