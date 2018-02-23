import Ember from 'ember';

export default Ember.Component.extend({
    size: 'normal',
    classNames: 'tr-loader',
    spinnerSizeClass: Ember.computed('size', {
        get() {
            return `tr-spinner-${this.get('size')}`
        }
    })
});
