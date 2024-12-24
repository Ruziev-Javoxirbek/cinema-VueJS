<template>
  <div>
    <h1>Сеансы</h1>
    <DataTable
      :value="sessions"
      :lazy="true"
      :loading="dataStore.loading"
      :paginator="true"
      :rows="perpage"
      :rowsPerPageOptions="[2, 5, 10]"
      :totalRecords="sessions_total"
      @page="onPageChange"
      response-layout="scroll"
      :laading="true"
      :first="offset"
    >
      <Column field="id" header="№"></Column>
      <Column field="theater_id" header="№ Театра"></Column>
      <Column field="movie_id" header="№ Фильма"></Column>
      <Column field="date" header="Дата"></Column>
      <Column field="time" header="Время"></Column>
      <Column field="ticket_price" header="Цена билета"></Column>
      <Column field="available_seats" header="Места"></Column>
    </DataTable>
  </div>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { useDataStore } from "@/stores/dataStore";

export default {
  name: "Sessions",
  components: { DataTable, Column },
  data() {
    return {
      dataStore: useDataStore(),
      perpage: 5,
      offset: 0,
    };
  },
  computed: {
    sessions() {
      return this.dataStore.sessions;
    },
    sessions_total() {
      return this.dataStore.sessions_total;
    },
  },
  mounted() {
    console.log('Theaters component mounted');
    this.dataStore.get_sessions();
    this.dataStore.get_sessions_total();
    console.log('Sessions=', this.sessions);
  },
  methods: {
    onPageChange(event) {
      this.offset = event.first;
      this.perpage = event.rows;
      this.dataStore.get_sessions(this.offset / this.perpage, this.perpage);
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


