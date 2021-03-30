let instance = new Vue({
    el: '#overworld',
    data: {
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
        clearRangeDiamond() {
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
});