<script setup lang="ts">
import type { Ref } from 'vue'
import Enter from './components/Enter.vue'
import ChatMsg from './components/ChatMsg.vue'

import { getUserById } from '@/api/user'

interface IMessage {
  id?: number
  fromId: number
  toId: number
  context: string
  createTime?: Object
}

const props = defineProps({
  id: String,
})
const userStore = useUserStore()

const socket = ref<WebSocket>()
// 后端ws的连接地址
const ws = import.meta.env.VITE_APP_WS
// 接收消息的用户
const user = ref<LoginUser>()

// 这也能行???
user.value = userStore

const toUser = ref<UserData>()

const msgData = user.value.msgData

function sendMsg(msg: IMessage) {
  socket.value?.send(JSON.stringify(msg))
  userStore.addMsg({ id: 1, context: msg.context, from_id: msg.fromId, to_id: msg.toId })
}

function enter(m: Ref<string>) {
  if (toUser && toUser.value)
    sendMsg({ fromId: userStore.id, toId: toUser.value.id, context: m.value })
}

// 初始化用户聊天和Socket
const init = async () => {
  if (props.id)
    toUser.value = await getUserById(parseInt(props.id))

  if (typeof WebSocket === 'undefined') {
    ElNotification.error('您的浏览器不支持websocket')
  }
  else {
    socket.value = new WebSocket(`${ws}/${userStore.token}`)
    socket.value.onopen = () => {
      // console.log('socket opened')
    }
    socket.value.onmessage = (msg) => {
      const data = JSON.parse(msg.data)
      userStore.addMsg({ id: 1, context: data.context, from_id: data.fromId, to_id: data.toId })
    }
  }
}
init()
</script>

<template>
  <el-container class="pm-container">
    <el-container>
      <el-header class="pm-header">
        聊天对象名称
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
