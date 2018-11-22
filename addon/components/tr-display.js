import Editor from './tr-editor';
import layout from '../templates/components/tr-display';
import { A } from '@ember';

export default Editor.extend({
    layout,
    i18nProperties: A('placeholder'),

    classNames: 'tr-display',

    /**
     * date, [null]
     */
    type: null,

    /**
     * Optional format
     */
    format: null,

    /**
     * The value placeholder
     */
    placeholder: null,

    path: null,

    separator: null
});
