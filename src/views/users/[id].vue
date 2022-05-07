<script setup lang="ts">
import UserCard from './components/UserCard.vue'
import Activity from './components/Activity.vue'
import Timeline from './components/Timeline.vue'
import Account from './components/Account.vue'

import { getUserById } from '@/api/user'

const router = useRouter()
const route = useRoute()

const user = ref<IUserInfo>()
const activeTab = ref('activity')

// 获得路由中的用户ID,判断是否是数字
const userId = Number(route.params.id)
if (!isNaN(userId)) {
  getUserById(userId).then((data) => {
    user.value = data
  })
}

else { router.push({ name: 'all' }) }

// TODO数据传递不够优雅
// const user = reactive({ username: "", avatar: "", id: 0 });
// const { username, avatar, id } = storeToRefs(userStore);
// user.username = username.value;
// user.avatar = avatar.value;
// user.id = id.value;

// const user = computed(() => ({
//   username: userStore.username,
//   avatar: userStore.avatar,
//   id: userStore.id,
// }))
</script>

<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">
        <el-col :span="6" :xs="24">
          <user-card :user="user" />
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="Activity" name="activity">
                <activity />
              </el-tab-pane>
              <el-tab-pane label="Timeline" name="timeline">
                <timeline />
              </el-tab-pane>
              <el-tab-pane label="Account" name="account">
                <account :user="user" />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
