import { computed, observer } from '@ember/object';
import Editor from './tr-text-editor';
import layout from '../templates/components/tr-time-editor';
import { A } from '@ember';

export default Editor.extend({
    layout,
    _formatExpression: computed('allowSeconds', function() {
        if(this.get('allowSeconds')) {
            return /^([0-9]{1,4})(?:(?::)([0-9]{1,2}))?(?:$|(?:(?::)([0-9]{1,2})$)?)/;
        }

        return /^([0-9]{1,4})(?:(?::)([0-9]{1,2}))?/;
    }),
    init: function() {
        this._super();
        this.setup();
    },

    setup: function() {
        this.updateEditValueFromValue();
    },

    _emptyStringValue: '00:00:00',
    _getEmptyObject: function() {
        return {
            hours: 0,
            minutes: 0,
            seconds: 0
        }
    },
    _parse: function(str) {
        if(!str) {
            return null;
        }

        let result = this._getEmptyObject();

        let regexp = this.get('_formatExpression'),
            matches = str.match(regexp),
            allowSeconds = this.get('allowSeconds');

        if(!matches || ((allowSeconds && matches.length != 4) || matches.length != 3) || !matches[0] || !matches[1]) {
            return this._emptyStringValue;
        }

        result.hours = Number.parseInt(matches[1] || 0);
        result.minutes = Number.parseInt(matches[2] || 0) || 0;
        result.seconds = allowSeconds ? Number.parseInt(matches[3] || 0) || 0 : 0;
        return result;
    },
    _getStringValue: function() {
        if(!this._editObject) {
            return null;
        }

        let str = `${this._pad(this._editObject.hours)}:${this._pad(this._editObject.minutes)}`;

        if(this.get('allowSeconds')) {
            str += ':' + this._pad(this._editObject.seconds);
        }

        return str;
    },
    _pad: function(str, minLength) {
        minLength = minLength || 2;

        str = str.toString();

        if(!str) {
            return str;
        }

        while(str.length < minLength) {
            str = '0'+str;
        }

        return str;
    },

    isTime: true,
    allowSeconds: false,

    _dateValue: null,
    dateValue: computed({
        get() {
            let dateValue = this._dateValue,
                editObject = this._editObject;

            if(editObject)
            {
                if(!dateValue) {
                    dateValue = this._dateValue = new Date();
                }
                else
                {
                    //copy date to have a new object that triggers observers
                    dateValue = new Date(dateValue.getTime());
                }

                dateValue.setHours(editObject.hours);
                dateValue.setMinutes(editObject.minutes);
                dateValue.setSeconds(editObject.seconds);
            }

            return dateValue;
        },
        set(key, date) {
            this._dateValue = date;

            if(date) {
                let str = `${date.getHours()}:${date.getMinutes()}`;
                if(this.get('allowSeconds')) {
                    str += ':' + date.getSeconds();
                }
                this.set('value', str);
            } else {
                this.set('value', null);
            }

            return this._dateValue;
        }
    }),

    editObject: computed({
        set(sender, value) {
            this._editObject = value;

            this.set('value', this._getStringValue(this._editObject));

            this.notifyPropertyChange('editValue');
            this.notifyPropertyChange('dateValue');
        },
        get() {
            return this._editObject;
        }
    }),

    updateFromIsEditing: observer('isEditing', function() {
        if(!this.get('isEditing'))
        {
            let editObject = this._parse(this.get('internalEditValue'));
            this.set('editObject', editObject);
            this.set('internalEditValue', this._getStringValue(editObject));
        }
    }),

    updateEditValueFromValue: observer('value', function() {
        this.set('editObject', this._parse(this.get('value')));
        this.set('internalEditValue', this._getStringValue(this.get('editObject')));
        this.updateFromIsEditing();
    }),

    /**
     * Internal property exposed to the input field
     */
    internalEditValue: null,

    isKeyValid: function(evt) {
        evt = (evt) ? evt : window.event;
        let charCode = (evt.which) ? evt.which : evt.keyCode,
            charCodeWhitelist = [];

        //Generate a preview
        let char = evt.key;
        if(["0","1","2","3","4","5","6","7","8","9",":"].indexOf(char) > -1) {
            char = char === ',' ? '.' : char;
            let preview = this._getPreviewValue(evt, char);
            //console.log(preview);
            if(!preview || !this.isValueValid(preview)) {
                return false;
            }
        }

        //Allow only numeric chars
        if(char !== ':' && (charCode > 31 && (charCode < 48 || charCode > 57) && (charCode < 96 || charCode > 105)) || charCodeWhitelist.indexOf(charCode) > -1) {
            return false;
        }

        return true;
    },

    isValueValid: function(value) {
        if(!this.get('_formatExpression').test(value)) {
            return false;
        }

        if(value) {
            let obj = this._parse(value);
            if(!(
                (!this.get('isTime') || (this.get('isTime') && obj.hours >= 0 && obj.hours <= 23)) &&
                obj.minutes >= 0 && obj.minutes < 60 &&
                obj.seconds >= 0 && obj.seconds < 60 )) {
                return false;
            }
        }

        return true;
    },

    validationMessage: null,

    focusOut: function() {
        if(!this.isValueValid(this.get('value'), true)) {
            this.set('value', null);
        }
        this.set('isEditing', false);
    },

    focusIn: function() {
        this.set('isEditing', true);
    },

    keyDown: function(evt) {
        let charCodeWhitelist = [
                8/*backspace/delete*/,
                46/*delete*/,
                37,38,39,40/*arrows*/,
                35,36/*home, end*/
            ];

        //Remember current ctrl-key state
        let ctrlDown = this._ctrlDown;

        //Update ctrl-key state
        this._updateControlKeyState(evt);

        //Use previous ctrl-key state to
        if(ctrlDown) {
            charCodeWhitelist.push(65/*a*/);
            charCodeWhitelist.push(86/*v*/);
            charCodeWhitelist.push(67/*c*/);
            charCodeWhitelist.push(88/*x*/);
        }

        charCodeWhitelist.push(9/*tab*/);

        if(charCodeWhitelist.indexOf(evt.charCode || evt.which) > -1){
            return;
        }

        if(!this.isKeyValid(evt))
        {
            evt.preventDefault();
        }
    },

    keyUp: function(evt) {
        //Update ctrl-key state
        this._updateControlKeyState(evt);
    },

    paste: function(evt) {
        let pasteData = evt.originalEvent.clipboardData.getData('text');

        let preview = this._getPreviewValue(evt, pasteData);

        if(!this.isValueValid(preview, true)) {
            return false;
        }
    },

    _getPreviewValue: function(evt, str) {
        let selection = this.getSelection(evt.target);
        let displayValue = (this.$('input').val() || '');
        let preview = [displayValue.slice(0, selection.start), str, displayValue.slice(selection.end)].join('');

        return this.get('_formatExpression').test(preview) ? preview : null;
    },

    _ctrlDown: false,

    _controlKeyWhitelist: A(
        17,91/*ctrl,meta*/
    ),

    _updateControlKeyState: function(evt) {
        let isCtrl = this._controlKeyWhitelist.indexOf(evt.charCode || evt.which) > -1;

        if(isCtrl) {
            if(evt.type === 'keydown') {
                this._ctrlDown = true;
            } else if(evt.type == 'keyup') {
                this._ctrlDown = false;
            }
        }
    },

    _getLocalDecimalSeparator: function() {
        let n = 1.1;
        n = n.toLocaleString().substring(1, 2);
        return n;
    }
});
