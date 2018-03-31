import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tr-name-for', 'helper:tr-name-for', {
  integration: true
});

// Replace this with your real tests.
test('it renders', function(assert) {
  this.set('inputValue', '1234');

  this.render(hbs`{{tr-name-for inputValue}}`);

  assert.equal(this.$().text().trim(), '1234');
});
