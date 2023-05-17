<template>
  <div>
    <Main>
      <a-row :gutter="25">
        <a-col :sm="24" :xs="24">
          <sdCards headless>
            <h3>FreeBoard Page</h3>
            <DataTables :filterOption="true" :filterOnchange="true" :tableData="tableDataScource" :columns="dataTableColumn" :rowSelection="false" />
          </sdCards>
        </a-col>
      </a-row>
    </Main>
  </div>
</template>

<script>
import { Main } from "../styled";
import { defineComponent, computed, onMounted } from "vue";
import DataTables from "@/components/table/DataTable.vue";
import { useStore } from "vuex";

const dataTableColumn = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "User",
    dataIndex: "user",
    key: "user",
  },
  {
    title: "Country",
    dataIndex: "country",
    key: "coutry",
  },
  {
    title: "Company",
    dataIndex: "company",
    key: "company",
  },
  {
    title: "Position",
    dataIndex: "position",
    key: "position",
  },
  {
    title: "Join Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Actions",
    dataIndex: "action",
    key: "action",
    width: "90px",
  },
];

export default defineComponent({
  name: "MainPage",
  components: {
    Main,
    DataTables,
  },
  setup() {
    const { state, dispatch } = useStore();

    onMounted(() => dispatch("tableReadData"));

    const tableDataScource = computed(() =>
      state.dataTable.tableData.map((item) => {
        const { id, name, country, company, position, status, date } = item;
        return {
          id: `#${id}`,
          key: item.id,
          user: <span class="ninjadash-username">{name}</span>,
          country: <span>{country}</span>,
          company: <span>{company}</span>,
          position,
          date,
          status: <span class={`ninjadash-status ninjadash-status-${status}`}>{status}</span>,
          action: (
            <div class="table-actions">
              <router-link class="view" to={`#`}>
                <unicon name="eye"></unicon>
              </router-link>
              <router-link class="edit" to="#">
                <unicon name="edit"></unicon>
              </router-link>
              <router-link class="delete" to="#">
                <unicon name="trash"></unicon>
              </router-link>
            </div>
          ),
        };
      })
    );
    return {
      tableDataScource,
      dataTableColumn,
    };
  },
});
</script>
