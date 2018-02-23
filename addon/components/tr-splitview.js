import Ember from 'ember';

export default Ember.Component.extend({
    classNames: 'cb-splitview',

    classNameBindings: ['hasContent', 'isOpen', 'size', 'sidebarMode:sidebar-mode:content-mode'],

    isOpen: true,
    hasContent: true,
    showPath: false,
    sidebarMode: false,

    size: 'small',

    panel: null,
    content: null,

    actions: {
        toggle () {
            this.set('isOpen', !this.get('isOpen'));
        }
    }
});
