<template>
  <div class="app-container">
    <div v-if="userStore">
      <el-row :gutter="20">
        <el-col :span="6" :xs="24">
          <user-card :user="user" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import UserCard from "./components/UserCard.vue";
const userStore = useUserStore();

// TODO数据传递不够优雅
// const user = reactive({ username: "", avatar: "", id: 0 });
// const { username, avatar, id } = storeToRefs(userStore);
// user.username = username.value;
// user.avatar = avatar.value;
// user.id = id.value;

const user = reactive({ username: "", avatar: "", id: 0 });
const { username, avatar, id } = storeToRefs(userStore);
user.username = username.value;
user.avatar = avatar.value;
user.id = id.value;
</script>
