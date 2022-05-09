<script setup lang="ts">
interface Props {
  msgList: any
  toUser: UserData
  user: LoginUser
}
const props = defineProps<Props>()
</script>

<template>
  <!-- 用户单聊信息展示 -->
  <el-main v-if="msgList.length" id="msgDiv" width="" class="app-msg">
    <div v-for="list in msgList" :key="list.id">
      <p v-if="list.from_id !== user.id" class="msg-content-left">
        <img class="img-left" :src="toUser.avatar">
        <span>
          <!-- <p v-html="list.context"></p> -->
          {{ list.context }}<i style="font-size:8px">{{ list.created_at }}</i>
        </span>
      </p>
      <p v-else class="msg-content-right">
        <span>
          <!-- <p v-html="list.context"></p> -->
          {{ list.context }}<i style="font-size:8px">{{ list.created_at }}</i>
        </span>
        <img class="img-right" :src="user.avatar">
      </p>
    </div>
  </el-main>
</template>

<style lang="scss" scoped>
.audio-right,
.audio-left {
  padding: 10px;
}

.app-msg {
  background-color: rgb(236 235 235);
  height: 100%;
  padding: 10px;

  .im-gif {
    max-height: 300px;
    max-width: 300px;
    box-shadow: 0 0px 0px 0 #a3b4bf;

    img {
      height: 100%;
      width: 100%;
    }
  }

  .msg-content-left {
    padding: 5px 0px 5px 0px;
    align-items: center;
    display: flex;
    justify-content: left;

    .im-gif {
      max-height: 300px;
      max-width: 300px;
      height: 100%;
      width: 100%;
      box-shadow: 0 0px 0px 0 #a3b4bf;
      padding: 10px;
    }

    .img-left {
      width: 40px;
      height: 40px;
      box-shadow: 0 1px 10px 0 #a3b4bf;
    }

    span {
      max-width: 70%;
      border-radius: 3px;
      -moz-border-radius: 3px;
      -webkit-border-radius: 3px;
      list-style: none;
      text-align: left;
      font-size: 14px;
      background: #fff;
      text-align: left;
      margin: 5px 0 0 0;
      display: inline-block;
      padding: 8px 10px;
      margin-top: 0;
      word-break: break-all;
      margin-left: 15px;
    }

    span::before {
      top: 11px;
      right: 100%;
      left: 44px;
      display: block;
      float: left;
      width: 0;
      height: 0;
      pointer-events: none;
      content: ' ';
      border-color: transparent;
      border-style: solid solid outset;
      border-width: 8px;
      border-right-color: #fff;
      margin-left: -26px;
    }
  }

  .msg-content-right {
    padding: 5px 0px 5px 0px;
    justify-content: flex-end;
    display: flex;
    align-items: center;

    .im-gif {
      max-height: 300px;
      max-width: 300px;
      height: 100%;
      width: 100%;
      box-shadow: 0 0px 0px 0 #a3b4bf;
      padding: 10px;
    }

    .img-right {
      width: 40px;
      height: 40px;
      box-shadow: 0 1px 10px 0 #a3b4bf;
    }

    span {
      max-width: 70%;
      border-radius: 3px;
      -moz-border-radius: 3px;
      -webkit-border-radius: 3px;
      list-style: none;
      text-align: left;
      font-size: 14px;
      background: #b2e281;
      text-align: left;
      margin: 5px 0 0 0;
      display: inline-block;
      padding: 8px 10px;
      margin-top: 0;
      word-break: break-all;
      margin-right: 10px;
    }

    span::before {
      top: 11px;
      display: block;
      float: right;
      width: 0;
      height: 0;
      pointer-events: none;
      content: ' ';
      border-color: transparent;
      border-style: solid solid outset;
      border-width: 8px;
      border-left-color: #b2e281;
      margin-right: -25px;
    }
  }
}
</style>
