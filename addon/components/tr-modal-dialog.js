import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../templates/components/tr-modal-dialog';

export default Component.extend({
    layout,
    header: null,

    primaryAction: null,
    primaryText: null,
    primaryIsDisabled: false,

    secondaryAction: null,
    secondaryText: null,
    secondaryIsDisabled: false,

    onClose: null,

    isVisible: true,
    isMessage: true,

    wrapperClass: null,
    containerClassNames: computed('isMessage', function() {
        return this.get('isMessage') ? 'tr-message-box' : null;
    }),

    isFooterVisible: computed('primaryAction', 'secondaryAction', {
        get() {
            return this.get('primaryAction') || this.get('secondaryAction');
        }
    }),

    actions: {
        onClose: function() {
            let onClose = this.get('onClose');
            if(onClose) onClose();
        }
    }
});
