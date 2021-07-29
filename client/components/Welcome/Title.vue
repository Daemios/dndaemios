<template>
  <div id="title">
    <div>Introducing</div>
    <div>Dungeons</div>
    <div>and</div>
    <div>Daemios</div>
    <aui-button @click="$emit('create')">Create Your Character</aui-button>
  </div>
</template>
<script>
export default {}
</script>
<style lang="sass">
@keyframes opacity
  0%
    opacity: 0

  100%
    opacity: 1

#title
  font-family: 'Requiem', sans-serif
  display: flex
  justify-content: center
  align-items: center
  flex-direction: column
  color: white
  font-size: 10vw

  & > div
    opacity: 0
    animation-name: opacity

  & > div:nth-of-type(1)
    animation-duration: .01s
    animation-fill-mode: forwards
    font-size: 5vw

  & > div:nth-of-type(2)
    animation-duration: .01s
    animation-delay: 1.25s
    animation-fill-mode: forwards

  & > div:nth-of-type(3)
    animation-duration: .01s
    animation-delay: 2.25s
    animation-fill-mode: forwards

  & > div:nth-of-type(4)
    animation-duration: .01s
    animation-delay: 2.75s
    animation-fill-mode: forwards
</style>