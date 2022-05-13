<script setup lang="ts">
import { useWebSocket } from '@vueuse/core'
import Enter from './components/Enter.vue'
import ChatMsg from './components/ChatMsg.vue'
import { getUserById } from '@/api/user'

const props = defineProps({
  id: String,
})

const userStore = useUserStore()

// 后端ws的连接地址
const ws = import.meta.env.VITE_APP_WS
// 当前用户
const user = ref<UserInfo>()
user.value = userStore.userInfo!
const toUser = ref<UserInfo>()

const { status, data, send, open, close } = useWebSocket(`${ws}/${userStore.token}`)

const msgData = userStore.msgData

// 初始化用户聊天和Socket
if (props.id)
  getUserById(parseInt(props.id)).then(u => toUser.value = u)

watchEffect(() => {
  if (data.value) {
    const res: IMessage = JSON.parse(data.value)
    userStore.addMsg(res)
  }
})

function sendMsg(msg: IMessage) {
  send(JSON.stringify(msg))
  userStore.addMsg(msg)
}

function enter(m: string) {
  if (user.value && toUser.value)
    sendMsg({ fromId: user.value.id, toId: toUser.value.id, context: m })
}
</script>

<template>
  <el-container class="pm-container">
    <el-container>
      <el-header class="pm-header">
        {{ toUser?.username }}
      </el-header>
      <el-main class="pm-main">
        <ChatMsg v-if="toUser && user" :msg-list="msgData" :user="user" :to-user="toUser" />
      </el-main>
      <el-footer class="tool-box">
        <Enter @send="enter($event)" />
      </el-footer>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.pm-container {
  height: 100%;
  background-color: white;
  box-shadow: 0px 0px 6px 2px rgb(38 103 166 / 8%);

}

.tool-box {

  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

.pm-main {
  background-color: rgb(236 235 235);
  border: none;
}

.pm-header {
  height: 50px;
  justify-content: center;
  align-items: center;
  display: flex;
}
</style>
