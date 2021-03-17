<template>
  <div id="app">
    <div class="min-w-screen bg-gray-100 flex bg-gray-100 font-sans overflow-hidden flex-col pt-4">
      
      <h2 class="w-full lg:w-5/6 px-4 mx-auto font-bold" >Example With no props passed</h2>
      <ViTable
        :dataSource="dataSource"
        :headerColumns="columns"
        :filters="filters"
      />
    </div>

    <div class="min-w-screen bg-gray-100 flex bg-gray-100 font-sans overflow-hidden flex-col pt-10">
      
      <h2 class="w-full lg:w-5/6 px-4 mx-auto font-bold" >Example With props passed</h2>
      <ViTable
        :dataSource="dataSource"
        :headerColumns="columns"
        :filters="filters"
        :paginate="false"
        :isSearchable="false"
        :isFilterable="true"
        :dataPerPage="8"
        :dataPerPageChange="false"
      />
    </div>
  </div>
</template>

<script>
import dataImport from "@/util/data";
import headerColumns from "@/util/headers";
import filterData from "@/util/filterData";

import ViTable from "@/components/ViTable.vue";
export default {
  name: "App",
  components: {
    ViTable,
  },
  data() {
    return {
      dataSource: [],
      columns: [],
      filters: [],
    };
  },
  methods: {
    fetchData() {
      this.dataSource = dataImport;
      this.columns = headerColumns;
      this.filters = filterData;
    },
  },
  async mounted() {
    await this.fetchData();
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
