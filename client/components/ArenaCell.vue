<template>
    <div
            class="cell"
            :class="cell.terrain"
            oncontextmenu="return false"
            @click="$emit('click')"
            @mouseover.self="$emit('cell-mouseover')"
    >
        <div class="overlay destination-overlay" v-if="cell.valid_destination && cell.valid_destination !== null && cell.passable"></div>
        <div class="overlay impassable-overlay" v-if="cell.valid_destination && cell.valid_destination !== null && !cell.passable"></div>
        <div class="entities" v-if="entities.length"
             @mouseover.self="$emit('cell-mouseover')">
            <dnd-entity
                    v-for="entity in entities[x][y]"
                    :entity="entity"
                    :active="isActive"
                    @entity-mouseover="$emit('entity-mouseover', entity.mp.current)"
                    @entity-mouseout="$emit('entity-mouseout')"
            ></dnd-entity>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        cell: {
            type: Object,
            required: true
        },
        entities: {
            type: Array,
            required: true
        },
        active: {
            Object,
            required: true
        },
        x: {
            type: Number | String,
            required: true
        },
        y: {
            type: Number | String,
            required: true
        }
    },
    computed: {
        isActive() {
            return ((this.x.toString() === this.active.x.toString()) && (this.y.toString() === this.active.y.toString()))
        }
    }
}
</script>
<style lang="sass">
$grass: darken(green, 10%)
$water: darken(teal, 10%)
$stone: darken(grey, 10%)

$cell-index: 1
$entity-index: 2
$tooltip-index: 3

@keyframes active-entity
  0%
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 1)

  50%
    box-shadow: 0 0 0 7px rgba(255, 255, 255, 0)

  70%
    box-shadow: 0 0 0 10px rgba(255, 255, 255, 0)

  100%
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0)


@mixin active-entity
  animation: active-entity 2s infinite

.cell
  height: 50px
  width: 50px

  position: relative

  &.grass
    background: $grass

    &:hover
      background: lighten($grass, 10%)

  &.water
    background: $water

    &:hover
      background: lighten($water, 10%)

  &.stone
    background: $stone

    &:hover
      background: lighten($stone, 10%)


  .overlay
    position: absolute
    height: 100%
    width: 100%

    &.destination-overlay
      background: rgba(82, 189, 34, 0.7)

    &.impassable-overlay
      background: rgba(189, 34, 34, 0.7)

  .entities
    height: 100%
    width: 100%
    display: flex
    justify-content: center
    align-items: center
    position: relative
    z-index: $cell-index

    .entity
      border: 2px solid black
      border-radius: 50%
      height: 80%
      width: 80%
      display: flex
      justify-content: center
      align-items: center
      cursor: pointer
      z-index: $entity-index

      &.player
        border: 2px solid lawngreen
        background: darken(lawngreen, 10%)

        &.active
          @include active-entity

      &.ally
        border: 2px solid deepskyblue
        background: darken(deepskyblue, 10%)

        &.active
          @include active-entity

      &.enemy
        border: 2px solid red
        background: darken(red, 10%)

        &.active
          @include active-entity

      &:hover > .stats
        display: grid !important

      &:hover > .nameplate, &:hover > .hp
        display: flex !important

      .nameplate, .stats
        position: absolute
        font-size: .8rem
        border-radius: .25rem
        padding: 2px 4px
        z-index: $tooltip-index

      .nameplate
        top: -1rem
        display: none
        background: rgba(0, 0, 0, .6)

        .name
          grid-column: 1/3
          white-space: nowrap

      .stats
        bottom: -1rem
        display: none
        grid-template-columns: 1fr 1fr
        grid-gap: .5rem
        justify-content: center
        white-space: nowrap

        .ap, .mp
          text-align: center
          height: 24px
          width: 24px
          border-radius: 50%
          display: flex
          justify-content: center
          align-items: center
          z-index: $tooltip-index

        .ap
          grid-column: 1
          background: blue

        .mp
          grid-column: 2
          background: green

      .hp
        display: none
</style>