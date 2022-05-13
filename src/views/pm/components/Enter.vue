<script setup lang="ts">
const emit = defineEmits(['send'])
const textarea = ref('')
const placeholder = ref('请输入内容...')

function handleSend() {
  emit('send', textarea.value)
  textarea.value = ''
}
</script>

<template>
  <div class="message-input" @keyup.enter="handleSend">
    <textarea v-model="textarea" maxlength="100" rows="3" :placeholder="placeholder" class="message-input-box" />
    <el-button class="message-input-submit" type="primary" size="small" @click="handleSend">
      发送
    </el-button>
  </div>
</template>

<style scoped lang="scss">
.message-input {
  height: auto;
  overflow: hidden;

  position: relative;

  &-box {
    resize: none;
    width: 100%;
    height: 60px;
    overflow-x: hidden;
    overflow-y: hidden;
    outline: 0;
    background-color: #fff;
    border: 0;
    font-size: 1rem;
    line-height: 1.5rem;
  }

  &-menu {
    text-align: right;
  }

  &-submit {
    bottom: 10px;
    right: 0;
    position: absolute;
  }
}
</style>
