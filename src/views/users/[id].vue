<script setup lang="ts">
import UserCard from './components/UserCard.vue'
import Activity from './components/Activity.vue'
import Timeline from './components/Timeline.vue'
import Account from './components/Account.vue'

import { getUserById } from '@/api/user'

const router = useRouter()
const route = useRoute()
const loginUser = storeToRefs(useUserStore())
const user = ref<UserInfo>()
const activeTab = ref('activity')

// 获得路由中的用户ID,判断是否是数字
const userId = ref<number>()
userId.value = Number(route.params.id)
if (!isNaN(userId.value)) {
  getUserById(userId.value).then((data) => {
    user.value = data
  })
}

else { router.push({ name: 'all' }) }
</script>

<template>
  <div v-if="user">
    <el-row :gutter="20">
      <el-col :span="6" :xs="24">
        <user-card :user="user" />
      </el-col>

      <el-col :span="18" :xs="24">
        <el-card>
          <el-tabs v-model="activeTab">
            <el-tab-pane label="动态" name="activity">
              <activity />
            </el-tab-pane>
            <el-tab-pane label="时间线" name="timeline">
              <timeline />
            </el-tab-pane>
            <el-tab-pane v-if="userId === loginUser.userInfo.value?.id" label="账号" name="account">
              <account :user="user" />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
