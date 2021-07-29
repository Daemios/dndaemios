<template>
  <div class="item" @click="$emit('edit')">
    <span class="info card">
      <span class="name">{{item.name}}</span>
      <span class="quantity">
        <span>x</span>
        <span>{{item.quantity}}</span>
      </span>
    </span>

    <span class="icon">
        <i class="fas" :class="item.type.class"></i>
    </span>
  </div>
</template>
<script>
    export default {
        props: {
            item: {
                type: Object,
                required: true
            }
        }
    }
</script>
<style lang="sass">
@import "../sass/colors"

.item
  box-sizing: border-box
  display: flex
  flex-direction: row-reverse
  width: 278px

  &:hover
    cursor: pointer

    .card
      background: lighten($background-card, 10%)

  &>*
    display: flex
    align-items: center

  .icon
    font-size: 1.5rem
    top: 0
    bottom: 0

    i
      border-radius: 50%
      background: white
      height: 50px
      width: 50px
      color: black
      display: flex
      justify-content: center
      align-items: center


  .info
    padding-left: 2rem
    margin-left: -1rem
    width: 100%

    .name
      white-space: nowrap
      overflow: hidden

    .quantity
      margin-left: auto

      span:last-of-type
        font-weight: bold
        color: white


</style>