import Component from '@ember/component';
import layout from '../templates/components/tr-sticky-header';

export default Component.extend({
    layout,
    classNames: 'tr-sticky-header',
    classNameBindings: ['showImage:tr-sticky-header-with-image','image:tr-sticky-header-with-image'],

    header: null,
    subheader: null,

    image: null,
    imagePlaceholder: null,
    showImage: false,
    showImageUpload: false,
    showImagePlaceholder: true,

    onUpload: null,
    onDelete: null
});
