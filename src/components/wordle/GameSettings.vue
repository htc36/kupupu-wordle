<script setup lang="ts">
import Switch from '../ui/Switch.vue';
import { ref } from 'vue';
import { GameSettings } from '../../types';
import { setGameSettings, getGameSettings } from '../../helpers/localStorage';
const settings = ref<GameSettings>(getGameSettings());
const toggleSwitch = (settingName: keyof GameSettings) => {
  settings.value[settingName] = !settings.value[settingName];
  const existingSettings = getGameSettings();
  const settingsToSave = {
    ...existingSettings,
    ...{ [settingName]: settings.value[settingName] },
  };
  setGameSettings(settingsToSave);
};
</script>
<template>
  <div class="sections">
    <section>
      <div class="setting">
        <div class="text">
          <div class="title">oro mātiti - play sound</div>
        </div>
        <div class="control">
          <!-- <game-switch id="dark-theme" name="dark-theme"></game-switch> -->
          <Switch
            setting-name="shouldPlaySound"
            :toggleSwitch="toggleSwitch"
            :isChecked="settings.shouldPlaySound"
          />
        </div>
      </div>
      <div class="setting">
        <div class="text">
          <div class="title">ata mātiti - show image</div>
        </div>
        <div class="control">
          <Switch
            setting-name="shouldShowImage"
            :toggleSwitch="toggleSwitch"
            :isChecked="settings.shouldShowImage"
          />
        </div>
      </div>
      <div class="setting">
        <div class="text">
          <div class="title">ngā tohu - suggestions</div>
        </div>
        <div class="control">
          <a
            href="https://kapaigroup.ideas.aha.io"
            target="_blank"
            name="kaipai"
            class="externalSitesContainer"
          >
            <img src="/assets/aha.png" alt="CardsIcon" class="icon" />
            <img
              src="/assets/ext.svg"
              alt="CardsIcon"
              class="externalLinkIcon"
            />
          </a>
        </div>
      </div>
      <div class="setting">
        <div class="text">
          <div class="title">hapori tuihono - community</div>
        </div>
        <div>
          <a
            href="https://mehau.whanau.tv"
            target="blank"
            class="externalSitesContainer"
          >
            <img
              src="/assets/discourse.png"
              alt="cardsicon"
              class="icon"
              style="width: 25px"
            />
            <img
              src="/assets/ext.svg"
              alt="cardsicon"
              class="externalLinkIcon"
            />
          </a>
        </div>
      </div>
      <div class="setting">
        <div class="text">
          <div class="title">pātai maori - common questions</div>
        </div>
        <a
          href="https://help.nytimes.com/hc/en-us/articles/360029050872-Word-Games-and-Logic-Puzzles#h_01FVGCB2Z00ZQMDMCYWBPWJNXB"
          target="_blank"
          class="externalSitesContainer"
        >
          hey
          <!-- <img
              src="/assets/kapaigroup.ico"
              alt="cardsicon"
              class="icon"
              style="width: 25px"
            />
            <img
              src="/assets/ext.svg"
              alt="cardsicon"
              class="externalLinkIcon"
            /> -->
        </a>
      </div>
    </section>
    <div style="display: flex; justify-content: space-between">
      <h1>Download worksheet</h1>
      <h1>Time to next game: 12:02</h1>
    </div>
  </div>
</template>

<style scoped>
.externalSitesContainer {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon {
  width: 40px;
}
.externalLinkIcon {
  width: 20px;
  padding-left: 5px;
}
.sections {
  position: relative;
  color: var(--color-tone-1);
  max-width: var(--game-max-width);
  width: 100%;
  overflow-y: auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: white;
  border-radius: 10px;
}
.setting {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--color-tone-4);
  height: 50px;
}

.title {
  font-size: 18px;
}
.text {
  padding-right: 8px;
}
</style>
