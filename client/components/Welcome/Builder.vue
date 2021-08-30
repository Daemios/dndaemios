<template>
  <div id="builder">
    <div class="content">

      <dnd-welcome-pixie
        :animation="pixieState()"
      ></dnd-welcome-pixie>

      <div class="panes">
        <transition name="fade">
          <div v-if="state === states.name" class="name">
          <h1>Name Yourself</h1>
          <div class="names">
            <aui-input placeholder="First Name" v-model="first_name"></aui-input>
            <aui-input placeholder="Last Name" v-model="last_name"></aui-input>
          </div>
        </div>
          <div v-if="state === states.name_response" class="name-response">
          <h1>Introductions</h1>
          <p>
            Hey {{first_name}}! My name is <strong>Morningdew</strong>, and I'm a <strong>pixie</strong>!
          </p>
          <p>
            I don't get out of the toadstool village much... Everything is
            so new and wonderful! I've never seen something like you before.
            What <strong>race</strong> are you?
          </p>
        </div>
          <div v-if="state === states.race" class="race">
            <h1>Race</h1>
            <div class="choices">
              <div
                  v-for="option in races"
                  :class="race === option ? 'active' : ''"
                  class="choice"
                  @click="race = option"
              >
                {{ option.name }}
              </div>
            </div>
            <div v-if="race" class="breakdown">
              <h2>{{ race.name }}</h2>
              <p>{{ race.description }}</p>
              <div v-if="race" class="bonuses">
              <span v-for="(effect, key) in race.effects">
                  {{ effect.pretty }}: {{ effect.value >= 0 ? '+' + effect.value : effect.value }}
              </span>
              </div>
            </div>
            <div v-else class="breakdown">
              Please select a race from the list.
            </div>
          </div>
          <div v-if="state === states.race_response" class="race-response">
            <h1>Race</h1>

            <p>Wow! A <strong>{{ race.name }}</strong> in my forest!</p>

            <p>
              I've heard a lot about your people! My father once told me about a <strong>mighty warrior</strong>
              who visited our village in the past. They were a <strong>{{ race.name }}</strong> too! They fought up
              close,
              protecting their team members from harm.
            </p>
            <p>
              Do you fight up close like the warrior, or do you keep your distance?
              I've heard that adventurers <strong>focus on an archetype</strong>! Is that true?
            </p>
          </div>
          <div v-if="state === states.archetype" class="archetype">
            <h1>Archetype</h1>
            <div class="archetype-info">
              All options start with at least one damaging ability and have additional abilities
              added depending on what is chosen. Choosing a role will give a benefits to those specific
              types of abilities. Later in your progression you may choose a second role, but
              you will never change your range selection, so choose carefully.
            </div>
            <div class="range-choice">
              <h2>Range</h2>
              <div
                  v-for="range in archetypes.range"
                  :class="archetype.range === range ? 'active' : ''"
                  class="range-option"
                  @click="archetype.range = range"
              >
                <h3>{{ range.name }}</h3>
                <div class="description">
                  {{ range.description }}
                </div>
              </div>
            </div>
            <div class="role-choice">
              <h2>Role</h2>
              <div class="choices">
                <div
                    v-for="role in archetypes.role"
                    :class="archetype.role === role ? 'active' : ''"
                    class="choice"
                    @click="archetype.role = role"
                >
                  {{ role.name }}
                </div>
              </div>
              <div v-if="archetype.role" class="role-description">
                {{ archetype.role.description }}
              </div>
              <div v-else class="role-description">
                Choose a role
              </div>
            </div>
          </div>
          <div v-if="state === states.archetype_response" class="archetype-response">
            <h1>Archetype</h1>
            <p>
              <strong>{{ archetype.range.name }} / {{ archetype.role.name }}!</strong>
              What a smart combination! I bet you will see a lot of success with that!
            </p>
            <p>
              I've heard that every adventurer has a specific element they can control. Is that true?
              Can you <strong>show me your element</strong>?
            </p>
          </div>
          <div v-if="state === states.affinity" class="affinity">
            <h1>Elemental Affinity</h1>
            <div class="content">
              <div class="choices">
                <div
                    class="element"
                    :class="affinityClasses(affinity_iter)"
                    v-for="affinity_iter in affinities"
                    @click="affinity = affinity_iter"
                >
                  <i class="fas" :class="affinity_iter.icon"/>
                  <div>{{affinity_iter.name}}</div>
                </div>
              </div>
              <div class="summary container">
                <h2>{{affinity ? affinity.name : 'Select affinity'}}</h2>
                <div>Damage: {{formatAffinityBonusValue(affinity, 'damage')}}</div>
                <div>Healing: {{formatAffinityBonusValue(affinity, 'healing')}}</div>
                <div>Buff: {{formatAffinityBonusValue(affinity, 'buff')}}</div>
                <div>Debuff: {{formatAffinityBonusValue(affinity, 'debuff')}}</div>
                <div v-if="affinity" class="effect">Effect: {{affinity.effect}}</div>
              </div>
            </div>
          </div>
          <div v-if="state === states.affinity_response" class="affinity-response">
            <h1>Elemental Affinity</h1>

            <p>Wow! A <strong>{{ affinity.name }}</strong> user!</p>
            <p>
              Are you sure that's your affinity? I've heard that <strong>only the truly powerful can master more than one</strong>
              affinity, so I bet it was a tough decision on what to focus on while you were training!
            </p>
            <p>
              Do you think you could show me some of your <strong>abilities</strong>? I would love to be able to
              tell the story of the newest adventurer to visit our forest to the rest of my village!
            </p>
          </div>
          <div v-if="state === states.ability_building" class="ability-building">
            <h1>Ability Building</h1>
            Create your first ability. A second ability will be available for synthesis as soon as your character
            is created.
            <dnd-abilities-builder
                :overview="true"
            ></dnd-abilities-builder>
          </div>
          <div v-if="state === states.ability_building_response" class="ability-building-response">
            <h1>Ability Building</h1>
            <p>
              Amazing! You must be so proud to have such powerful abilities!
            </p>
            <p>
              I think that's everything... oh wait! What about a <strong>Divinity</strong>? Do you serve any of
              them? I've heard it can be a terrible burden, but the rewards can make up for it. Is it true that
              people who serve them have <strong>special powers</strong>? Sounds like a tough choice!
            </p>
            <p>
              How about it?
            </p>
          </div>
          <div v-if="state === states.divinity" class="divinity">
            <h1>A Divine Choice</h1>
          </div>
          <div v-if="state === states.divinity_response" class="divinity-response">
            <h1>A Divine Choice</h1>
            <p v-if=""></p>
          </div>
          <div v-if="state === states.finish" class="finish"></div>
        </transition>
      </div>

      <div class="control">
        <aui-button
            v-if="state === states.name_response"
            class="back btn-secondary"
            @click="state = states.name"
        >
          Back to Name
        </aui-button>
        <aui-button
            v-if="state === states.race"
            class="back btn-secondary"
            @click="state = states.name"
        >
          Back to Name
        </aui-button>
        <aui-button
            v-if="state === states.race_response"
            class="back btn-secondary"
            @click="state = states.race"
        >
          Back to Race
        </aui-button>
        <aui-button
            v-if="state === states.archetype"
            class="back btn-secondary"
            @click="state = states.race"
        >
          Back to Race
        </aui-button>
        <aui-button
            v-if="state === states.archetype_response"
            class="back btn-secondary"
            @click="state = states.archetype"
        >
          Back to Archetype
        </aui-button>
        <aui-button
            v-if="state === states.affinity"
            class="back btn-secondary"
            @click="state = states.archetype"
        >
          Back to Archetype
        </aui-button>
        <aui-button
            v-if="state === states.affinity_response"
            :disabled="false"
            class="back btn-secondary"
            @click="state = states.affinity"
        >
          Back to Affinity
        </aui-button>
        <aui-button
            v-if="state === states.ability_building"
            :disabled="false"
            class="back btn-secondary"
            @click="state = states.affinity"
        >
          Back to Affinity
        </aui-button>
        <aui-button
            v-if="state === states.ability_building_response"
            class="back btn-secondary"
            @click="state = states.ability_building"
        >
          Back to Abilities
        </aui-button>
        <aui-button
            v-if="state === states.divinity"
            class="back btn-secondary"
            @click="state = states.ability_building"
        >
          Back to Abilities
        </aui-button>
        <aui-button
            v-if="state === states.divinity_response"
            :disabled="!race"
            class="back btn-secondary"
            @click="state = states.divinity"
        >
          Back to Divinity
        </aui-button>
        <aui-button
            v-if="state === states.finish"
            :disabled="!race"
            class="back btn-secondary"
            @click="state = states.divinity"
        >
          Back to Divinity
        </aui-button>

        <aui-button
            v-if="state === states.name"
            class="continue btn-primary"
            :disabled="!first_name"
            @click="enhancedState(states.name_response)"
        >
          Confirm Name
        </aui-button>
        <aui-button
            v-if="state === states.name_response"
            class="continue btn-primary"
            @click="state = states.race"
        >
          Select Race
        </aui-button>
        <aui-button
            v-if="state === states.race"
            :disabled="!race"
            class="continue btn-primary"
            @click="state = states.race_response"
        >
          Confirm Race
        </aui-button>
        <aui-button
            v-if="state === states.race_response"
            :disabled="!race"
            class="continue btn-primary"
            @click="state = states.archetype"
        >
          Select Archetype
        </aui-button>
        <aui-button
            v-if="state === states.archetype"
            :disabled="!archetype.role || !archetype.range"
            class="continue btn-primary"
            @click="state = states.archetype_response"
        >
          Confirm Archetype
        </aui-button>
        <aui-button
            v-if="state === states.archetype_response"
            :disabled="false"
            class="continue btn-primary"
            @click="state = states.affinity"
        >
          Choose Elemental Affinity
        </aui-button>
        <aui-button
            v-if="state === states.affinity"
            :disabled="!affinity"
            class="continue btn-primary"
            @click="state = states.affinity_response"
        >
          Confirm Elemental Affinity
        </aui-button>
        <aui-button
            v-if="state === states.affinity_response"
            :disabled="false"
            class="continue btn-primary"
            @click="state = states.ability_building"
        >
          Build Abilities
        </aui-button>
        <aui-button
            v-if="state === states.ability_building"
            :disabled="false"
            class="continue btn-primary"
            @click="state = states.ability_building_response"
        >
          Confirm Abilities
        </aui-button>
        <aui-button
            v-if="state === states.ability_building_response"
            :disabled="!race"
            class="continue btn-primary"
            @click="state = states.divinity"
        >
          Select Divinity
        </aui-button>
        <aui-button
            v-if="state === states.divinity"
            :disabled="!race"
            class="continue btn-primary"
            @click="state = states.divinity_response"
        >
          Confirm Divinity
        </aui-button>
        <aui-button
            v-if="state === states.divinity_response"
            :disabled="!race"
            class="continue btn-primary"
            @click=""
        >
          Finish Character Build
        </aui-button>
      </div>

      <div class="summary" v-if="state !== states.hidden && state !== states.name">
        <dnd-welcome-summary
            :first_name="first_name"
            :last_name="last_name ?? null"
            :race="race ? race : null"
            :archetype="archetype ? archetype : null"
            :affinity="affinity ? affinity : null"
            :abilities="null"
        ></dnd-welcome-summary>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      state: null,
      states: {
        hidden: 'hidden',
        name: 'name',
        name_response: 'name-response',
        race: 'race',
        race_response: 'race-response',
        affinity: 'affinity',
        affinity_response: 'affinity-response',
        archetype: 'archetype',
        archetype_response: 'archetype-response',
        ability_building: 'ability-building',
        ability_building_response: 'ability-building-response',
        divinity: 'divinity',
        divinity_response: 'divinity-response',
        finish: 'finish'
      },
      first_name: 'Daemios',
      last_name: null,
      race: null,
      races: null,
      archetype: {
        role: null,
        range: null
      },
      archetypes: {
        role: null,
        range: null
      },
      affinity: null,
      affinities: {},
      divinity: null,
      divinities: null
    }
  },
  methods: {
    // ---- State Handlers ----
    enhancedState(state) {
      switch (state) {

        case this.states.name_response:
          this.state = this.states.hidden;
          setTimeout(arg => {
            this.state = this.states.name_response;
          }, 10000)
          break;

        default:
          console.log('Unhandled enhanced state argument value')
          break;
      }
    },
    pixieState() {
      switch (this.state) {

        case this.states.hidden:
          return 'come';
        case this.states.name:
          return 'wait';
        default:
          return 'sit'
      }

    },
    formatAffinityBonusValue(affinity, key) {
      if (affinity) {
        return (affinity[key] * 100).toFixed(0) + '%';
      } else {
        return '-';
      }
    },
    affinityClasses(affinity) {
      if (affinity) {
        let classes = {
          active: this.affinity === affinity,
        };
        classes[affinity.tag] = true;
        return classes;
      }
    },

    // ---- Database ----
    getRaces() {
      DynamicSuite.call('races.get', null, (response) => {
        this.races = response.data;
      })
    },
    getArchRange() {
      DynamicSuite.call('archetypes.range.get', null, (response) => {
        this.archetypes.range = response.data;
        console.log(response)
      })
    },
    getArchRole() {
      DynamicSuite.call('archetypes.role.get', null, (response) => {
        this.archetypes.role = response.data;
        console.log(response)
      })
    },
    getAffinities() {
      DynamicSuite.call('affinities.get', null, (response) => {
        this.affinities = response.data;
        console.log(response)
      })
    }
  },
  mounted() {
    this.state = this.states.ability_building;
    this.getRaces();
    this.getArchRange();
    this.getArchRole();
    this.getAffinities();
  }
}
</script>
<style lang="sass">
@import ../../sass/colors

strong
  color: $text-highlight

#builder
  display: flex
  align-items: center
  justify-content: center
  flex-direction: column
  flex: 1

  &>.content
    display: flex
    flex-direction: column
    position: relative
    width: 100%
    min-height: 600px

    .panes
      flex: 1

  & > *
    max-width: 900px
    width: 100%

    h1
      grid-row: 1
      grid-column: 1/3

    .welcome-summary
      margin-top: 1rem

    .panes
      & > *
        height: 100%

      .name
        display: flex
        flex-direction: column
        justify-content: flex-end
        align-items: center
        .names
          display: flex
          gap: .5rem

      .race, .archetype
        display: grid
        grid-gap: 1rem
        grid-template-columns: 1fr 1fr
        grid-template-rows: auto 1fr

        h1
          grid-column: 1/3

        ::-webkit-scrollbar
          width: 10px
          border-radius: 50%

        ::-webkit-scrollbar-track
          background: none

        ::-webkit-scrollbar-thumb
          background: $background-highlight
          border-radius: 4px

        .choices
          overflow-y: auto
          background: darken($background-highlight, 15%)
          border-radius: .5rem
          padding: .5rem
          max-height: 16rem

          .choice
            cursor: pointer
            padding: .5rem
            border-radius: 4px
            margin: .25rem

            &:hover
              background: $background-highlight

            &.active
              background: $background-highlight


      .archetype-info
        grid-column: 1/3

      .range-choice
        grid-row: 3
        grid-column: 1

        & > h2
          margin-bottom: .5rem

        .range-option
          background: #202a32
          padding: .75rem 1rem
          margin-bottom: .5rem
          cursor: pointer
          border-radius: .5rem

          &.active
            background: #3d5261

          h3
            margin-bottom: .5rem

      .role-choice
        grid-row: 3
        grid-column: 2

        h2
          margin-bottom: .5rem

        .role-description
          margin-top: .5rem


      .affinity
        display: flex
        flex-direction: column


        .content
          display: flex
          gap: 1rem
          flex: 1

          .summary
            padding: 1rem
            width: 300px
            align-self: flex-start

            .effect
              margin-top: .5rem

          .choices
            align-self: flex-start
            flex: 1
            display: grid
            grid-gap: .5rem
            grid-template-columns: repeat( auto-fit, minmax(6rem, 1fr) )
            margin-top: .5rem

            .element
              height: 6rem
              width: 6rem
              border-radius: 50%
              background: #202a32
              display: flex
              justify-content: center
              align-items: center
              flex-direction: column
              cursor: pointer

              &.active
                background: #3d5261

              &.fire
                border: 2px solid $background-fire

                i
                  color: $background-fire

              &.ice
                border: 2px solid $background-ice

                i
                  color: $background-ice

              &.water
                border: 2px solid $background-water

                i
                  color: $background-water

              &.light
                border: 2px solid $background-light

                i
                  color: $background-light

              &.dark
                border: 2px solid $background-dark

                i
                  color: $background-dark

              &.nature
                border: 2px solid $background-nature

                i
                  color: $background-nature

              &.explosive
                border: 2px solid $background-explosive

                i
                  color: $background-explosive

              &.poison
                border: 2px solid $background-poison

                i
                  color: $background-poison

              &.earth
                border: 2px solid $background-earth

                i
                  color: $background-earth

              &.energy
                border: 2px solid $background-energy

                i
                  color: $background-energy

              &.air
                border: 2px solid $background-air

                i
                  color: $background-air

              i
                font-size: 1.5rem
                margin-bottom: .5rem


    .control
      align-self: flex-end
      display: flex
      margin-top: 1rem
      width: 100%
      height: 2.125rem

      .continue
        margin-left: auto


</style>