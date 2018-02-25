import EmberObject from '@ember/object';
import TrOutsideClickMixin from '@toolroom/tr-ember-components/mixins/tr-outside-click';
import { module, test } from 'qunit';

module('Unit | Mixin | tr outside click');

// Replace this with your real tests.
test('it works', function(assert) {
  let TrOutsideClickObject = EmberObject.extend(TrOutsideClickMixin);
  let subject = TrOutsideClickObject.create();
  assert.ok(subject);
});
