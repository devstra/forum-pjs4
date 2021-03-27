<template>
  <div class="sidebar-container">
    <div class="sidebar_body px-2">
      <div class="sidebar_head">
        <img class="sidebar_img" src="../assets/images/logo.png" />
      </div>
      <div class="sidebar_btns">
        <router-link to="/actualite">
          <button type="button" class="btn btn-light form-control">
            <i class="fas fa-home sidebar_fa_logo"></i>
                Fil d'actualité
          </button>
        </router-link>
        <router-link to="/dashboard">
          <button type="button" class="btn btn-light form-control">
            <i class="fas fa-user-circle fa-lg sidebar_fa_logo"></i>
            Profil
          </button>
        </router-link>

        <button type="button" class="btn btn-light form-control">
          <i class="fas fa-envelope-open sidebar_fa_logo"></i>Messages
          <span class="badge badge-info">{{user.nbMessage}}</span>
        </button>
        <button type="button" class="btn btn-light form-control">
          <i class="far fa-calendar-alt sidebar_fa_logo"></i>Evènements
          <span class="badge badge-info">{{user.nbEvent}}</span>
        </button>
        <button type="button" class="btn btn-light form-control">
          <i class="fas fa-users sidebar_fa_logo"></i>Groupes
        </button>
        <button type="button" class="btn btn-light form-control">
          <i class="fas fa-user-friends sidebar_fa_logo"></i>Amis
        </button>
        <button type="button" class="btn btn-light form-control">
          <i class="fas fa-star sidebar_fa_logo"></i>Favoris
        </button>
      </div>
      <div class="sidebar_profile">
        <img :src="imageURL" />
        <div class="sidebar_profile_info">
          <h3 class="sidebar_profile_name">{{user.username}}</h3>
          <!-- <h5 class="sidebar_profile_status">{{userData.status}}</h5> -->
        </div>
      </div>
      <div class="sidebar_social">
        <a href="https://twitter.com/">
          <i class="fab fa-twitter"></i>
        </a>
        <a href="https://www.facebook.com/">
          <i class="fab fa-facebook"></i>
        </a>
        <a href="https://www.instagram.com/">
          <i class="fab fa-instagram"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    };
  },

  computed  :{
    user(){
      return this.$store.getters.getUser;
    },
    imageURL(){
      return this.$store.getters.getUser.image_url || "https://cdn1.iconfinder.com/data/icons/flat-character-color-1/60/flat-design-character_1-512.png"
    }
  }
};
</script>

<style scoped>
a {
  color: white;
}
a:hover {
  color: white;
}
.sidebar-container {
  background-color: #2980b9;
  width: 300px;
  height: 100%;
}
.sidebar_body {
  background-color: #2980b9;
  width: 300px;

  position: fixed;
}
.sidebar_fa_logo {
  color: white;
  padding-right: 20px;
}
.sidebar_img {
  width: 100px;
  margin: 20px auto;
}
.sidebar_btn {
  width: 100%;
}

.btn-light {
  background-color: #2980b9;
  color: white !important;
  font-weight: bold;
}
.btn-light:hover .sidebar_fa_logo {
  color: black;
}
.btn-light {
  border-color: transparent;
  text-align: left;
}
.sidebar_profile img {
  border-radius: 50%;
  width: 50px;
}
.sidebar_profile {
  position: relative;
  text-align: left;
}
.sidebar_profile_info {
  position: relative;
  display: inline-block;
  margin: 10px 10px;
  vertical-align: middle;
  color: white;
  font-weight: bold;
}
.sidebar_social {
  font-size: 3em;
  margin-top: 200px;
}
.sidebar_social i {
  margin: 0 20px;
}
.sidebar_social a {
  color: white;
}
</style>