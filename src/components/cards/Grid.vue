<script setup lang="ts">
import Card from './Card.vue';
import { cards } from '../../helpers/assetMapping';
import { onBeforeUpdate, onMounted, onUpdated, ref } from 'vue';
import { CardObj } from '../../types';

const allCards = ref<CardObj[]>([]);
// let itemRefs = ref<InstanceType<typeof Card>[]>([]);
let itemRefs: [] = [];
let correct = ref<number>(0);
let selectedCards = ref<CardObj[]>([]);
// let shuffledCards = ref<CardObj[]>([]);

const setItemRef = (el: any) => {
  if (el) {
    itemRefs.push(el);
  }
};
// onBeforeUpdate(() => {
//   itemRefs = [];
// });
onMounted(() => {
  cards.forEach((element, index) => {
    allCards.value.push({ ...element, ...{ index: index } });
  });
});

function cardOpened(index: number) {
  if (selectedCards.value.length === 2) {
    console.log('closing the cards as they are not the same');
    selectedCards.value.forEach((element) => {
      if (element.index !== undefined) {
        console.log('closing ', element.index);
        itemRefs[element.index].close(false);
      }
    });
    selectedCards.value = [];
  }
  const clickedCard = allCards.value[index];
  if (selectedCards.value.length == 1) {
    console.log('2 cards are selected');
    const card1 = selectedCards.value[0];
    if (card1.answer === clickedCard.answer) {
      correct.value += 1;
      if (card1.index !== undefined) {
        console.log('cards are the same!');
        itemRefs[card1.index].lockCard();
        itemRefs[index].lockCard();
        selectedCards.value = [];
      }
      if (correct.value === allCards.value.length / 2) {
        alert('won then game');
      }
      return;
    }
  }
  console.log('adding new card');
  selectedCards.value.push({ ...allCards.value[index], ...{ index: index } });
}
function cardClosed(index: number) {
  selectedCards.value = selectedCards.value.filter((obj) => {
    return obj.index != index;
  });
}
</script>
<template>
  <div class="gridWrapper">
    <Card
      :ref="setItemRef"
      v-for="(card, index) in allCards"
      :answer="card.answer"
      :pictureQuestion="card.image"
      :index="index"
      style=""
      @cardOpened="(index) => cardOpened(index)"
      @cardClosed="(index) => cardClosed(index)"
    >
    </Card>
  </div>
</template>
<style scoped>
.gridWrapper {
  margin-top: 4%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  height: 92%;
}
</style>
