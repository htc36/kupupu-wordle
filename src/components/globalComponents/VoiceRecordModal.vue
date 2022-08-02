<script setup lang="ts">
import Modal from '../layout/Modal.vue';
import { ModalNames, CardAudio } from '../../types';
import { ref } from 'vue';
import '../../css/tooltip.css';
import { useApiStore } from '../../stores/apiStore';
import { storeToRefs } from 'pinia';

const apiStore = useApiStore();
const { apiResponseCards } = storeToRefs(apiStore);

let mediaRecorder: MediaRecorder,
  chunks: Blob[] = [],
  audio = new Audio(),
  audioSrc: string,
  blob,
  intervalId: ReturnType<typeof setInterval>;
const wordBeingRecorded = ref('');
const isNewSoundRecorded = ref(false);
const isPlaying = ref(false);
const wordRecordingLocation = ref<CardAudio>({});
const mimeType = ref('audio/wav');
const maxRecordingTime = 5000;
const isRecordingFailed = ref(false);

function startRecording(word?: string) {
  if (wordBeingRecorded.value) return;
  if (word) wordBeingRecorded.value = word;
  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then(function (stream) {
      // Type of audio recorder has also initialisation options with type
      //And we can't be sure that it's supported by user's browser
      //https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/MediaRecorder
      const mime = ref([
        'audio/wav',
        'audio/mpeg',
        'audio/webm',
        'audio/ogg',
        'audio/mp4',
      ]).value.filter(MediaRecorder.isTypeSupported)[0];
      mimeType.value = mime;
      const options = {
        mimeType: mime,
      };
      mediaRecorder = new MediaRecorder(stream, options);

      if (navigator.vibrate) navigator.vibrate(150);

      mediaRecorder.ondataavailable = function (event) {
        if (event.data.size > 0) chunks.push(event.data);
      };

      mediaRecorder.onstop = function () {
        if (intervalId) clearInterval(intervalId);
        stream.getTracks().forEach(function (track) {
          track.stop();
        });
        blob = new Blob(chunks, { type: mimeType.value });
        audioSrc = window.URL.createObjectURL(blob);
        audio.src = audioSrc;
        chunks = [];
      };
      mediaRecorder.onstart = function () {
        intervalId = setInterval(() => {
          stopRecording();
        }, maxRecordingTime);
      };
      mediaRecorder.start();
    })
    .catch(function (error) {
      isRecordingFailed.value = true;
      console.log(error);
    });
}
function stopRecording() {
  mediaRecorder.stop();
  isNewSoundRecorded.value = true;
}
function playRecording() {
  audio.play();
  isPlaying.value = true;
  audio.onended = function () {
    isPlaying.value = false;
  };
}
function pauseRecording() {
  audio.pause();
  isPlaying.value = false;
}
function deleteSound() {
  if (!isPlaying.value) {
    wordBeingRecorded.value = '';
    isNewSoundRecorded.value = false;
  }
}
function onSubmit(name: string) {
  wordBeingRecorded.value = '';
  isNewSoundRecorded.value = false;
  wordRecordingLocation.value[name] = audioSrc;
}

function createDownloadable(name: string) {
  const link = document.createElement('a');
  link.href = wordRecordingLocation.value[name];
  link.download = `${name}.webm`;
  link.click();
  link.remove();
}

function download(name?: string) {
  if (name) {
    createDownloadable(name);
  } else {
    for (const key in wordRecordingLocation.value) {
      createDownloadable(key);
    }
  }
}
</script>

<template>
  <div>
    <Modal :modal-name="ModalNames.voiceRecordModal">
      <div class="modal-finished-wrapper">
        <div class="center">
          <h3 class="modal-title">Record Your Voice</h3>
          <div
            data-tooltipvoice="Once submitted recording is saved to our database"
          >
            <img
              src="/assets/info.svg"
              style="cursor: pointer; width: 25px"
              class="modal-icon"
            />
          </div>
        </div>
        <ul>
          <li v-for="card in apiResponseCards?.kupuhi" :key="card.word_tereo">
            <div class="words-list-item">
              <p class="word-item">{{ card.word_tereo }}</p>
              <div v-if="wordRecordingLocation[card.word_tereo]">
                <img
                  src="/assets/download.svg"
                  class="modal-icon"
                  style="cursor: pointer"
                  alt="Download recording"
                  @click="download(card.word_tereo)"
                />
              </div>
              <div v-else-if="isRecordingFailed" class="errorMessageContainer">
                Recording failed
              </div>
              <img
                v-else-if="wordBeingRecorded != card.word_aud"
                src="/assets/record.png"
                class="modal-icon"
                @click.prevent="startRecording(card.word_aud)"
                alt="Start recording"
              />
              <img
                v-else-if="
                  wordBeingRecorded == card.word_aud && !isNewSoundRecorded
                "
                src="/assets/stopRecording.png"
                class="modal-icon"
                @click.prevent="stopRecording()"
                alt="Stop recording"
              />
              <div v-else class="review-recording-container">
                <button class="next-button" @click="onSubmit(card.word_tereo)">
                  Submit
                </button>
                <img
                  src="/assets/cross.svg"
                  style="width: 28px"
                  class="modal-icon"
                  @click.prevent="deleteSound()"
                  alt="Delete recording"
                />
                <img
                  v-if="!isPlaying"
                  src="/assets/playGreen.png"
                  class="modal-icon"
                  @click.prevent="playRecording()"
                  alt="Play recording"
                />
                <img
                  v-else
                  src="/assets/pause.svg"
                  class="modal-icon"
                  @click.prevent="pauseRecording()"
                  alt="Pause recording"
                />
              </div>
            </div>
          </li>
        </ul>
        <div class="footer">
          <button type="button" class="share-button" @click="download()">
            Download
          </button>
        </div>
      </div>
    </Modal>
  </div>
</template>
<style scoped>
.center {
  display: flex;
  align-items: center;
  justify-content: center;
}
.share-button {
  margin-top: 10px;
  background-color: var(--blue);
  color: var(--key-evaluated-text-color);
  font-family: inherit;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  border: none;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0.3);
  width: 50%;
  font-size: 20px;
  height: 37px;
}
.review-recording-container {
  display: flex;
  justify-content: space-between;
  width: 60%;
}
.errorMessageContainer {
  display: flex;
  align-items: center;
  height: 3.5em;
  color: red;
}

.modal-icon {
  margin-left: 10px;
  height: 3.5em;
  padding-bottom: 10px;
  padding-top: 10px;
  cursor: pointer;
}
.footer {
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-around;
  align-items: center;
}
.next-button {
  background-color: var(--blue);
  color: var(--key-evaluated-text-color);
  font-family: inherit;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  border: none;
  text-transform: uppercase;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0.3);
  font-size: 15;
  padding: 10px;
  align-self: center;
}

.modal-finished-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: space-around;
  background-color: white;
  border-radius: 10px;
  padding: 10px;
}
.modal-title {
  padding-right: 10px;
  font-size: 1.7rem;
  font-weight: bold;
  text-align: center;
}

.words-list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 20px;
  margin-left: 20px;
  border-bottom: 1px solid rgb(238, 238, 238);
}
.word-item {
  text-transform: uppercase;
  font-weight: bold;
  font-size: 1.5rem;
}
@media (max-width: 450px) {
  .modal-title {
    font-size: 1.4rem;
  }
}
</style>
