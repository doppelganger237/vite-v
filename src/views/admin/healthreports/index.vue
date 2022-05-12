<script setup lang="ts">
import { reactive } from 'vue'
import { getAllReports } from '@/api/healthreports'

const tableData = ref([])

const queryParams = reactive({
  current: 1,
  size: 10,
})

const total = ref(0)
const loading = ref(true)

const getList = () => {
  loading.value = true
  getAllReports(queryParams).then((res) => {
    tableData.value = res.rows
    total.value = res.total
    loading.value = false
  })
}

getList()
</script>

<template>
  <el-table v-loading="loading" :data="tableData" style="width: 100%">
    <el-table-column prop="id" label="id" />
    <el-table-column prop="username" label="用户名" />
    <el-table-column prop="createTime" width="180" label="打卡日期" />
    <el-table-column label="操作" width="130" align="center">
      <template #default="scope">
        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <pagination v-show="total > 0" v-model:page="queryParams.current" v-model:limit="queryParams.size" :total="total"
    @pagination="getList" />
</template>

<route lang="yaml">
meta:
  title: 健康打卡
</route>
