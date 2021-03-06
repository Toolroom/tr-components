import Component from '@ember/component';
import layout from '../templates/components/tr-text-loader';

export default Component.extend({
    layout,
    tagName: 'label',
    classNames: 'tr-text-loader',
    text: '',
    didInsertElement: function() {
        //min 250, max 500
        let time = Math.floor(Math.random() * 250 + 250);
        this.$().css('animation-delay', time + "ms");
        this.$().css('animation-duration', 3*time + "ms");
        this._super();
    }
});
