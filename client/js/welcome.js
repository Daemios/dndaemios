let instance = new Vue({
    el: '#welcome',
    data: {
        state: {
            config: {
                into_scroll_speed: 1000
            },
            intro_state: null,
            builder: null,
            race: null,
            races: {
                elf_wood: {
                    meta: 'Elf',
                    name: 'Wood Elf',
                    bonuses: {
                        nature: 4,
                        animal_handling: 2,
                        athletics: 2
                    },
                    description: 'Wood Elves, also known as the Ithilrendi, are commonly ' +
                        'described as having olive skin and hair matching the various ' +
                        'autumnal colors of the leaves. They exceed at working with ' +
                        'nature and animals, and their natural and effortless grace ' +
                        'is quite useful during feats of great athleticism.'
                },
                elf_moon:{
                    meta: 'Elf',
                    name: 'Moon Elf',
                    bonuses: {
                        arcana: 4,
                        history: 2,
                        athletics: 2
                    },
                    description: 'The most elusive of the elves, Ulurendi are the fairest-skinned ' +
                        'of their brothers and sisters, featuring near pure-white skin and hair. Their ' +
                        'long-standing bond with the power of the moon has steered their culture towards ' +
                        'the arcane, and as a result Moon Elves almost always have a level of arcane knowledge ' +
                        'in addition to the typical elven strengths.'
                },
                elf_sea:{
                    meta: 'Elf',
                    name: 'Sea Elf',
                    bonuses: {
                        nature: 4,
                        survival: 2,
                        perception: -2
                    },
                    description: 'Sea elves, or Naurendi, lack the tails of Merfolk (which they are often confused with), ' +
                        'but share much of their other features, such as scaly green or blue skin, small vestigal fins along ' +
                        'their arms and legs, and functional gills. They share a deep tie to nature like their Wood Elf ' +
                        'brethren, but due to their weakness out of water, most of the natural aestheticism of other ' +
                        'Elves is lost on them and the toll of the air on their naked skin causes light distraction.'
                },
            },
            archetype: {
                type: null,
                range: null
            },
            archetypes: {
                type: {
                    melee: 'Melee'
                },
                range: {
                    melee: {
                        name: 'Melee',
                        description: 'Fight up close and in the opponent\'s face.',
                        bonuses: {
                            damage: {
                                value: 1.1,
                                pretty: 'Damage +10%'
                            },
                            healing: {
                                value: 1.1,
                                pretty: 'Healing +10%'
                            }
                        },
                        locked: {

                        }
                    },
                    mix: {
                        name: 'Mix',
                        description: 'Sling abilities from afar and have the staying power for melee combat.',
                        bonuses: {

                        },
                        locked: {

                        }
                    },
                    ranged: {
                        name: 'Ranged',
                        description: 'Fight from afar, so that they never reach you.',
                        bonuses: {
                            mp: {
                                value: 1,
                                pretty: 'MP +1'
                            }
                        },
                        locked: {

                        }
                    }
                }
            },
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
                divinity: 'divinity',
                divinity_response: 'divinity-response',
                finish: 'finish'
            }
        }
    },
    methods: {
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


        }
    },
    computed: {},
    watch: {

    },
    created() {

    },
    mounted() {
        this.state.builder = this.states.builder.intro;
        this.state.intro_state = this.states.intro_state.waiting;


    }
});