import Ember from 'ember';

export default Ember.Component.extend({
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
