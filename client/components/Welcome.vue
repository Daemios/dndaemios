<template>
    <div id="welcome">
        <div id="waiting" @click="beginIntro()" v-if="state.intro_state === states.intro_state.waiting">
            <div class="">Click Anywhere To Begin</div>
        </div>
        <div id="crawl" v-if="state.intro_state === states.intro_state.crawl">
            <h3>War</h3>
            <p>
                The Dwarven kingdoms in the North have fallen to the forces of darkness. Many
                old alliances have been broken, and as long as
                <strong>the threat</strong> in the mountains remains, it grows
                ever more powerful.
            </p>
            <p>
                Recent defeats have left the kingdoms that still stand in the South shadows of
                their former glory. The southerners <strong>fear of what is to come</strong> has
                caused strife between the remaining nations. The warlord-king <strong>Markus Kroll</strong>
                has taken advantage of the chaos to expand his empire of barbarians,
                <strong>the Brotherhood</strong>.
            </p>
            <p>
                You are travelling along the king's road to the town of <strong>Elmswood</strong>
                in the kingdom of <strong>Braxton</strong>. You feel the cool dusk breeze blowing over
                the well-travelled road as if to urge you on to the town before nightfall.
                Divines willing, you will make it. You are about to push on when something, or someone,
                catches your eye...
            </p>
        </div>
        <div id="title" v-if="state.intro_state === states.intro_state.title">
            <div>Introducing</div>
            <div>Dungeons</div>
            <div>and</div>
            <div>Daemios</div>
            <aui-button @click="state.intro_state = states.intro_state.builder">Create Your Character</aui-button>
        </div>
        <div id="builder" v-if="state.intro_state === states.intro_state.builder">
            <div class="card">
                <div id="pixie">
                    <div class="wings">
                        <div class="wing up right"></div>
                        <div class="wing up left"></div>
                        <div class="wing down right"></div>
                        <div class="wing down left"></div>
                    </div>
                    <div class="body">
                        <div class="outer-circle"></div>
                        <div class="inner-circle"></div>
                    </div>
                </div>
                <div class="intro" v-if="state.builder === states.builder.intro">
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
                <div class="race" v-if="state.builder === states.builder.race">
                    <h1>Race</h1>
                    <div class="choices">
                        <div
                                class="choice"
                                :class="state.race === race ? 'active' : ''"
                                v-for="race in state.races"
                                @click="state.race = race"
                        >
                            {{race.name}}
                        </div>
                    </div>
                    <div class="breakdown" v-if="state.race">
                        <h2>{{state.race.name}}</h2>
                        <p>{{state.race.description}}</p>
                        <div class="bonuses" v-if="state.race">
                        <span v-for="(effect, key) in state.race.effects">
                            {{effect.pretty}}: {{effect.value >= 0 ? '+' + effect.value : effect.value}}
                        </span>
                        </div>
                    </div>
                    <div class="breakdown" v-else>
                        Please select a race from the list.
                    </div>
                </div>
                <div class="race-response" v-if="state.builder === states.builder.race_response">
                    <h1>Race</h1>

                    <p>Wow! A <strong>{{state.race.name}}</strong> in my forest!</p>

                    <p>
                        I've heard a lot about your people! My father once told me about a <strong>mighty warrior</strong>
                        who visited our village in the past. They were a <strong>{{state.race.name}}</strong> too! They fought up close,
                        protecting their team members from harm.
                    </p>
                    <p>
                        Do you fight up close like the warrior, or do you keep your distance?
                        I've heard that adventurers <strong>focus on an archetype</strong>! Is that true?
                    </p>
                </div>
                <div class="archetype" v-if="state.builder === states.builder.archetype">
                    <h1>Archetype</h1>
                    <div class="archetype-info">
                        All options start with at least one damaging ability and have additional abilities
                        added depending on what is chosen.
                    </div>
                    <div class="range-choice">
                        <h2>Range</h2>
                        <div
                                class="range-option"
                                :class="state.archetype.range === range ? 'active' : ''"
                                v-for="range in state.archetypes.range"
                                @click="state.archetype.range = range"
                        >
                            <h3>{{range.name}}</h3>
                            <div class="description">
                                {{range.description}}
                            </div>
                        </div>
                    </div>
                    <div class="role-choice">
                        <h2>Role</h2>
                        <div class="choices">
                            <div
                                    class="choice"
                                    :class="state.archetype.role === role ? 'active' : ''"
                                    v-for="role in state.archetypes.role"
                                    @click="state.archetype.role = role"
                            >
                                {{role.name}}
                            </div>
                        </div>
                        <div class="role-description" v-if="state.archetype.role">
                            {{state.archetype.role.description}}
                        </div>
                        <div class="role-description" v-else>
                            Choose a role
                        </div>
                    </div>
                </div>
                <div class="archetype-response" v-if="state.builder === states.builder.archetype_response">
                    <h1>Archetype</h1>
                    <p>
                        {{state.archetype.range.name}} / {{state.archetype.role.name}}!
                        What a smart combination! I bet you will see a lot of success with that!
                    </p>
                    <p>
                        Do you think you could show me some of your <strong>abilities</strong>? I would love to be able to
                        tell the story of the newest adventurer to visit our forest to the rest of my village!
                    </p>
                </div>
                <div class="ability-builder" v-if="state.builder === states.builder.ability_builder">
                    <h1>Ability Building</h1>
                    <ability-builder></ability-builder>
                </div>
                <div class="ability-builder-response" v-if="state.builder === states.builder.ability_builder_response">
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
                <div class="divinity" v-if="state.builder === states.builder.divinity">
                    <h1>A Divine Choice</h1>
                </div>
                <div class="divinity-response" v-if="state.builder === states.builder.divinity_response">
                    <h1>A Divine Choice</h1>
                    <p v-if=""></p>
                </div>
                <div class="finish" v-if="state.builder === states.builder.finish"></div>

                <div class="control">
                    <aui-button
                            class="back btn-secondary"
                            @click="state.builder = states.builder.race"
                            :disabled="!state.race"
                            v-if="state.builder === states.builder.race_response"
                    >
                        Back to Race
                    </aui-button>
                    <aui-button
                            class="back btn-secondary"
                            @click="state.builder = states.builder.race"
                            :disabled="!state.race"
                            v-if="state.builder === states.builder.archetype"
                    >
                        Back to Race
                    </aui-button>
                    <aui-button
                            class="back btn-secondary"
                            @click="state.builder = states.builder.archetype"
                            :disabled="!state.race"
                            v-if="state.builder === states.builder.archetype_response"
                    >
                        Back to Archetype
                    </aui-button>
                    <aui-button
                            class="back btn-secondary"
                            @click="state.builder = states.builder.archetype"
                            :disabled="!state.race"
                            v-if="state.builder === states.builder.divinity"
                    >
                        Back to Archetype
                    </aui-button>

                    <aui-button
                            class="continue btn-primary"
                            @click="state.builder = states.builder.race"
                            v-if="state.builder === states.builder.intro"
                    >
                        Select Race
                    </aui-button>
                    <aui-button
                            class="continue btn-primary"
                            @click="state.builder = states.builder.race_response"
                            :disabled="!state.race"
                            v-if="state.builder === states.builder.race"
                    >
                        Confirm Race
                    </aui-button>
                    <aui-button
                            class="continue btn-primary"
                            @click="state.builder = states.builder.archetype"
                            :disabled="!state.race"
                            v-if="state.builder === states.builder.race_response"
                    >
                        Select Archetype
                    </aui-button>
                    <aui-button
                            class="continue btn-primary"
                            @click="state.builder = states.builder.archetype_response"
                            :disabled="!state.archetype.role || !state.archetype.range"
                            v-if="state.builder === states.builder.archetype"
                    >
                        Confirm Archetype
                    </aui-button>
                    <aui-button
                            class="continue btn-primary"
                            @click="state.builder = states.builder.ability_builder"
                            :disabled="false"
                            v-if="state.builder === states.builder.archetype_response"
                    >
                        Build Abilities
                    </aui-button>
                    <aui-button
                            class="continue btn-primary"
                            @click="state.builder = states.builder.ability_builder"
                            :disabled="false"
                            v-if="state.builder === states.builder.archetype_response"
                    >
                        Confirm Abilities
                    </aui-button>
                    <aui-button
                            class="continue btn-primary"
                            @click="state.builder = states.builder.divinity"
                            :disabled="!state.race"
                            v-if="state.builder === states.builder.ability_builder_response"
                    >
                        Select Divinity
                    </aui-button>
                    <aui-button
                            class="continue btn-primary"
                            @click=""
                            :disabled="!state.race"
                            v-if="state.builder === states.builder.finish"
                    >
                        Finish Character Build
                    </aui-button>
                </div>
            </div>
        </div>
        <div id="soundtrack" v-if="true">

            <iframe src="dynamicsuite/packages/dndaemios/audio/silence.mp3"
                    allow="autoplay" id="audio" style="display: none"
            ></iframe>
            <audio controls id="music">
                <source
                        src="dynamicsuite/packages/dndaemios/audio/intro_music.mp3"
                        type="audio/mpeg"
                >
                Your browser does not support the audio element.
            </audio>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                state: {
                    config: {},
                    intro_state: null,
                    builder: null,
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
                },
                states: {
                    intro_state: {
                        waiting: 'waiting',
                        opening: 'opening',
                        title: 'title',
                        crawl: 'crawl',
                        builder: 'builder'
                    },
                    builder: {
                        intro: 'intro',
                        race: 'race',
                        race_response: 'race-response',
                        archetype: 'archetype',
                        archetype_response: 'archetype-response',
                        ability_builder: 'ability-builder',
                        ability_builder_response: 'ability-builder-response',
                        divinity: 'divinity',
                        divinity_response: 'divinity-response',
                        finish: 'finish'
                    }
                }
            }
        },
        methods: {
            // ---- Intro ----
            beginIntro() {
                this.state.intro_state = this.states.intro_state.crawl
                document.getElementById("music").play();
                setTimeout(e => {
                    this.showTitle();
                }, 85500) // this must be the same as the animation speed in the css
            },
            showTitle() {
                this.state.intro_state = this.states.intro_state.title;

                /*setTimeout(e => {
                    this.state.intro_state = this.states.intro_state.builder;
                    //document.getElementById("music").pause();
                }, 8000)*/
            },
            endIntro() {


            },

            // ---- Builder ----

            // ---- Database ----
            getRaces() {
                DynamicSuite.call('dndaemios', 'races.get', null, (response) => {
                    this.state.races = response.data;
                })
            },
            getArchRange() {
                DynamicSuite.call('dndaemios', 'archetypes.range.get', null, (response) => {
                    this.state.archetypes.range = response.data;
                    console.log(response)
                })
            },
            getArchRole() {
                DynamicSuite.call('dndaemios', 'archetypes.role.get', null, (response) => {
                    this.state.archetypes.role = response.data;
                    console.log(response)
                })
            }
        },
        mounted() {
            this.state.builder = this.states.builder.intro;
            this.state.intro_state = this.states.intro_state.waiting
            this.getRaces();
            this.getArchRange();
            this.getArchRole();
        }
    }
</script>
<style lang="sass">
    @import ../sass/colors

    @font-face
        font-family: 'Requiem'
        src: url("../fonts/Requiem.ttf") format('truetype')

    @font-face
        font-family: 'aniron'
        src: url("../fonts/aniron.ttf") format('truetype')


    @keyframes toggleOpacity
        0%
            opacity: 0
        99%
            opacity: 0
        100%
            opacity: 1

    @keyframes opacity
        0%
            opacity: 0

        100%
            opacity: 1

    @keyframes glowCycle
        0%
            width: 90%
            height: 90%
            top: -45%
            left: -45%

        50%
            width: 110%
            height: 110%
            top: -55%
            left: -55%

        100%
            width: 90%
            height: 90%
            top: -45%
            left: -45%


    @keyframes wingFlapTopLeft
        0%
            transform: rotate(-40deg)

        50%
            transform: rotate(-110deg)

        100%
            transform: rotate(-40deg)


    @keyframes wingFlapTopRight
        0%
            transform: rotate(0deg)
        50%
            transform: rotate(40deg)
        100%
            transform: rotate(0deg)

    @keyframes wingFlapBottomLeft
        0%
            transform: rotate(150deg)
        50%
            transform: rotate(110deg)
        100%
            transform: rotate(150deg)

    @keyframes wingFlapBottomRight
        0%
            transform: rotate(-40deg)
        50%
            transform: rotate(0deg)
        100%
            transform: rotate(-40deg)

    @keyframes titleText
        0%
            opacity: 0
            font-size: 9vw

        100%
            opacity: 1
            font-size: 10vw


    @keyframes crawl
        0%
            transform: perspective(300px) rotateX(20deg) translateY(80rem)
            opacity: 1

        90%
            opacity: 1

        100%
            transform: perspective(300px) rotateX(20deg) translateY(-1000px)
            opacity: 0


    @mixin wingCycle
        animation-duration: .5s
        animation-iteration-count: infinite


    strong
        color: $text-highlight

    body
        overflow: hidden

    #ds-body
        #ds-nav-container
            display: none
        #ds-view-container
            width: 100%

            #ds-view
                padding: 0
                height: calc(100% - 3rem)


    #welcome
        height: 100%
        display: flex
        justify-content: center
        overflow: hidden

        #waiting
            flex: 1
            display: flex
            justify-content: center
            align-items: center
            color: white
            font-size: 3vw
            font-family: 'Requiem', sans-serif
            -webkit-text-stroke: 1px black


        #crawl
            width: 800px
            display: flex
            flex-direction: column
            justify-content: center
            align-items: center
            animation: crawl 82s linear forwards
            transform: perspective(300px) rotateX(20deg) translateZ(0)
            backface-visibility: hidden
            -webkit-font-smoothing: subpixel-antialiased

            h3
                text-align: center
                color: firebrick
                font-size: 14rem
                line-height: normal
                font-family: 'Requiem', sans-serif
                margin: 0


            p
                //-webkit-text-stroke: 1px black
                font-weight: bold
                color: white
                font-size: 3rem
                text-align: justify
                text-justify: inter-word


        #title
            font-family: 'Requiem', sans-serif
            display: flex
            justify-content: center
            align-items: center
            flex-direction: column
            color: white
            font-size: 10vw

            &>div
                opacity: 0
                animation-name: opacity

            &>div:nth-of-type(1)
                animation-duration: .01s
                animation-fill-mode: forwards
                font-size: 5vw

            &>div:nth-of-type(2)
                animation-duration: .01s
                animation-delay: 1.25s
                animation-fill-mode: forwards

            &>div:nth-of-type(3)
                animation-duration: .01s
                animation-delay: 2.25s
                animation-fill-mode: forwards

            &>div:nth-of-type(4)
                animation-duration: .01s
                animation-delay: 2.75s
                animation-fill-mode: forwards


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

                &>*:not(.control)
                    flex: 1


            &>*
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

                    &>h2
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


                #pixie
                    position: absolute
                    right: 100px
                    top: -50px

                    .wings
                        position: absolute
                        top: 0
                        left: 0
                        width: 200px
                        height: 200px

                        .wing
                            position: absolute
                            background: #21A0DE

                            &.up
                                border-radius: 100% 0
                                width: 200px
                                height: 200px
                                margin-top: -200px


                                &.left
                                    margin-left: -20px
                                    background: linear-gradient(45deg, rgba(33,160,222,1) 0%, rgba(22,178,233,1) 27%, rgba(0,212,255,0.4150035014005602) 44%)
                                    transform-origin: bottom left
                                    transform: rotate(-40deg)
                                    animation: wingFlapTopLeft
                                    @include wingCycle

                                &.right
                                    margin-left: 20px
                                    background: linear-gradient(15deg, rgba(33,160,222,1) 0%, rgba(22,178,233,1) 27%, rgba(0,212,255,0.4150035014005602) 44%)
                                    transform-origin: bottom left
                                    animation: wingFlapTopRight
                                    @include wingCycle

                            &.down
                                border-radius: 0 100%
                                width: 100px
                                height: 100px
                                transform-origin: top left

                                &.left
                                    margin-top: 30px
                                    margin-left: -20px
                                    background: linear-gradient(150deg, rgba(33,160,222,1) 0%, rgba(22,178,233,1) 27%, rgba(0,212,255,0.4150035014005602) 44%)
                                    transform: rotate(110deg)
                                    animation: wingFlapBottomLeft
                                    @include wingCycle

                                &.right
                                    margin-left: 20px
                                    margin-top: 40px
                                    background: linear-gradient(120deg, rgba(33,160,222,1) 0%, rgba(22,178,233,1) 27%, rgba(0,212,255,0.4150035014005602) 44%)
                                    animation: wingFlapBottomRight
                                    @include wingCycle

                    .body
                        position: absolute
                        width: 200px
                        height: 200px
                        top: 0
                        left: 0

                        *
                            border-radius: 50%

                        .outer-circle
                            background: radial-gradient(circle, rgba(33,160,222,1) 0%, rgba(11,195,244,1) 40%, rgba(0,212,255,0) 100%)
                            width: 100%
                            height: 100%
                            position: absolute
                            top: -50%
                            left: -50%
                            animation: glowCycle 1.5s infinite

                        .inner-circle
                            background: #21A0DE //darken(#21A0DE, 20%)
                            background: radial-gradient(at 48% 55%,lighten(#21A0DE, 40%),lighten(#21A0DE, 15%),#21A0DE,#21A0DE)
                            width: 80%
                            height: 80%
                            position: absolute
                            top: -40%
                            left: -40%


        #soundtrack
            position: absolute
            top: 4rem

</style>