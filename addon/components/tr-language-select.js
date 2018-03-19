import Ember from 'ember';
import Editor from './tr-editor';
import layout from '../templates/components/tr-language-select';

export default Editor.extend({
    layout,

    i18n: Ember.inject.service(),
    moment: Ember.inject.service(),
    classNames: ['tr-language-select'],
    buttonClass: '',

    /**
     * Alignment of the combo content:
     * auto - stretches the combo to the control width
     * left - aligns combo to the left border of the control
     * right - aligns combo to the right border of the control
     */
    align: 'auto',

    locales: Ember.computed('i18n.locale', 'i18n.locales', function() {
        const i18n = this.get('i18n');
        var items = this.get('i18n.locales').map(function (loc) {
            return Ember.Object.create({ key: loc, value: i18n.t('global.locales.' + loc).toString() });
        });
        return items;
    }),

    actions: {
        setLocale(locale) {
            this.set('i18n.locale', locale.key);
            this.get('moment').setLocale(locale.key);
        }
    }
});
