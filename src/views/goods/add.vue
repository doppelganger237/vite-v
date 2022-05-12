<script setup lang="ts">
import type { FormInstance, FormRules, UploadInstance, UploadProps, UploadUserFile } from 'element-plus'

const { t } = useI18n()
const upload = ref<UploadInstance>()
const formRef = ref<FormInstance>()

interface GoodsForm {
  title: String
  imgs: UploadUserFile[]
  description: string
}
const form: GoodsForm = reactive({ title: '', imgs: Array<UploadUserFile>(), description: '' })

const rules = reactive<FormRules>({
  title: [{
    required: true,
    message: '请输入标题',
    trigger: 'change',
  },
  ],

  imgs: [{
    required: true,
    message: '至少上传一张图片',
    trigger: 'change',
  },
  ],
  description: [{
    required: true,
    message: '请添加描述',
    trigger: 'change',
  },
  ],

})

const fileList = ref<UploadUserFile[]>([
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
])

form.imgs = fileList.value

const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}

const handleExceed: UploadProps['onExceed'] = (files) => {
  ElNotification({
    title: '错误',
    message: '你最多只能上传五张图片',
    type: 'error',
  })
}

const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl)
    return
  await formEl.validate((valid, fields) => {
    if (valid)
      console.log('submit!')

    else
      console.log('error submit!', fields)
  })
}
</script>

<template>
  <el-card>
    <el-form ref="formRef" :model="form" label-position="top" :rules="rules">
      <el-form-item prop="title" class="mb-4" label="标题">
        <el-input v-model="form.title" class="flex-auto" :maxlength="100" required />
      </el-form-item>
      <el-form-item prop="imgs" label="图片">
        <el-upload ref="upload" :file-list="form.imgs" :auto-upload="false"
          action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card"
          :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :limit="5" :on-exceed="handleExceed">
          <el-icon>
            <i-ep-plus />
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image">
      </el-dialog>
      <el-form-item prop="description" label="简介">
        <el-input v-model="form.description" :placeholder="t('input-placeholder')"
          :autosize="{ minRows: 3, maxRows: 5 }" type="textarea" />
      </el-form-item>

      <el-form-item>
        <el-button class="text-2xl p-5 ml-auto" @click="onSubmit(formRef)">
          创建
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<route lang="yaml">
meta:
  title: 上传宝贝
</route>
