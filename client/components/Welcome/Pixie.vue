<template>
  <div id="pixie-position" :class="animation">
    <div id="pixie-orientation">
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
          <div class="shadow">
            <div class="outer"></div>
            <div class="inner"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    animation: {
      type: String,
      default: 'waiting'
    }
  }
}
</script>
<style lang="sass">
@import ../../sass/colors

@keyframes fadeOutShadow
  0%
    opacity: 1
  100%
    opacity: 0

@keyframes flyUpperRight
  0%
    transform: translate(0%, 0%) scale(.2)

  20%
    transform: translate(2rem, 1rem) scale(.3)

  40%
    transform: translate(-4rem, 2rem) scale(.4)

  60%
    transform: translate(6rem, 3rem) scale(.6)

  80%
    transform: translate(-8rem, 4rem) scale(.8)

  100%
    transform: translate(30vw, -40vh) scale(1)

@keyframes orientUpperRight
  0%
    transform: scaleX(-1)

  19.9999%
    transform: scaleX(-1)

  20%
    transform: scaleX(1)

  39.9999%
    transform: scaleX(1)

  40%
    transform: scaleX(-1)

  59.9999%
    transform: scaleX(-1)

  60%
    transform: scaleX(1)

  79.9999%
    transform: scaleX(1)

  80%
    transform: scaleX(-1)

  99.9999%
    transform: scaleX(-1)

  100%
    transform: scaleX(1)


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

@keyframes hover
  0%
    transform: translateY(0)
  50%
    transform: translateY(1rem)
  100%
    transform: translateY(0)

@keyframes shadow
  0%
    width: 100%
    left: -50%
  50%
    width: 120%
    left: -60%
  100%
    width: 100%
    left: -50%


@mixin wingCycle
  animation-duration: .5s
  animation-iteration-count: infinite


#pixie-position
  position: absolute
  left: 50%
  top: 50%
  transform: scale(.2)

  &.come
    transform: translate(30vw, -40vh)
    animation: flyUpperRight 10s linear
    animation-fill-mode: forwards !important

    #pixie-orientation
      animation: orientUpperRight 10s linear !important
      animation-fill-mode: forwards !important

    .body .shadow *
      animation: fadeOutShadow 6s linear !important
      animation-fill-mode: forwards !important

  // This is possibly to fix a bug with the animations, they arent keeping their linear
  // property once the movement is over
  &.sit
    transform: translate(30vw, -40vh) scale(1)

    .body .shadow *
      display: none



  #pixie-orientation

    #pixie
      .wings
        position: absolute
        top: 0
        left: 0
        width: 200px
        height: 200px
        animation: hover 3s infinite

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
          animation: hover 3s infinite, glowCycle 1.5s infinite

        .inner-circle
          background: #21A0DE
          background: radial-gradient(at 48% 55%, lighten(#21A0DE, 40%), lighten(#21A0DE, 15%), #21A0DE, #21A0DE)
          width: 80%
          height: 80%
          position: absolute
          top: -40%
          left: -40%
          animation: hover 3s infinite

        .shadow
          position: relative
          animation: shadow 3s infinite

          *
            border-radius: 50%
            position: absolute
            width: 100%

          .outer
            margin-top: 11.5rem
            height: 2rem
            transform: scale(1.1)
            background: rgba(0, 212, 255, .4)

          .inner
            margin-top: 12rem
            height: 1rem
            background: radial-gradient(circle, rgba(33, 160, 222, 1) 0%, rgba(11, 195, 244, 1) 40%, rgba(0, 212, 255, 0) 100%)

</style>