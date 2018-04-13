import { helper } from '@ember/component/helper';

export function join(params/*, hash*/) {
    if(params[0] instanceof Array) {
        return params[0].join(params[1], ", ");
    }
    return params[0];
}

export default helper(join);
