<template lang="html">
  <component v-bind:is="formName" v-bind:inputData="inputData || []">
    <template>
      <slot> </slot>
    </template>
  </component>
</template>

<script>
import userForm from "@/components/forms/userForm";
import pupilForm from "@/components/forms/pupilForm";
import cityForm from "@/components/forms/cityForm";
import kshpForm from "@/components/forms/kshpForm";
import categoriesBufetForm from "@/components/forms/categoriesBufetForm";
import schoolForm from "@/components/forms/schoolForm";

export default {
  props: ["formName", "inputData"],
  components: {
    userForm,
    pupilForm,
    cityForm,
    kshpForm,
    categoriesBufetForm,
    schoolForm
  }
};
</script>

<style lang="css" scoped></style>
