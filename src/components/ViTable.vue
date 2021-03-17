<template>
  <div
    v-if=" headerColumns.length > 0"
    class="min-w-screen bg-gray-100 flex bg-gray-100 font-sans overflow-hidden flex-col"
  >
    <div class="w-full lg:w-5/6 px-4 mx-auto pt-8" v-if="isSearchable || isFilterable">
      <div class="flex justify-between items-center">
        <input
        type="text"
        v-if="isSearchable"
        v-model="searchQuery"
        placeholder="Search table"
        class="bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
      />
      <select v-model="filterBy" v-if="isFilterable">
        <option value="-1"> Filter </option>
        <option v-for="(option, index) in filters" :key="index" :value="index">
          {{ option.name }}
        </option>
      </select>
      </div>

      <div class="bg-white shadow-md rounded my-6">
        <table class="min-w-max w-full table-auto relative">
          <thead>
            <tr
              class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal py-4"
            >
              <th
                v-for="header in headerColumns"
                :key="header.key"
                class="py-3 px-6 text-left"
              >
                {{ header.title }}
              </th>
            </tr>
          </thead>

          <div
            v-if="filteredData.length === 0"
            class="flex items-center justify-center absolute w-full h-full bg-white py-4 font-bold"
          >
            <h1>No data available</h1>
          </div>

          <tbody class="text-gray-600 text-sm font-light">
            <tr
              v-for="item in paginatedData"
              :key="item.id"
              class="border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
            >
              <td
                v-for="header in headerColumns"
                :key="header.key"
                class="py-3 px-6 text-left whitespace-nowrap"
              >
                {{ item[header.key] }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <nav class="pagination-wrapper py-2" v-if="filteredData.length > 0 && paginate && dataSource.length > 0">
        <span
          >{{ pagination.from }} - {{ pagination.to }} of
          {{ pagination.total }}</span
        >
        <a
          class="py-1 px-2 bg-blue-700 text-white rounded mx-2 cursor-pointer"
          v-if="pagination.previousPage"
          @click="onPreviousPage"
          >Prev</a
        >
        <a
          v-else
          :disabled="true"
          class=" py-1 px-2 mx-2 bg-gray-500 text-white rounded "
          >Prev</a
        >

        <a
          class="py-1 px-2 mx-2 bg-blue-700 text-white rounded cursor-pointer"
          v-if="pagination.nextPage"
          @click="onNextPage"
          >Next</a
        >
        <a
          v-else
          :disabled="true"
          class=" py-1 px-2 mx-2 bg-gray-500 text-white rounded "
          >Next</a
        >
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: "ViTable",
  data() {
    return {
      //state of filter index || value
      filterBy: -1,

      //pagination config
      pagination: {
        // current pagination view
        currentPage: 1,
        //total number of items in data source array
        total: "",
        //next page state
        nextPage: "",
        //previous page state
        previousPage: "",
        //indicator of start of items range in view
        from: "",
        //indicator of end of items range in view
        to: "",
      },

      //search input state
      searchQuery: "",
    };
  },
  props: {
    //number of items per page
    dataPerPage: {
      type: Number,
      default: 5,
    },
    //header || tableColumns
    headerColumns: {
      type: Array,
      default: () => [],
    },
    //Table data
    dataSource: {
      type: Array,
      default: () => [],
    },
    //filters for table data
    filters: {
      type: Array,
      default: () => [],
    },
    //paginate table data or not
    paginate: {
      type: Boolean,
      default: true
    },
    //if table should have an input field to search
    isSearchable: {
      type: Boolean,
      default: true
    },
    //if table data should be filterable
    isFilterable: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    //function to set || manage pagination states
    paginateData(arr, length, pageIndex) {
      this.pagination.from = arr.length ? (pageIndex - 1) * length + 1 : "";
      this.pagination.to =
        pageIndex * length > arr.length ? arr.length : pageIndex * length;
      this.pagination.previousPage = pageIndex > 1 ? pageIndex : "";
      this.pagination.nextPage =
        arr.length > this.pagination.to ? pageIndex + 1 : "";

      return arr.slice((pageIndex - 1) * length, pageIndex * length);
    },

    //move to next page if available
    onNextPage() {
      ++this.pagination.currentPage;
    },

    //move to previous page if available
    onPreviousPage() {
      --this.pagination.currentPage;
    },
  },
  computed: {
    paginatedData() {
      return this.paginateData(
        this.filteredData,
        this.dataPerPage,
        this.pagination.currentPage
      );
    },

    //fiter and search table data handlers
    filteredData() {
      let searchFilter = this.searchQuery.toLowerCase();
      let dataSource = this.dataSource;

      //filter data by search querry
      if (this.isSearchable && this.searchQuery) {
        dataSource = dataSource.filter((data) => {
          return Object.keys(data).some((key) => {
            return (
              String(data[key])
                .toLowerCase()
                .indexOf(searchFilter) > -1
            );
          });
        });
      }
      
      //filter data by filter queries
      if (this.isFilterable && this.filterBy >= 0) {
        dataSource = dataSource.filter((data) => {
          const columnToFilter = this.filters[this.filterBy].column;
          const valueToFilter = this.filters[this.filterBy].value;
          return data[columnToFilter] === valueToFilter;
        });
      }

      return dataSource;
    },
  },
  async created() {
    // await this.getData();
  },
};
</script>

<style></style>
