<template>
  <div class="container">
    <b-spinner v-if="loading"> </b-spinner>
    <b-row v-else>
      <b-form @submit="onSubmit">
        <!-- <b-form-group class="mt-5" label="Nama Banner :">
          <b-form-input v-model="namaBanner"> </b-form-input>
        </b-form-group> -->
        <b-form-group class="mt-5" label="File Banner :">
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
        </b-form-group>
        <b-button type="submit" v-if="loading" variant="primary" block
          >Submit</b-button
        >

        <b-button type="submit" v-else variant="primary" block>Submit</b-button>
      </b-form>
    </b-row>
    <b-table bordered class="text-center mt-5" :items="items" :fields="fields">
      <template
        #cell(fileBanner)="row"
        class="d-flex justify-content-center align-items-center"
      >
        <b-img
          thumbnail
          fluid
          style="max-width: 400px"
          :src="`${ipBackend}${row.item.fileBanner}`"
          alt="Image 3"
        ></b-img>
      </template>
      <!-- <template
        #cell(update)="row"
        class="d-flex justify-content-center align-items-center"
      >
        <b-button
          v-model="status"
          size="sm"
          variant="outline-primary"
          @dblclick="update(row)"
          class="mr-2"
        >
          <b-icon icon="layers"></b-icon>
        </b-button>
      </template> -->

      <template
        #cell(delete)="row"
        class="d-flex justify-content-center align-items-center"
      >
        <b-button
          v-model="status"
          size="sm"
          variant="outline-primary"
          @click="cancel(row)"
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
import {
  ipBackendBanner,
  ipBackend,
  ipBackendKategori,
} from "../assets/js/ipBeckEnd";
export default {
  components: {
    BIcon,
    BIconPencil,
    BIconTrash,
  },
  data() {
    return {
      ipBackend: ipBackend,
      status: 1,
      namaBanner: "",
      file: null,
      loading: false,
      fields: [
        {
          key: "fileBanner",
          thClass: "bg-info text-light",
        },
        // {
        //   key: "update",
        //   thClass: "bg-info text-light nameOfTheClass",
        // },
        {
          key: "delete",
          thClass: "bg-info text-light nameOfTheClass",
        },
      ],
      items: [],
    };
  },
  created() {
    this.getBanner();
  },
  watch: {
    async status(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.getBanner();
      }
    },
  },
  methods: {
    async update() {},
    async cancel(row) {
      if (confirm("Apakah anda yakin menghapus banner ini ?") == true) {
        this.loading = true;
        let id = row.item.id;
        this.$axios
          .post(`${ipBackendBanner}delete`, { id: id })
          .then((res) => {
            if (this.status == 0) {
              this.status = 1;
            } else {
              this.status = 0;
            }
            this.loading = false;
            alert(res.data.message);
          })
          .catch((err) => {
            this.loading = false;

            alert(err);
          });
      }
    },
    async getBanner() {
      this.items = [];
      this.loading = true;
      this.$axios.get(`${ipBackendBanner}listAll`).then((list) => {
        for (let i = 0; i < list.data.data.length; i++) {
          this.items.push(list.data.data[i]);
        }
      });
      this.loading = false;
    },
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
        formData.append("namaBanner", this.namaBanner);

        try {
          await this.$axios
            .post(`${ipBackendBanner}register`, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((res) => {
              alert(res.data.message);
              this.$router.push("/dashboard");
            })
            .catch((err) => {
              alert(err.data.message);
            });
        } catch (err) {
          alert(err.data.message);
        }
      } else {
        alert("bukan gambar");
      }
    },
  },
};
</script>
<style scoped>
.nameOfTheClass {
  max-width: 10px;
}
</style>
