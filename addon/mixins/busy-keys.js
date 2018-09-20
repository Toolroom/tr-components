import Ember from 'ember';

export default Ember.Mixin.create({
    init() {
        this._super(...arguments);
        this.set('busyKeys', Ember.Object.create({}));
    },

    isBusy: false,
    busyKeys: null,

    busy(busyKey, description) {
        let busyPropertyPath = 'busyKeys.' + busyKey,
            busyItem = this.get(busyPropertyPath);

        if(!busyItem) {
            busyItem = Ember.Object.create({
                key: busyKey,
                description: description || null,
                number: 1,
                isBusy: true
            });
            this.set(busyPropertyPath, busyItem);
        } else {
            busyItem.setProperties({
                key: busyKey,
                description: busyItem.get('description'),
                number: busyItem.get('number') + 1
            });
        }
    },
    idle(busyKey) {
        let busyPropertyPath = 'busyKeys.' + busyKey,
            busyItem = this.get(busyPropertyPath);

        if(busyItem) {
            if(busyItem.get('number') <= 1) {
                this.set(busyPropertyPath, undefined);
                return;
            }

            busyItem.setProperties({
                key: busyKey,
                description: busyItem.get('description'),
                number: busyItem.get('number') - 1
            });
        }
    },

    actions: {
        busy(busyKey, description) {
            this.busy(busyKey, description);
        },
        idle(busyKey) {
            this.busy(busyKey);
        }
    }
});
