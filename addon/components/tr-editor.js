import Ember from 'ember';
import layout from '../templates/components/tr-editor';

export default Ember.Component.extend({
    layout,
    concatenatedProperties: ['translationProperties'],

    i18n: Ember.inject.service(),

    attributeBindings: ['title'],

    classNames: 'tr-editor',
    classNameBindings: ['isDisabled:disabled:enabled', 'isReadonly:readonly'],

    value: null,

    label: null,
    info: null,
    prefix: null,
    postfix: null,

    translationKey: null,
    translationProperties: ['label', 'title', 'info', 'prefix', 'postix'],

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

    _updateTranslation: Ember.observer('translationKey', function () {
        let translationKey = this.get('translationKey'),
            i18n = this.get('i18n');

        if (!translationKey || !i18n) return;

        let translationProperties = this.get('translationProperties') || [];

        translationProperties.forEach(function(propertyName) {
            this._updateTranslationForPropertyName(i18n, translationKey, propertyName);
        }, this);
    }).on('didInsertElement'),

    _updateTranslationForPropertyName: function(i18n, translationKey, propertyName) {
        let translation = i18n.t(translationKey + '.' + propertyName, { default: ['editor.default.' + propertyName, 'editor.default.null'] });
        if(translation.toString() !== '\\null\\') this.set(propertyName, translation);
    }
});
