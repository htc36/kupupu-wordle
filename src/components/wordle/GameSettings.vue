<script setup lang="ts">
import Switch from '../ui/Switch.vue';
import { ref } from 'vue';
import { GameSettings, TimeToNextType } from '../../types';
import { setGameSettings, getGameSettings } from '../../helpers/localStorage';
import { inject } from 'vue';
import DownloadWorksheet from '../globalComponents/DownloadWorksheet.vue';
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
// const timeToNext = inject<TimeToNextType>('timeToNext', {
//   wordleNextTime: '00:00:00',
//   cardsNextTime: '00:00:00',
// });
</script>
<template>
  <div class="sections">
    <section>
      <div class="setting">
        <div class="text">
          <div class="title">oro mātiti - play sound</div>
        </div>
        <div class="control">
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
            onclick="window.open('https:\/\/kapaigroup.ideas.aha.io', '_blank')"
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
            onclick="window.open('https:\/\/mehau.whanau.tv', '_blank')"
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
          onclick="window.open('https:\/\/whanau.tv')"
          class="externalSitesContainer"
        >
          <img
            src="/assets/kapaigroup.ico"
            alt="cardsicon"
            class="icon"
            style="width: 25px"
          />
          <img src="/assets/ext.svg" alt="cardsicon" class="externalLinkIcon" />
        </a>
      </div>
    </section>
    <div class="pdf-container">
      <DownloadWorksheet />
      <div class="bottomContainer">
        <h3 class="download-icon" style="padding-top: 20px">
          <!-- {{ timeToNext.cardsNextTime }} -->
        </h3>
        <h3>Toggle Game</h3>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bottomContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pdf-container {
  align-items: center;
  justify-content: space-evenly;
  display: flex;
}
.download-icon {
  font-weight: bold;
  margin-left: 10px;
  height: 3em;
  padding-bottom: 10px;
  padding-top: 10px;
}
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
