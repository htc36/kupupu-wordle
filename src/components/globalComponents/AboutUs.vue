<script setup lang="ts"></script>
<template>
  <!-- Share button on wordle settings dosent work when its empty!!! -->
  <div class="about-us-container">
    <div class="top-coloumn-container">
      <div>
        <h1 class="title">Hi I'm Paul Ransfield</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eget
          tempus nisi, vitae elementum augue. Maecenas eget ullamcorper leo.
          Cras aliquam maximus dui, ac maximus odio pellentesque ac. Vestibulum
          elementum aliquam ante, quis pharetra ante finibus eget. Ut quis ex
        </p>
      </div>
      <img src="/assets/card3.png" class="play-pause" />
    </div>
    <h1 class="title" style="">What we stand for</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eget
      tempus nisi, vitae elementum augue. Maecenas eget ullamcorper leo. Cras
      aliquam maximus dui, ac maximus odio pellentesque ac. Vestibulum elementum
      aliquam ante, quis pharetra ante finibus eget. Ut quis ex
    </p>
  </div>
</template>
<style scoped>
.play-pause {
  width: 200px;
}
.about-us-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}
.top-coloumn-container {
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
}
.title {
  font-weight: bold;
  padding-bottom: 5px;
}
</style>
