import Ember from 'ember';
import layout from '../templates/components/tr-loader';

export default Ember.Component.extend({
    layout,
    
    size: 'normal',
    classNames: 'tr-loader',
    spinnerSizeClass: Ember.computed('size', {
        get() {
            return `tr-spinner-${this.get('size')}`
        }
    })
});
