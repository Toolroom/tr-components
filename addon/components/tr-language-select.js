import Ember from 'ember';
import Editor from './tr-editor';

export default Editor.extend({
    i18n: Ember.inject.service(),
    moment: Ember.inject.service(),
    classNames: ['tr-language-select'],
    buttonClass: '',

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