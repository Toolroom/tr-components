import Ember from 'ember';
import layout from '../templates/components/tr-scroll-panel';

export default Ember.Component.extend({
    layout,
    classNames: 'tr-scroll-panel',
    classNameBindings: ['showScrollbar:scrollbar-visible:scrollbar-hidden', '_autohide:scrollbar-autohide'],

    _autohide: Ember.computed('autohide', 'showScrollbar', {
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
