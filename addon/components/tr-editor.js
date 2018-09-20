import Ember from 'ember';
import BusyKeys from '../mixins/busy-keys';
import layout from '../templates/components/tr-editor';

export default Ember.Component.extend(BusyKeys, {
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
    isBusy: false,
    isDisabledWhenBusy: true,
    autocomplete: null,

    /**
     * If isDisabledWhenBusy is true, this flag announces the its state
     */
    _isBusyDisabled: Ember.computed('isBusy','isDisabledWhenBusy', function() {
        if(!this.get('isDisabledWhenBusy')) {
            return undefined;
        }

        return this.get('isBusy');
    }),

    /*isBusy: false,
    _isBusy: Ember.computed('isBusy', 'busyKeys', function(){
        let keys = this.get('busyKeys'),
            isBusy = this.get('isBusy');
        console.log(keys && keys.get('length') > 0);
        return isBusy || (keys && keys.get('length') > 0);
    }),
    busyKeys: [],

    setBusy(busyKey, isBusy) {
        let keys = this.get('busyKeys');
        if(isBusy) {
            if(!keys || keys.indexOf(busyKey) === -1) return;
            keys.removeObject(busyKey);
        } else {
            if(keys && keys.indexOf(busyKey) > -1) return;
            keys.pushObject(busyKey);
        }

        if(keys && keys.indexOf(busyKey) > -1) return;
        keys.pushObject(busyKey);
    },*/

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
        let translation = null;
        if(Ember.isPresent(propertyName)) {
            translation = i18n.t(i18nKey + '.' + propertyName, { default: ['editor.default.' + propertyName, 'editor.default.null'] });
        }
        if(translation.toString() !== '\\null\\') this.set(propertyName, translation);
    }
});
