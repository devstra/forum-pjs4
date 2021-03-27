<template>
  <div>
    <div class="input-group md-form form-sm form-1 pl-0">
      <div class="input-group-prepend">
        <vs-button  size="large" color="primary" type="border" class="mx-1" icon="search"></vs-button>
      </div>
      <vue-suggestion
        :items="suggestions"
        v-model="item"
        :setLabel="setLabel"
        :itemTemplate="itemTemplate"
        placeholder="Recherche"
        minLen="1"
        @changed="inputChange"
        @selected="itemSelected"
      ></vue-suggestion>
    </div>
  </div>
</template>

<script>
import itemTemplate from "./searchBar-item.vue";
import $ from "jquery";

$(document).ready(() => {
  $(".vs__input").addClass("form-control");
  $(".vs__input").addClass("input");
  $(".vs__input").addClass("rounded");
});

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    itemTemplate: itemTemplate
  },
  data() {
    return {
      item: {},
      suggestions: [],
      itemTemplate
    };
  },

  methods: {
    itemSelected(item) {
      this.item = item;
    },
    setLabel(item) {
      return item.username;
    },
    inputChange(text) {
      // your search method
      this.getSuggestion(text);
    },
    getSuggestion(text) {
      this.suggestions = [];
      if (text == "") {
        return;
      }

      //On prépare l'URL pour la requête et on passe le paramètre dans l'URL en même temps
      const URL = process.env.VUE_APP_API_URL + `/search?term=${text}`;

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
          // console.log(data.data);
          this.suggestions = data.data;
          // console.log(this.suggestions);
        });
    },
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
  },

  watch: {
    searchTerm: function(val) {
      this.searchTerm = val;
      this.getSuggestion();
    }
  }
};
</script>

<style>
.searchLogo {
  background-color: #2980b9 !important;
}

.mydropdown {
  z-index: 100;
}

.vs__input {
  width: 100%;
  height: 45px !important;
}

.vue-suggestion .vs__list .vs__list-item.vs__item-active .mycard {
  background-color: #f3f6fa !important;
  z-index: 200 !important;
}

.vue-suggestion .vs__list .vs__list-item .mycard {
  background-color: rgb(255, 255, 255);
  z-index: 200 !important;
}

.vue-suggestion .vs__list .vs__list-item {
  cursor: pointer;
}
.vue-suggestion .vs__list {
  position: absolute;
  z-index: 200 !important ;
  width: 100%;
}

.vue-suggestion {
  position: relative;
  width: 85%;
}
</style>