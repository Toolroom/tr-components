import Service from '@ember/service';

export default Service.extend({
    makeId(length) {
        let text = "",
            possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        length = length > 4 ? length : 8;

        for (let i = 0; i < length; i++)
        {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return text;
    }
});
