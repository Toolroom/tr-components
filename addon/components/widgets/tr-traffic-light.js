import { computed } from '@ember/object';
import Widget from './tr-widget';
import layout from '../../templates/components/widgets/tr-traffic-light';

export default Widget.extend({
    layout,

    classNames: 'tr-traffic-light',

    value: 0,
    title: null,
    subTitle: null,
    text: null,

    classNameBindings: ['colorName'],

    colorName: computed('value', function() {
        let value = this.get('value');
        if(value !== undefined && value !== null) value = value.toString();

        switch(value) {
            case "0": return "green";
            case "1": return "yellow";
            case "2": return "red";
            default: return "undefined";
        }
    })
});
