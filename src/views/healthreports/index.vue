<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="12" :lg="8" align="middle">
        <el-card>
          <template #header>
            <div class="clearfix">
              <span>今日打卡</span>
            </div>
          </template>
          <div v-loading="welcomeMsg === null">
            <p>{{ welcomeMsg }}</p>

            <p>
              <el-button
                size="large"
                :disabled="hasReportedToday"
                @click="dialogFormVisible = true"
                >点击打卡</el-button
              >
            </p>
          </div>
        </el-card>
        <el-card>
          <template #header>
            <div class="clearfix">
              <span>消息</span>
            </div>
          </template>
          <div>
            <p>消息消息消息消息消息</p>
            <p>消息消息消息消息消息</p>
            <p>消息消息消息消息消息</p>
            <p>消息消息消息消息消息</p>
            <p>消息消息消息消息消息</p>
            <p>消息消息消息消息消息</p>
            <p>消息消息消息消息消息</p>
            <p>消息消息消息消息消息</p>
            <p>消息消息消息消息消息</p>
          </div>
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="24" :md="12" :lg="16">
        <el-card>
          <template #header>
            <div class="clearfix">
              <span>打卡记录</span>
            </div>
          </template>
          <div class="body">
            <el-calendar v-model="value">
              <template #dateCell="{ data }">
                <p :class="data.isSelected ? 'is-selected' : ''">
                  {{ data.day.split("-").slice(2).join("") }}
                </p>
                <span>
                  <i-ep-select />
                </span>
              </template>
            </el-calendar>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 打卡表格 -->
    <el-dialog v-model="dialogFormVisible" title="每日打卡" width="400px">
      <el-form ref="reportRef" :model="reportForm">
        <el-form-item label="打卡码" :label-width="formLabelWidth">
          <el-input v-model="reportForm.name" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
//const tableData = ref([])
import { healthReport, hasReported, getReports } from "@/api/healthreports";
const dialogFormVisible = ref(false);
const formLabelWidth = "80px";
const reportForm = reactive({
  name: "",
  region: "",
  date1: "",
  date2: "",
  delivery: false,
  type: [],
  resource: "",
  desc: "",
});
const reportRef = ref();
const welcomeMsg = ref("");
const hasReportedToday = ref(false);

const reportedDate = reactive([]);
function getReportInfo() {
  hasReported().then((res) => {
    hasReportedToday.value = res.data;
    welcomeMsg.value = "今日你" + (res.data ? "已经" : "还未") + "打卡";
  });
  getReports().then((res) => {
    reportedDate.push(...res.data);
  });
}

function submitForm() {
  reportRef.value.validate((valid) => {
    if (valid) {
      healthReport().then(() => {
        dialogFormVisible.value = false;
        ElMessage.success("打卡成功");
        getReportInfo();
      });
    }
  });
}

const value = ref(new Date());
getReportInfo();
</script>

<style scoped>
.el-card {
  margin-bottom: 20px;
}
</style>
