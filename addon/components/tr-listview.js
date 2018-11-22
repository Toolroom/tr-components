import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../templates/components/tr-listview';

export default Component.extend({
    layout,

    classNames: 'tr-listview',

    /**
     * Source for items to show
     */
    items: null,

    /**
     * Notifies that the list is currently busy
     */
    isBusy: false,

    /**
     * Name of the route to navigate to on click.
     */
    linkRouteName: null,

    /**
     * The route names when the active flag to set
     */
    linkRouteCurrentWhen: null,

    /**
     * The property name of the id the route should use
     */
    idPropertyName: 'id',

    /**
     * Custom css class for items
     */
    itemClass: 'theme-background-interactive-lower',

    /**
     * Keeps track of the currently selected item.
     */
    selectedItem: null,

    /**
     * Configures the autohide property of the scrollbar
     */
    scrollbarAutohide: false,

    /*keyDown(e) {
        if(e.keyCode == 40) {
            let items = this.get('items');
            let selectedIdx = items.indexOf(this.get('selectedItem')) || -1;

            this.set('selectedItem', items.objectAt(selectedIdx++))
        }
    },*/

    /**
     * handles selection changed events
     */
    onSelectedItemChanged(){},

    _items: computed('items.@each', function() {
      let self=this;
      return this.get('items').map(function(item){
        return {
          item: item,
          id: item.get ? item.get(self.get('idPropertyName')) : item[self.get('idPropertyName')]
        }
      })
    }),
    /**
     * Available actions
     */
    actions: {
        select(item) {
            this.set('selectedItem', item);
            let action = this.get('onSelectedItemChanged');
            if(action) {
                action(item);
            }
        }
    }
});
