<template>
	<div class="limiter">
		<div class="container-login100">
			<div class="wrap-login100 p-t-190 p-b-30">
				<form v-on:submit.prevent="register" class="login100-form validate-form">

					<span class="login100-form-title p-t-20 p-b-45">Create Account</span>

					<div class="wrap-input100 validate-input m-b-10" data-validate = "Username is required">
						<input class="input100" type="text" name="username" v-model="user.username" placeholder="Username" required>
						<span class="focus-input100"></span>
						<span class="symbol-input100"> <i class="fa fa-user"></i> </span>
					</div>

					<div class="wrap-input100 validate-input m-b-10" data-validate = "Username is required : example@example.com">
						<input class="input100" type="email" name="email" v-model="user.email" placeholder="Email" required>
						<span class="focus-input100"></span>
						<span class="symbol-input100"> <i class="fa fa-at"></i> </span>
					</div>

					<div class="wrap-input100 validate-input m-b-10" data-validate = "Password is required">
						<input class="input100" type="password" name="password" v-model="user.password" placeholder="Password" required>
						<span class="focus-input100"></span>
						<span class="symbol-input100"> <i class="fa fa-lock"></i> </span>
					</div>

					<div class="wrap-input100 validate-input m-b-10" data-validate = "Password is required">
						<input class="input100" type="password" name="password" v-model="user.confirmPassword" placeholder="Confirm Password" required>
						<span class="focus-input100"></span>
						<span class="symbol-input100"> <i class="fa fa-lock"></i></span>
					</div>

					<div class="wrap-input100 validate-input m-b-10">
						<span class="focus-input10">{{errorMessage}}</span>
					</div>

					<div class="container-login100-form-btn p-t-10">
						<button class="login100-form-btn">Create</button>
					</div>

					<div class="text-center w-full p-t-25 p-b-230"></div>

					<div class="text-center w-full">
						<a class="txt1" href="./login">I have already an Account<i class="fa fa-long-arrow-right"></i></a>
					</div>

				</form>
			</div>
		</div>
	</div>
</template>

<style scoped src="../assets/css/main.css"></style>
<style scoped src="../assets/css/util.css"></style>

<script>

import Joi from "joi";
console.log(process.env.VUE_APP_API_URL);

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
        this.errorMessage = "Passwords must be the same";
        return false;
      }

      const result = Joi.validate(this.user, schema);

      if (result.error == null) {
        return true;
      }

      if (result.error.message.includes("username")) {
        this.errorMessage = "Username unknown";
        return false;
      }
      if (
        result.error.message.includes("password") &&
        result.error.message.includes("length")
      ) {
        this.errorMessage = "your password must contain at least 8 characters";
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
          console.log(response);
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