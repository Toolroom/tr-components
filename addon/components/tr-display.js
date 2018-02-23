import Editor from './tr-editor';

export default Editor.extend({
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
    placeholder: null
});
