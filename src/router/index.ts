import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomeScreen.vue';
import WordleScreen from '../views/WordleScreen.vue';
import CardScreen from '../views/CardScreen.vue';

const routes = [
  // { path: '/', name: 'Home', component: Home },
  { path: '/', name: 'WordleScreen', component: WordleScreen },
  { path: '/cards', name: 'CardScreen', component: CardScreen },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
