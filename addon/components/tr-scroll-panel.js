import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../templates/components/tr-scroll-panel';

export default Component.extend({
    layout,
    classNames: 'tr-scroll-panel',
    classNameBindings: ['showScrollbar:scrollbar-visible:scrollbar-hidden', '_autohide:scrollbar-autohide'],

    _autohide: computed('autohide', 'showScrollbar', {
        get(){
            if(!this.get('showScrollbar')) {
                return false;
            }
            return this.get('autohide');
        }
    }),

    showScrollbar: true,
    autohide: true
});
