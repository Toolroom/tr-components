import Ember from '@ember';
import OutsideClick from '../mixins/tr-outside-click';
import layout from '../templates/components/tr-submenu';

export default Ember.Component.extend(OutsideClick, {
    layout,
    text: null,
    classNames: 'tr-submenu tr-editor',
    
    isOpen: false,

    open: function() {
        this.set('isOpen', true);
    },

    close: function() {
        this.set('isOpen', false);
    },

    /*** Events **/
    clickOutside() {
        this.close();
    },
    
    actions: {
        click() {
            this.set('isOpen', !this.get('isOpen'));
        }
    }
});
