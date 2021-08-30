var Dnd = {
    format: {
        /**
         * Takes data from a bonus and returns it properly formatted
         * to be user-readable
         *
         * @param value
         * @param name
         * @param operation
         * @returns {{classes: {"color-positive": boolean, "color-negative": boolean}, name, combined: string, value: string}}
         */
        bonus(value, name, operation = 'additive') {
            let prefix = '';
            let suffix = '';
            let pretty_value = 0;

            switch (operation) {

                case 'multiplicative':
                    prefix = (value-1 >= 0) ? ' +' : ' ';
                    suffix = '%';
                    pretty_value = (100 * (value - 1)).toFixed(0);
                    break;

                case 'additive':
                    prefix = (value-1 >= 0) ? ' +' : ' ';
                    pretty_value = value;
                    break;

                default:
                    break;
            }

            return {
                name: name,
                value: prefix + pretty_value + suffix,
                combined: name + prefix + pretty_value + suffix,
                classes: {
                    'color-positive': (value-1 >= 0),
                    'color-negative': (value-1 < 0)
                }
            }
        },

        /**
         * Converts an array of any number of array or
         * objects containing bonuses to a single array
         *
         * @param elements
         */
        arrayify(elements) {
            let array = []

            elements.forEach(element => {
                if (typeof element === 'object') {
                    array.push(Object.values(element));
                } else {
                    array.push(element);
                }
            })

            return array;
        }
    },
    ability: {

        /**
         * Only canonical location for calculation of ability power client-side
         *
         * @param character_powers
         * @param ability_powers
         */
        power(character_powers, ability_powers) {

            let calc_power = 1;

            let powers = Dnd.format.arrayify([
                character_powers,
                ability_powers
            ])

            let multiplicatives = powers.filter(bonus => {
                return bonus['operation'] === 'multiplicative';
            })

            let additives = powers.filter(bonus => {
                return bonus['operation'] === 'additive';
            })

            multiplicatives.forEach(bonus => {
                calc_power = calc_power * bonus['value']
            })

            additives.forEach(bonus => {
                calc_power = calc_power + bonus['value']
            })

            return calc_power;

        },
        cost() {

        },
        cooldown() {

        },
        area() {

        },
        range() {

        },

        damage(power, affinity) {

        },
        healing(power, affinity) {

        }
    }
}