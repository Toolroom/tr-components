import { inject } from '@ember/service';
import Editor from './tr-editor';
import layout from '../templates/components/tr-qr-editor';

export default Editor.extend({
    layout,
    functions: inject.service(),
    classNames: 'tr-editor tr-qrcode-editor',
    isEditing: false,

    size: 64,
    onGenerateNew: null,
    maxLength: null,

    actions: {
        generateNew() {
            let generateNew = this.get('onGenerateNew');
            if(generateNew)
            {
                this.set('value', generateNew());
            } else {
                this.set('value', this.get('functions').makeId());
            }
        },
        edit() {
            this.set('isEditing', true);
        },
        commit() {
            this.set('isEditing', false);
        }
    }
});
