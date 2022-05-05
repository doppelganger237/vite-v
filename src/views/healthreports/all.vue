<template>
  <div class="app-container">
    <el-table v-loading="loading" :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="id" width="180" />
      <el-table-column prop="username" label="用户名" width="180" />
      <el-table-column prop="createTime" label="打卡日期" />
    </el-table>
    <pagination
      v-show="total > 0"
      v-model:page="queryParams.current"
      v-model:limit="queryParams.size"
      :total="total"
      @pagination="getList"
    />
  </div>
</template>

<script setup>
import { getAllReports } from "@/api/healthreports";
import { reactive } from "vue";

const tableData = ref([]);

const queryParams = reactive({
  current: 1,
  size: 10,
});

const total = ref(0);
const loading = ref(true);

const getList = () => {
  loading.value = true;
  getAllReports(queryParams).then((res) => {
    tableData.value = res.data.rows;
    total.value = res.data.total;
    loading.value = false;
  });
};

getList();
</script>
