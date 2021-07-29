<template>
  <div id="pixie">
    <div class="wings">
      <div class="wing up right"></div>
      <div class="wing up left"></div>
      <div class="wing down right"></div>
      <div class="wing down left"></div>
    </div>
    <div class="body">
      <div class="outer-circle"></div>
      <div class="inner-circle"></div>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style lang="sass">
@import ../../sass/colors
@keyframes glowCycle
  0%
    width: 90%
    height: 90%
    top: -45%
    left: -45%

  50%
    width: 110%
    height: 110%
    top: -55%
    left: -55%

  100%
    width: 90%
    height: 90%
    top: -45%
    left: -45%


@keyframes wingFlapTopLeft
  0%
    transform: rotate(-40deg)

  50%
    transform: rotate(-110deg)

  100%
    transform: rotate(-40deg)


@keyframes wingFlapTopRight
  0%
    transform: rotate(0deg)
  50%
    transform: rotate(40deg)
  100%
    transform: rotate(0deg)

@keyframes wingFlapBottomLeft
  0%
    transform: rotate(150deg)
  50%
    transform: rotate(110deg)
  100%
    transform: rotate(150deg)

@keyframes wingFlapBottomRight
  0%
    transform: rotate(-40deg)
  50%
    transform: rotate(0deg)
  100%
    transform: rotate(-40deg)

@mixin wingCycle
  animation-duration: .5s
  animation-iteration-count: infinite


#pixie
  position: absolute
  right: 100px
  top: -50px

  .wings
    position: absolute
    top: 0
    left: 0
    width: 200px
    height: 200px

    .wing
      position: absolute
      background: #21A0DE

      &.up
        border-radius: 100% 0
        width: 200px
        height: 200px
        margin-top: -200px


        &.left
          margin-left: -20px
          background: linear-gradient(45deg, rgba(33, 160, 222, 1) 0%, rgba(22, 178, 233, 1) 27%, rgba(0, 212, 255, 0.4150035014005602) 44%)
          transform-origin: bottom left
          transform: rotate(-40deg)
          animation: wingFlapTopLeft
          @include wingCycle

        &.right
          margin-left: 20px
          background: linear-gradient(15deg, rgba(33, 160, 222, 1) 0%, rgba(22, 178, 233, 1) 27%, rgba(0, 212, 255, 0.4150035014005602) 44%)
          transform-origin: bottom left
          animation: wingFlapTopRight
          @include wingCycle

      &.down
        border-radius: 0 100%
        width: 100px
        height: 100px
        transform-origin: top left

        &.left
          margin-top: 30px
          margin-left: -20px
          background: linear-gradient(150deg, rgba(33, 160, 222, 1) 0%, rgba(22, 178, 233, 1) 27%, rgba(0, 212, 255, 0.4150035014005602) 44%)
          transform: rotate(110deg)
          animation: wingFlapBottomLeft
          @include wingCycle

        &.right
          margin-left: 20px
          margin-top: 40px
          background: linear-gradient(120deg, rgba(33, 160, 222, 1) 0%, rgba(22, 178, 233, 1) 27%, rgba(0, 212, 255, 0.4150035014005602) 44%)
          animation: wingFlapBottomRight
          @include wingCycle

  .body
    position: absolute
    width: 200px
    height: 200px
    top: 0
    left: 0

    *
      border-radius: 50%

    .outer-circle
      background: radial-gradient(circle, rgba(33, 160, 222, 1) 0%, rgba(11, 195, 244, 1) 40%, rgba(0, 212, 255, 0) 100%)
      width: 100%
      height: 100%
      position: absolute
      top: -50%
      left: -50%
      animation: glowCycle 1.5s infinite

    .inner-circle
      background: #21A0DE
      //darken(#21A0DE, 20%)
      background: radial-gradient(at 48% 55%, lighten(#21A0DE, 40%), lighten(#21A0DE, 15%), #21A0DE, #21A0DE)
      width: 80%
      height: 80%
      position: absolute
      top: -40%
      left: -40%
</style>