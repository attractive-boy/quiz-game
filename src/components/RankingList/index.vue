<template>
  <transition appear name="slide-fade">
    <div class="list-container">
      <div class="main">
        <div class="rankList-back">
          <div class="rankList-container">
            <div class="list-box" v-for="(item, index) in rankingList" :key="item.userId"
              :class="{ active: index + 1 === rank }">
              <span class="rank">
                <template v-if="index + 1 <= 3">
                  <img :src="require(`../../assets/rank/rank${index + 1}.png`)" :alt="`第${index + 1}名`"
                    class="rank-icon">
                </template>
                <template v-else>
                  {{ index + 1 }}
                </template>
              </span>
              <div style="display: flex; flex-direction: row; width: 40%; justify-content: center;">
                <img class="avatar" v-lazy="getAvatarUrl(index)" alt="avatar">
                <div class="user-name">{{ item.nickname }}</div>
              </div>

              <div class="score">{{ item.score }}</div>
            </div>
          </div>
          <div class="self list">
            <div class="">
              <span class="green">我的排名：</span>
              <span class="green">{{ rank }}</span>
            </div>
          </div>
        </div>
        <div class="back-btn" @click="() => {
              this.$router.push('/')
            }"></div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex';
import { getRankingList } from '@/api';

export default {
  name: 'RankingList',
  data() {
    return {
      rankingType: 'week', // 排行榜类别，total为总榜，week为周榜
      rankingList: []
    };
  },
  computed: mapState([
    'nickname',
    'headImgUrl',
    'score',
    'rank'
  ]),
  watch: {
    rankingType(newType) {
      getRankingList({ type: newType })
        .then(({ data }) => {
          this.rankingList = data.rankingList;
        });
    }
  },
  created() {
    getRankingList({ type: this.rankingType })
      .then(({ data }) => {
        this.rankingList = data.rankingList;
      });
  },
  methods: {
    getAvatarUrl(index) {
      const sequence = [3, 1, 2, 3, 2, 1, 2, 3, 1, 3, 2, 1, 3, 2, 1, 3, 1, 2, 3, 1]; // 更长的预定义序列
      const position = (index * 5 + 7) % sequence.length; // 使用一个公式来计算位置
      return require(`../../assets/rank/avatar${sequence[position]}.png`);
    }
  }
};
</script>

<style lang="scss" scoped>
@font-face {
  font-family: 'GameFont';
  src: url('../../assets/fonts/AlimamaShuHeiTi-Bold.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all .4s;
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: rotateY(45deg);
  opacity: 0;
}

.list-container {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: url("../../assets/selectpage_background.png") no-repeat center center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;

  .main {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center !important;

    .back-btn {
      width: 100%;
      height: 15vw;
      background: url("../../assets/rank/back_to_home.png") no-repeat center center;
      background-size: contain;
      margin-top: 20px;
    }
  }
}

.rankList-back {
  width: 80vw;
  margin: 0 10vw;
  height: 70vh;
  background: url("../../assets/rank/rank-background.png") no-repeat center center;
  background-size: contain;
  position: relative;
}

.rankList-container {
  position: absolute;
  width: 80%;
  top: 20%;
  bottom: 15%;
  left: 10%;
  right: 10%;

  overflow-y: auto;
}

.list-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  color: white;
  font-size: small;
  width: 100%;
  padding: 5px 0;
  font-family: 'GameFont', sans-serif;
  border-bottom: 1px solid #E8517C;
}

.avatar {
  width: 6vw;
  height: 6vw;
  border-radius: 50%;
}

.rank {
  width: 20%;
  text-align: center;
}

.score {
  width: 40%;
  text-align: center;
}

.user-name {
  display: flex;
  align-items: center;
}
.green{
  color: #467535;
}
.self{
  position: absolute;
  bottom: 7%;
  width: 100%;
  font-family: 'GameFont', sans-serif;
  display: flex;
  justify-content: center;
  font-size: small;
  font-weight: bold;
}
</style>
