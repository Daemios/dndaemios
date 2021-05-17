<template>
    <div
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
    </div>
</template>
<script>
export default {
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
    }
}
</script>
<style lang="sass">

</style>