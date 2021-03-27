<template>
  <div class="limiter">
    <div class="container-login100">
      <div class="wrap-login100 p-t-190 p-b-30">
        <form v-on:submit.prevent="login" class="login100-form validate-form">
          <span class="login100-form-title p-t-20 p-b-45">Login</span>

          <div class="wrap-input100 validate-input m-b-10" data-validate="Username is required">
            <input
              class="input100"
              type="text"
              name="username"
              placeholder="Username"
              v-model="user.username"
            />
            <span class="focus-input100"></span>
            <span class="symbol-input100">
              <i class="fa fa-user"></i>
            </span>
          </div>

          <div class="wrap-input100 validate-input m-b-10" data-validate="Password is required">
            <input
              class="input100"
              type="password"
              name="password"
              placeholder="Password"
              v-model="user.password"
            />
            <span class="focus-input100"></span>
            <span class="symbol-input100">
              <i class="fa fa-lock"></i>
            </span>
          </div>

          <div v-if="errorMessage" class="alert alert-danger my-3" role="alert">{{errorMessage}}</div>

          <div class="container-login100-form-btn p-t-10">
            <button class="login100-form-btn">Login</button>
          </div>

          <div class="text-center w-full p-t-25 p-b-230">
            <a href="#" class="txt1">Forgot Username / Password?</a>
          </div>

          <div class="text-center w-full">
            <a class="txt1" href="./register">
              Create new account
              <i class="fa fa-long-arrow-right"></i>
            </a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped src="../assets/css/main.css"></style>
<style scoped src="../assets/css/util.css"></style>

<script>
console.log(process.env.VUE_APP_API_URL);
export default {
  data() {
    return {
      user: {
        username: "",
        password: ""
      },

      errorMessage: ""
    };
  },

  methods: {
    login() {
      const URL = process.env.VUE_APP_API_URL + "/auth/signin";

      const data = {
        username: this.user.username,
        password: this.user.password
      };
      const option = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      };

      fetch(URL, option).then(response => {
        this.singingIn = true;
        if (response.ok) {
          response.json().then(content => {
            //Strore the token to as a cookie
            const token = content.token;
            document.cookie = "tokenId=" + token;


            //On va placer le données utilisateur dans le store pour que tout le monde puisse y accéder
            const user = content.user;
            this.$store.dispatch("initUserInstanceAction", user);

            setTimeout(() => {
              this.$router.push("profile");
            }, 1000);
          });
        } else {
          response.json().then(error => {
            this.errorMessage = error.message;
          });
          this.singingIn = false;
        }
      });
    }
  }
};
</script>