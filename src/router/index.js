import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '@/pages/HomePage';
import RulesPage from '@/components/RulesPage';
import InvitationCode from '@/components/InvitationCode';
import RankingList from '@/components/RankingList';
import SharePage from '@/components/SharePage';
import PrizePage from '@/components/PrizePage';
import Countdown from '@/pages/Countdown';
import Quiz from '@/pages/Quiz';
import NotFound from '@/pages/NotFound';
import GameSelectPage from '@/pages/GameSelectPage';
import Game2 from '@/pages/Game2';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
      // children: [
      //   {
      //     path: 'rules',
      //     component: RulesPage
      //   },
      //   {
      //     path: 'invitation',
      //     component: InvitationCode
      //   },
        
      //   {
      //     path: 'share',
      //     component: SharePage
      //   },
      //   {
      //     path: 'prize',
      //     component: PrizePage
      //   }
      // ]
    },
    {
      path: '/countdown',
      component: Countdown
    },
    {
      path: '/game2',
      component: Game2
    },
    {
      path: '/select',
      component: GameSelectPage
    },
    {
      path: '/rank',
      component: RankingList
    },
    {
      path: '/quiz',
      component: Quiz
    },
    {
      path: '*',
      component: NotFound
    }
  ]
});
