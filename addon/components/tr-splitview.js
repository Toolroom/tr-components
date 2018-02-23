import Ember from '@ember';
import layout from '../templates/components/tr-splitview';

export default Ember.Component.extend({
    layout,
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
