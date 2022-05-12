<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'

const props = defineProps({
  id: [Number, String],
})

const imgs = ['https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg1.doubanio.com%2Fview%2Frichtext%2Flarge%2Fpublic%2Fp240054077.jpg&refer=http%3A%2F%2Fimg1.doubanio.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1654512503&t=f7371f00156293b2dad0400cc0594181', 'https://i.ibb.co/1fB6hPv/QQ-20220507163306.png', 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg1.doubanio.com%2Fview%2Fnote%2Fl%2Fpublic%2Fp82460877.jpg&refer=http%3A%2F%2Fimg1.doubanio.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1654512454&t=4ffdcfe6cecd50b7f9896d6d9033489e']
const bannerHeight = ref<number>(500)
const carousel = ref()
const appStore = useAppStore()
const { device } = storeToRefs(appStore)
watchEffect(() => {
  if (device.value === 'mobile')
    bannerHeight.value = 325
  else
    bannerHeight.value = 700
})
</script>

<template>
  <el-row :gutter="20">
    <el-col :xs="24" :span="10">
      <el-card :body-style="{ padding: '0px' }" class="mb">
        <!-- <el-carousel ref="carousel" indicator-position="outside"> -->
        <el-carousel ref="carousel" indicator-position="outside" :height="`${bannerHeight}px`">
          <el-carousel-item v-for="item in imgs" :key="item">
            <img ref="imgRef" class="h-full w-full" :src="item" fit="cover">
          </el-carousel-item>
        </el-carousel>
      </el-card>
    </el-col>

    <el-col :xs="24" :span="14">
      <el-card class="flex-auto mb">
        <h1 class="text-4xl">
          很长很长很长很长的商品名称
        </h1>
        <div class="my4">
          <el-tag>
            全新
          </el-tag>
          <el-tag class="ml-2" type="success">
            女生自用
          </el-tag>
          <el-tag class="ml-2" type="info">
            半价
          </el-tag>
          <el-tag class="ml-2" type="warning">
            原味
          </el-tag>
          <el-tag class="ml-2" type="danger">
            矿卡
          </el-tag>
        </div>
        <div class="flex items-center">
          <el-avatar class="mr-1" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
          卖家名称
        </div>

        <p class="">
          <i-carbon-calendar />
          创建时间:2022年5月7日
        </p>

        <p>
          <span class="text-3xl mr">￥999.99</span>
          <span class="line-through italic text-gray-500 ">￥999.99</span>
        </p>

        <p class="">
          Helvetica是由米耶丁格和爱德华德·霍夫曼在瑞士哈斯铸造所作为排版铅字制作的。当时人们熟悉的是“国际字体风格”（也称为“瑞士风格”），比如Josef
          Muller-Brockmann在1896年推广的Akzidenz Grotesk这类无衬线字体，而哈斯希望能设计一套新的无衬线字体能够与Akzidenz Grotesk在瑞士市场上竞争。最初的名称是“Neue
          Haas
          Grotesk”，意为“哈斯的新无衬线铅字”，后来曾考虑改为Helvetia（源自拉丁文的“瑞士”一词），不过最终改为Helvetica，在拉丁文中意为“瑞士的”。
        </p>

        <div class="text-right">
          <el-button class="text-3xl p-8 ">
            联系卖家
          </el-button>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<route lang="yaml">
meta:
  title: 商品标签页
</route>

<style lang="scss" scoped>
</style>
