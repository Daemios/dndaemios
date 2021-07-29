<template>
  <div id="builder">
    <div class="card">
      <!--<dnd-welcome-pixie></dnd-welcome-pixie>-->
      <div v-if="state === states.intro" class="intro">
        <h1>Introductions</h1>
        <p>
          Hey! My name is <strong>Morningdew</strong>, and I'm a <strong>pixie</strong>!
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
          added depending on what is chosen.
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
          {{ archetype.range.name }} / {{ archetype.role.name }}!
          What a smart combination! I bet you will see a lot of success with that!
        </p>
        <p>
          Do you think you could show me some of your <strong>abilities</strong>? I would love to be able to
          tell the story of the newest adventurer to visit our forest to the rest of my village!
        </p>
      </div>
      <div v-if="state === states.ability_building" class="ability-building">
        <h1>Ability Building</h1>
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

      <div class="control">
        <aui-button
            v-if="state === states.race_response"
            :disabled="!race"
            class="back btn-secondary"
            @click="state = states.race"
        >
          Back to Race
        </aui-button>
        <aui-button
            v-if="state === states.archetype"
            :disabled="!race"
            class="back btn-secondary"
            @click="state = states.race"
        >
          Back to Race
        </aui-button>
        <aui-button
            v-if="state === states.archetype_response"
            :disabled="!race"
            class="back btn-secondary"
            @click="state = states.archetype"
        >
          Back to Archetype
        </aui-button>
        <aui-button
            v-if="state === states.ability_building"
            :disabled="!race"
            class="back btn-secondary"
            @click="state = states.archetype"
        >
          Back to Archetype
        </aui-button>
        <aui-button
            v-if="state === states.ability_building_response"
            :disabled="!race"
            class="back btn-secondary"
            @click="state = states.ability_building"
        >
          Back to Abilities
        </aui-button>
        <aui-button
            v-if="state === states.divinity"
            :disabled="!race"
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
            v-if="state === states.intro"
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
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      state: null,
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
      divinity: null,
      divinities: null,
      states: {
        intro: 'intro',
        race: 'race',
        race_response: 'race-response',
        archetype: 'archetype',
        archetype_response: 'archetype-response',
        ability_building: 'ability-building',
        ability_building_response: 'ability-building-response',
        divinity: 'divinity',
        divinity_response: 'divinity-response',
        finish: 'finish'
      }
    }
  },
  methods: {

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
    }
  },
  mounted() {
    this.state = this.states.ability_building;
    this.getRaces();
    this.getArchRange();
    this.getArchRole();
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

  .card
    display: flex
    flex-direction: column
    position: relative

    & > *:not(.control)
      flex: 1

  & > *
    max-width: 900px
    width: 100%

    h1
      grid-row: 1
      grid-column: 1/3

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

    .control
      display: flex
      margin-top: 1rem

      .continue
        margin-left: auto


</style>