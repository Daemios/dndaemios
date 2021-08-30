<template>
    <div
            class="entity"
            :class="classes"
            @mouseover.self="$emit('entity-mouseover')"
            @mouseout.self="$emit('entity-mouseout')"
    >
        <div class="nameplate">
            {{entity.name}}
        </div>
        <div class="stats">
            <div class="ap"
                 @mouseover.self="$emit('entity-mouseover')"
                 @mouseout.self="$emit('entity-mouseout')"
            >{{entity.ap.current}}</div>
            <div class="mp"
                 @mouseover.self="$emit('entity-mouseover')"
                 @mouseout.self="$emit('entity-mouseout')"
            >{{entity.mp.current}}</div>
        </div>
        <div class="hp" v-if="false">{{entity.life.current}}|{{entity.life.max}}</div>
    </div>
</template>
<script>
    export default {
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
    }
</script>
<style lang="sass">

</style>