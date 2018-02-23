import Ember from 'ember';
import Editor from './tr-editor';
import OutsideClick from '../mixins/tr-outside-click';
import layout from '../templates/components/tr-select-editor';

export default Editor.extend(OutsideClick, {
    layout,
    init: function() {
        this._super();
        this.on('didInsertElement', this, function() {
            this.set('filteredItems', this.get('items'));

            if(this.get('selectedItem')) {
                this._selectedItemChanged();
            }
            if(this.get('selectedKey')){
                this._selectedKeyChanged();
            }
        });
    },

    classNames: 'tr-select-editor',
    classNameBindings: ['isOpen', 'styleClassName'],

    /*** DATA PROPERTIES ***/

    items: null,

    selectedItem: null,
    selectedValue: null,
    selectedKey: null,

    suggestedItem: null,
    suggestedValue: null,

    keyProperty: 'key',
    valueProperty: 'value',

    /*** UI PROPERTIES ***/

    /**
     * Toggles the filter mode
     */
    editable: false,

    /**
     * Text shown when no items available
     */
    emptyText: 'Keine Auswahl verfügbar',

    /**
     * Modes: Select, Flat
     */
    style: 'select',
    styleClassName: Ember.computed('style', {
        get() {
            var style = (this.get('style') || '').toString().toLowerCase();
            if(style === 'flat') return 'tr-select-editor-flat';
            return 'tr-select-editor-select';
        }
    }),

    /**
     * Toggles the item list
     */
    isOpen: false,

    /**
     * The value placeholder
     */
    placeholder: null,

    /**
     * Allows cleaning the value by x-Button
     */
    allowNull: true,

    /**
     * Item property to use as id value
     */
    idPropertyName: 'id',

    /*** OBSERVER ***/
    _itemsChanged: Ember.observer('items', 'items.@each', function() {
        /*if(this.get('label') == "Reinigungsgruppe") {
            debugger;
        }*/
    }),

    _selectedItemChanged: Ember.observer('selectedItem', function() {
        //next(this, function() {
            this.set('selectedKey', this._getKey(this.get('selectedItem')));
            this.set('selectedValue', this._getValue(this.get('selectedItem')));
            this.set('suggestedItem', null);
            //this.close();
        //});
    }),

    _selectedKeyChanged: Ember.observer('selectedKey', function(){
        //next(this, function() {
            var self = this,
                items = this.get('items') || [];

            if(items.get('isFulfilled') === false) {
                return;
            }

            var matchedItems = items.filter(function(i){ return self._getKey(i) === self.get('selectedKey') });
            if(matchedItems.length > 0) {
                if(matchedItems[0] === this.get('selectedItem')) return;
                this.set('selectedItem', matchedItems[0]);
                return;
            }
            this.set('selectedItem', null);
        //});
    }),

    _suggestedItemChanged: Ember.observer('suggestedItem', function(){
        var suggestedItem = this.get('suggestedItem');
        //next(this, function() {
            this.set('suggestedValue', this._getValue(suggestedItem));
        //});
    }),


    /*** UI MEthods ***/

    open: function() {
        this.set('isOpen', true);
    },
    close: function() {
        this.set('isOpen', false);
    },
    toggle: function() {
        this.set('isOpen', !this.get('isOpen'));
    },

    /*** Events **/
    clickOutside() {
        var selectedItem = this.get('selectedItem'),
            suggestedItem = this.get('suggestedItem') || selectedItem;

        this.set('selectedItem', suggestedItem);
        //next(this, function() {
            this.set('suggestedItem', null);
            this.close();
        //});
    },

    clickInside() {
        if(this.get('isDisabled')) return;

        this.toggle();
    },

    focusInside() {
        //this.open();
    },
    focusOutside(){
        if(this.get('isDisabled')) return;

        this.clickOutside();
    },

    /*** Helpers ***/

    onTextChanged: function(value) {
        var all = this.get('items'),
            editable = this.get('editable');

        if(editable && value && value.length > 0) {
            var filtered = all.filter(function(item) {
                if(item.get) {
                    return item.get('value').toLowerCase().indexOf(value.toLowerCase()) == 0;
                }
                return item['value'].toLowerCase().indexOf(value.toLowerCase()) == 0;
            });

            if(filtered && filtered.length > 0) {
                this.set('suggestedItem', filtered.objectAt(0));
            } else {
                this.set('suggestedItem', null);
            }
            this.updateSuggestedValue(value);
            this.set('filteredItems', filtered);
        }
        else
        {
            this.set('suggestedItem', null);
            this.updateSuggestedValue(value);
            this.set('filteredItems', all);
        }
    },

    updateSuggestedValue: function(text) {
        var value = this._getValue(this.get('suggestedItem'));

        if(!text || !value) {
            this.set('suggestedValue', null);
            return;
        }

        value = text + value.substr(text.length);

        this.set('suggestedValue', value);
    },

    _getValue: function(obj) {
        if(!obj) return obj;
        if(obj.get) {
            return obj.get(this.get('valueProperty'));
        }
        return obj[this.get('valueProperty')];
    },

    _getKey: function(obj) {
        if(!obj) return null;
        if(obj.get) {
            return obj.get(this.get('keyProperty'));
        }
        return obj[this.get('keyProperty')];
    },

    actions: {
        onTextChanged: function(value) {
            if(this.get('isDisabled') || this.get('isReadonly')) return;

            this.onTextChanged(value);
        },
        onSelectedItemChanged(item) {
            if(this.get('isDisabled') || this.get('isReadonly')) return;

            this.set('selectedItem', item);
            var action = this.get('onSelectedItemChanged');
            if(action) {
                action(item);
            }
            this.close();
        },
        onClearValue() {
            if(this.get('isDisabled') || this.get('isReadonly')) return;

            this.set('selectedItem', null);
            this.close();
        },
        onToggle(key) {
            if(this.get('isDisabled') || this.get('isReadonly')) return;

            this.set('selectedKey', key);
        },
        onToggleState() {
            if(this.get('isDisabled')) return;

            this.toggle();
            this._clickIsInside = true;
        }
    }
});
