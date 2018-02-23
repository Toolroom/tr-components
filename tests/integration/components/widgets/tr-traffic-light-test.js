import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('widgets/tr-traffic-light', 'Integration | Component | widgets/tr traffic light', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{widgets/tr-traffic-light}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#widgets/tr-traffic-light}}
      template block text
    {{/widgets/tr-traffic-light}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
