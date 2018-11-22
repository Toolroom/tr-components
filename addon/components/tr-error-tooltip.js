import Component from '@ember/component';
import layout from '../templates/components/tr-error-tooltip';

export default Component.extend({
    layout,

    tagName: 'span',
    errors: null
});
