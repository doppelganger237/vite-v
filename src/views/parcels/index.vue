<script setup lang="ts">
import { addParcel, deleteParcel, getHisParcels } from '@/api/parcels'
const { t } = useI18n()
const tableData = ref([])
const total = ref(0)
const loading = ref(true)
const formRef = ref()
const data = reactive({
  form: {
    date: new Date(),
  },
})
const { form } = toRefs(data)

// 响应式数据,复杂的数据结果
const queryParams = reactive({
  current: 1,
  size: 10,
})

const getList = () => {
  loading.value = true
  getHisParcels(queryParams).then((res) => {
    tableData.value = res.rows
    total.value = res.total
    loading.value = false
  })
}

function onSubmit() {
  formRef.value.validate((valid) => {
    if (valid) {
      addParcel(form.value).then(() => {
        ElMessage.success(t('parcel.add.succeeded'))
        reset()
        getList()
      })
    }
  })
}
function handleDelete(i, r) {
  ElMessageBox.confirm('确定删除吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      deleteParcel(r.id)
        .then(() => {
          ElMessage.success('删除包裹成功!')
          getList()
        })
        .catch(() => { })
    })
    .catch(() => { })

  console.log(i, r)
}

function reset() {
  formRef.value.resetFields()
}
getList()
</script>

<template>
  <el-row :gutter="20">
    <el-col :xs="24" :sm="24" :md="24" :lg="8">
      <el-card class="card-box">
        <template #header>
          <div class="clearfix">
            <span>添加包裹</span>
          </div>
        </template>
        <div>
          <el-form ref="formRef" :model="form" label-width="120px">
            <el-form-item label="取件码" prop="code">
              <el-input v-model="form.code" placeholder="请输入取件码" />
            </el-form-item>
            <el-form-item label="取件区域" prop="location">
              <el-select v-model="form.location" placeholder="选择取件区域">
                <el-option label="8号驿站" value="8号驿站" />
                <el-option label="20号驿站" value="20号驿站" />
              </el-select>
            </el-form-item>

            <el-form-item label="备注" prop="description">
              <el-input v-model="form.description" type="textarea" maxlength="30" show-word-limit placeholder="送到哪" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">
                提交
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </el-col>

    <el-col :xs="24" :sm="24" :md="24" :lg="16">
      <el-card class="card-box">
        <template #header>
          <div class="clearfix">
            <span>{{ t('parcel.mine') }}</span>
          </div>
        </template>
        <div class="body">
          <el-table v-loading="loading" :data="tableData" style="width: 100%">
            <!-- <el-table-column prop="id" label="编号" /> -->
            <el-table-column prop="location" label="地址" />
            <el-table-column prop="code" label="取件码" />
            <el-table-column prop="createTime" label="创建时间" width="180" />

            <el-table-column prop="status" label="状态">
              <template #default="scope">
                <el-tag :type="scope.row.status === 0 ? '' : 'success'" disable-transitions>
                  {{ scope.row.status === 0 ? "未取件" : "已取件" }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150" align="center">
              <template #default="scope">
                <!-- <el-button
                    size="small"
                    @click="handleEdit(scope.$index, scope.row)"
                    >编辑</el-button
                  > -->
                <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <pagination
            v-show="total > 0" v-model:page="queryParams.current" v-model:limit="queryParams.size"
            :total="total" @pagination="getList"
          />
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<route lang="yaml">
meta:
  title: 包裹代拿
</route>
