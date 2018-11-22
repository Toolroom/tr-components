import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';
import layout from '../templates/components/tr-value-bar';

export default Component.extend({
    layout,
    classNames: 'tr-value-bar',
    value: 0,
    max: 100,
    label: null,
    color: null,

    percentage: computed('value', 'max', {
        get() {
            return 100 / this.get('max') * this.get('value');
        }
    }),

    barCss: computed('percentage', {
        get() {
            let p = this.get('percentage');

            if(p > 0) {
                if(p <= 5) {
                    p = 6;
                }
                else if(p <= 10) {
                    p = 10;
                }
            }

            return htmlSafe(`width:${p}%; background-color:${this.get('color') || ''};opacity:1;`);
        }
    })
});
