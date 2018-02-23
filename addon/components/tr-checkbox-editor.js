import Ember from 'ember';
import Editor from './tr-editor';

export default Editor.extend({
    classNames: 'tr-checkbox-editor',
    classNameBindings: ['_checkStateClass', '_placeholderStateClass'],

    _checkStateClass: Ember.computed('value', {
        get() {
            var value = this.get('value');

            if(!value) {
                if(value === null && this.get('allowNull')) {
                    return 'tr-checkbox-editor-undefined';
                }
                return 'tr-checkbox-editor-unchecked';
            }

            return 'tr-checkbox-editor-checked';
        }
    }),

    _placeholderStateClass: Ember.computed('placeholder', {
        get() {
            var placeholder = this.get('placeholder');

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
            var value = this.get('value'),
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
