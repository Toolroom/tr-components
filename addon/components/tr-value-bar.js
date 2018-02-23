import Ember from '@ember';
import layout from '../templates/components/tr-value-bar';

export default Ember.Component.extend({
    layout,
    classNames: 'tr-value-bar',
    value: 0,
    max: 100,
    label: null,
    color: null,

    percentage: Ember.computed('value', 'max', {
        get() {
            return 100 / this.get('max') * this.get('value');
        }
    }),

    barCss: Ember.computed('percentage', {
        get() {
            var p = this.get('percentage');

            if(p > 0) {
                if(p <= 5) {
                    p = 6;
                }
                else if(p <= 10) {
                    p = 10;
                }
            }

            return Ember.String.htmlSafe(`width:${p}%; background-color:${this.get('color') || ''};opacity:1;`);
        }
    })
});
