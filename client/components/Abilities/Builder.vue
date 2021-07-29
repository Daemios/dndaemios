<template>
  <div class="ability-builder">
    <div class="components">
      <div class="overview-1" v-if="state === states.overview_1">
        Many different forms of power exist in the great expanse of land and sea that makes up our world.
        However, from cunning spellslingers to the hardiest of warriors, the core of their power remains
        the same. The blood of the earth, Aether, binds all men and women with ability together.
        Here you will learn to bend Aether to your will and bind it in your body.
      </div>
      <div class="overview-2" v-if="state === states.overview_2">
        Abilities are crafted, not inherent to a chosen class. Each ability is unique to the
        components used in its creation. This process is called <strong>ability synthesis</strong>,
        and it’s the basis for the entire direction of your character.
      </div>
      <div class="overview-3" v-if="state === states.overview_3">
        During ability synthesis, components are combined to deterministically create an ability.
        Each component has a set number of properties called <strong>tags</strong> associated with it
        and combining these will create different abilities.

        Each ability requires at least one range, shape, and type component, and your characters elemental theme(s) are
        automatically applied. Characters may apply additional Aether to an ability at higher levels to add multiple
        components including extra themes!
      </div>
      <div class="ranges" v-if="state === states.building">
        <h2>Range <i class="fa fa-question" @click="toggleRangeInfo()"></i></h2>
        <div class="container-scroll">
          <div class="option"
               :class="range === selected.range ? 'active' : ''"
               v-for="range in ranges"
               @click="selected.range = range"
          >
            {{range.name}}
          </div>
        </div>
      </div>
      <div class="shapes" v-if="state === states.building">
        <h2>Shape <i class="fa fa-question" @click="toggleShapeInfo()"></i></h2>
        <div class="container-scroll">
          <div class="option"
               :class="shape === selected.shape ? 'active' : ''"
               v-for="shape in shapes"
               @click="selected.shape = shape"
          >
            {{shape.name}}
          </div>
        </div>
      </div>
      <div class="types" v-if="state === states.building">
        <h2>Type <i class="fa fa-question" @click="toggleTypeInfo()"></i></h2>
        <div class="container-scroll">
          <div class="option"
               :class="type === selected.type ? 'active' : ''"
               v-for="type in types"
               @click="selected.type = type"
          >
            {{type.name}}
          </div>
        </div>
      </div>
    </div>
    <div class="points">
      <h2>
        Points: {{skill_points_available}}
        <i class="fa fa-question" @click="togglePointsInfo()"></i>
      </h2>
      <div class="points-grid container">
        <aui-input
            type="number"
            title="Power"
            v-model="points.power"
        ></aui-input>
      </div>
    </div>
    <div class="details">
      <div class="range">
        Range: {{ selected.range ? selected.range.name : 'Unselected'}}
      </div>
      <div class="shape">
        Shape: {{ selected.shape ? selected.shape.name : 'Unselected'}}
      </div>
      <div class="type">
        Type: {{ selected.type ? selected.type.name : 'Unselected'}}
      </div>
    </div>
    <aui-modal
        title="Range Explained"
        :show.sync="modals.range"
    >
      <p>
        Selecting a range for your ability is the first step in synthesis.
      </p>
      <p>
        In basic terms, the range
        of your ability determines how far it can reach, and whether it can be affected by additional range
        modifiers.
      </p>
      <p>
        For clarity, self- and touch-range abilities cannot have additional range, but
        any of the other options may be modified by gear and your archetype.
      </p>
    </aui-modal>
    <aui-modal
        title="Shapes Explained"
        :show.sync="modals.shape"
    >
      <p>
        The second step in synthesizing an ability is choosing a shape that your ability will
        express itself in.

      </p>
      <p>
        In general, the less squares effected by the shape, the more powerful
        your ability will be. However, the power of your ability is not simply
        distributed evenly over each square.
      </p>
      <p>
        In other words, if you decide on a shape that has a significant area and are able to use it
        in battle effectively, your overall output will be higher than if you simply used single-target
        abilities.
      </p>
      <p>
        Please note, however, that (by default) all shapes target ALL entities inside of them with
        their effects. You may choose to override this behavior via spending additional ability points,
        or you may simple choose to find clever ways of applying your abilities during combat.
      </p>
    </aui-modal>
    <aui-modal
        title="Types Explained"
        :show.sync="modals.type"
    >
      <p>
        The third step of creating an ability is to choose it's type, and it is functionally the
        most critical step. The type of your ability determines what it does on a fundamental level.
      </p>
      <p>
        Several types like Walls or Positionals have unique effects for each element. For example, an
        Ice Wall creates a solid sheet of ice that chills all nearby cells. You will have to discover for
        yourself all the unique effects and combinations of elements for each type!
      </p>
      <p>
        Click each type in the builder to see what they do if you're confused, and their effect will
        appear in the lower summary panel.
      </p>
    </aui-modal>
    <aui-modal
        title="Ability Points Explained"
        :show.sync="modals.points"
    >
      <p>
        The last step of creating your abilities is to customize them via <strong>ability points</strong>.
        During the final stages of synthesis, you can choose from five categories and several tags.
        Each of these have benefits, but allow you to create many billions of possible combinations.
      </p>
      <p>
        There are five point dumps, but the most important three are <strong>Power</strong>,
        <strong>AP</strong>, and <strong>Cooldown</strong>.
      </p>
      <p>
        <strong>Power</strong> increases the abilities effect. Power is the truly unlimited stat in the sense that it
        never stops scaling. Power will increase your healing, the strength of your debuffs, or the damage you
        deal. All of it is based off the power of your ability.
      </p>
      <p>
        <strong>AP</strong> reduces the AP cost of your ability. You can calculate the AP cost of any ability like so:
        <strong><em>(power_points + cooldown_points) - (ap_points * 2)</em></strong> and the maximum this value can be is
        6 AP.
      </p>
      <p>
        <strong>Cooldown</strong> reduces the cooldown of your ability. The maximum potential for this is a
        no-cooldown spell by making the points in Cooldown be highest of Power, AP, and Cooldown.
      </p>
      <p>
        Additionally, there are two other stats worth putting significant point investment in: <strong>Range</strong>
        and <strong>Area</strong>. By putting points in here, you can add one to either the range or area of an
        ability. Simple stuff!
      </p>
      <p>
        For example, you may choose to have a low power, no-cooldown ability you can spam, and augment it with
        an long-cooldown but high power buff or debuff. The possibilities are quite vast, and I'm sure you have
        ideas of your own!
      </p>
    </aui-modal>
  </div>
</template>
<script>
export default {
  props: {
    overview: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      state: null,
      states: {
        overview_1: "overview-1",
        overview_2: "overview-2",
        overview_3: "overview-3",
        building: "building",
      },
      selected: {
        name: null,
        range: null,
        shape: null,
        type: null
      },
      points: {
        available: 5,
        power: 0,
        ap: 0,
        cooldown: 0,
        range: 0,
        area: 0
      },
      modals: {
        range: false,
        shape: false,
        type: false,
        points: false
      },
      ranges: null,
      shapes: null,
      types: null
    }
  },
  methods: {
    specificMax(current) {
      return Number(this.skill_points_available) + Number(current);
    },

    // Modal toggles
    toggleRangeInfo() {
      this.modals.range = !this.modals.range;
    },
    toggleShapeInfo() {
      this.modals.shape = !this.modals.shape;
    },
    toggleTypeInfo() {
      this.modals.type = !this.modals.type;
    },
    togglePointsInfo() {
      this.modals.points = !this.modals.points;
    },

    // Database
    getAbilityRanges() {
      DynamicSuite.call('ability.ranges.get', null, response => {
        console.log(response)
        this.ranges = response.data;
      })
    },
    getAbilityShapes() {
      DynamicSuite.call('ability.shapes.get', null, response => {
        console.log(response)
        this.shapes = response.data;
      })
    },
    getAbilityTypes() {
      DynamicSuite.call('ability.types.get', null, response => {
        console.log(response)
        this.types = response.data;
      })
    }
  },
  computed: {
    skill_points_available() {
      return this.points.available -
          (Number(this.points.power) +
          Number(this.points.ap) +
          Number(this.points.cooldown) +
          Number(this.points.range) +
          Number(this.points.area));
    }
  },
  mounted() {
    this.getAbilityRanges();
    this.getAbilityShapes();
    this.getAbilityTypes();

    //this.state = this.overview ? this.states.overview_1 : this.states.building;
    this.state = this.states.building
  }
}
</script>
<style lang="sass">
@import ../../sass/colors

.ability-builder

  h2
    display: flex
    align-items: center
    justify-content: space-between
    margin-bottom: .5rem

    .fa-question
      font-size: .5rem
      border: 2px solid $text-theme
      border-radius: 50%
      height: 1.25rem
      width: 1.25rem
      cursor: pointer
      display: flex
      justify-content: center
      align-items: center

  .components
    padding: 1rem 0
    display: grid
    grid-gap: 1rem
    grid-template-columns: 1fr 1fr 1fr

    .ranges, .shapes, .types, .points

      .container-scroll
        max-height: 132px

  .points
    margin-bottom: 1rem
    display: flex
    flex-direction: column

    .points-grid
      display: grid
      grid-template-columns: repeat(5, 1fr)

  .details
    background: darken($background-highlight, 15%)
    padding: .5rem
    border-radius: .25rem

</style>