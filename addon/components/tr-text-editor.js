import { observer } from '@ember/object';
import Editor from './tr-editor';
import layout from '../templates/components/tr-text-editor';
import { A } from '@ember';

export default Editor.extend({
    layout,
    i18nProperties: A('placeholder'),
    classNames: 'tr-text-editor',

    placeholder: null,
    maxLength: null,

    onTextChanged: null,

    valueObserver: observer('value', function() {
        if(this.onTextChanged) this.get('onTextChanged')(this.get('value'));
    }),

    focusOut() {
        this.set('suggestion', null);
    },

    /*
     ** Returns the caret (cursor) position of the specified text field.
     ** Return value range is 0-oField.value.length.
     */
    getSelection (oField) {
        // Initialize
        let selection = {
            start: 0,
            end: 0
        };

        // IE Support
        if (document.selection) {
            // Set focus on the element
            oField.focus();
            // To get cursor position, get empty selection range
            let oSel = document.selection.createRange();
            // Move selection start to 0 position
            oSel.moveStart('character', -oField.value.length);
            // The caret position is selection length
            selection.start = selection.end = oSel.text.length;
        }
        // Firefox support
        else if (oField.selectionStart || oField.selectionStart == '0')
        {
            selection.start = oField.selectionStart;
            selection.end = oField.selectionEnd;
        }

        // Return results
        return selection;
    }
});
