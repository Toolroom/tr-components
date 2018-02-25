import Ember from 'ember';
import layout from '../templates/components/tr-info-tooltip';

export default Ember.Component.extend({
  layout,

  init: function() {
    this._super();
    this.get('isVisible');
  },

  tagName: 'span',
  classNames: ['tr-info-tooltip'],
  classNameBindings: ['type'],

  isVisible: Ember.computed('title', 'content', function() {
    return !!(this.get('title') || this.get('content'));
  }),

  type: 'info',
  label: '?',
  title: null,
  content: null
});
