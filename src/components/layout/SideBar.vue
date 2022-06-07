<script setup lang="ts">
import { ref } from 'vue';
import { useCardGameStore } from '../../stores/cardGame';
import { useModalStore } from '../../stores/modal';
import { ModalNames } from '../../types';
const modalStore = useModalStore();
const { stopCardGame } = useCardGameStore();

const isMenuActive = ref(false);
</script>
<template>
  <div
    v-if="isMenuActive"
    @click="isMenuActive = false"
    class="sidebar-outside"
  ></div>
  <nav style="width: 48px">
    <button
      :class="['hamburger']"
      @click="() => (isMenuActive = !isMenuActive)"
      aria-label="Main Menu"
      :aria-expanded="isMenuActive"
    >
      <svg width="30" height="30" viewBox="0 0 100 100">
        <path
          class="line line1"
          d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
        />
        <path class="line line2" d="M 20,50 H 80" />
        <path
          class="line line3"
          d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
        />
      </svg>
    </button>
    <Transition name="slide-bottom">
      <div v-if="isMenuActive" class="nav-menu-pages">
        <button
          :class="[{ opened: isMenuActive }, 'hamburger']"
          @click="() => (isMenuActive = !isMenuActive)"
          aria-label="Main Menu"
          :aria-expanded="isMenuActive"
        >
          <svg width="30" height="30" viewBox="0 0 100 100">
            <path
              class="line line1"
              d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
            />
            <path class="line line2" d="M 20,50 H 80" />
            <path
              class="line line3"
              d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
            />
          </svg>
        </button>
        <div class="sidebar-links">
          <router-link
            @click="
              () => {
                isMenuActive = !isMenuActive;
                stopCardGame();
              }
            "
            class="nav-link"
            to="/wordle"
          >
            <img
              src="/assets/wordleIcon.svg"
              alt="Card front"
              class="gameIcon"
            />
            kupupu
          </router-link>
          <router-link
            @click="() => (isMenuActive = !isMenuActive)"
            class="nav-link"
            to="/cards"
          >
            <img src="/assets/cardsIcon.svg" alt="CardsIcon" class="gameIcon" />
            kupuhi
          </router-link>
          <div class="nav-link">
            <a href="https://whanau.tv" target="_blank" class="nav-ext-link">
              <img
                src="/assets/kapaigroup.ico"
                alt="CardsIcon"
                class="gameIcon"
              />
              whanau.tv
              <img src="/assets/ext.svg" alt="CardsIcon" class="extLink" />
            </a>
          </div>
          <div class="nav-link">
            <a
              href="https://mehau.whanau.tv/"
              target="_blank"
              class="nav-ext-link"
            >
              <img
                src="/assets/discourse.png"
                alt="CardsIcon"
                class="gameIcon"
              />
              discussion
              <img src="/assets/ext.svg" alt="CardsIcon" class="extLink" />
            </a>
          </div>
          <div class="nav-link">
            <a
              href="https://kapaigroup.ideas.aha.io/"
              target="_blank"
              class="nav-ext-link"
            >
              <img src="/assets/aha.png" alt="CardsIcon" class="gameIcon" />
              suggestions
              <img src="/assets/ext.svg" alt="CardsIcon" class="extLink" />
            </a>
          </div>
          <div
            class="nav-link"
            @click="
              isMenuActive = false;
              modalStore.toggleModal(ModalNames.donationModal);
            "
          >
            <img src="/assets/bmac.png" alt="CardsIcon" class="gameIcon" />
            buy us a coffee
          </div>
        </div>
      </div>
    </Transition>
  </nav>
</template>
<style scoped>
.nav-ext-link {
  align-items: center;
  display: flex;
}
.sidebar-links {
  margin-top: 0.8em;
}
.extLink {
  width: 18px;
  margin-left: 5px;
}
.gameIcon {
  width: 25px;
  margin-right: 10px;
}

/*NAVIGATION*/
.nav-link {
  font-family: Clear Sans, Helvetica Neue, Arial, sans-serif;
  color: var(--black);
  font-size: 36px;
  font-weight: bold;
  text-decoration: none;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  padding-top: 5px;
  align-items: center;
}
.nav-link {
  font-size: 20px;
  font-weight: 400;
  margin: 5px 0;
  align-items: center;
  display: flex;
  padding-bottom: 10px;
  border-top: 10px;
  /* border-bottom: 1px solid rgba(0, 0, 0, 0.2); */
}
.nav-link:last-child {
  border: 0;
  padding-bottom: 0px;
}
.nav-link:hover {
  color: var(--darkendYellow);
}

/*Hamburger Menu*/
.hamburger-nav-icon {
  background-color: transparent;
  border: 0px;
  cursor: pointer;
  padding: 0 0.2rem;
}
.hamburger {
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  padding: 0;
}
.nav-menu-pages {
  position: absolute;
  left: 0px;
  display: flex;
  height: 100vh;
  flex-direction: column;
  top: 0px;
  background: white;
  padding: 10px 20px;
  z-index: 2;
  background-color: rgba(256, 265, 245, 1);
  box-shadow: 10px 10px 10px 0px rgba(0, 0, 0, 0.2);
}
.line {
  fill: none;
  stroke: black;
  stroke-width: 6;
  transition: stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1),
    stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1);
}
.line1 {
  stroke-dasharray: 60 207;
  stroke-width: 6;
}
.line2 {
  stroke-dasharray: 60 60;
  stroke-width: 6;
}
.line3 {
  stroke-dasharray: 60 207;
  stroke-width: 6;
}
.opened .line1 {
  stroke-dasharray: 90 207;
  stroke-dashoffset: -134;
  stroke-width: 6;
}
.opened .line2 {
  stroke-dasharray: 1 60;
  stroke-dashoffset: -30;
  stroke-width: 6;
}
.opened .line3 {
  stroke-dasharray: 90 207;
  stroke-dashoffset: -134;
  stroke-width: 6;
}
.hamburger-open-menu {
  display: none;
  padding-right: 1rem;
  align-items: center;
}
.hamburger-open-menu.menuActive {
  display: flex;
}

.slide-bottom-enter-active,
.slide-bottom-leave-active {
  transition: all 0.25s ease-out;
}

.slide-bottom-enter-from {
  opacity: 0;
  transform: translateX(-50px);
}

.slide-bottom-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}
.sidebar-outside {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0px;
  z-index: 2;
}
</style>
