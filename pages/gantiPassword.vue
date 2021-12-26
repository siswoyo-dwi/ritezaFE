<template>
  <UpdatePasswordBySales />
</template>

<script>
export default {
  head() {
    return {
      title: "update password",
    };
  },
  middleware: "sales",
  layout:"sales",
  name: "Update Password By Sales",
};
</script>
