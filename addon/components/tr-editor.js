import Ember from 'ember';
import layout from '../templates/components/tr-editor';

export default Ember.Component.extend({
    layout,
    concatenatedProperties: ['i18nProperties'],

    i18n: Ember.inject.service(),

    attributeBindings: ['title'],

    classNames: 'tr-editor',
    classNameBindings: ['isDisabled:disabled:enabled', 'isReadonly:readonly'],

    value: null,

    label: null,
    info: null,
    prefix: null,
    postfix: null,

    i18nKey: null,
    i18nProperties: ['label', 'title', 'info', 'prefix', 'postfix'],

    isDisabled: false,
    isReadonly: false,
    isVisible: true,
    autocomplete: null,

    isDisabledOrReadonly: Ember.computed('isDisabled', 'isReadonly', function () {
        return this.get('isDisabled') || this.get('isReadonly');
    }),

    title: Ember.computed('value', {
        get() {
            var value = this.get('value'),
                length = 0;

            if (value) {
                if (value.string) {
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

    _triggerFocus: Ember.observer('focus', function () {
        if (!this.get('focus')) return;
        this.$('input').focus();
    }).on('didInsertElement'),

    _updateI18n: Ember.observer('i18nKey', 'i18n.locale', function () {
        let i18nKey = this.get('i18nKey'),
            i18n = this.get('i18n');

        if (!i18nKey || !i18n) return;

        let i18nProperties = this.get('i18nProperties') || [];

        i18nProperties.forEach(function(propertyName) {
            this._updateI18nForPropertyName(i18n, i18nKey, propertyName);
        }, this);
    }).on('didInsertElement'),

    _updateI18nForPropertyName: function(i18n, i18nKey, propertyName) {
        let translation = i18n.t(i18nKey + '.' + propertyName, { default: ['editor.default.' + propertyName, 'editor.default.null'] });
        if(translation.toString() !== '\\null\\') this.set(propertyName, translation);
    }
});
