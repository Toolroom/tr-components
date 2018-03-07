import Ember from 'ember';
import layout from '../templates/components/tr-treeview';
const { later, cancel } = Ember.run;

export default Ember.Component.extend({
    layout,

    classNames: 'tr-treeview',
    classNameBindings: 'isSorting',
    tagName: 'ul',

    model: null,

    enableSorting: false,
    isSorting: false,
    showPath: false,

    childItemsPropertyName: 'items',
    isBusyPropertyName: 'isBusy',
    isExpandedPropertyName: 'isExpanded',
    hasAnyChildItemPropertyName: 'hasAnyChild',
    isDirtyPropertyName: 'isDirty',

    routeName: null,
    itemComponentName: 'tr-container',

    didInsertElement: function(){
        var self = this,
            childItemsPropertyName = this.get('childItemsPropertyName');
        Ember.run.schedule('actions', function () {
            if(!self.get('enableSorting')) return;
            self.$().sortable({
                axis: 'y',
                dropOnEmpty: false,
                distance: 5,
                items: 'li',
                cancel: '.is-dirty',
                opacity: 0.5,
                scroll: true,
                revert: true,
                start: function(event, ui) {
                    self.set('isSorting', true);
                    var itemId = ui.item.attr('data-item-id'),
                        model = self.get('model.' + childItemsPropertyName).find(function(item) { return item.get('id').toString() == itemId; }),
                        index = $(ui.item).index();

                    //Ember.run.schedule('actions', function () {
                        self.sendAction('onStartSorting', model, index);
                    //});
                },
                update: function(event, ui) {
                    var itemId = ui.item.attr('data-item-id'),
                        model = self.get('model.' + childItemsPropertyName).find(function(item) { return item.get('id').toString() == itemId; }),
                        index = $(ui.item).index();

                    //Ember.run.schedule('actions', function () {
                        self.sendAction('onUpdateSorting', model, index);
                    //});
                },
                stop: function(event, ui) {
                    if(self._sortingStopCallback) {
                        cancel(self._sortingStopCallback);
                        this._sortingStopCallback = null;
                    }

                    var itemId = ui.item.attr('data-item-id'),
                        model = self.get('model.' + childItemsPropertyName).find(function(item) { return item.get('id').toString() == itemId; }),
                        index = $(ui.item).index();

                    //Ember.run.schedule('actions', function () {
                        self.sendAction('onStopSorting', model, index);
                    //});

                    self._sortingStopCallback = later(self, function() {
                        this.set('isSorting', false);
                        this._sortingStopCallback = null;
                    }, 2500);
                }
            });
        });
    },

    self: Ember.computed({
        get() {
            return this;
        }
    }),

    actions: {
        toggle (item){
            this.sendAction('onToggle', item);
        },
        startSorting (item, index){
            if(!this.get('enableSorting')) return;
            this.sendAction('onStartSorting', item, index);
        },
        updateSorting (item, index){
            if(!this.get('enableSorting')) return;
            this.sendAction('onUpdateSorting', item, index);
        },
        stopSorting (item, index){
            if(!this.get('enableSorting')) return;
            this.sendAction('onStopSorting', item, index);
        },
    }
});
