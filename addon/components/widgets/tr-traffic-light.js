import Ember from 'ember';
import Widget from './tr-widget';

export default Widget.extend({
    classNames: 'tr-traffic-light',

    value: 0,
    title: null,
    subTitle: null,
    text: null,
    
    classNameBindings: ['colorName'],

    colorName: Ember.computed('value', function() {
        var value = this.get('value');
        if(value !== undefined && value !== null) value = value.toString();

        switch(value) {
            case "0": return "green";
            case "1": return "yellow";
            case "2": return "red";
            default: return "undefined";
        }
    })
});
