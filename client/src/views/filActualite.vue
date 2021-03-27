<template>
  <!-- Page avec le fil d'actualité -->
  <div class="container-fluid actualite-container">
    <div class="row">
      <div class="col-md-4 col-lg-4 col-xl-3 pl-0">
        <sidebar></sidebar>
      </div>

      <div class="col-md-8 col-sm-11 col-lg-5 col-xl-5 px-auto">
        <div v-if="!isloading">
          <forumPost class="my-5 pt-4" v-for="(item, index) in posts" :key="index" :post="item"></forumPost>
        </div>

        <div v-else class="mt-5 pt-5">
          <img src="../assets/images/spinner.svg" alt srcset />
        </div>
      </div>

      <div class="col-md-4 col-lg-3 d-none d-sm-none d-md-none d-lg-block position-sticky mt-3">
        <search-bar class="mb-5"></search-bar>
        <postClassement></postClassement>
      </div>
    </div>
  </div>
</template>


<script>
import forumPost from "../components/forumPost.vue";
import searchBar from "../components/searchBar.vue";
import postClassement from "../components/postClassement.vue";
import sidebar from "../components/SideBar.vue";

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    forumPost: forumPost,
    searchBar: searchBar,
    postClassement: postClassement,
    sidebar: sidebar
  },

  data: function() {
    return {
      posts: [],
      isloading: false
    };
  },
  mounted() {
    //Quand on arrive sur la page on fait la requête pour récuperer les derniers posts
    this.isloading = true;
    const URL = process.env.VUE_APP_API_URL + `/posts/actualite`;

    //Comme on doit envoyer le token en même temps que la requête on doit spécifier des options
    const options = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + this.getCookie("tokenId"), //CE PARAMATRE EST IMPERATIF LE SERVEUR EST FAIT POUR NOUS REJETTER SI IL N'EST PAS LA
        "Content-Type": "application/json"
      }
    };

    //On fait la requête à L'URL avec les options
    fetch(URL, options)
      .then(response => response.json()) //On convertie la reponse en JSON
      .then(data => {
        //On récupère ensuite dans data le tableau avec le suggestions
        //console.log(data.data);
        this.posts = data.data;
        this.isloading = false;
      });
  },
  methods: {
    /**
     * Fonction permettant de retrouver la valeur d'un cooks
     */
    getCookie(cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }
  }
};
</script>

<style  scoped>

.actualite-container{
  background-color: #f5f5f5 !important;
}
</style>
