<template>
    <div class="item card">
        <span class="icon">
            <i class="fas" :class="item.type.class"></i>
        </span>
        <span class="name">{{item.name}}</span>
        <span class="quantity">{{item.quantity}}</span>
        <span class="edit">
            <i class="fas fa-edit" @click="$emit('edit')"></i>
        </span>
    </div>
</template>
<script>
    export default {
        props: {
            item: {
                type: Object,
                required: true
            }
        }
    }
</script>
<style lang="sass">
.item
  display: grid
  grid-template-columns: 50px 1fr 1fr 1fr
  grid-gap: 0 1rem

  &>*
    display: flex
    align-items: center

  .icon
    font-size: 1.5rem

  .edit
    display: flex
    align-items: center
    justify-content: flex-end
    i
      cursor: pointer
      padding: 1rem
      margin: -1rem
</style>