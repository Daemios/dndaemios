<template>
  <div id="overworld">
    <dnd-arena
        v-if="arena.map"
        :active="arena.turn_active"
        :entities="arena.entities"
        :map="arena.map"
        @click="teleportTestingWrapper"
        @entity-mouseover="highlightShape"
        @entity-mouseout="clearHighlights"
        @cell-mouseover="pathToCell"
    ></dnd-arena>
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

      this.iterateCells((x, y) => {
        if (y === 0) {
          generate[x] = {};
        }

        // Assign the cell data
        generate[x][y] = {
          terrain: this.randomTerrain(),
          effects: [],
          valid_destination: false,
          passable: Math.random() > .1
        }
      })

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
          current: 9,
          max: 4
        },
        ap: {
          current: 2,
          max: 4
        }
      }];
      let entities = [];

      // Row
      this.iterateCells((x, y) => {
        if (y === 0) {
          entities[x] = {};
        }
        // Assign the cell data
        entities[x][y] = this.randomEntity();
      })

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
      this.clearHighlights();

      let active_x = this.arena.turn_active.x;
      let active_y = this.arena.turn_active.y;
      const entity = this.arena.entities[active_x][active_y][0];

      // Check to see if there's any planned movement in the buffer
      if (this.arena.planned_movement.length) {
        // Clear existing highlights in cell data
        this.clearHighlights();

        // Iterate through buffer and apply new highlights
        this.arena.planned_movement.forEach(movement => {

        })

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

        // Find how many cells
        let path_count = Math.abs(x - active_x) + Math.abs(y - active_y);

        // Set path array and first element
        let path = [[active_x, active_y]];

        let x_direction = x >= active_x ? 1 : -1; // Will multiply by this to change direction on x axis
        let y_direction = y >= active_y ? 1 : -1; // Will multiply by this to change direction on y axis
        let x_main = Math.abs(x - active_x) >= Math.abs(y - active_y);// If we should main the X or Y axis

        // Generate path and store in the path buffer (start at 1 because we already set path[0]
        for (let i = 1; i <= path_count; i++) {

          // If we should main the X axis
          if (x_main) {
            // Insert the next position based on last position (do we need to add more to x or not?)
            if (path[i-1][0] !== x) {
              const x = path[i-1][0] + (1 * x_direction);
              const y = path[i-1][1];

              this.arena.map[x][y].valid_destination = true;
              path[i] = [x, y]
            } else {
              const x = path[i-1][0];
              const y = path[i-1][1] + (1 * y_direction);

              this.arena.map[x][y].valid_destination = true;
              path[i] = [x, y]
            }
          }
          // If we should main the Y axis
          else {
            // Insert the next position based on last position (do we need to add more to y or not?)
            if (path[i-1][1] !== parseInt(y)) {
              const x = path[i-1][0];
              const y = path[i-1][1] + (1 * y_direction);

              this.arena.map[x][y].valid_destination = true;
              path[i] = [x, y]
            } else {
              const x = path[i-1][0] + (1 * x_direction);
              const y = path[i-1][1];

              this.arena.map[x][y].valid_destination = true;
              path[i] = [x, y]
            }
          }
        }
      }

    },
    highlightShape(x, y, radius, shape = 'diamond', key = 'valid_destination') {
      this.clearHighlights();

      x = parseInt(x)
      y = parseInt(y)

      if (shape === 'diamond') {
        this.iterateCells((iter_x, iter_y) => {
          let dist_x = Math.abs(Number(x) - Number(iter_x));
          let dist_y = Math.abs(Number(y) - Number(iter_y));
          if (dist_x + dist_y <= radius) {
            this.arena.map[iter_x][iter_y][key] = true;
          }
        })
      }
      else if (shape === 'square') {
        this.iterateCells((iter_x, iter_y) => {
          this.arena.map[iter_x][iter_y][key] = true;
        }, x - radius, y - radius, radius)
      }
      else if (shape === 'cross') {
        this.iterateCells((iter_x, iter_y) => {
          if (parseInt(iter_x) === parseInt(x) || parseInt(iter_y) === parseInt(y)) {
            this.arena.map[iter_x][iter_y][key] = true;
          }
        }, x - radius, y - radius, radius)
      }
    },
    clearHighlights() {
      this.iterateCells((x, y) => {
        this.arena.map[x][y].valid_destination = null;
      })
    },
    iterateCells(callback, start_x = 0, start_y = 0, limit = null) {
      if (limit === null) {
        limit = this.generation.cell_count;
      } else {
        limit = limit * 2 + 1;
      }



      // Row
      for (let x = start_x; x < start_x + limit; x++) {
        // Cells
        for (let y = start_y; y < start_y + limit; y++) {
          callback(x, y);
        }
      }
    },
    teleport(new_x, new_y, old_x, old_y) {
      if (!this.arena.entities[old_x][old_y].length) {
        console.log('No entity at grid [' + old_x + '|' + old_y + ']')
        return false;
      }
      if (this.arena.entities[new_x][new_y].length) {
        console.log('Cannot overrite entities: ', this.arena.entities[new_x][new_y])
        return false;
      }
      this.arena.entities[new_x][new_y] = this.arena.entities[old_x][old_y];
      this.arena.entities[old_x][old_y] = [];

      return true;
    },
    teleportTestingWrapper(new_x, new_y) {
      this.teleport(new_x, new_y, this.arena.turn_active.x, this.arena.turn_active.y)

      // Client testing only
      this.arena.turn_active.x = parseInt(new_x);
      this.arena.turn_active.y = parseInt(new_y);
    }
  },
  mounted() {
    this.generateTerrain();
    this.generateEntities();
  }
}
</script>
<style lang="sass">



</style>