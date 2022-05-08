<script setup lang="ts">
function handleSend() { }

const textarea = ref('')
const placeholder = ref('请输入内容...')
</script>

<template>
  <div class="message-input" @keyup.enter="handleSend">
    <textarea v-model="textarea" rows="3" :placeholder="placeholder" class="message-input-box" />
    <div class="message-input-menu">
      <el-button class="message-input-submit" type="primary" size="small" @click="handleSend">
        发送
      </el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.message-input {
  height: auto;
  overflow: hidden;

  &-box {
    display: block;
    width: 100%;
    height: 60px;
    overflow-x: hidden;
    overflow-y: auto;
    box-sizing: border-box;
    resize: none;
    outline: 0;
    background-color: #fff;
    border: 0;
    word-break: break-all;
    font-size: 13px;
    line-height: 17px;
    -webkit-appearance: none;
  }

  &-menu {
    text-align: right;
  }

  &-submit {
    display: inline-block;
    outline: none;
    cursor: pointer;
    text-align: center;
  }
}
</style>
