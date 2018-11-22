import TextEditor from './tr-text-editor';
import layout from '../templates/components/tr-textarea-editor';

export default TextEditor.extend({
    layout,
    rows: null,
    cols: null,
    maxlength: null
});
