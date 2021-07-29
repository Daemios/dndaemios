<template>
  <div id="soundtrack">
    <audio id="music" ref="soundtrack">
      <source
          src="/dynamicsuite/packages/dndaemios/audio/intro_music.mp3"
          type="audio/mpeg"
      >
      Your browser does not support the audio element.
    </audio>
    <span class="controls">
      <i class="fas fa-pause" @click="pause()" v-if="playing"></i>
      <i class="fas fa-play" @click="play()" v-else></i>
      <i class="fas fa-volume-mute" @click="unmute()" v-if="muted"></i>
      <i class="fas fa-volume" v-else @click="mute()"></i>
      <input type="range" class="volume" min="0" max="100" v-model="volume">
    </span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      playing: false,
      volume: null,
      muted_volume: null
    }
  },
  methods: {
    play() {
      this.$refs['soundtrack'].play()
      this.playing = true
    },
    pause() {
      this.$refs['soundtrack'].pause()
      this.playing = false
    },
    mute() {
      this.muted_volume = this.volume
      this.volume = 0
    },
    unmute() {
      this.volume = this.muted_volume
      // Watch doesnt work properly for unmuting, TODO
      this.$refs['soundtrack'].volume = this.volume / 100
    }
  },
  computed: {
    muted() {
      return this.volume == 0
    }
  },
  watch: {
    volume(event) {
      this.$nextTick(() => {
        this.$refs['soundtrack'].volume = this.volume / 100
      })
    }
  }
}
</script>
<style lang="sass">
#soundtrack
  padding: 0 1rem

  .controls
    display: flex
    align-items: center
    gap: .5rem

    .fas
      cursor: pointer

    .fa-volume, .fa-volume-mute
      font-size: 1.25rem


</style>