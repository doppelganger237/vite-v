<script setup lang="ts">
import { getParcelList } from '@/api/parcels'
import { standardizeForm } from '@/utils/v'
const tableData = ref([])

// 响应式数据,复杂的数据结果
const queryParams = reactive({
  current: 1,
  size: 10,
})

const getList = () => {
  getParcelList(queryParams).then((res) => {
    standardizeForm(res.rows).then(() => {
      tableData.value = res.rows
    })
  })
}

getList()
</script>

<template>
  <div class="app-container">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="编号" />
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="location" label="地址" />
      <el-table-column prop="code" label="取件码" />
      <el-table-column prop="createTime" width="180" label="创建时间" />

      <el-table-column prop="status" label="状态">
        <template #default="scope">
          <el-tag :type="scope.row.status === 0 ? '' : 'success'" disable-transitions>
            {{ scope.row.status === 0 ? "未取件" : "已经取件" }}
          </el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
