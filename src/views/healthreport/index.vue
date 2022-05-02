<template>
  <div class="app-container">


    <el-row :gutter="20">

      <el-col :xs="24" :sm="24" :md="12" :lg="8">
        <el-card>
          <template v-slot:header>
            <div class="clearfix">
              <span>打卡区域</span>
            </div>
          </template>
          <div align="center">

            <p>

              当前时间: 2022年5月1日19点44分

            </p>

            <p>

              <el-button size="large" @click="dialogFormVisible  = true">点击打卡</el-button>
            </p>
          </div>
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="24" :md="12" :lg="16">

        <el-card>
          <template v-slot:header>
            <div class="clearfix">
              <span>打卡记录</span>
            </div>
          </template>
          <div class="body">


            <el-calendar v-model="value">

              <template #dateCell="{ data }">
                <p :class="data.isSelected ? 'is-selected' : ''">
                  {{ data.day.split('-').slice(1).join('-') }}
                  <span  v-if="hasReported(data)" >
                    <i-ep-select/>
                  </span>
                </p>


              </template>

            </el-calendar> />
          </div>
        </el-card>

      </el-col>

    </el-row>


<!-- 打卡表格 -->
  <el-dialog v-model="dialogFormVisible" title="每日打卡"  width="400px">
  
    <el-form :model="reportForm" ref="reportRef">
      <el-form-item label="打卡码" :label-width="formLabelWidth">
        <el-input v-model="reportForm.name" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm"
          >确定</el-button
        >
      </span>
    </template>
  </el-dialog>

  </div>
</template>

<route lang="yaml">
meta:
  title: '健康打卡'
  icon: 'dashboard'
</route>

<script setup>

//const tableData = ref([])

const dialogFormVisible = ref(false)
const formLabelWidth = '80px'
const reportForm = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})
const reportRef = ref()

function submitForm(){

  reportRef.value.validate(valid=>{
    if(valid){
      ElMessage.success('提交')
      dialogFormVisible.value = false
    }
  })
  
}

const value = ref(new Date())
const resDate = reactive([
   '2022-05-01',
 '2022-05-02'
])


const hasReported = (data) => {
  return resDate.includes(data.day)
}


</script>

<style scoped>
.el-card {
  margin-bottom: 20px;
}
</style>