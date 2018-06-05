import Component from '@ember/component';
import layout from '../templates/components/tr-blade';

export default Component.extend({
    layout,
    classNames: 'tr-blade',
    classNameBindings: ['hasContent'],

    hasContent: true,

    panel: null,
    content: null,

    navigateBack: null,

    actions: {
        navigateBack () {
            let navigateBack = this.get('navigateBack');
            if(navigateBack) navigateBack();
        }
    }
});
