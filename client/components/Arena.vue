<template>
    <div class="arena" v-if="map !== null">
        <div class="column" v-for="(column, x) in map">
            <dnd-arena-cell
                    v-for="(cell, y) in column"
                    @click="$emit('click', x, y)"
                    @cell-mouseover="$emit('cell-mouseover', x, y)"
                    @entity-mouseover="$emit('entity-mouseover', x, y, $event)"
                    @entity-mouseout="$emit('entity-mouseout')"
                    :cell="cell"
                    :entities="entities"
                    :active="active"
                    :x="x"
                    :y="y"
            ></dnd-arena-cell>
        </div>
    </div>
</template>
<script>
    export default {
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
        }
    }
</script>
<style lang="sass">
.arena
  display: flex
  .column
    display: flex
    flex-direction: column
</style>