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
    <h1 class="modalTitle">Settings</h1>
    <section>
      <div class="setting">
        <div class="text">
          <div class="title">Play Sound</div>
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
          <div class="title">Show Image</div>
        </div>
        <div class="control">
          <Switch
            setting-name="shouldShowImage"
            :toggleSwitch="toggleSwitch"
            :isChecked="settings.shouldShowImage"
          />
        </div>
      </div>
    </section>

    <section>
      <div class="setting">
        <div class="text">
          <div class="title">Feedback</div>
        </div>
        <div class="control">
          <a
            href="mailto:nytgames@nytimes.com?subject=Wordle%20Feedback&amp;body=%0D%0A%0D%0A%0A--%0ADevice%20summary%3A%0APage%3A%20%2Fgames%2Fwordle%0APlatform%3A%20Web%20(Desktop)%20%0ABrowser%3A%20Chrome%0AScreen%20Resolution%3A%201800%20x%201169%0AViewport%20Size%3A%201800%20x%201014%0ATimezone%3A%20UTC%2B13%0ABuild%3A%204d41d2be%0A%20%20"
            title="nytgames@nytimes.com"
            >Email</a
          >
        </div>
      </div>
      <div class="setting">
        <div class="text">
          <div class="title">Community</div>
        </div>
        <div class="control">
          <a
            href="https://twitter.com/NYTGames"
            target="blank"
            title="@NYTGames"
            >Twitter</a
          >
        </div>
      </div>
      <div class="setting">
        <div class="text">
          <div class="title">Questions?</div>
        </div>
        <div class="control">
          <a
            href="https://help.nytimes.com/hc/en-us/articles/360029050872-Word-Games-and-Logic-Puzzles#h_01FVGCB2Z00ZQMDMCYWBPWJNXB"
            target="blank"
            >FAQ</a
          >
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
export default {
  components: { Switch },
  expose: ['isOpen', 'close', 'open'],
  data() {
    return {
      isOpen: false,
      isChecked: true,
    };
  },
  methods: {
    close(): void {
      this.isOpen = false;
    },
    open(): void {
      this.isOpen = true;
    },
    toggleSwitch(): void {
      this.isChecked = !this.isChecked;
    },
  },
};
</script>

<style scoped>
.sections {
  position: relative;
  color: var(--color-tone-1);
  padding: 0 32px;
  max-width: var(--game-max-width);
  width: 100%;
  overflow-y: auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  border-radius: 10px;
}
.setting {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--color-tone-4);
  padding: 16px 0;
}

a,
a:visited {
  color: var(--color-tone-2);
}

.title {
  font-size: 18px;
}
.text {
  padding-right: 8px;
}
.description {
  font-size: 12px;
  color: var(--color-tone-2);
}

#footnote {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  color: var(--color-tone-2);
  font-size: 12px;
  text-align: right;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

@media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
  .setting {
    padding: 16px;
  }
}
</style>
