import { helper } from '@ember/component/helper';

export function instanceOf(params/*, hash*/) {
    if(!params[1]) return false;

    if(typeof(params[0]) !== "object") return false;

    if(params[1].toLowerCase() === 'array') {
        return params[0] instanceof Ember.ArrayProxy ||
            params[0] instanceof Array;
    }

    return false;
}

export default helper(instanceOf);
