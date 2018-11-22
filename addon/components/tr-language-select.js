import { computed } from '@ember/object';
import { inject } from '@ember/service';
import Object from '@ember/object';
import Editor from './tr-editor';
import layout from '../templates/components/tr-language-select';

export default Editor.extend({
    layout,

    i18n: inject.service(),
    settings: inject.service(),
    moment: inject.service(),
    classNames: ['tr-language-select'],
    buttonClass: '',

    locale: computed('i18n', function() {
        return this.get('i18n.locale');
    }),

    /**
     * Alignment of the combo content:
     * auto - stretches the combo to the control width
     * left - aligns combo to the left border of the control
     * right - aligns combo to the right border of the control
     */
    align: 'auto',

    locales: computed('i18n.locale', 'i18n.locales', function() {
        const i18n = this.get('i18n');
        return this.get('i18n.locales').map(function (loc) {
            return Object.create({ key: loc, value: i18n.t('global.locales.native.' + loc).toString() });
        });
    }),

    actions: {
        setLocale(locale) {
            this.set('settings.locale', locale.key);
            this.get('moment').setLocale(locale.key);
        }
    }
});
