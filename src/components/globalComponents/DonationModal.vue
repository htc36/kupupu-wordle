<script setup lang="ts">
import Modal from '../layout/Modal.vue';
import { ModalNames } from '../../types';
</script>

<template>
  <div>
    <Modal :modal-name="ModalNames.donationModal">
      <div class="iframeContainer">
        <iframe
          data-type="text/html"
          id="buyMeACoffee"
          title="Buy me a coffee modal"
          src="https://www.buymeacoffee.com/widget/page/papatuanuku?description=Support%20me%20on%20Buy%20me%20a%20coffee!&amp;color=%23FF813F"
        ></iframe>
      </div>
    </Modal>
  </div>
</template>
<style scoped>
.iframeContainer {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: flex-end;
  background-color: white;
  border-radius: 10px;
}
iframe {
  margin: 0px;
  border: 0px none;
  height: 100%;
  width: 100%;
  border-radius: 10px;
  background: url('/assets/loader.svg') no-repeat center;
  transition: all 0.4s ease 0s;
}
</style>
