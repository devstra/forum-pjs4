<template>
  <!-- Page avec le fil d'actualité -->
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-4 col-lg-4 col-xl-3 pl-0">
        <sidebar></sidebar>
      </div>

      <div class="col-md-8 col-sm-11 col-lg-8 col-xl-9 px-auto">
        <div class="row">
          <div class="col-md-6"></div>

          <div class="col-md-5 mt-3">
            <vs-card class="cardx ld ld-blur-in">
              <vs-list>
                <vs-list-header title="Demande d'amis"></vs-list-header>

                <div v-if="hasDemandeAmis">
                  <vs-list-item
                    :key="index"
                    v-for="(item, index) in demandeAmis"
                    title="1# - Snickerdoodle"
                    class="py-3"
                  ></vs-list-item>
                </div>

                <div v-else>

                    <img src="../assets/images/sadEmoji.png" alt="" srcset="">

                </div>
              </vs-list>
            </vs-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import sidebar from "../components/SideBar.vue";

export default {
  components: {
    sidebar: sidebar
  },

  data: function() {
    return {
      demandeAmis: []
    };
  },
  mounted() {},
  methods: {},
  computed: {
    hasDemandeAmis() {
      return this.demandeAmis.length > 0;
    }
  }
};
</script>

<style  scoped>
</style>
