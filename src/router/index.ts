import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomeScreen.vue';
import WordleGame from '../views/WordleGame.vue';
import CardGame from '../views/CardGame.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/wordle', name: 'WordleGame', component: WordleGame },
  { path: '/cards', name: 'CardGame', component: CardGame },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
