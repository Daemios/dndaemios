<template>
    <div id="arena" v-if="map !== null">
        <div class="row" v-for="(row, y) in map">
            <arena-cell
                    v-for="(cell, x) in row"
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

</style>