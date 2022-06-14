<script setup lang="ts">
import Modal from '../layout/Modal.vue';
import { ModalNames, CardAudio } from '../../types';
import { cards } from '../../helpers/assetMapping';
import { ref } from 'vue';
import '../../css/tooltip.css';
let mediaRecorder: MediaRecorder,
  chunks: Blob[] = [],
  audio = new Audio(),
  audioSrc: string,
  type = {
    type: 'audio/mp3',
  },
  blob;
const wordBeingRecorded = ref('');
const isNewSoundRecorded = ref(false);
const isPlaying = ref(false);
const wordRecordingLocation = ref<CardAudio>({});

function startRecording(word?: string) {
  if (wordBeingRecorded.value) return;
  if (word) wordBeingRecorded.value = word;
  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then(function (stream) {
      mediaRecorder = new MediaRecorder(stream);

      if (navigator.vibrate) navigator.vibrate(150);

      mediaRecorder.ondataavailable = function (event) {
        chunks.push(event.data);
      };

      mediaRecorder.onstop = function () {
        stream.getTracks().forEach(function (track) {
          track.stop();
        });

        blob = new Blob(chunks, type);
        audioSrc = window.URL.createObjectURL(blob);

        audio.src = audioSrc;

        chunks = [];
      };
      mediaRecorder.start();
    })
    .catch(function (error) {
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
function download() {
  Object.keys(wordRecordingLocation.value).forEach((word) => {
    var a = document.createElement('a');
    a.download = `${word}.ogg`;
    a.href = wordRecordingLocation.value[word];
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });
}
</script>

<template>
  <div>
    <Modal :modal-name="ModalNames.voiceRecordModal">
      <div class="modal-finished-wrapper">
        <div class="center">
          <h3 class="modal-title">Record Your Voice</h3>
          <div>
            <a
              href="#"
              data-tooltip="Once submitted recording is saved to our database"
            >
              <img
                src="/assets/info.svg"
                style="cursor: default; width: 25px"
                class="modal-icon"
              />
            </a>
          </div>
        </div>
        <ul>
          <li v-for="card in cards" :key="card.answer">
            <div class="words-list-item">
              <p class="word-item">{{ card.answer }}</p>
              <img
                v-if="wordRecordingLocation[card.answer]"
                src="/assets/tick.svg"
                class="modal-icon"
                style="cursor: default"
              />
              <img
                v-else-if="wordBeingRecorded != card.sound"
                src="/assets/record.png"
                class="modal-icon"
                @click.prevent="startRecording(card.sound)"
              />
              <img
                v-else-if="
                  wordBeingRecorded == card.sound && !isNewSoundRecorded
                "
                src="/assets/stopRecording.png"
                class="modal-icon"
                @click.prevent="stopRecording()"
              />
              <div v-else class="review-recording-container">
                <button class="next-button" @click="onSubmit(card.answer)">
                  Submit
                </button>
                <img
                  src="/assets/cross.svg"
                  style="width: 28px"
                  class="modal-icon"
                  @click.prevent="deleteSound()"
                />
                <img
                  v-if="!isPlaying"
                  src="/assets/playGreen.png"
                  class="modal-icon"
                  @click.prevent="playRecording()"
                />
                <img
                  v-else
                  src="/assets/pause.svg"
                  class="modal-icon"
                  @click.prevent="pauseRecording()"
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

.container {
  height: 100%;
  width: 100%;
  justify-content: center;
  display: flex;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
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
  padding: 30px;
}
.modal-title {
  padding-right: 10px;
  font-size: 1.7rem;
  font-weight: bold;
  text-align: center;
}
.words-list-item,
.words-list {
  display: flex;
}
.words-list {
  flex-direction: column;
  align-items: stretch;
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
