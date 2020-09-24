let instance = new Vue({
    el: '#inventory',
    data: {
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
            DynamicSuite.call('dndaemios', 'inventory.type.get', null, (response) => {
                this.state.inventory.types = response.data;
            })
        },
        getInventory() {
            DynamicSuite.call('dndaemios', 'inventory.get', {character_id: 1}, (response) => {

                this.state.inventory.data = response.data;

                this.state.current_inventory = this.state.inventory.data;

            })
        },
        updateItem() {

            // Assert basic information
            let data = this.state.current_item;

            DynamicSuite.call('dndaemios', 'inventory.update', data, (response) => {

                if (response.status === 'OK') {
                    this.state.display.edit_item_saved = true;

                    this.getInventory();
                }

            })

        },
        addItem() {

            // Assert basic information
            let data = this.state.current_item;

            DynamicSuite.call('dndaemios', 'inventory.add', data, (response) => {

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

            DynamicSuite.call('dndaemios', 'inventory.delete', data, (response) => {

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
    computed: {},
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
});