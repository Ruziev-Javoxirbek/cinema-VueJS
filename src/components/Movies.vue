<template>
  <div>
    <h1>Фильмы</h1>
    <DataTable
      :value="movies"
      :lazy="true"
      :loading="dataStore.loading"
      :paginator="true"
      :rows="perpage"
      :rowsPerPageOptions="[2, 5, 10]"
      :totalRecords="movies_total"
      @page="onPageChange"
      response-layout="scroll"
      :laading="true"
      :first="offset"
      >
      <Column field="id" header="№"></Column>
      <Column header="Изображение">
        <template #body="{data}">
          <img :src="data.picture_url" style="width: 100px;" />
        </template>
      </Column>
      <Column field="title" header="Название"></Column>
      <Column field="description" header="О фильме"></Column>
      <!--<Column field="release_date" header="Год выпуска"></Column>-->
      <Column field="duration" header="Время"></Column>
      <template #footer>
        <div class="text-end">
          <Button type="button" @click="this.$router.push('/createMovie')" icon="pi pi-plus" label="Добавить фильм" />
        </div>
      </template>
    </DataTable>
  </div>
</template>
<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { useDataStore } from "@/stores/dataStore";
import createMovie from "@/components/CreateMovie.vue";
import Button from "primevue/button";

export default {
  name: "Movies",
  components: { DataTable, Column, Button },
  data() {
    return {
      dataStore: useDataStore(),
      perpage: 5, // Количество записей на страницу
      offset: 0,  // Смещение для текущей страницы
    }
  },
  computed: {
    createMovie() {
      return createMovie
    },
    movies() {
      return this.dataStore.movies; // Список фильмов из хранилища
    },
    movies_total() {
      return this.dataStore.movies_total; // Общее количество фильмов из хранилища
    }
  },
  mounted() {
    console.log('Movies component mounted');
    this.dataStore.get_movies(); // Загружаем первую страницу
    this.dataStore.get_movies_total(); // Загружаем общее количество фильмов
    console.log('Movies=', this.movies);
  },
  methods: {
    onPageChange(event) {
      this.offset = event.first;
      this.perpage = event.rows;
      this.dataStore.get_movies(this.offset / this.perpage, this.perpage); // Запрашиваем данные для текущей страницы
    },
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
  margin-top: 20px;
  text-transform: uppercase;
  font-weight: bold;
}
</style>
