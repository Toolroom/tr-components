import Ember from '@ember';
import layout from '../templates/components/tr-editor';

export default Ember.Component.extend({
    layout,

    attributeBindings: ['title'],

    classNames: 'tr-editor',
    classNameBindings: ['isDisabled:disabled:enabled', 'isReadonly:readonly'],

    value: null,

    label: null,
    prefix: null,
    postfix: null,

    isDisabled: false,
    isReadonly: false,
    isVisible: true,
    autocomplete: null,

    isDisabledOrReadonly: Ember.computed('isDisabled', 'isReadonly', function() {
        return this.get('isDisabled') || this.get('isReadonly');
    }),

    title: Ember.computed('value', {
        get() {
            var value = this.get('value'),
                length = 0;

            if(value) {
                if(value.string) {
                    length = value.string.length;
                } else if (value.length) {
                    length = value.length;
                }
            }

            return length > 15 ? value : null;
        }
    }),

    errors: null,

    focus: false,

    isValid: Ember.computed('error', {
        get() {
            return !this.get('error');
        }
    }),

    _triggerFocus: Ember.observer('focus', function() {
        if(!this.get('focus')) return;
        this.$('input').focus();
    }).on('didInsertElement')
});
