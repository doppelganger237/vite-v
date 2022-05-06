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
            <p>
              昔者庄周梦为胡蝶，栩栩然胡蝶也，自喻适志与！不知周也。俄然觉，则蘧蘧然周也。不知周之梦为胡蝶与，胡蝶之梦为周与？周与胡蝶，则必有分矣。此之谓物化。
            </p>
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
                  <i-ep-select v-if="isDateReported(data.day)" />
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
import { isSameDay, isToday } from "@/utils/date";

// 打卡表格
const dialogFormVisible = ref(false);
const formLabelWidth = "80px";
const reportForm = reactive({
  name: "",
});
const reportRef = ref();

// 展示信息
const welcomeMsg = ref("");
const hasReportedToday = ref(false);

const reportedDate = reactive([]);
function getReportInfo() {
  // hasReported().then((res) => {
  //   hasReportedToday.value = res.data;
  //   welcomeMsg.value = "今日你" + (res.data ? "已经" : "还未") + "打卡";
  // });
  getReports().then((res) => {
    if (res.data && res.data.length > 0) {
      if (isToday(res.data[0])) {
        hasReportedToday.value = true;
        welcomeMsg.value = "今日你已经打卡!";
      } else {
        welcomeMsg.value = "今日你还未打卡!";
      }
      reportedDate.push(...res.data);
    } else {
      welcomeMsg.value = "开启你的第一次打卡!";
    }
  });
}

function isDateReported(day) {
  let reported = false;
  reportedDate.forEach((d) => {
    if (isSameDay(d, day)) reported = true;
  });
  return reported;
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
