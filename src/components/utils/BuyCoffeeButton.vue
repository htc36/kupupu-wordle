<script setup lang="ts">
import DonationModal from '../globalComponents/DonationModal.vue';
// import { useMessageStore } from '../stores/message';
import { useModalStore } from '../../stores/modal';
import { ModalNames } from '../../types';
const modalStore = useModalStore();
</script>
<template>
  <DonationModal />
  <a
    class="bmc-button"
    type="button"
    @click="modalStore.toggleModal(ModalNames.donationModal)"
  >
    <img
      src="https://www.buymeacoffee.com/assets/img/BMC-btn-logo.svg"
      alt="Buy me a coffee"
    />
  </a>
</template>
<style scoped>
.bmc-button img {
  width: 27px;
  margin-bottom: 1px;
}

.bmc-button {
  cursor: pointer;
  height: 37px;
  display: flex;
  color: #ffffff;
  background-color: #ff813f;
  border-radius: 3px;
  padding: 1px 9px;
  box-shadow: 0px 1px 2px rgba(190, 190, 190, 0.5);
  -webkit-box-shadow: 0px 1px 2px 2px rgba(190, 190, 190, 0.5);
  -o-transition: 0.3s all linear;
  -webkit-transition: 0.3s all linear;
  -moz-transition: 0.3s all linear;
  -ms-transition: 0.3s all linear;
  transition: 0.3s all linear;
}

.bmc-button:hover,
.bmc-button:active,
.bmc-button:focus {
  -webkit-box-shadow: 0px 1px 2px 2px rgba(190, 190, 190, 0.5);
  box-shadow: 0px 1px 2px 2px rgba(190, 190, 190, 0.5);
  opacity: 0.85;
}
</style>
