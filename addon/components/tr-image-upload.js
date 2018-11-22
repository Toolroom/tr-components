import Component from '@ember/component';
import { htmlSafe } from '@ember/string';
import { computed } from '@ember/object';
import layout from '../templates/components/tr-image-upload';

export default Component.extend({
    layout,

    classNames: 'tr-image-upload',

    image: null,
    safeImage: computed('image', function() {
        return new htmlSafe("background-image: url(" + this.get('image') + ")" );
    }),
    imagePlaceholder: null,
    showImageUpload: false,
    showImageDelete: false,
    showImagePlaceholder: true,

    onUpload: null,
    onDelete: null,

    actions: {
        uploadFile(file) {
            let onUpload = this.get('onUpload'),
                showImageUpload = this.get('showImageUpload');
            if (!onUpload) return;
            if(showImageUpload) {
                onUpload(file);
            }
        },
        deleteFile(image) {
            let onDelete= this.get('onDelete'),
                showImageDelete = this.get('showImageDelete');
            if(!onDelete) return;
            if(showImageDelete) {
              onDelete(image);
            }
        }
    }
});
