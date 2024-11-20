<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="bg-[#B38339] w-full"
    :style="'background: linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)), url(' + articleImage + '); background-position: center; background-size: cover;'">
    <div class="max-w-7xl mx-auto grid place-items-center h-[250px]">
      <h1
        class="text-white font-bold uppercase text-4xl md:text-7xl HeaderText tracking-wider text-center applyTextShadow">
        Archintel Articles
      </h1>
    </div>
  </div>
</template>

<script setup>
import articleImage from '@/assets/images/article.jpg';

</script>

<style scoped>
.applyTextShadow {
  text-shadow: 2px 3px 10px black;
}
</style>
