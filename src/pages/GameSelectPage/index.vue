<template>
    <div class="game-select">
        <div style="width: 100%;">
            <div class="select-page-img">
            </div>
            <div class="select-page-title">
            </div>
            <div class="game-select-option">
                <div class="game1">
                    <div class="select-btn" @click="play('normal')"></div>
                </div>
                <div class="game2">
                    <div class="select-btn" @click="playGame2()"></div>
                </div>
            </div>
            <div class="game-option">
                <div class="game-leader" @click="toLeader"></div>
                <div class="game-rule"></div>
            </div>
        </div>

    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import Icon from 'vue-awesome/components/Icon';
import ScrollMessage from '@/components/ScrollMessage';
import PromptBox from '@/components/PromptBox';
import BeginButton from '@/components/BeginButton';
import PreloadImage from '@/components/PreloadImage';
import { GET_CACHE, SET_USER_INFO, SWITCH_MUSIC, PLAY_GAME, END_GAME } from '@/store/mutation-types';
import { getUserInfo, playGame } from '@/api';
import musicIcon from '@/assets/icon/background-music.svg';
import muteMusicIcon from '@/assets/icon/background-music-mute.svg';

export default {
  name: 'GameSelectPage',
  data() {
    return {
      showPrompt: false,
      whetherBlur: false,
      promptMessage: '',
      trailerTime: '',
      trailerPrize: 0,
      messages: []
    };
  },
  methods: {
    play(type) {
      playGame({ openid: this.openid, type })
        .then((res) => {
          if (res.data.state) {
            this.commitPlayGame(type);
            this.$router.push('/countdown');
          } else {
            this.showPromptBox(res.data.msg);
          }
        })
        .catch(() => {
          this.showPromptBox('抱歉，暂时无法答题');
        });
    },
    showPromptBox(msg) {
      if (msg === '') return;
      this.promptMessage = msg;
      this.showPrompt = true;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.showPrompt = false;
      }, 2500);
    },
    judgeBlur() {
      this.whetherBlur = ['/invitation', '/share', '/prize'].indexOf(this.$route.path) > -1;
    },
    switchBackgroundMusic() {
      this.switchMusic();
      // 如果静音
      if (this.mute) {
        this.showPromptBox('音效已关闭');
      } else {
        this.showPromptBox('音效已开启');
      }
    },
    loadUserInfo() {
      getUserInfo().then(({ data }) => {
        this.setUserInfo(data);
        this.messages = data.messages;
        this.trailerPrize = data.trailer.prize || 0;
        const trailerTime = new Date(data.trailer.time);
        const restDay = trailerTime.getDate() - new Date().getDate();
        switch (restDay) {
          case 0:
            this.trailerTime = `今天 ${trailerTime.getHours()}:${trailerTime.getMinutes()}`;
            break;
          case 1:
            this.trailerTime = `明天 ${trailerTime.getHours()}:${trailerTime.getMinutes()}`;
            break;
          case 2:
            this.trailerTime = `后天 ${trailerTime.getHours()}:${trailerTime.getMinutes()}`;
            break;
          default:
            this.trailerTime = `${trailerTime.getMonth() + 1 || 0}月${trailerTime.getDate() || 0}日 ${trailerTime.getHours() || 0}:${trailerTime.getMinutes() || 0}`;
        }
      });
    },
    playGame2(){
      this.$router.push('/game2');
    },
    ...mapMutations({
      getCache: GET_CACHE,
      setUserInfo: SET_USER_INFO,
      switchMusic: SWITCH_MUSIC,
      commitPlayGame: PLAY_GAME,
      endGame: END_GAME
    }),
    toLeader(){
      this.$router.push('/rank');
    }
  },
  computed: {
    musicIconSrc() {
      return this.mute ? muteMusicIcon : musicIcon;
    },
    ...mapState([
      'openid',
      'headImgUrl',
      'gameNumber',
      'practiceNumber',
      'prize',
      'mute'
    ])
  },
  watch: {
    $route() {
      this.judgeBlur();
    }
  },
  components: {
    Icon,
    ScrollMessage,
    PromptBox,
    BeginButton,
    PreloadImage
  },
  created() {
    // 获取缓存
    this.getCache();
    // 避免刷新后失去背景模糊
    this.judgeBlur();
    this.loadUserInfo();
    // 防止后退回主页再次通过url进入答题页
    this.endGame();
    if (this.$route.params.message) {
      this.$nextTick(() => {
        this.showPromptBox(this.$route.params.message);
      });
    }
  }
};
</script>


<style scoped>
.game-select {
    width: 100%;
    height: 100vh;
    background: url("../../assets/selectpage_background.png") no-repeat center center;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
}

.select-page-img {
    width: 100%;
    height: 40vw;
    background: url("../../assets/select_picture.png") no-repeat center center;
    background-size: contain;
}

.select-page-title {
    width: 100%;
    height: 15vw;
    margin-top: 10px;
    background: url("../../assets/select_title.png") no-repeat center center;
    background-size: contain;
}

.game-select-option {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.game1 {
    width: 100%;
    height: 60vw;
    margin-top: 10px;
    background: url("../../assets/game1.png") no-repeat center center;
    background-size: contain;
    position: relative;
}

.game2 {
    width: 100%;
    height: 60vw;
    margin-top: 10px;
    background: url("../../assets/game2.png") no-repeat center center;
    background-size: contain;
    position: relative;
}

.select-btn {
    width: 50%;
    height: 15%;
    background: url("../../assets/startgame_btn.png") no-repeat center center;
    background-size: contain;
    position: absolute;
    bottom: 6%;
    left: 50%;
    transform: translateX(-50%);
}

.game-leader {
    width: 50%;
    height: 15vw;
    margin-top: 10px;
    background: url("../../assets/game_leaderboard.png") no-repeat center center;
    background-size: contain;
}

.game-rule {
    width: 50%;
    height: 15vw;
    margin-top: 10px;
    background: url("../../assets/game_rule.png") no-repeat center center;
    background-size: contain;
}

.game-option {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
</style>
