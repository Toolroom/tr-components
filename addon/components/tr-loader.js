import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../templates/components/tr-loader';

export default Component.extend({
    layout,

    size: 'normal',
    classNames: 'tr-loader',
    spinnerSizeClass: computed('size', {
        get() {
            return `tr-spinner-${this.get('size')}`
        }
    })
});
