<template>
  <div class="container">
    <b-row>
      <b-form @submit="onSubmit">
        <b-form-file
          type="file"
          class="mt-5"
          enctype="multipart/form-data"
          @change="upload($event)"
          ref="file"
          :state="Boolean(file)"
          v-model="file"
          placeholder:none
        >
        </b-form-file>
        <b-button type="submit" variant="primary" class="mt-3">Submit</b-button>
      </b-form>
    </b-row>
    <b-table
      bordered
      class="text-center mt-5"
      :per-page="perPage"
      :current-page="currentPage"
      :items="items"
      :fields="fields"
    >
      <template #cell(delete)="row">
        <b-button
          v-model="status"
          size="sm"
          :per-page="perPage"
          :current-page="currentPage"
          variant="outline-primary"
          @dblclick="cancel(row)"
          class="mr-2"
        >
          <b-icon icon="trash"></b-icon>
        </b-button>
      </template>
    </b-table>
  </div>
</template>
<script>
import { BIcon, BIconPencil, BIconTrash } from "bootstrap-vue";

export default {
  components: {
    BIcon,
    BIconPencil,
    BIconTrash,
  },
  data() {
    return {
      file: null,
      loading: false,
      fields: [
        { key: "Banner", thClass: "bg-info text-light" },
        { key: "delete", thClass: "bg-info text-light" },
      ],
      items: [],
    };
  },
  methods: {
    async upload(event) {
      this.file = await this.$refs.file.files[0];
    },
    async onSubmit(event) {
      event.preventDefault();
      if (
        this.file.type == "image/jpeg" ||
        this.file.type == "image/png" ||
        this.file.type == "image/jpg"
      ) {
        let formData = new FormData();
        formData.append("file1", this.file);
        try {
          await this.$axios
            .post("", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((res) => {
              alert(res.data.message);
              this.$router.push({ name: "/" });
            })
            .catch((err) => {
              console.log(err.data.message);
            });
        } catch (error) {}
      } else {
        alert("bukan gambar");
      }
    },
  },
};
</script>
