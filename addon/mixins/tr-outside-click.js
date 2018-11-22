import Mixin from '@ember/object/mixin';
import { on } from '@ember/object/evented';

export default Mixin.create({
    clickInside() {},
    clickOutside() {},

    focusInside() {},
    focusOutside() {},

    triggerAlways: false,
    ignoreDisconnectedClickTargets: true,

    _clickIsInside: false,
    _focusIsInside: false,

    _attachClickOutsideHandler: on('didInsertElement', function() {
        //next(this, this.addClickOutsideListener);
        this.addClickOutsideListener();
        //next(this, this.addFocusListener);
        this.addFocusListener();
    }),

    _removeClickOutsideHandler: on('willDestroyElement', function() {
        this.removeClickOutsideListener();
        this.removeFocusListener();
        this.removeFocusOutsideListener();
    }),

    ownElements: null,

    _getOwnElements(me) {
        let elements = this.get('ownElements') || [];
        elements.push(me || this.$()[0]);
        return elements;
    },

    _contains(target, me) {
        let elements = this._getOwnElements(me);

        for(let idx = 0; idx < elements.length; idx++) {
            if(elements[idx].contains(target) || elements[idx] === target) return true;
        }
        return false;
    },

    addClickOutsideListener: function(){
        let self = this,
            el = this.$()[0];

        this._click_fun = function(e){
            if(self.ignoreDisconnectedClickTargets && e.target.isConnected === false) return;

            if (self._contains(e.target, el)) {
                //Trigger only when entering
                if(self.triggerAlways || !self._clickIsInside)
                {
                    self.clickInside(e);
                }
                self._clickIsInside = true;
            } else{
                //Trigger only when exiting
                if(self.triggerAlways || self._clickIsInside) {
                    self.clickOutside(e);
                }
                self._clickIsInside = false;
            }
        };

        document.addEventListener('click', this._click_fun);
    },

    removeClickOutsideListener: function(){
        document.removeEventListener('click', this._click_fun);
    },

    addFocusOutsideListener: function(){
        let self = this,
            el = this.$()[0];

        this._focus_out_fun = function(e){
            if (self._contains(e.target, el)){
                if(self.triggerAlways || !self._focusIsInside)
                {
                    self.focusInside(e);
                }
                self._focusIsInside = true;
            } else{
                if(self.triggerAlways || self._focusIsInside) {
                    self.removeFocusOutsideListener();
                    self.focusOutside(e);
                }
                self._focusIsInside = false;
            }
        };

        document.addEventListener('focusin', this._focus_out_fun);
    },

    removeFocusOutsideListener: function(){
        document.removeEventListener('focusin', this._focus_out_fun);
    },

    addFocusListener: function(){
        let elements = this._getOwnElements(),
            self = this;

        this._focus_fun = function(e){
            //next(self, self.addFocusOutsideListener);
            self.addFocusOutsideListener();
            self.focusInside(e);
        };

        for(let idx = 0; idx < elements.length; idx++) {
            elements[idx].addEventListener('focusin', this._focus_fun);
        }

        //el.addEventListener('focusin', this._focus_fun);
    },

    removeFocusListener: function(){
        //var el = this.$()[0];
        //el.removeEventListener('focusin', this._focus_fun);

        let elements = this._getOwnElements();

        for(let idx = 0; idx < elements.length; idx++) {
            elements[idx].removeEventListener('focusin', this._focus_fun);
        }
    },
});
