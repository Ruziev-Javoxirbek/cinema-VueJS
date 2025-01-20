<template>
  <div class="flex justify-center">
    <form v-on:submit.prevent="createMovie" class="w-1/2 p-6">
      <h2 class="text-2xl mb-4 text-center" style="color: dimgrey">Добавление фильма</h2>
      <div class="flex flex-col">
        <InputText type="text" placeholder="Введите наименование фильма" v-model="movieName" />
      </div>
      <div class="flex flex-col mt-4">
        <textarea
          placeholder="Введите описание фильма"
          v-model="movieDescription"
          class="border border-gray-300 rounded-md p-2"
        ></textarea>
      </div>
      <div class="mb-4 mt-4">
        <label for="file" id="file-label" class="block text-md font-medium text-gray-500 border border-gray-300 rounded-md p-2">
          <span class="pi pi-upload mx-3"></span>Выбрать изображение</label>
        <input type="file" id="file" name="file" v-on:change="changeCaption" accept="image/*" />
      </div>

      <div class="flex flex-col mt-6">
        <Button type="submit" label="Создать" />
      </div>
    </form>
  </div>
  <Toast position="bottom-right" />
</template>

<script>
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import {useDataStore} from "@/stores/dataStore";
import Toast from "primevue/toast";

export default {
  name: "CreateMovie",
  components: {InputText, Button, Toast},
  data() {
    return {
      dataStore: useDataStore(),
      movieName: '',
      movieDescription: '',
      movieImage: null,
    };
  },
  computed: {
    errorMessage() {
      return this.dataStore.errorMessage;
    },
    errorCode() {
      return this.dataStore.errorCode;
    },
  },
  methods: {
    changeCaption(event) {
      const file = event.target.files[0];
      if (file) {
        this.movieImage = file;
        document.getElementById("file-label").innerText = file.name;
      }
    },
    async createMovie() {
      const formData = new FormData();
      formData.append("title", this.movieName);
      formData.append("description", this.movieDescription);
      formData.append("image", this.movieImage);
      await this.dataStore.create_movie(formData);

      if (this.errorCode > 0) {
        this.$toast.add({
          severity: 'error',
          summary: "Ошибка добавления данных",
          detail: this.errorMessage,
          life: 4000,
        });
      } else {
        this.$toast.add({
          severity: 'success',
          summary: "Данные успешно добавлены",
          detail: this.errorMessage,
          life: 4000,
        });
      }
    },
  },
};
</script>
