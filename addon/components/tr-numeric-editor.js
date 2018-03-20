import Ember from 'ember';
import Editor from './tr-text-editor';
import layout from '../templates/components/tr-numeric-editor';
const { next } = Ember.run;

export default Editor.extend({
    layout,

    init: function() {
        this._super();
        this.setup();
    },

    setup: function() {
        var value = this.get('value'),
            fractionLength = this.get('fractionLength');

        if(!this.isNumericValue(value)) value = this.nullValue();

        var editValueStr = value === null ? '' : value.toString().replace(',','.');
        var editValue = (fractionLength > 0 ? Number.parseFloat(editValueStr) : Number.parseInt(editValueStr));
        if(!this.isNumericValue(editValue)) editValue = this.nullValue();

        this._editValue = editValue;

        var displayValue = this.isNumericValue(editValue) ? editValue.toLocaleString() : null;
        this.set('displayValue', displayValue);
        this.set('internalEditValue', displayValue);
    },

    _editValue: undefined,

    allowNull: true,

    /**
     * Defines the minimum editValue
     */
    minValue: Number.MIN_SAFE_INTEGER,

    /**
     * Defines the maximum editValue
     */
    maxValue: Number.MAX_SAFE_INTEGER,

    /**
     * Defines the maximum allowed fraction length
     */
    fractionLength: 2,

    /**
     * The formatted value
     */
    displayValue: null,

    editValueDidChange: Ember.observer('editValue', function() {
        var editValue = this.get('editValue'),
            fractionLength = this.get('fractionLength');

        editValue = (fractionLength > 0 ? Number.parseFloat(editValue) : Number.parseInt(editValue));
        if(editValue === null || Number.isNaN(editValue)) editValue = this.nullValue();
        var editValueStr = editValue === null ? null : editValue.toFixed(fractionLength);
        editValue = (fractionLength > 0 ? Number.parseFloat(editValueStr) : Number.parseInt(editValueStr));
        if(editValue === null || Number.isNaN(editValue)) editValue = this.nullValue();

        this.set('displayValue', editValue ? editValue.toLocaleString() : null);
    }),

    /**
     * The NUMBER value of the editor
     */
    editValue: Ember.computed('value', {
        set(sender, value) {
            var fractionLength = this.get('fractionLength');
            value = value ? value.toString() : '';
            value = value.replace(',','.');
            value = (fractionLength > 0 ? Number.parseFloat(value) : Number.parseInt(value));
            if(value === null || Number.isNaN(value)) value = this.nullValue();

            this.set('value', value);

            this._editValue = value;
            this.notifyPropertyChange('editValue');
        },
        get() {
            return this._editValue;
        }
    }).volatile(),

    /**
     * Defines if the internalEditorValue has to show displayValue or editValue
     */
    isEditing: false,

    /**
     * Synchronizes the editValue with the value
     */
    updateEditValueFromValue: Ember.observer('value', function() {
        var value = this.get('value'),
            fractionLength = this.get('fractionLength');

        if(value === null || value === undefined) value = this.nullValue();

        var editValueStr = (value || '').toString().replace(',','.');
        var editValue = (fractionLength > 0 ? Number.parseFloat(editValueStr) : Number.parseInt(editValueStr));
        if(editValue === null || Number.isNaN(editValue)) editValue = this.nullValue();

        this.set('editValue', editValue);
        this.updateFromIsEditing();
    }),

    isNumericValue(val) {
        return val !== null && val !== undefined && !Number.isNaN(val);
    },

    updateEditValueFromInternalEditValue: Ember.observer('internalEditValue', function() {
        if(!this.get('isEditing')) return;
        var internalEditValue = this.get('internalEditValue'),
            internalEditValueStr = (this.isNumericValue(internalEditValue) ? internalEditValue.toString() : '').replace(',','.'),
            fractionLength = this.get('fractionLength');

        var editValue = (fractionLength > 0 ? Number.parseFloat(internalEditValueStr) : Number.parseInt(internalEditValueStr));
        if(editValue === null || Number.isNaN(editValue)) editValue = this.nullValue();
        editValue = editValue === null ? null : editValue.toFixed(fractionLength);

        this.set('editValue', editValue);
    }),

    updateFromIsEditing: Ember.observer('isEditing', function() {
        if(this.get('isEditing'))
        {
            var editValue = this.get('editValue');
            if(editValue === null || editValue === undefined) editValue = this.nullValue();
            editValue = (editValue || '').toString();
                /*,
                fractionLength = this.get('fractionLength');

            var editValueStr = editValue.toFixed(fractionLength);
            editValue = (fractionLength > 0 ? Number.parseFloat(editValueStr) : Number.parseInt(editValueStr)) || 0*/;
            this.set('internalEditValue', editValue.replace('.', this._getLocalDecimalSeparator()));
        }
        else
        {
            this.set('internalEditValue', this.get('displayValue'));
        }
    }),

    /**
     * Internal property exposed to the input field
     */
    internalEditValue: null,

    isKeyValid: function(evt) {
        evt = (evt) ? evt : window.event;
        var strVal = (this.get('editValue') || '').toString().replace(',','.'),
            fractionPosition = strVal.indexOf('.'),
            fractionLength = this.get('fractionLength'),
            charCode = (evt.which) ? evt.which : evt.keyCode,
            decimalSeparator = this._getLocalDecimalSeparator(),
            charCodeWhitelist = [],
            selection = this.getSelection(evt.target),
            caretPosition = selection.start;

        //Define allowed fraction separator
        charCodeWhitelist.push(110/*decimal point*/);
        if(decimalSeparator === ',') {
            charCodeWhitelist.push(188/*comma*/);
        }
        else if(decimalSeparator === '.') {
            charCodeWhitelist.push(190/*period*/);
        }

        //Limit fractions if none allowed
        if(charCodeWhitelist.indexOf(charCode) > -1 && fractionLength <= 0) {
            return false;
        }

        //Prevent multiple fraction separators
        if(fractionPosition > -1 && charCode == 46/*=period*/) {
            return false;
        }

        //Limit fractions
        if(caretPosition > fractionPosition)
        {
            if(fractionPosition > -1 && (strVal.length - fractionPosition) > fractionLength) {
                return false;
            }
        }

        //Prevent unallowed negative values
        if(evt.key === "-") {
            if(this.get('minValue') >= 0 || caretPosition > 0)
            {
                return false;
            }
            charCodeWhitelist.push(189/*Hypen*/);
            charCodeWhitelist.push(109/*Subtract*/);
        }

        //Generate a preview
        var char = evt.key;
        if(["0","1","2","3","4","5","6","7","8","9",",",".","-"].indexOf(char) > -1) {
            char = char == ',' ? '.' : char;
            /*var displayValue = (this.$('input').val() || '').replace(',','.');
            var preview = [displayValue.slice(0, selection.start), char, displayValue.slice(selection.end)].join('');//strVal.sli(caretPosition, 0, char);

            var numericPreview = (fractionLength > 0 ? Number.parseFloat(preview) : Number.parseInt(preview)) || null;*/
            var numericPreview = this._getPreviewValue(evt, char);
            if(numericPreview === null || numericPreview === undefined) {
                return false;
            }
            if(numericPreview > this.get('maxValue')) return false;
        }

        //Let decimal separator pass
        if(charCodeWhitelist.indexOf(charCode) > -1) {
            return true;
        }

        //Allow only numeric chars
        if((charCode > 31 && (charCode < 48 || charCode > 57) && (charCode < 96 || charCode > 105)) || charCodeWhitelist.indexOf(charCode) > -1) {
            return false;
        }

        return true;
    },

    isValueValid: function(value, fixValueOnValidation) {
        var fractionLength = this.get('fractionLength'),
            min = this.get('minValue'),
            max = this.get('maxValue'),
            allowNull = this.get('allowNull');

        if(!this.isNumericValue(value)) value = this.nullValue();

        //Define allowed fraction separator on string input
        if(value && value.replace)
        {
            value = value.replace(",",".");
        }

        var val = fractionLength > 0 ? Number.parseFloat(value) : Number.parseInt(value);

        //if(val === null || Number.isNaN(val)) val = allowNull ? null : 0;
        if(Number.isNaN(val)) val = null;

        let high = val > max,
            low = val < min,
            nullIncident = !allowNull && val === null;

        //Fix value
        if(fixValueOnValidation) {
            if(nullIncident) {
                this.set('value', this.nullValue());
            } else {
                if(high) {
                    this.set('value', max);
                } else if(low) {
                    this.set('value', min);
                }
            }
        }

        return !low && !high && !nullIncident;
    },

    validationMessage: null,

    nullValue() {
        if(this.get('allowNull')) return null;

        let min = this.get('minValue'),
            max = this.get('maxValue');

        return 0 >= min && 0 <= max ? 0 : min
    },

    focusOut: function() {
        if(!this.isValueValid(this.get('value'), true)) {
            this.set('value', this.get('minValue'));
        }
        /*this.set('internalEditValue', null);
        this.updateEditValueFromValue();
        next(this, function() {
            this.set('isEditing', false);
        })*/
    },

    focusIn: function() {
        this.set('isEditing', true);
    },

    keyDown: function(evt) {
        //var decimalSeparator = this._getLocalDecimalSeparator(),
        var charCodeWhitelist = [
            8/*backspace/delete*/,
            46/*delete*/,
            37,38,39,40/*arrows*/,
            35,36/*home, end*/
        ];

        //Remember current ctrl-key state
        var ctrlDown = this._ctrlDown;

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

    keyPress: function(evt) {
        //return this.isKeyValid(evt);
    },

    keyUp: function(evt) {
        //Update ctrl-key state
        this._updateControlKeyState(evt);
    },

    paste: function(evt) {
        var pasteData = evt.originalEvent.clipboardData.getData('text');

        if(pasteData.length > 0) {
            pasteData = pasteData.replace(',','.');
            if(pasteData[0] === '-' && this.get('minValue') >= 0) {
                pasteData = pasteData.substr(1);
            }
        }

        var numericPreview = this._getPreviewValue(evt, pasteData);

        if(numericPreview == null || numericPreview.toString().indexOf(pasteData) == -1 || !this.isValueValid(numericPreview, true)) {
            return false;
        }
    },

    _getPreviewValue: function(evt, str) {
        var selection = this.getSelection(evt.target);
        var fractionLength = this.get('fractionLength');
        var displayValue = (this.$('input').val() || '').replace(',','.');

        str = str.replace(',','.');

        var preview = [displayValue.slice(0, selection.start), str, displayValue.slice(selection.end)].join('');

        //If negative minValues are allowed and just a minus is present > this is ok!
        if(preview === '-' && this.get('minValue') < 0) {
            return preview;
        }

        var numericPreview = (fractionLength > 0 ? Number.parseFloat(preview) : Number.parseInt(preview));
        return typeof(numericPreview) == 'number' && !(isNaN(numericPreview)) ? numericPreview : null;
    },

    _ctrlDown: false,

    _controlKeyWhitelist: [
        17,91/*ctrl,meta*/
    ],

    _updateControlKeyState: function(evt) {
        var isCtrl = this._controlKeyWhitelist.indexOf(evt.charCode || evt.which) > -1;

        if(isCtrl) {
            if(evt.type === 'keydown') {
                this._ctrlDown = true;
            } else if(evt.type == 'keyup') {
                this._ctrlDown = false;
            }
        }
    },

    _getLocalDecimalSeparator: function() {
        var n = 1.1;
        n = n.toLocaleString().substring(1, 2);
        return n;
    }
});
