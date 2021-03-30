Vue.component('attributes', {
    template: `
        <div id="attributes" class="card">
            <h2>Attributes</h2>
            <div class="attribute">
                <span class="attribute-name" v-for="attribute in character.attributes">{{attribute.long}}:</span>
                <span class="attribute-value" v-for="attribute in character.attributes">{{attribute.value}}</span>
                <span class="attribute-bonus" v-for="attribute in character.attributes">({{attributeBonus(attribute.value)}})</span>
            </div>
        </div>`,
    props: {
        character: {
            type: Object
        }
    },
    methods: {
        attributeBonus(value) {
            return Math.floor((value - 10) / 2)
        }
    }
});

Vue.component('combat-stats', {
    template: `
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
        </div>`,
    data() {
        return {}
    },
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
});

Vue.component('experience-details', {
    template: `
        <div id="experience-details" class="card">
            <h2>Experience & Details</h2>
            <div class="bar-standin">
                <span><strong>Level:</strong> {{character.level}}</span>
                <span><strong>Experience:</strong> {{character.experience}}</span>
                <span><strong>To Next Level:</strong> 0</span>
            </div>
            <div class="details">
                <span><strong>Race:</strong> {{character.race}}</span>
                <span><strong>Size:</strong> {{character.size}}</span>
                <span><strong>Height:</strong> {{character.height}}</span>
                <span><strong>Archetype:</strong> {{character.archetype.type}} / {{character.archetype.range}}</span>
                <span><strong>Divinity:</strong> {{character.divinity.name}}</span>
            </div>
        </div>`,
    props: {
        character: {
            type: Object
        }
    },
    methods: {}
});

Vue.component('skills', {
    template: `
        <div id="skills" class="card">
            <h2>Skills</h2>
            <div class="skill header">Skill</div>
            <div class="value header">Value</div>
            <div class="bonus header">Bonus</div>
            <div v-for="skill in character.skills" class="skill"><strong>{{skill.pretty}}</strong></div>
            <div v-for="skill in character.skills" class="value">{{skill.value}}</div>
            <div v-for="skill in character.skills" class="bonus" v-if="character.attributes[skill.attribute]">
                {{skillBonus(skill.value, skill.attribute)}}
            </div>
        </div>`,
    props: {
        character: {
            type: Object
        }
    },
    methods: {
        skillBonus(value, attribute) {

            let base = Math.floor(this.character.attributes[attribute].value / 2) - 5;

            let combined = base + value;

            let string;

            if (combined >= 0) string = '+' + combined;
            else string = combined;

            return string;

        }
    }
});

Vue.component('abilities', {
    template: `<div id="abilities" class="card">
        <h2>Abilities</h2>
        <div class="selectors">
            <div 
                class="selector" 
                :class="isActive(key)" 
                @click="setActive(key)"
                v-for="ability, key, index in character.abilities"
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
    </div>`,
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
});

Vue.component('item', {
    template: `
    <div class="item card">
        <span class="icon">
            <i class="fas" :class="item.type.class"></i>
        </span>
        <span class="name">{{item.name}}</span>
        <span class="quantity">{{item.quantity}}</span>
        <span class="edit">
            <i class="fas fa-edit" @click="$emit('edit')"></i>
        </span>
    </div>`,
    props: {
        item: {
            type: Object,
            required: true
        }
    },
    methods: {

    }
});

Vue.component('entity', {
    template: `<div 
            class="entity" 
            :class="classes" 
            @mouseover="$emit('entity-mouseover')"
            @mouseout="$emit('entity-mouseout')"
        >
        <div class="nameplate">
            {{entity.name}}
        </div>
        <div class="stats">
            <div class="ap">{{entity.ap.current}}</div>
            <div class="mp">{{entity.mp.current}}</div>
        </div>
        <div class="hp">{{entity.life.current}}|{{entity.life.max}}</div>
    </div>`,
    props: {
        entity: {
            type: Object,
            required: true
        },
        active: {
            Boolean,
            required: true
        }
    },
    computed: {
        classes() {
            let string = this.entity.faction;
            if (this.active) {
                string = string + ' active'
            }
            return string;
        }
    }
});

Vue.component('arena-cell', {
    template:
    `<div 
        class="cell" 
        :class="cell.terrain" 
        oncontextmenu="return false"
        @click="$emit('click')"
        @mouseover="$emit('cell-mouseover')"
    >
        <div class="overlay destination-overlay" v-if="cell.valid_destination && cell.valid_destination !== null && cell.passable"></div>
        <div class="overlay impassable-overlay" v-if="cell.valid_destination && cell.valid_destination !== null && !cell.passable"></div>
        <div class="entities" v-if="entities.length">
            <entity 
                v-for="entity in entities[y][x]" 
                :entity="entity" 
                :active="isActive"
                @entity-mouseover="$emit('entity-mouseover', entity)"
                @entity-mouseout="$emit('entity-mouseout')"
            ></entity>
        </div>
    </div>`,
    props: {
        cell: {
            type: Object,
            required: true
        },
        entities: {
            type: Array,
            required: true
        },
        active: {
            Object,
            required: true
        },
        x: {
            type: Number | String,
            required: true
        },
        y: {
            type: Number | String,
            required: true
        }
    },
    computed: {
        isActive() {
            return ((this.x.toString() === this.active.x.toString()) && (this.y.toString() === this.active.y.toString()))
        }
    },
    mounted() {}
});

Vue.component('arena', {
    template: `<div id="arena" v-if="map !== null">
        <div class="row" v-for="row, y in map">
            <arena-cell 
                v-for="cell, x in row"
                @click="$emit('click', x, y)"
                @cell-mouseover="$emit('cell-mouseover', x, y)"
                @entity-mouseover="$emit('entity-mouseover', x, y, $event)"
                @entity-mouseout="$emit('entity-mouseout')"
                :cell="cell"
                :entities="entities"
                :active="active"
                :x="x"
                :y="y"
            ></arena-cell>
        </div>
    </div>`,
    props: {
        map: {
            type: Array,
            required: true
        },
        entities: {
            type: Array,
            required: true
        },
        active: {
            Object,
            required: true
        }
    },
    mounted() {

    }
});