<template>
  <div>
    <h1>Кинотеатры</h1>
    <DataTable
      :value="theaters"
      :lazy="true"
      :loading="dataStore.loading"
      :paginator="true"
      :rows="perpage"
      :rowsPerPageOptions="[2, 5, 10]"
      :totalRecords="theaters_total"
      @page="onPageChange"
      response-layout="scroll"
      :laading="true"
      :first="offset"
    >
      <Column field="id" header="№"></Column>
      <Column field="name" header="Название"></Column>
      <Column field="address" header="Адрес"></Column>
      <Column field="contact_info" header="Контакты"></Column>
    </DataTable>
  </div>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { useDataStore } from "@/stores/dataStore";

export default {
  name: "Theaters",
  components: { DataTable, Column },
  data() {
    return {
      dataStore: useDataStore(),
      perpage: 5,
      offset: 0,
    };
  },
  computed: {
    theaters() {
      return this.dataStore.theaters;
    },
    theaters_total() {
      return this.dataStore.theaters_total;
    },
  },
  mounted() {
    console.log('Theaters component mounted');
    this.dataStore.get_theaters();
    this.dataStore.get_theaters_total();
    console.log('Theaters=', this.theaters);
  },
  methods: {
    onPageChange(event) {
      this.offset = event.first;
      this.perpage = event.rows;
      this.dataStore.get_theaters(this.offset / this.perpage, this.perpage);
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
