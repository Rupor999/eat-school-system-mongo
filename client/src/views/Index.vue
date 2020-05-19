<template lang="html">
  <div>
    <v-content>
      <router-view />
    </v-content>
    <Footer />
  </div>
</template>

<script>
import Footer from "@/components/footer/footer";
export default {
  components: {
    Footer
  }
};
</script>

<style lang="css" scoped></style>
