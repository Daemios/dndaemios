<template>
  <div class="welcome-summary container">
    <div class="header">
      <h2>{{ first_name ? first_name : 'Choose Name' }} {{ last_name }}</h2>
    </div>
    <div class="details">
      <div class="race">
        Race:
        <span :class="classBasicFeature(race)">{{ formatBasicFeature(race, 'Race') }}</span>
      </div>
      <div class="archetype">
        Archetype:
        <span :class="classBasicFeature(archetype.range)">{{ formatBasicFeature(archetype.range, '') }}</span>
        /
        <span :class="classBasicFeature(archetype.role)">{{ formatBasicFeature(archetype.role, '') }}</span>
      </div>
      <div class="affinity">
        Affinity:
        <span :class="classBasicFeature(affinity)">{{ formatBasicFeature(affinity, 'Affinity') }}</span>
      </div>
      <div class="divinity">
        Divinity:
        <span :class="classBasicFeature(divinity)">{{ formatBasicFeature(divinity, 'Divinity') }}</span>
      </div>
    </div>
    <div class="bonuses">
      <div class="bonus" :class="bonus.class" v-for="bonus in listBonuses()">
        <span>{{ bonus.bonus.name }}</span>
        <span :class="bonus.bonus.classes">{{ bonus.bonus.value }} {{ test(bonus) }}</span>
      </div>
    </div>
    <div class="abilities">

    </div>
  </div>
</template>
<script>
export default {
  props: {
    first_name: {
      type: String|null,
      default: 'Name Missing'
    },
    last_name: {
      type: String|null,
      default: null
    },
    race: {
      type: Object|null
    },
    archetype: {
      type: Object|null
    },
    affinity: {
      type: Object|null
    },
    divinity: {
      type: Object|null
    },
    abilities: {
      type: Object|null
    }
  },
  methods: {
    test(i) {
      console.log(i)
    },

    // Data collation
    listBonuses() {

      let bonuses = [];

      if (this.archetype) {

        // Foreach through range/role
        Object.values(this.archetype).forEach(prop => {

          if (prop && prop['bonus']) {

            prop['bonus'].forEach(bonus => {

              bonuses.push({
                bonus: Dnd.format.bonus(bonus['value'], bonus['description'], bonus['operation']),
                class: 'potency-bonus',
              })

            })

          }

        })

      }

      if (this.affinity) {

      }

      if (this.race && this.race['bonus']) {

        this.race['bonus'].forEach(bonus => {
          let sign = bonus['bonus'] >= 0 ? ' +' : ' -';
          bonuses.push({
            bonus: Dnd.format.bonus(bonus['bonus'], bonus['name']),
            class: 'skill-bonus'
          })
        })

      }

      return bonuses;
    },

    // Formatting
    formatBasicFeature(object, label = 'Label', suffix = true) {
      if (object) {
        return suffix ? object['name'] : object['name'];
      } else {
        return label + ' Missing';
      }
    },

    // Class builders
    classBasicFeature(feature) {
      let name = feature ? feature['name'] : 'name-missing';
      return {
        'missing': !feature,
        ['color-' + name.toLowerCase()]: true
      };
    },

  }
}
</script>
<style lang="sass">
.welcome-summary
  padding: 1rem !important
  display: grid
  grid-template-columns: 11fr 10fr 10fr 10fr // gives a little extra space to archetype breakdown
  grid-gap: .5rem

  .header
    grid-column: span 3
    grid-row: 1

  .details
    grid-column: 1

    .missing
      color: grey

  .bonuses
    grid-column: 2

    .bonus
      display: flex
      justify-content: space-between

    .potency-bonus
      font-size: 1.1rem
      color: white

  .abilities
    grid-column: 3
</style>