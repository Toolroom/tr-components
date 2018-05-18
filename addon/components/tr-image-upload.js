import Ember from 'ember';
import layout from '../templates/components/tr-image-upload';

export default Ember.Component.extend({
    layout,

    classNames: 'tr-image-upload',

    image: null,
    safeImage: Ember.computed('image', function() {
        return new Ember.String.htmlSafe("background-image: url(" + this.get('image') + ")" );
    }),
    imagePlaceholder: null,
    showImageUpload: false,
    showImageDelete: false,
    showImagePlaceholder: true,

    onUpload: null,
    onDelete: null,

    actions: {
        uploadFile(file) {
            var onUpload = this.get('onUpload'),
                showImageUpload = this.get('showImageUpload');
            if (!onUpload) return;
            if(showImageUpload) {
                onUpload(file);
            }
        },
        deleteFile(image) {
            var onDelete= this.get('onDelete'),
                showImageDelete = this.get('showImageDelete');
            if(!onDelete) return;
            if(showImageDelete) {
              onDelete(image);
            }
        }
    }
});
