import Ember from 'ember';

export default Ember.Component.extend({
    classNames: 'tr-image-upload',

    image: null,
    safeImage: Ember.computed('image', function() {
        return new Ember.String.htmlSafe("background-image: url(" + this.get('image') + ")" );
    }),
    imagePlaceholder: null,
    showImageUpload: false,
    showImagePlaceholder: true,

    onUpload: null,
    onDelete: null,

    actions: {
        uploadFile(file) {
            var onUpload = this.get('onUpload'),
                showImageUpload = this.get('showImageUpload');
            if(showImageUpload) {
                onUpload(file);
            }
        },
        deleteFile(image) {
            var onDelete= this.get('onDelete');
            if(!onDelete) return;
            onDelete(image);
        }
    }
});