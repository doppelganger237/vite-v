<script setup lang="ts">
import Cookies from 'js-cookie'
import { decrypt, encrypt } from '@/utils/jsencrypt' // rememberMe-password加密
const loading = ref(false)

const router = useRouter()
const loginForm = reactive({
  username: '',
  password: '',
  rememberme: false,
})

const userStore = useUserStore()

const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
}
const loginRef = ref()
const redirect = ref('/')
function submitForm() {
  loginRef.value.validate((valid) => {
    if (valid) {
      loading.value = true
      if (loginForm.rememberme) {
        Cookies.set('username', loginForm.username, { expires: 30 })
        Cookies.set('password', encrypt(loginForm.password), {
          expires: 30,
        })
        Cookies.set('rememberme', true, { expires: 30 })
      }
      else {
        // 否则移除
        Cookies.remove('username')
        Cookies.remove('password')
        Cookies.remove('rememberme')
      }
      userStore
        .login(loginForm)
        .then(() => {
          router.push({ path: redirect.value || '/' })
        })
        .catch((err) => {
          loading.value = false
        })
    }
  })
}

function getCookie() {
  const username = Cookies.get('username')
  const password = Cookies.get('password')
  const rememberme = Cookies.get('rememberme')
  loginForm.username = username === undefined ? loginForm.username : username
  loginForm.password
    = password === undefined ? loginForm.password : decrypt(password)
  loginForm.rememberme = rememberme === undefined ? false : Boolean(rememberme)
}

getCookie()
</script>

<template>
  <div class="login">
    <el-form ref="loginRef" :model="loginForm" :rules="rules" class="login-form">
      <h3 class="title">
        用户登录
      </h3>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" type="text" placeholder="用户名">
          <template #prepend>
            <el-icon>
              <i-ep-user />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" type="password" placeholder="密码" show-password @keyup.enter="submitForm">
          <template #prepend>
            <el-icon>
              <i-ep-lock />
            </el-icon>
          </template>
        </el-input>
      </el-form-item>

      <el-checkbox v-model="loginForm.rememberme" style="margin: 0px 0px 25px 0px">
        记住密码
      </el-checkbox>
      <el-form-item style="width: 100%">
        <el-button size="default" type="primary" style="width: 100%" :loading="loading" @click="submitForm">
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </el-form-item>
    </el-form>
    <!--  底部  -->
    <div class="el-login-footer">
      <span>Copyright © 2022 V All Rights Reserved.</span>
    </div>
  </div>
</template>

<route lang="yaml">
hidden: true
meta:
  layout: single
</route>

<style rel="stylesheet/scss" lang="scss">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url("../assets/img/login-background.jpg");
  background-size: cover;
}

.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 400px;
  padding: 25px 25px 5px 25px;

  .el-input {
    height: 38px;

    input {
      height: 38px;
    }
  }

  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}

.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}

.login-code {
  width: 33%;
  height: 38px;
  float: right;

  img {
    cursor: pointer;
    vertical-align: middle;
  }
}

.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}

.login-code-img {
  height: 38px;
}
</style>
