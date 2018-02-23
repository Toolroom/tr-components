import Ember from '@ember';
import layout from '../templates/components/tr-label';

export default Ember.Component.extend({
    layout,

    tagName: 'label',
    classNames: 'tr-label'
});
