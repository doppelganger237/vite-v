<script setup lang="ts">
const router = useRouter()
const route = useRoute()

const mockData = [

  {
    id: 1,
    name: '老八秘制小🍔包',
    description: '好吃的小憨包',
    createTime: '2022-5-7',
    price: 12.5,
  },
  {
    id: 2,
    name: '老八秘制小🍔包',
    description: '好吃的小憨包',
    createTime: '2022-5-7',
    price: 12.5,
  },
  {
    id: 3,
    name: '老八秘制小🍔包',
    description: '好吃的小憨包好吃的小憨包好吃的小憨包好吃的小憨包好吃的小憨包',
    createTime: '2022-5-7',
    price: 12.5,
  },
  {
    id: 4,
    name: '老八秘制小🍔包',
    description: '好吃的小憨包',
    createTime: '2022-5-7',
    price: 12.5,
  },
  {
    id: 4,
    name: '老八秘制小🍔包',
    description: '好吃的小憨包',
    createTime: '2022-5-7',
    price: 12.5,
  },
  {
    id: 4,
    name: '老八秘制小🍔包',
    description: '好吃的小憨包',
    createTime: '2022-5-7',
    price: 12.5,
  },
  {
    id: 4,
    name: '老八秘制小🍔包',
    description: '好吃的小憨包',
    createTime: '2022-5-7',
    price: 12.5,
  },
]

function onClick(item: any) {
  const item_url = `${router.currentRoute.value.path}/${item.id}`
  router.push({ path: item_url })
}
</script>

<template>
  <el-row :gutter="10">
    <el-col v-for="item in mockData" :key="item.id" :xs="24" :sm="12" :md="8" :lg="4">
      <el-card :body-style="{ padding: '0px' }" shadow="hover" style="margin-bottom: 10px;">
        <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
          class="image" @click="onClick(item)">
        <div style="padding: 14px">
          <span class="name" @click="onClick(item)">{{ item.name }}</span>
          <p class="description">
            {{ item.description }}
          </p>
          <div class="bottom">
            <span class="price">14.99</span>
            <time class="time">
              <i-ep-timer />
              {{ item.createTime }}
            </time>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<route lang="yaml">
meta:
  title: 市场列表
</route>

<style lang="scss" scoped>
.price {
  font-weight: 400;
}

.name {
  font-weight: bold;
  cursor: pointer
}

.image {
  width: 100%;
  display: block;
  cursor: pointer
}

.description {
  color: #999;
  font-size: smaller;

  margin-top: 13px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.bottom {
  margin-top: 13px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.time {
  display: inline-flex;
  align-items: center;
  font-size: 12px;
  color: #999;
}
</style>
