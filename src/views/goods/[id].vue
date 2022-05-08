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

    bannerHeight.value = 400

  else

    bannerHeight.value = 500
})

// const { width } = useWindowSize()
// const imgRef = ref()

// onMounted(() => {
//   console.log(imgRef.value[0].height)
// })
</script>

<template>
  <el-row :gutter="20">
    <el-col :xs="24" :span="10">
      <div class="goods-img">
        <el-carousel ref="carousel" indicator-position="outside" :height="`${bannerHeight}px`">
          <el-carousel-item v-for="item in imgs" :key="item">
            <img ref="imgRef" class="goods-image" :src="item" fit="cover">
          </el-carousel-item>
        </el-carousel>
      </div>
    </el-col>
    <el-col :xs="24" :span="14" class="goods-right">
      <div class="goods-info" style="height:500px">
        <h1 class="goods-name">
          商品名称
        </h1>

        <p class="seller-name">
          卖家名称
        </p>

        <p class="create-time">
          创建时间:2022年5月7日
        </p>

        <p class="price">
          ￥999.99
        </p>

        <p class="goods-description">
          Helvetica是由米耶丁格和爱德华德·霍夫曼在瑞士哈斯铸造所作为排版铅字制作的。当时人们熟悉的是“国际字体风格”（也称为“瑞士风格”），比如Josef
          Muller-Brockmann在1896年推广的Akzidenz Grotesk这类无衬线字体，而哈斯希望能设计一套新的无衬线字体能够与Akzidenz Grotesk在瑞士市场上竞争。最初的名称是“Neue Haas
          Grotesk”，意为“哈斯的新无衬线铅字”，后来曾考虑改为Helvetia（源自拉丁文的“瑞士”一词），不过最终改为Helvetica，在拉丁文中意为“瑞士的”。
        </p>
      </div>

      <div style="align-self: flex-end;">
        <el-button style="height: 100%; ">
          <span style="font-size: 25px; padding: 10px; height: 100%;">联系卖家</span>
        </el-button>
      </div>
    </el-col>
  </el-row>
</template>

<route lang="yaml">
meta:
  title: 商品标签页
</route>

<style lang="scss" scoped>
.goods-name {
  font-size: 50px;
  margin: 0;
}

.goods-image {

  height: 100%;
  width: 100%;
}

.price {

  font-size: 30px;
}

.goods-info {}

.goods-right {

  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
</style>
