import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomeScreen.vue';
import WordleScreen from '../views/WordleScreen.vue';
import CardGame from '../views/CardGame.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/wordle', name: 'WordleScreen', component: WordleScreen },
  { path: '/cards', name: 'CardGame', component: CardGame },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
