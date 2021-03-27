<template>
  <div class="px-auto">
    <vs-card class="cardx">
      <div slot="header">
        <div class="row">
          <div class="col-md-2 col-xs-5 col-2 text-left pr-1">
            <vs-avatar size="70px" :src="post.posteur.image_url"/>
          </div>

          <div class="col-md-10 col-10">
            <div class="row">
              <div class="col-md-12 text-left">
                <h5>
                  <strong>{{post.posteur.username}}</strong>
                </h5>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12 col-12 col-sm-12 text-left">
                <p class="font-weight-light text-muted">Il y a {{duration}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div slot="media" class="postImageDiv">
        <img
          :src="post.image_url"
          alt="https://thumbor.sd-cdn.fr/5eqybTA3DojcGE6dsMYTc2OWNzo=/fit-in/1200x700/cdn.sd-cdn.fr/wp-content/uploads/2015/05/Flat-design.jpg"
          class="postImage"
        />
      </div>
      <div>
        <p>{{post.texte}}</p>
  
      </div>
      <div slot="footer">
        <vs-row vs-justify="flex-end">
          <vs-button size="large"  type="gradient" color="danger" icon="favorite" class="mx-2"></vs-button>
          <vs-button size="large" color="primary" icon="comment" class="mx-5 "></vs-button>
        </vs-row>
      </div>
    </vs-card>
  </div>
</template>

<script>
export default {
  props: ["post"],

  computed: {
    /**
     * Renvoie la différence de temps en minute
     */
    durationMin() {
      let date = new Date(this.post.date_publication);
      let currentDate = new Date();
      return Math.floor((Math.abs(date - currentDate) / 3600000) * 60);
    },
    /**
     * Renvoie la différence de temps en heure
     */
    durationHours() {
      let date = new Date(this.post.date_publication);
      let currentDate = new Date();
      return Math.floor(Math.abs(date - currentDate) / 3600000);
    },
    /**
     * Renvoie la différence de temps en jour
     */
    durationDay() {
      let date = new Date(this.post.date_publication);
      let currentDate = new Date();
      return Math.ceil(Math.abs(date - currentDate) / 86400000);
    },
    /**
     * Renvoie la différence de temps en anneé
     */
    durationYear() {
      let date = new Date(this.post.date_publication);
      let currentDate = new Date();
      return Math.ceil(Math.abs(date - currentDate) / 31536000000);
    },
    duration() {
      if (this.durationMin < 60) {
        return this.durationMin + " min";
      } else if (this.durationHours < 24) {
        return this.durationHours + " h";
      } else if (this.durationDay <= 365) {
        return this.durationDay + " j";
      } else {
        return (
          this.durationYear +
          " ans ( " +
          this.formatDate(this.post.date_publication) +
          ")"
        );
      }
    }
  },
  methods: {
    formatDate(date) {
      date = new Date(date);
      var monthNames = [
        "Janvier",
        "Février",
        "Mars",
        "Avril",
        "Mai",
        "Juin",
        "Juillet",
        "Août",
        "Septembre",
        "Octobre",
        "Novembre",
        "Decembre"
      ];

      var day = date.getDate();
      var monthIndex = date.getMonth();
      var year = date.getFullYear();

      return day + " " + monthNames[monthIndex] + " " + year;
    }
  }
};
</script>

<style>
img.postImage {
  width: 100%;
  height: 95%;
  object-fit: cover;
}

.postImageDiv {
  height: 400px;
}
</style>