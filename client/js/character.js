let instance = new Vue({
    el: '#sheet',
    data: {
        ability_data: {
            theme: {
                fire: {
                    damage: 1.2,
                    healing: .8,
                    debuff: 1,
                    buff: 1,
                    effect: 'Effect repeats at 10% strength for the next three turns.'
                },
                ice: {
                    damage: 1,
                    healing: 2,
                    debuff: 1,
                    buff: 2,
                    effect: '-1 MP to enemy targets. -4 MP to allied targets.'
                },
                water: {
                    damage: 1,
                    healing: 1.5,
                    debuff: 1,
                    buff: 1,
                    effect: 'Targeted cells repeat the effect on any character or enemy inside at 30% strength at the start of their next turn.'
                },
                light: {
                    damage: 1,
                    healing: 1.7,
                    debuff: 1,
                    buff: 1.5,
                    effect: 'Remove a debuff from targets affected.'
                },
                dark: {
                    damage: 1.5,
                    healing: 1,
                    debuff: 1.5,
                    buff: 1,
                    effect: 'Debuffs gain an extra turn.'
                },
                nature: {
                    damage: 1.2,
                    healing: 1.2,
                    debuff: 1.2,
                    buff: 1.2,
                    effect: 'Any instant effect is converted to a buff or debuff lasting three turns at 25/50/75% of the value. Limit one per ability per person. Any buffs or debuffs get an +1 turn.'
                },
                explosive: {
                    damage: 1.3,
                    healing: 1,
                    debuff: 1,
                    buff: 1,
                    effect: 'Area increased by +2.'
                },
                poison: {
                    damage: 1.4,
                    healing: 0,
                    debuff: 1.1,
                    buff: 1,
                    effect: 'Damaging attacks prevent 50% of the first heal on the target for 1 turn.'
                },
                earth: {
                    damage: 1.1,
                    healing: .5,
                    debuff: 1,
                    buff: 1,
                    effect: 'Reduce targets ap by (AP_COST / 4) when damaging.'
                },
                energy: {
                    damage: .8,
                    healing: .8,
                    debuff: 0,
                    buff: 0,
                    effect: 'Apply a HP shield based on 30% of the healing done to the target. Only one instance of an energy shield can be applied, whatever the highest value is, even between multiple players.'
                },

            }
        },
        character: {
            id: 1,
            experience: 0,
            level: 1,
            first_name: 'Test',
            last_name: 'Character',
            titles: {
                leading: 'Dangerous',
                trailing: 'the Wise'
            },
            race: 'Moon Elf',
            size: 'Medium',
            height: '6\' 0"',
            archetype: {
                life: 8,
                type: 'Defense',
                range: 'Melee'
            },
            divinity: {
                id: '0',
                name: 'None'
            },
            attributes: {
                strength: {
                    long: 'Strength',
                    short: 'STR',
                    value: Math.floor(Math.random()*10 + 8)
                },
                dexterity: {
                    long: 'Dexterity',
                    short: 'DEX',
                    value: Math.floor(Math.random()*10 + 8)
                },
                intelligence: {
                    long: 'Intelligence',
                    short: 'INT',
                    value: Math.floor(Math.random()*10 + 8)
                },
                constitution: {
                    long: 'Constitution',
                    short: 'CON',
                    value: Math.floor(Math.random()*10 + 8)
                },
                charisma: {
                    long: 'Charisma',
                    short: 'CHA',
                    value: Math.floor(Math.random()*10 + 8)
                },
            },
            stats: {
                life: 10
            },
            skills: {
                acrobatics: {
                    pretty: 'Acrobatics',
                    value: 0,
                    attribute: 'dexterity'
                },
                animal_handling: {
                    pretty: 'Animal Handling',
                    value: 0,
                    attribute: 'charisma'
                },
                arcana: {
                    pretty: 'Arcana',
                    value: 0,
                    attribute: 'intelligence'
                },
                athletics: {
                    pretty: 'Athletics',
                    value: 0,
                    attribute: 'strength'
                },
                deception: {
                    pretty: 'Deception',
                    value: 0,
                    attribute: 'charisma'
                },
                history: {
                    pretty: 'History',
                    value: 0,
                    attribute: 'intelligence'
                },
                insight: {
                    pretty: 'Insight',
                    value: 0,
                    attribute: 'charisma'
                },
                intimidation: {
                    pretty: 'Intimidation',
                    value: 0,
                    attribute: 'charisma'
                },
                investigation: {
                    pretty: 'Investigation',
                    value: 0,
                    attribute: 'intelligence'
                },
                medicine: {
                    pretty: 'Medicine',
                    value: 0,
                    attribute: 'intelligence'
                },
                nature: {
                    pretty: 'Nature',
                    value: 0,
                    attribute: 'intelligence'
                },
                perception: {
                    pretty: 'Perception',
                    value: 0,
                    attribute: 'charisma'
                },
                performance: {
                    pretty: 'Performance',
                    value: 0,
                    attribute: 'charisma'
                },
                persuasion: {
                    pretty: 'Persuasion',
                    value: 0,
                    attribute: 'charisma'
                },
                religion: {
                    pretty: 'Religion',
                    value: 0,
                    attribute: 'intelligence'
                },
                sleight_of_hand: {
                    pretty: 'Sleight of Hand',
                    value: 0,
                    attribute: 'dexterity'
                },
                stealth: {
                    pretty: 'Stealth',
                    value: 0,
                    attribute: 'dexterity'
                },
                survival: {
                    pretty: 'Survival',
                    value: 0,
                    attribute: 'dexterity'
                }

            },
            abilities: {
                1: {
                    name: 'Test Ability 1',
                    elements: ['Water', 'Light'],
                    targeting: {
                        type: 'square',
                        radius: 1
                    },
                },
                2: {
                    name: 'Test Ability 2',
                    elements: ['Water'],
                    targeting: {
                        type: 'cross',
                        radius: 1
                    }
                },
                3: {
                    name: 'Test Ability 3',
                    elements: ['Water'],
                    targeting: {
                        type: 'circle',
                        radius: 1
                    }
                },
                4: {
                    name: 'Test Ability 4',
                    elements: ['Water'],
                    targeting: {
                        type: 'circle',
                        radius: 3
                    }
                },
                5: {
                    name: 'Test Ability 5'
                },
                6: {
                    name: 'Test Ability 6'
                },
                7: {
                    name: 'Test Ability 7'
                },
                8: {
                    name: 'Test Ability 8'
                },
                9: {
                    name: 'Test Ability 9'
                }
            }
        },
        state: {
            view: 'general'
        },
        states: {
            view: {
                general: 'general'
            }
        }
    },
    methods: {
        attributeBonus(value) {
            return Math.floor((value - 10) / 2)
        }
    },
    computed: {
        fullName() {
            return this.character.titles.leading +
                ' ' +
                this.character.first_name +
                ' ' +
                this.character.last_name +
                ' ' +
                this.character.titles.trailing;
        }
    },
    watch: {

    },
    created() {

    },
    mounted() {

    }
});
