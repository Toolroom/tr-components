import Ember from 'ember';
const { on } = Ember;
//const { next } = Ember.run;
//import Mixin from '@ember/object/mixin';

export default Ember.Mixin.create({
    clickInside() {},
    clickOutside() {},

    focusInside() {},
    focusOutside() {},

    triggerAlways: false,

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

    addClickOutsideListener: function(){
        var el = this.$()[0],
            self = this;

        this._click_fun = function(e){
            if (el.contains(e.target)){
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

        var el = this.$()[0],
            self = this;

        this._focus_out_fun = function(e){
            if (el.contains(e.target)){
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
        var el = this.$()[0],
            self = this;

        this._focus_fun = function(e){
            //next(self, self.addFocusOutsideListener);
            self.addFocusOutsideListener();
            self.focusInside(e);
        };

        el.addEventListener('focusin', this._focus_fun);
    },

    removeFocusListener: function(){
        var el = this.$()[0];

        el.removeEventListener('focusin', this._focus_fun);
    },
});
