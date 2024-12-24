<template>
  <div>
    <h1>Города</h1>
    <DataTable
      :value="cities"
      :lazy="true"
      :loading="dataStore.loading"
      :paginator="true"
      :rows="perpage"
      :rowsPerPageOptions="[2, 5, 10]"
      :totalRecords="cities_total"
      @page="onPageChange"
      response-layout="scroll"
      :laading="true"
      :first="offset"
    >
      <Column field="id" header="№"></Column>
      <Column field="name" header="Название"></Column>
    </DataTable>
  </div>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { useDataStore } from "@/stores/dataStore";

export default {
  name: "Cities",
  components: { DataTable, Column },
  data() {
    return {
      dataStore: useDataStore(),
      perpage: 5,
      offset: 0,
    };
  },
  computed: {
    cities() {
      return this.dataStore.cities;
    },
    cities_total() {
      return this.dataStore.cities_total;
    },
  },
  mounted() {
    console.log('Cities component mounted');
    this.dataStore.get_cities();
    this.dataStore.get_cities_total();
    console.log('Movies=', this.cities);
  },
  methods: {
    onPageChange(event) {
      this.offset = event.first;
      this.perpage = event.rows;
      this.dataStore.get_cities(this.offset / this.perpage, this.perpage);
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
