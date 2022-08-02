<script setup lang="ts"></script>
<template>
  <a
    class="bottomContainer"
    style="cursor: pointer"
    onclick="window.open('https:\/\/whanau.tv/aboutus/1.pdf', '_blank')"
    download
  >
    <img src="/assets/download.svg" class="download-icon" alt="Download PDF" />
    <h3 class="pdf-title">Download Worksheet</h3>
  </a>
</template>
<style scoped>
.bottomContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.download-icon {
  font-weight: bold;
  margin-left: 10px;
  height: 3em;
  padding-bottom: 10px;
  padding-top: 10px;
}
</style>
