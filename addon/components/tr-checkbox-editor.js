import Editor from './tr-editor';
import { computed } from '@ember/object';
import { A } from '@ember';
import layout from '../templates/components/tr-checkbox-editor';

export default Editor.extend({
    layout,
    i18nProperties: A('placeholder'),

    classNames: 'tr-checkbox-editor',
    classNameBindings: A('_checkStateClass', '_placeholderStateClass'),

    _checkStateClass: computed('value', {
        get() {
            let value = this.get('value');

            if(!value) {
                if(value === null && this.get('allowNull')) {
                    return 'tr-checkbox-editor-undefined';
                }
                return 'tr-checkbox-editor-unchecked';
            }

            return 'tr-checkbox-editor-checked';
        }
    }),

    _placeholderStateClass: computed('placeholder', {
        get() {
            let placeholder = this.get('placeholder');

            if(!placeholder) {
                if(placeholder === null && this.get('allowNull')) {
                    return 'tr-checkbox-editor-placeholder-undefined';
                }
                return 'tr-checkbox-editor-placeholder-unchecked';
            }

            return 'tr-checkbox-editor-placeholder-checked';
        }
    }),

    placeholder: null,
    allowNull: false,

    actions: {
        toggle() {
            let value = this.get('value'),
                isDisabled = this.get('isDisabled'),
                isReadonly = this.get('isReadonly'),
                allowNull = this.get('allowNull');

            if(isReadonly || isDisabled) return;

            if(value) {
                this.set('value', false);
            } else {
                if(value === false && allowNull) {
                    this.set('value', null);
                }
                else {
                    this.set('value', true);
                }
            }
        }
    }
});
