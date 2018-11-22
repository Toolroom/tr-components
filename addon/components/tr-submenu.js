import Component from '@ember/component';
import OutsideClick from '../mixins/tr-outside-click';
import layout from '../templates/components/tr-submenu';

export default Component.extend(OutsideClick, {
    layout,
    text: null,
    classNames: 'tr-submenu tr-editor',
    classNameBindings: ['highlight:is-highlight'],

    isOpen: false,
    highlight: false,

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

    onClick: null,

    actions: {
        onClick() {
            let click = this.get('onClick');
            if(click)
            {
                click();
            } else {
                this.set('isOpen', !this.get('isOpen'));
            }
        },
        onToggleState() {
            this.set('isOpen', !this.get('isOpen'));
        }
    }
});
