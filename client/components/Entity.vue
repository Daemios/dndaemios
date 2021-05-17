<template>
    <div
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