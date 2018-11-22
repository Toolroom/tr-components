import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../templates/components/tr-info-tooltip';

export default Component.extend({
  layout,

  init: function() {
    this._super();
    this.get('isVisible');
  },

  tagName: 'span',
  classNames: ['tr-info-tooltip'],
  classNameBindings: ['type'],

  isVisible: computed('title', 'content', function() {
    return !!(this.get('title') || this.get('content'));
  }),

  type: 'info',
  label: '?',
  title: null,
  content: null
});
