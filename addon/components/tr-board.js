import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import { observer } from '@ember/object';
import layout from '../templates/components/tr-board';

export default Component.extend({
    layout,

    settings: inject.service('settings'),
    session: inject.service('session'),

    _gridSize: 168,
    _gridSpace: 8,
    _maxTileSize: 4,
    _id: null,

    id: computed({
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
        let settings = this.get('settings'),
            self = this;

        this.set('isLoading', true);
        settings.getRemote('tr-board_' + this.get('id')).then(function(setting){
            self.set('data', setting);
            self.set('isLoading', false);
        }, function() {
            self.set('isLoading', false);
        });
    },

    refreshScreen: observer('data', 'isEditing', function() {
        let stringData = this.get('data.data.value'),
            maxX = 0,
            maxY = 0;

        if(!stringData) return;

        let data = JSON.parse(stringData);

        for(let property in data) {
            if (data.hasOwnProperty(property)) {
                let current = data[property],
                    currentTotalX = current.position.x + current.position.width,
                    currentTotalY = current.position.y + current.position.height;

                if(currentTotalX > maxX) maxX = currentTotalX;
                if(currentTotalY > maxY) maxY = currentTotalY;
            }
        }

        let addonSize =this.get('isEditing') ? this._maxTileSize : 0;

        let w = (maxX + addonSize) * this._gridSize + this._gridSpace,
            h = (maxY + addonSize) * this._gridSize + this._gridSpace;

        /*this.setProperties({
            width: w,
            height: h
        });*/
        this.$()
            .css('width', w)
            .css('height', h);
    }),

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
            let setting = this.get('data');

            if(!identifier || !setting) return;

            let o = setting.get('object');

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
