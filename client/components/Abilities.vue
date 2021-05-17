<template>
    <div id="abilities" class="card">
        <h2>Abilities</h2>
        <div class="selectors">
            <div
                    class="selector"
                    :class="isActive(key)"
                    @click="setActive(key)"
                    v-for="(ability, key, index) in character.abilities"
            >
                {{index+1}}
            </div>
        </div>
        <div class="breakdown">
            <h3>{{current.name}}</h3>
            <div class="targeting">
                <div class="targeting-container">

                </div>
            </div>
            <div class="overview">
                <div class="damage">
                    <strong>Damage: </strong>
                    1d4
                </div>
                <div class="type">
                    <strong>Type: </strong>
                    {{elements()}}
                </div>
                <div class="effects">
                    <strong>Effects:</strong>
                    {{elementalEffects()}}
                </div>
            </div>
            <div class="description">

            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            character: {
                type: Object
            },
            ability_data: {
                type: Object
            }
        },
        methods: {
            isActive(key) {
                return (this.active === key) ? 'active' : '';
            },
            setActive(key) {
                this.active = key;
                this.current = this.character.abilities[key];
            },
            elements() {
                let str = '';

                if (this.current.elements) {
                    this.current.elements.forEach((element) => {
                        str = str + element + ', ';
                    })
                }

                return str.slice(0, -2)
            },
            elementalEffects() {
                let str = '';

                if (this.current.elements) {
                    this.current.elements.forEach((element) => {
                        str = str + this.ability_data.theme[element.toLowerCase()].effect + ' ';
                    })
                }

                return str.slice(0, -1);
            }
        },
        data() {
            return {
                active: null,
                current: null
            }
        },
        created() {
            let active_key = Object.keys(this.character.abilities)[0]
            this.active = active_key;
            this.current = this.character.abilities[active_key];
            console.log('set:' + this.active)
        }
    }
</script>
<style lang="sass">
@import "../sass/colors"

#abilities
  display: grid
  grid-template-columns: auto 1fr
  grid-template-rows: auto 1fr
  grid-gap: 1rem

  h2
    grid-column: 1/3

  .selectors
    grid-column: 1

    .selector
      height: 2rem
      width: 2rem
      display: flex
      justify-content: center
      align-items: center
      font-weight: bold
      margin-bottom: 2px
      user-select: none

      &.active
        border: 1px solid black

      &:not(.active)
        background: $button-theme
        border: 1px solid $button-theme
        color: $text-theme
        cursor: pointer

  .breakdown

    *
      margin-bottom: .5rem

    .targeting
      display: flex
      justify-content: center

      .targeting-container
        border: 1px solid black
        width: 150px
        height: 150px
        display: grid
        grid-gap: 1px
        grid-template-columns: repeat(9, 1fr)
        grid-template-rows: repeat(9, 1fr)

</style>