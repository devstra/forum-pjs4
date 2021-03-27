<template>
    <nav class="navbar navbar-expand-lg navbar-dark myNavbar ">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar1" aria-controls="navbar1"
            aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse justify-content-md-center" id="navbar1">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <router-link class="nav-link" to="/">Home</router-link>
                </li>
                <li v-if="auth==''" class="nav-item">
                    <router-link class="nav-link" to="/login">Login</router-link>
                </li>
                <li v-if="auth==''" class="nav-item">
                    <router-link class="nav-link" to="/register">Register</router-link>
                </li>
                <li v-if="auth=='logged'" class="nav-item">
                    <router-link class="nav-link" to="/profile">Profile</router-link>
                </li>
                <li v-if="auth=='logged'" class="nav-item">
                    <a class="nav-link" href="" v-on:click="deconnexion">Déconnexion</a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>


export default {
  data () {
    return {
      auth: ''
    }
  },

  methods: {
    deconnexion () {
        
    }
  },

  }
</script>


<style scoped>


.myNavbar{
    background-color: #2980B9;
}


</style>