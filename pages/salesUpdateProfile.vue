<template>
  <UpdateSales />
</template>

<script>
export default {
  head() {
    return {
      title: "update profile",
    };
  },
  middleware: "sales",
  layout:"sales",
  name: "updateProfile",
};
</script>
