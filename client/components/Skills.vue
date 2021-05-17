<template>
    <div id="skills" class="card">
        <h2>Skills</h2>
        <div class="skill header">Skill</div>
        <div class="value header">Value</div>
        <div class="bonus header">Bonus</div>
        <div v-for="skill in character.skills" class="skill"><strong>{{skill.pretty}}</strong></div>
        <div v-for="skill in character.skills" class="value">{{skill.value}}</div>
        <div v-for="skill in character.skills" class="bonus" v-if="character.attributes[skill.attribute]">
            {{skillBonus(skill.value, skill.attribute)}}
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            character: {
                type: Object
            }
        },
        methods: {
            skillBonus(value, attribute) {

                let base = Math.floor(this.character.attributes[attribute].value / 2) - 5;

                let combined = base + value;

                let string;

                if (combined >= 0) string = '+' + combined;
                else string = combined;

                return string;

            }
        }
    }
</script>
<style lang="sass">
@import ../sass/colors

#skills
  display: grid
  grid-template-columns: auto auto 1fr
  grid-gap: .5rem 2rem
  grid-auto-flow: dense

  h2
    grid-column: 1/4

  *.header
    color: $text-muted
    font-size: .8rem

  .skill
    grid-column: 1
    white-space: nowrap

  .value
    grid-column: 2
    text-align: center

  .bonus
    grid-column: 3
    text-align: center
</style>