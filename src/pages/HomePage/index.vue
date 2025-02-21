<template>
  <div class="home-page">
    <div class="login-btn" @click="handleLogin">
    </div>
    <van-dialog
      v-model="showLoginDialog"
      title="员工登录"
      show-cancel-button
      @confirm="onConfirm"
    >
      <van-field
        v-model="loginInput"
        placeholder="请输入员工工号"
        type="number"
        maxlength="6"
      />
    </van-dialog>
  </div>
</template>

<script>
import { Dialog, Field } from "vant";

export default {
  name: 'HomePage',
  components: {
    [Dialog.Component.name]: Dialog.Component,
    [Field.name]: Field
  },
  data() {
    return {
      showLoginDialog: false,
      loginInput: ''
    };
  },
  methods: {
    handleLogin() {
      this.showLoginDialog = true;
    },
    onConfirm() {
      if (!this.loginInput) {
        Dialog.alert({
          message: '请输入工号'
        });
        return;
      }
      console.log('员工工号：', this.loginInput);
      window.localStorage.setItem('employeeId', this.loginInput);
      this.$router.push('/select');
    }
  }
};
</script>

<style lang="scss" scoped>
.home-page {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("../../assets/homepage_background.png") no-repeat center center;
  background-size: cover;
  position: relative;
}
.login-btn {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: url("../../assets/login_button.png") no-repeat center center;
  background-size: contain;
  width: 200px;
  height: 200px;
}
</style>