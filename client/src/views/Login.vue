<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 mt-5 mx-auto">
        <form v-on:submit.prevent="login">
          <h1 class="h3 mb-3 font-weight-normal">Veuillez vous connecter :</h1>

          <div class="form-group">
            <label for="pseudo">Nom d'utilisateur :</label>
            <input type="pseudo" v-model="user.username" class="form-control" name="username" />
          </div>

          <div class="form-group">
            <label for="password">Mot de passe :</label>
            <input type="password" v-model="user.password" class="form-control" name="password" />
          </div>

          <div v-if="errorMessage" class="alert alert-danger my-3" role="alert">{{errorMessage}}</div>
          <button class="btn btn-lg btn-primary btn-block" type="submit">Valider</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
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
              this.$router.push("actualite");
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

