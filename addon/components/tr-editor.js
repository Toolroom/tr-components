import BusyKeys from '../mixins/busy-keys';
import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed, observer } from '@ember/object';
import { isPresent } from '@ember/utils';
import layout from '../templates/components/tr-editor';
import { A } from '@ember';

export default Component.extend(BusyKeys, {
    layout,
    concatenatedProperties: A('i18nProperties'),

    i18n: inject.service(),

    attributeBindings: A('title'),

    classNames: 'tr-editor',
    classNameBindings: ['isDisabled:disabled:enabled', 'isReadonly:readonly'],

    value: null,

    label: null,
    info: null,
    prefix: null,
    postfix: null,

    i18nKey: null,
    i18nProperties: A('label', 'title', 'info', 'prefix', 'postfix'),

    isDisabled: false,
    isReadonly: false,
    isVisible: true,
    isBusy: false,
    isDisabledWhenBusy: true,
    autocomplete: null,

    /**
     * If isDisabledWhenBusy is true, this flag announces the its state
     */
    _isBusyDisabled: computed('isBusy','isDisabledWhenBusy', function() {
        if(!this.get('isDisabledWhenBusy')) {
            return undefined;
        }

        return this.get('isBusy');
    }),

    isDisabledOrReadonly: computed('isDisabled', 'isReadonly', function () {
        return this.get('isDisabled') || this.get('isReadonly');
    }),

    title: computed('value', {
        get() {
            let value = this.get('value'),
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

    isValid: computed('error', {
        get() {
            return !this.get('error');
        }
    }),

    _triggerFocus: observer('focus', function () {
        if (!this.get('focus')) return;
        this.$('input').focus();
    }).on('didInsertElement'),

    _updateI18n: observer('i18nKey', 'i18n.locale', function () {
        let i18nKey = this.get('i18nKey'),
            i18n = this.get('i18n');

        if (!i18nKey || !i18n) return;

        let i18nProperties = this.get('i18nProperties') || [];

        i18nProperties.forEach(function(propertyName) {
            this._updateI18nForPropertyName(i18n, i18nKey, propertyName);
        }, this);
    }).on('didInsertElement'),

    _updateI18nForPropertyName: function(i18n, i18nKey, propertyName) {
        let translation = null;
        if(isPresent(propertyName)) {
            translation = i18n.t(i18nKey + '.' + propertyName, { default: ['editor.default.' + propertyName, 'editor.default.null'] });
        }
        if(translation.toString() !== '\\null\\') this.set(propertyName, translation);
    }
});
