<template>
    <div id="combat-stats" class="card">
        <h2>Stats</h2>
        <div class="max-life">
            <span>Max Life:</span>
            <span>{{life}}</span>
        </div>
        <div class="life-per-level">
            <span>Life per Level:</span>
            <span>+{{lifePerLevel}}</span>
        </div>
        <div class="initiative">
            <span>Initiative:</span>
            <span>{{addSign(attributeBonus(character.attributes.dexterity.value))}}</span>
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
        computed: {
            life() {
                return this.character.level *
                    (
                        this.attributeBonus(this.character.attributes.constitution.value) +
                        this.character.archetype.life
                    )
            },
            lifePerLevel() {
                return this.attributeBonus(this.character.attributes.constitution.value) +
                    this.character.archetype.life
            }
        },
        methods: {
            addSign(value) {
                if (value >= 0) {
                    return '+' + value;
                } else {
                    return value;
                }
            },
            attributeBonus(value) {
                return Math.floor((value - 10) / 2)
            },
            emitHealth() {

            }
        }
    }
</script>
<style lang="sass">
#combat-stats
  &>*
    display: flex
    justify-content: space-between
    align-items: flex-end
    margin-bottom: .5rem

    span:nth-child(even)
      font-size: 1.25rem
</style>