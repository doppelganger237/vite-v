<script setup lang="ts">
const { t } = useI18n()
const userStore = useUserStore()
const { avatar, roles, id } = storeToRefs(userStore)
const profileUrl = `/users/${id.value}`

function handleCommand(command: string) {
  switch (command) {
    case 'logout':
      logout()
      break
    default:
      break
  }
}

function logout() {
  ElMessageBox.confirm('确定注销吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      userStore.logout().then(() => {
        location.href = '/'
      })
    })
    .catch(() => { })
}
</script>

<template>
  <el-dropdown class="avatar-container" @command="handleCommand">
    <div class="avatar-wrapper">
      <img :src="avatar" class="user-avatar">
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <router-link :to="profileUrl">
          <el-dropdown-item>{{ t('user.center') }}</el-dropdown-item>
        </router-link>

        <el-dropdown-item v-if="roles.includes('admin')" command="adminMode">
          <span>管理员模式</span>
        </el-dropdown-item>
        <el-dropdown-item divided command="logout">
          <span>退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped lang="scss">
.avatar-container {

  .avatar-wrapper {
    margin-top: 5px;
    position: relative;

    .user-avatar {
      cursor: pointer;
      width: 40px;
      height: 40px;
      border-radius: 10px;
    }

  }
}
</style>
