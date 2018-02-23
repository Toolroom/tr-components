import Ember from 'ember';

export default Ember.Component.extend({
    header: null,

    primaryAction: null,
    primaryText: null,
    primaryIsDisabled: false,

    secondaryAction: null,
    secondaryText: null,
    secondaryIsDisabled: false,

    onClose: null,

    isVisible: true,

    isFooterVisible: Ember.computed('primaryAction', 'secondaryAction', {
        get() {
            return this.get('primaryAction') || this.get('secondaryAction');
        }
    }),

    actions: {
        onClose: function() {
            var onClose = this.get('onClose');
            if(onClose) onClose();
        }
    }
});
