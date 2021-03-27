<template>
    <div class="limiter">
		<div class="container-login100">
			<div class="wrap-login100 p-t-190 p-b-30">
				<form v-on:submit.prevent="register" class="login100-form validate-form">

					<div class="container-login10-form-btn p-t-10">
            <button class="login100-form-btn" onclick="window.location.href='./Login'">Sign in</button>
					</div>
          <div class="container-login10-form-btn p-t-10">
						<button class="login100-form-btn" onclick="window.location.href='./Register'">Sign up</button>
					</div>

				</form>
			</div>
		</div>
	</div>
</template>

<style scoped src="../assets/css/main.css"></style>
<style scoped src="../assets/css/util.css"></style>

<script>


export default {
  data () {
      //systeme de token avec jwtDecode (Idée)
      return {
          pseudo: '',
          email: ''
      }
    }
  }
  
</script>
