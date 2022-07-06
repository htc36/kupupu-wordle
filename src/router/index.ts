import { createRouter, createWebHistory } from 'vue-router';
import WordleScreen from '../views/WordleScreen.vue';
import CardScreen from '../views/CardScreen.vue';

const routes = [
  { path: '/wordle', name: 'WordleScreen', component: WordleScreen },
  { path: '/', name: 'CardScreen', component: CardScreen },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
