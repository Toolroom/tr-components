import Ember from 'ember';
import layout from '../templates/components/tr-error-tooltip';

export default Ember.Component.extend({
    layout,

    tagName: 'span',
    errors: null
});
