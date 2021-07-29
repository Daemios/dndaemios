<template>
  <span class="stats-format">
    {{output}}
  </span>
</template>
<script>
export default {
  props: {
    stat: {
      type: Object,
      required: true
    }
  },
  computed: {
    output() {
      return this.stat.description;
    }
  }
}
</script>
<style lang="sass">

</style>