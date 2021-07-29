<template>
    <div id="inventory">

        <div class="header card">
            <h1>Inventory ({{state.inventory.data.length}} items)</h1>
            <span>
            <aui-input
                    v-model="search_term"
                    placeholder="Filter..."
            ></aui-input>
            <aui-button
                    @click="state.display.add_modal = true; state.current_item = reset.current_item"
            >
                <i class="fas fa-plus"></i>
            </aui-button>
        </span>
        </div>

        <div class="ui">

          <dnd-inventory-paper-doll
              @change="getInventory"
          ></dnd-inventory-paper-doll>

          <div id="items" class="" v-if="state.current_inventory">
            <dnd-item v-for="item in state.current_inventory" :item="item" @edit="editItem(item)"></dnd-item>
          </div>

          <div id="no-items" class="card" v-else>
            No Items
          </div>
        </div>

        <aui-modal
                id="edit-item-modal"
                title="Editing"
                :show="state.display.edit_modal"
                title_classes="primary"
                :closeable="true"
                @close="state.display.edit_modal = false"
        >

            <div class="main-inputs">

                <aui-input
                        label="Name"
                        @keydown.enter="updateItem()"
                        v-model="state.current_item.name"
                ></aui-input>

                <aui-input
                        label="Quantity"
                        type="number"
                        @keydown.enter="updateItem()"
                        v-model="state.current_item.quantity"
                ></aui-input>

            </div>

            <aui-wysiwyg
                    class="item-description-input"
                    label="Description"
                    v-model="state.current_item.description"
                    :text="state.current_item.description"
            ></aui-wysiwyg>

            <div class="control">
            <span class="negative-actions">
                <aui-button type="secondary" :disabled="state.display.delete_confirm" @click="deleteConfirm()">
                    Delete
                </aui-button>
                <aui-button type="failure" v-if="state.display.delete_confirm" @click="deleteItem()">
                    Confirm
                </aui-button>
            </span>
                <span class="positive-actions">
                <span class="action-alert">
                    <span v-if="state.display.edit_item_saved" class="success">Saved</span>
                    <span v-if="!state.display.edit_item_saved">Unsaved</span>
                    <i class="fas fa-check success" v-if="state.display.edit_item_saved"></i>
                </span>
                <aui-button @click="updateItem()">
                    Save
                </aui-button>
            </span>
            </div>

        </aui-modal>

        <aui-modal
                id="add-item-modal"
                title="Editing"
                :show="state.display.add_modal"
                title_classes="primary"
                :closeable="true"
                @close="state.display.add_modal = false"
        >

            <div class="main-inputs">

                <aui-input
                        label="Name"
                        @keydown.enter="updateItem()"
                        v-model="state.current_item.name"
                ></aui-input>

                <aui-input
                        label="Quantity"
                        type="number"
                        @keydown.enter="updateItem()"
                        v-model="state.current_item.quantity"
                ></aui-input>

            </div>

            <aui-wysiwyg
                    class="item-description-input"
                    label="Description"
                    v-model="state.current_item.description"
                    :text="state.current_item.description"
            ></aui-wysiwyg>

            <div class="control">
                <aui-button @click="addItem()">
                    Add
                </aui-button>
            </div>

        </aui-modal>

    </div>
</template>
<script>
    export default {
        data() {
            return {
                search_term: '',
                reset: {
                    current_item: {
                        item_id: null,
                        name: null,
                        description: null,
                        quantity: null,
                        type: {
                            name: ''
                        }
                    }
                },
                state: {
                    display: {
                        edit_modal: false,
                        edit_item_saved: false,
                        add_modal: false,
                        delete_confirm: false,
                    },
                    current_inventory: [],
                    inventory: {
                        data: [],
                        types: []
                    },
                    editing: false,
                    current_item: {
                        item_id: null,
                        name: null,
                        description: null,
                        quantity: null,
                        type: {
                            name: ''
                        }
                    }
                }
            }
        },
        methods: {
            // Tasks
            editItem(item = null) {
                this.state.current_item = Object.assign({}, item);
                this.state.display.delete_confirm = false;
                this.state.display.edit_modal = true;
            },
            deleteConfirm() {
                this.state.display.delete_confirm = true;
            },

            // API
            getInventoryTypes() {
                DynamicSuite.call('inventory.type.get', null, (response) => {
                  console.log(response)
                  this.state.inventory.types = response.data;
                })
            },
            getInventory() {
                DynamicSuite.call('inventory.get', {character_id: 1}, (response) => {

                    this.state.inventory.data = response.data;

                    this.state.current_inventory = this.state.inventory.data;

                })
            },
            updateItem() {

                // Assert basic information
                let data = this.state.current_item;

                DynamicSuite.call('inventory.update', data, (response) => {

                    if (response.status === 'OK') {
                        this.state.display.edit_item_saved = true;

                        this.getInventory();
                    }

                })

            },
            addItem() {

                // Assert basic information
                let data = this.state.current_item;

                DynamicSuite.call('inventory.add', data, (response) => {

                    if (response.status === 'OK') {
                        this.state.display.add_modal = false;
                        this.getInventory();
                    } else {
                        console.log(response);
                    }

                });

            },
            deleteItem() {

                // Assert basic information
                let data = this.state.current_item;

                DynamicSuite.call('inventory.delete', data, (response) => {

                    if (response.status === 'OK') {
                        console.log(response)
                        this.state.display.edit_modal = false;
                        this.state.display.delete_confirm = false;
                        this.getInventory();
                    } else {
                        console.log(response);
                    }

                });

            },


        },
        watch: {

            search_term() {

                this.state.current_inventory = this.state.inventory.data.filter(item => {

                    if (item.name.toLowerCase().includes(this.search_term.toLowerCase())) return true;
                    if (item.type.name.toLowerCase().includes(this.search_term.toLowerCase())) return true;

                })

                if (this.search_term === '') this.state.current_inventory = this.state.inventory.data;

            },
            'state.current_item': {
                handler(val){
                    this.state.display.edit_item_saved = false
                },
                deep: true
            }

        },
        mounted() {

            this.getInventoryTypes();
            this.getInventory();

        }
    }
</script>
<style lang="sass">
@import "../../../../../client/sass/dynamicsuite"
@import "../../sass/colors"

#inventory
  max-width: 1150px
  width: 100%
  height: 100%

  &>.header
    display: flex
    justify-content: space-between
    margin-bottom: 1rem

    span
      display: flex
      justify-content: center

      button
        margin-left: 1rem


  .ui
    display: grid
    grid-template-columns: 1fr 1fr
    grid-gap: 1rem

    #items
      display: grid
      grid-template-columns: 1fr 1fr
      grid-gap: 1rem
      justify-content: center
      align-self: flex-start

    #no-items
      display: flex
      justify-content: center


  #edit-item-modal, #add-item-modal

    .body>*
      margin-bottom: 1rem

    .main-inputs
      display: grid
      grid-template-columns: 2fr 1fr
      grid-gap: 1rem

    .control
      display: flex
      align-items: center

      .positive-actions
        margin-left: auto

        .action-alert
          margin-right: 1rem

          .success
            color: $color-success

        .fas
          margin-left: .5rem


</style>