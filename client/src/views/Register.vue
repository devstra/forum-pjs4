
<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 mt-5 mx-auto">
        <form v-on:submit.prevent="register">
          <h1 class="h3 mb-3 font-weight-normal">S'enregistrer</h1>
          <div class="form-group">
            <label for="pseudo">Nom d'utilisateur :</label>
            <input
              type="text"
              v-model="user.username"
              class="form-control"
              name="username"
              required
            />
          </div>
          <div class="form-group">
            <label for="email">Email :</label>
            <input type="email" v-model="user.email" class="form-control" name="email" required />
          </div>
          <div class="form-group">
            <label for="password">Mot de Passe :</label>
            <input
              type="password"
              v-model="user.password"
              class="form-control"
              name="password"
              required
            />
          </div>

          <div class="form-group">
            <label for="password">Confirmer votre mot de passe:</label>
            <input
              type="password"
              v-model="user.confirmPassword"
              class="form-control"
              name="password"
              required
            />
          </div>

          <div v-if="errorMessage" class="alert alert-danger my-2" role="alert">{{errorMessage}}</div>

          <button class="btn btn-lg btn-primary btn-block" type="submit">Valider</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
//import router from '../router'

import Joi from "joi";

const schema = Joi.object().keys({
  username: Joi.string()
    .trim()
    .regex(/(^[a-zA-Z0-9_]*$)/)
    .min(3)
    .max(30)
    .required(),
  email: Joi.string()
    .email({ minDomainAtoms: 2 })
    .required(),

  password: Joi.string()
    .trim()
    .min(8)
    .required(),
  confirmPassword: Joi.string()
    .trim()
    .min(8)
    .required()
});

export default {
  data() {
    return {
      user: {
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
      },
      errorMessage: ""
    };
  },

  methods: {
    valideUser() {
      this.errorMessage = "";

      if (this.user.password !== this.user.confirmPassword) {
        this.errorMessage = "Les mots de passe doivent être les mêmes❌";
        return false;
      }

      const result = Joi.validate(this.user, schema);

      if (result.error == null) {
        return true;
      }

      if (result.error.message.includes("username")) {
        this.errorMessage = "Nom d'utilisateur invalide😭";
        return false;
      }
      if (
        result.error.message.includes("password") &&
        result.error.message.includes("length")
      ) {
        this.errorMessage = "Longueur du mot de passe invalide ";
        return false;
      }
    },
    register() {
      //Après toute les validation on envoie au serveur
      if (this.valideUser()) {
        //send data

        const URL = process.env.VUE_APP_API_URL + "/auth/signup";
        const data = {
          username: this.user.username,
          password: this.user.password,
          email: this.user.email
        };

        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        };

        fetch(URL, options).then(response => {
          //console.log(response);
          if (response.ok) {
            response.json().then((content) => {
              //console.log(content);
              // this.singingUp = true;

              setTimeout(() => {
                //redirect to the board page
                this.$router.push("Login");
              }, 1000);
            });
          } else {
            console.log("error message");
            response
              .json()
              .then(error => {
                this.errorMessage = error.message;
              })
              .catch(err => {
                console.log(err.message);
              });
          }
        });
      }
    }
  }
};
</script>
