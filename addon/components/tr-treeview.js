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

    routeName: null,

    didInsertElement: function(){
        var self = this;
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
                    var realmId = ui.item.attr('data-realm-id'),
                        model = self.get('model.childRealms').find(function(realm) { return realm.get('id').toString() == realmId; }),
                        index = $(ui.item).index();

                    //Ember.run.schedule('actions', function () {
                        self.sendAction('onStartSorting', model, index);
                    //});
                },
                update: function(event, ui) {
                    var realmId = ui.item.attr('data-realm-id'),
                        model = self.get('model.childRealms').find(function(realm) { return realm.get('id').toString() == realmId; }),
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

                    var realmId = ui.item.attr('data-realm-id'),
                        model = self.get('model.childRealms').find(function(realm) { return realm.get('id').toString() == realmId; }),
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
