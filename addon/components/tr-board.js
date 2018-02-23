import Ember from 'ember';
import layout from '../templates/components/tr-board';

export default Ember.Component.extend({
    layout,
    
    settings: Ember.inject.service('settings'),
    session: Ember.inject.service('session'),
    
    _gridSize: 168,
    _gridSpace: 8,
    _id: null,

    id: Ember.computed({
        get() {
            return this._id;
        },
        set(key, value) {
            this._id = value;
            this.set('isEditing', false);
            this.refreshData();
            this.notifyPropertyChange('id');
            return this._id;
        }
    }).volatile(),

    classNameBindings: ['isEditing:tr-board-is-editing', 'isLoading:tr-board-is-loading'],

    classNames: 'tr-board',
    isEditing: false,
    isEditable: false,

    data: null,
    scope: null,

    refreshData: function() {
        var settings = this.get('settings'),
            self = this;

        this.set('isLoading', true);
        settings.getRemote('tr-board_' + this.get('id')).then(function(setting){
            self.set('data', setting);
            self.set('isLoading', false);
        }, function() {
            self.set('isLoading', false);
        });
    },

    actions: {
        doAddWidget() {
            this.set('isEditing', true);
        },
        doEditWidget() {
            this.set('isEditing', true);
        },
        doFinishEditWidget(realm, user) {
            this.set('isEditing', false);
            this.set('data.key', 'tr-board_' + this.get('id'));
            this.set('data.realm', realm || null);
            this.set('data.user', user || null);
            this.get('settings').setRemote(this.get('data'));
        },
        updateWidget(identifier, position) {
            var setting = this.get('data');

            if(!identifier || !setting) return;

            var o = setting.get('object');

            if(!o[identifier]) {
                o[identifier] = {
                    key: identifier,
                    position: {
                        x:0,
                        y:0,
                        width:0,
                        height:0
                    },
                    config: null
                }
            }

            o[identifier].position = position;

            this.set('data.object', o);

            //localStorage.setItem('tr-board_' + this.get('id'), JSON.stringify(content));
            //this.get('settings').setRemote('tr-board_' + this.get('id'), null, null, JSON.stringify(content));
        }
    }
});
