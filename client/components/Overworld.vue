<template>
    <div id="overworld">
        <arena
                v-if="arena.map"
                :map="arena.map"
                :entities="arena.entities"
                :active="arena.turn_active"
                @click="teleportTestingWrapper"
                @entity-mouseover="rangeDiamond"
                @entity-mouseout="clearRangeHighlights"
                @cell-mouseover="pathToCell"
        ></arena>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                arena: {
                    map: null,
                    entities: null,
                    turn_active: {x: 7, y: 7},
                    planned_movement: []
                },
                local: {
                    map: null
                },
                overworld: {
                    map: null
                },
                generation: {
                    cell_count: 16,
                    terrain: [
                        'grass',
                        'water',
                        'stone'
                    ]
                }
            }
        },
        methods: {
            // --------- Generation Helpers ---------
            randomTerrain() {
                const index = Math.floor(Math.random() * this.generation.terrain.length);
                return this.generation.terrain[index];
            },
            randomEntity() {
                let actual = [{
                    owned: false,
                    faction: Math.random() > .2 ? 'enemy' : 'ally',
                    name: 'Random',
                    life: {
                        current: Math.floor(Math.random() * 10),
                        max: 10
                    },
                    mp: {
                        current: Math.floor(Math.random() * 4) + 1,
                        max: 4
                    },
                    ap: {
                        current: Math.floor(Math.random() * 4) + 1,
                        max: 4
                    }
                }];
                return Math.random() > .9 ? actual : [];
            },
            generateTerrain() {
                let generate = [];

                // Row
                for (let y = 0; y < this.generation.cell_count; y++) {
                    generate[y] = {};
                    // Cells
                    for (let x = 0; x < this.generation.cell_count; x++) {
                        // Assign the cell data
                        generate[y][x] = {
                            terrain: this.randomTerrain(),
                            effects: [],
                            valid_destination: false,
                            passable: Math.random() > .1
                        }
                    }
                }

                this.arena.map = generate;
            },
            generateEntities() {

                const player_entity = [{
                    owned: true,
                    faction: 'player',
                    name: 'Test',
                    life: {
                        current: 2,
                        max: 10
                    },
                    mp: {
                        current: 2,
                        max: 4
                    },
                    ap: {
                        current: 2,
                        max: 4
                    }
                }];
                let entities = [];

                // Row
                for (let y = 0; y < this.generation.cell_count; y++) {
                    entities[y] = {};
                    // Cells
                    for (let x = 0; x < this.generation.cell_count; x++) {
                        // Assign the cell data
                        entities[y][x] = this.randomEntity();
                    }
                }

                entities[7][7] = player_entity;

                this.arena.entities = entities;
            },

            // --------- Controls ---------
            click(event) {
                return false;
            },

            // --------- Cartesian Helpers ---------
            checkDistance(fromX, fromY, toX, toY) {
                let dist_x = Math.abs(Number(fromX) - Number(toX));
                let dist_y = Math.abs(Number(fromY) - Number(toY));
                return dist_x + dist_y;
            },

            // --------- Map Tools ---------
            pathToCell(x, y) {
                const entity = this.arena.entities[this.arena.turn_active.y][this.arena.turn_active.x][0];

                // Check to see if there's any planned movement in the buffer
                if (this.arena.planned_movement.length) {
                    // Clear existing highlights in cell data

                    // Iterate through buffer and apply new highlights

                    // if there is, check to see if its one cell away from the last entry in the buffer
                    if (this.checkDistance(x, y, this.arena.turn_active.x, this.arena.turn_active.y) <= 1) {
                        // if it is, add this coordinate to the buffer and end
                        console.log('cell is 1 cell')
                        return true;
                    } else {
                        // if it is not, clear the buffer
                    }
                }

                // If there isn't planned movement check to see if this cell is within movement
                // range of the active turn entity's MP range
                if (entity.mp.current >= this.checkDistance(x, y, this.arena.turn_active.x, this.arena.turn_active.y)) {
                    console.log('within range on mp')
                    // Generate a path and insert it into the buffer

                    // Toggle
                }

            },
            rangeDiamond(arg_x, arg_y, entity) {
                let y_on_map = arg_y - entity.mp.current;
                const mp_or_0 = entity.mp.current > 0 ? entity.mp.current : 0;
                // Upper half of diamond
                for (let y = 0; y < mp_or_0 + 1; y++) {
                    for (let x = 0; x < (y * 2) + 1; x++) {
                        let x_on_map = arg_x - y + x;
                        if (this.arena.map[y_on_map] && this.arena.map[y_on_map][x_on_map]) {
                            this.arena.map[y_on_map][x_on_map].valid_destination = this.arena.entities[y_on_map][x_on_map].length <= 0;
                        }
                    }
                    y_on_map++;
                }

                y_on_map = arg_y + entity.mp.current;

                // Bottom half of diamond
                for (let y = 0; y < mp_or_0; y++) {
                    for (let x = 0; x < (y * 2) + 1; x++) {
                        let x_on_map = arg_x - y + x;
                        if (this.arena.map[y_on_map] && this.arena.map[y_on_map][x_on_map]) {
                            this.arena.map[y_on_map][x_on_map].valid_destination = this.arena.entities[y_on_map][x_on_map].length <= 0;
                        }
                    }
                    y_on_map--;
                }
            },
            clearRangeHighlights() {
                // Row
                for (let y = 0; y < this.generation.cell_count; y++) {
                    // Cells
                    for (let x = 0; x < this.generation.cell_count; x++) {
                        this.arena.map[y][x].valid_destination = null;
                    }
                }
            },
            teleport(new_x, new_y, old_x, old_y) {
                if (!this.arena.entities[old_y][old_x].length) {
                    console.log('No entity at grid [' + old_x + '|' + old_y + ']' )
                    return false;
                }
                if (this.arena.entities[new_y][new_x].length) {
                    console.log('Cannot overrite entities: ', this.arena.entities[new_y][new_x])
                    return false;
                }
                this.arena.entities[new_y][new_x] = this.arena.entities[old_y][old_x];
                this.arena.entities[old_y][old_x] = [];

                return true;
            },
            teleportTestingWrapper(new_x, new_y) {
                this.teleport(new_x, new_y, this.arena.turn_active.x, this.arena.turn_active.y)

                // Client testing only
                this.arena.turn_active.x = new_x;
                this.arena.turn_active.y = new_y;
            }
        },
        mounted() {
            this.generateTerrain();
            this.generateEntities();
        }
    }
</script>
<style lang="sass">
    $grass: darken(green, 10%)
    $water: darken(teal, 10%)
    $stone: darken(grey, 10%)

    $cell-index: 1
    $entity-index: 2
    $tooltip-index: 3

    @keyframes active-entity
        0%
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 1)

        50%
            box-shadow: 0 0 0 7px rgba(255, 255, 255, 0)

        70%
            box-shadow: 0 0 0 10px rgba(255, 255, 255, 0)

        100%
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0)


    @mixin active-entity
        animation: active-entity 2s infinite

    .row
        display: flex

    .cell
        height: 50px
        width: 50px

        position: relative

        &.grass
            background: $grass

            &:hover
                background: lighten($grass, 10%)

        &.water
            background: $water

            &:hover
                background: lighten($water, 10%)

        &.stone
            background: $stone

            &:hover
                background: lighten($stone, 10%)


        .overlay
            position: absolute
            height: 100%
            width: 100%

            &.destination-overlay
                background: rgba(82, 189, 34, 0.7)

            &.impassable-overlay
                background: rgba(189, 34, 34, 0.7)

        .entities
            height: 100%
            width: 100%
            display: flex
            justify-content: center
            align-items: center
            position: relative
            z-index: $cell-index

            .entity
                border: 2px solid black
                border-radius: 50%
                height: 80%
                width: 80%
                display: flex
                justify-content: center
                align-items: center
                cursor: pointer
                z-index: $entity-index

                &.player
                    border: 2px solid lawngreen
                    background: darken(lawngreen, 10%)

                    &.active
                        @include active-entity

                &.ally
                    border: 2px solid deepskyblue
                    background: darken(deepskyblue, 10%)

                    &.active
                        @include active-entity

                &.enemy
                    border: 2px solid red
                    background: darken(red, 10%)

                    &.active
                        @include active-entity

                &:hover > .stats
                    display: grid !important

                &:hover > .nameplate, &:hover > .hp
                    display: flex !important

                .nameplate, .stats
                    position: absolute
                    font-size: .8rem
                    border-radius: .25rem
                    padding: 2px 4px
                    z-index: $tooltip-index

                .nameplate
                    top: -1rem
                    display: none
                    background: rgba(0,0,0,.6)

                    .name
                        grid-column: 1/3
                        white-space: nowrap

                .stats
                    bottom: -1rem
                    display: none
                    grid-template-columns: 1fr 1fr
                    grid-gap: .5rem
                    justify-content: center
                    white-space: nowrap

                    .ap, .mp
                        text-align: center
                        height: 24px
                        width: 24px
                        border-radius: 50%
                        display: flex
                        justify-content: center
                        align-items: center
                        z-index: $tooltip-index

                    .ap
                        grid-column: 1
                        background: blue

                    .mp
                        grid-column: 2
                        background: green

                .hp
                    display: none
</style>