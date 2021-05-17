<template>
    <div id="attributes" class="card">
        <h2>Attributes</h2>
        <div class="attribute">
            <span class="attribute-name" v-for="attribute in character.attributes">{{attribute.long}}:</span>
            <span class="attribute-value" v-for="attribute in character.attributes">{{attribute.value}}</span>
            <span class="attribute-bonus" v-for="attribute in character.attributes">({{attributeBonus(attribute.value)}})</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        character: {
            type: Object,
            required: true
        }
    },
    methods: {
        attributeBonus(value) {
            return Math.floor((value - 10) / 2)
        }
    }
}
</script>
<style lang="sass">
#attributes
  h2
    margin-bottom: .5rem

  .attribute
    display: grid
    grid-template-columns: 1fr 1fr 1fr
    grid-auto-flow: dense
    grid-gap: .25rem 1rem

    .attribute-value, .attribute-bonus
      display: flex
      align-items: center
      justify-content: flex-end

    .attribute-name
      grid-column: 1
      text-transform: capitalize

    .attribute-value
      grid-column: 2
      font-size: 1rem

    .attribute-bonus
      grid-column: 3

</style>