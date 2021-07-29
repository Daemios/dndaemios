<template>
  <div id="crawl">
    <h3>War</h3>
    <p>
      The Dwarven kingdoms in the North have fallen to the forces of darkness. Many
      old alliances have been broken, and as long as
      <strong>the threat</strong> in the mountains remains, it grows
      ever more powerful.
    </p>
    <p>
      Recent defeats have left the kingdoms that still stand in the South shadows of
      their former glory. The southerners <strong>fear of what is to come</strong> has
      caused strife between the remaining nations. The warlord-king <strong>Markus Kroll</strong>
      has taken advantage of the chaos to expand his empire of barbarians,
      <strong>the Brotherhood</strong>.
    </p>
    <p>
      You are travelling along the king's road to the town of <strong>Elmswood</strong>
      in the kingdom of <strong>Braxton</strong>. You feel the cool dusk breeze blowing over
      the well-travelled road as if to urge you on to the town before nightfall.
      Divines willing, you will make it. You are about to push on when something, or someone,
      catches your eye...
    </p>
  </div>
</template>
<script>
export default {}
</script>
<style lang="sass">
@import ../../sass/colors
@keyframes crawl
  0%
    transform: perspective(300px) rotateX(20deg) translateY(80rem)
    opacity: 1

  90%
    opacity: 1

  100%
    transform: perspective(300px) rotateX(20deg) translateY(-1000px)
    opacity: 0

strong
  color: $text-highlight

#crawl
  width: 800px
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  animation: crawl 82s linear forwards
  transform: perspective(300px) rotateX(20deg) translateZ(0)
  backface-visibility: hidden
  -webkit-font-smoothing: subpixel-antialiased

  h3
    text-align: center
    color: firebrick
    font-size: 14rem
    line-height: normal
    font-family: 'Requiem', sans-serif
    margin: 0


    p
      //-webkit-text-stroke: 1px black
      font-weight: bold
      color: white
      font-size: 3rem
      text-align: justify
      text-justify: inter-word
</style>