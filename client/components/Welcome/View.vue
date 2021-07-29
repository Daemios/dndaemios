<template>
  <div id="welcome">
    <div
        v-if="state === states.waiting"
        id="waiting"
        @click="beginIntro()"
    >
      <div class="">Click Anywhere To Begin</div>
    </div>
    <dnd-welcome-crawl
        v-if="state === states.crawl"
    ></dnd-welcome-crawl>
    <dnd-welcome-title
        v-if="state === states.title"
        @create="state = states.builder"
    ></dnd-welcome-title>
    <dnd-welcome-builder
        v-if="state === states.builder"
    ></dnd-welcome-builder>
  </div>
</template>
<script>
export default {
  data() {
    return {
      state: null,
      states: {
        waiting: 'waiting',
        opening: 'opening',
        title: 'title',
        crawl: 'crawl',
        builder: 'builder'
      }
    }
  },
  methods: {
    // ---- Intro ----
    beginIntro() {
      this.state = this.states.crawl
      document.getElementById("music").play();
      setTimeout(e => {
        this.showTitle();
      }, 85500) // this must be the same as the animation speed in the css
    },
    showTitle() {
      this.state = this.states.title;
    }
  },
  mounted() {
    this.state = this.states.builder
  }
}
</script>
<style lang="sass">
@import ../../sass/colors

@font-face
  font-family: 'Requiem'
  src: url("/dynamicsuite/packages/dndaemios/webfonts/Requiem.ttf") format('truetype')

@font-face
  font-family: 'aniron'
  src: url("/dynamicsuite/packages/dndaemios/webfonts/aniron.ttf") format('truetype')


@keyframes toggleOpacity
  0%
    opacity: 0
  99%
    opacity: 0
  100%
    opacity: 1


body
  overflow: hidden

#welcome
  height: 100%
  width: 100%
  display: flex
  justify-content: center
  overflow: hidden

  #waiting
    flex: 1
    display: flex
    justify-content: center
    align-items: center
    color: white
    font-size: 3vw
    font-family: 'Requiem', sans-serif
    -webkit-text-stroke: 1px black

</style>