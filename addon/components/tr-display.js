import Editor from './tr-editor';
import layout from '../templates/components/tr-display';

export default Editor.extend({
    layout,
    
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
