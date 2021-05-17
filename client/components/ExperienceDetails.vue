<template>
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
    </div>
</template>
<script>
    export default {
        props: {
            character: {
                type: Object
            }
        }
    }
</script>
<style lang="sass">
#experience-details
  .bar-standin, .details
    margin-top: 1rem
    display: grid
    grid-template-columns: 1fr 1fr 1fr
    grid-gap: 1rem

</style>