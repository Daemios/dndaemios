let instance = new Vue({
    el: '#welcome',
    data: {
        state: {
            config: {

            },
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
    },
    methods: {
        // ---- Intro ----
        beginIntro() {
            this.state.intro_state = this.states.intro_state.crawl
            document.getElementById("music").play();
            this.startScroll();
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
        startScroll() {

        },
        scrollCustom(time_last_scrolled, old_y) {

            if (true) {

                // continue scrolling
                requestAnimationFrame(() => {

                    // Get current position
                    let new_y = null; // TODO replace

                    // Determine how many pixels we need to scroll from last time


                    // Do new scroll
                    document.getElementById("card-crawl").scrollBy(0, to_scroll)

                    // Recurse
                    this.scrollCustom();

                })
            } else {
                // page has been scrolled up, cancel the scroll for slower readers
            }


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
        this.state.intro_state = this.states.intro_state.builder
        this.getRaces();
        this.getArchRange();
        this.getArchRole();
    }
});