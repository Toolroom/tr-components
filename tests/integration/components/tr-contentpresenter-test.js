import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('tr-contentpresenter', 'Integration | Component | tr contentpresenter', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{tr-contentpresenter}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#tr-contentpresenter}}
      template block text
    {{/tr-contentpresenter}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
