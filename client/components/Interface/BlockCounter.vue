<template>
  <div class="block-counter">
    <div class="blocks container">
      <div class="block" :class="block(7)"></div>
      <div class="block" :class="block(8)"></div>
      <div class="block" :class="block(9)"></div>

      <div class="block" :class="block(4)"></div>
      <div class="block" :class="block(5)"></div>
      <div class="block" :class="block(6)"></div>

      <div class="block" :class="block(1)"></div>
      <div class="block" :class="block(2)"></div>
      <div class="block" :class="block(3)"></div>
    </div>
    <div class="operations">

      <aui-button @click="increment()" :disabled="limit === 0">
        <i class="fas fa-plus"></i>
      </aui-button>
      <aui-button @click="decrement()" :disabled="current - 1 < start">
        <i class="fas fa-minus"></i>
      </aui-button>

    </div>
    <div class="title">{{title}}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      current: null
    }
  },
  props: {
    title: String|null,
    limit: Number|null,
    start: Number|null,
    positive_only: {
      default: true
    }
  },
  methods: {
    increment() {
      this.current++;
      this.$emit('input', this.current)
    },
    decrement() {
      this.current--;
      this.$emit('input', this.current)
    },
    block(count) {
      return {
        temporary: (this.current >= count),
        active: (this.start >= count)
      }
    }
  },
  computed: {
    divisions() {
      return Math.floor(this.current / 9);
    }
  },
  mounted() {
    this.current = this.start;
  }
}
</script>
<style lang="sass">
.block-counter
  display: grid
  grid-template-columns: 1fr auto

  .title
    text-align: center
    margin-top: .5rem

  .operations
    display: flex
    flex-direction: column
    justify-content: space-between
    padding: .25rem 0 .25rem .25rem

    .btn
      padding: .25rem
      min-width: 1.5rem
      min-height: 1.5rem

  .blocks
    padding: .5rem
    display: grid
    grid-template-columns: 15px 15px 15px
    grid-template-rows: 15px 15px 15px
    grid-gap: 3px

    .block

      &.temporary
        background: rgba(255,255,255,.4)

      &.active
        background: rgba(255,255,255,.8)

</style>