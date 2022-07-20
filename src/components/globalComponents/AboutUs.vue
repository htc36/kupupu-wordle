<script setup lang="ts"></script>
<template>
  <div class="about-us-container">
    <div style="padding-bottom: 10px">
      <h1 class="title">Hi I'm Paul Ransfield</h1>
      <p>
        <img
          src="/assets/paul.jpg"
          class="play-pause"
          style="float: right; margin: 0 0 0 15px"
        />
        Āe mārika koe – fantastic you, for learning te reo māori. Ka harakoakoa
        au – I’m delighted that you are using kupupū, kupuhī and kupukō on your
        learning journey.
      </p>
      <h1 class="title" style="">Learning Material</h1>
      <p>
        Download the free to use, free to share PDF and if these tools help you,
        kaua e wareware – don’t forget to buy us a coffee.
      </p>
    </div>
  </div>
</template>
<style scoped>
.play-pause {
  width: 150px;
}
.about-us-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}
.top-coloumn-container {
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
}
.title {
  font-weight: bold;
  padding-bottom: 20px;
  padding-top: 20px;
}
</style>
