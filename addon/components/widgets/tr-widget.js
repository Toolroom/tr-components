import Ember from '@ember';
import layout from '../../templates/components/widgets/tr-widget';

export default Ember.Component.extend({
    layout,
    
    routing: Ember.inject.service('-routing'),

    tagName: 'div',
    classNames: 'tr-board-widget',
    classNameBindings: 'widgetLayoutClassNames',
    isEditing: false,

    type: null,
    id: null,
    boardId: null,

    data: null,
    _contentDidChange: Ember.observer('data', function() {
        var data = this.get('data');

        if(!data) return;

        var content = this.get('data.object'),
            identifier = this.getIdentifier();

        if(!content[identifier]) {
            content[identifier] = { identifier: identifier, position: {
                x: 0,
                y: 0,
                width: this.get('minWidth'),
                height: this.get('minHeight')
            }};
        }

        this.set('x', content[identifier].position.x);
        this.set('y', content[identifier].position.y);
        this.set('width', content[identifier].position.width);
        this.set('height', content[identifier].position.height);
    }),//.on('init'),

    _init: false,
    _size: 160,
    _gridSize: 168,

    onChange: null,
    onIsEditingChanged: Ember.observer('isEditing', function() {
        if(this.get('isEditing')) {
            var self = this;
            this.$()
                .resizable({
                    resize: function(event, ui) {
                        var minWidth = self.get('minWidth'),
                            maxWidth = self.get('maxWidth'),
                            minHeight = self.get('minHeight'),
                            maxHeight = self.get('maxHeight');

                        var currentW = $(ui.element).outerWidth(),
                            width = parseInt((currentW+8) / 168);
                        self.$(ui.element).css('width', '');
                        width = width < minWidth ? minWidth : (width > maxWidth ? maxWidth : width);
                        self.set('width', width);

                        var currentH = $(ui.element).outerHeight(),
                            height = parseInt((currentH+8) / 168);
                        self.$(ui.element).css('height', '');
                        height = height < minHeight ? minHeight : (height > maxHeight ? maxHeight : height);
                        self.set('height', height);

                        self.triggerOnChange();
                    }
                })
                .draggable({
                    grid: [ self._gridSize, self._gridSize],
                    //stack: '#' + this.get('elementId') + '>.tr-board-widget'
                    stop: function(event, ui) {

                        var currentX = ui.position.left;
                        self.set('x', parseInt((currentX-8) / 168));

                        var currentY = ui.position.top;
                        self.set('y', parseInt((currentY-8) / 168));

                        self.triggerOnChange();
                    }
                });
            this.set('_init', true);
        } else {
            if(this.get('_init'))
            {
                try {
                    this.$().resizable('destroy');
                    this.$().draggable('destroy');
                } catch(ex) {
                    console.warn(ex);
                }
            }
        }
    }),
    willDestroyElement() {
        this._super();
        this.set('_init', false);
        if(this.get('_init'))
        {
            try {
                this.$().resizable('destroy');
                this.$().draggable('destroy');
            } catch(ex) {
                console.warn(ex);
            }
        }
    },

    _resizeTrigger: Ember.observer('x', 'y', 'width', 'height', function() {
       if(this.onResize) this.onResize();
    }),
    widgetLayoutClassNames: Ember.computed('x', 'y', 'width', 'height', {
        get() {
            var x = this.get('x'),
                y = this.get('y'),
                width = this.get('width'),
                height = this.get('height'),
                size = this.get('_size');

            //console.log(width + " x " + height);

            this.set('absWidth', width * size + ((width - 1) * 8));
            this.set('absHeight', height * size + ((height - 1) * 8));
            this.set('absX', (x * size) + (x + 1) * 8);
            this.set('absY', (y * size) + (y + 1) * 8);

            return `tr-board-widget-x-${x} tr-board-widget-y-${y} tr-board-widget-w-${width} tr-board-widget-h-${height}`;
        }
    }),
 
    getIdentifier() {
        var boardId = this.get('boardId'),
            type = this.get('type'),
            id = this.get('id');

        var str = `widget___${boardId}___${id}___${type}`;

        str = str.replace(new RegExp('[.-]', 'g'),'');

        return str;
    },
    getPosition() {
        return {
            x: this.get('x'),
            y: this.get('y'),
            width: this.get('width'),
            height: this.get('height')
        };
    },
    triggerOnChange() {
        var fun = this.get('onChange');
        if(!fun) return;

        var identifier = this.getIdentifier(),
            position = this.getPosition();

        fun(identifier, position);
    },

    onResize: null,

    x: 0,
    y: 0,

    width: 1,
    minWidth: 1,
    maxWidth: 4,

    height: 1,
    minHeight: 1,
    maxHeight: 4,

    absX: 0,
    absY: 0,
    absWidth: 160,
    absHeight: 160,
    absPadding: 8,

    _updateStyle: Ember.observer('absX', 'absY', 'absWidth', 'absHeight', function() {
        this.$().css('left', this.get('absX'));
        this.$().css('top', this.get('absY'));
        this.$().css('width', this.get('absWidth'));
        this.$().css('height', this.get('absHeight'));
    }).on('didInsertElement')
});
