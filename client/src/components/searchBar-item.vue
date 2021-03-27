<template>
  <div>
    <div class="mycard mydropdown py-2">
      <div class="row">
        <div class="col-md-2 col-xs-5 col-2 px-1">
          <img :src="imageSrc" alt srcset
          width="50%" 
          class="rounded-circle"/>
        </div>

        <div class="col-md-10 col-10">
          <div class="text-left"><strong>{{item.username}}</strong></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: { required: true }
  },
  computed : {
    imageSrc(){
      return this.item.image_url || "https://cdn1.iconfinder.com/data/icons/flat-character-color-1/60/flat-design-character_1-512.png";
    }
  }
};
</script>

<style scoped >
.mydropdown {
  z-index: 101 !important;
  position: relative;
  display: -ms-flexbox;
  display: -webkit-box;
  display: flex;
  -ms-flex-direction: column;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-clip: border-box;
  /* border: 1px solid rgba(0,0,0,.125);
    border-radius: .25rem; */
}

/* vs__list-item */
</style>