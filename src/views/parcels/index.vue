<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="12" :lg="8">
        <el-card class="card-box">
          <template #header>
            <div class="clearfix">
              <span>添加包裹</span>
            </div>
          </template>
          <div>
            <el-form :model="form" label-width="120px">
              <el-form-item label="取件码">
                <el-input v-model="form.name" />
              </el-form-item>
              <el-form-item label="取件区域">
                <el-select v-model="form.region" placeholder="选择取件区域">
                  <el-option label="8号驿站" value="8" />
                  <el-option label="20号抑制" value="20" />
                </el-select>
              </el-form-item>
              <el-form-item label="取件时间">
                <el-date-picker
                  v-model="form.date1"
                  type="date"
                  placeholder="Pick a date"
                  style="width: 100%"
                />
              </el-form-item>

              <el-form-item label="备注">
                <el-input
                  v-model="form.desc"
                  type="textarea"
                  maxlength="30"
                  show-word-limit
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">提交</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="24" :md="12" :lg="16">
        <el-card class="card-box">
          <template #header>
            <div class="clearfix">
              <span>我的包裹</span>
            </div>
          </template>
          <div class="body"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
// do not use same name with ref
const form = reactive({
  name: "",
  region: "",
  date1: "",
  date2: "",
  delivery: false,
  type: [],
  resource: "",
  desc: "",
});
</script>
