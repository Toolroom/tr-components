import { helper } from '@ember/component/helper';

export function padStart(params/*, hash*/) {
    let str = params[0],
        length = params[1] || 0,
        char = params[2] || ' ';

    if(str === null || str === undefined) return null;

    str = str.toString();

    while(str.length < length) {
        str = char + str;
    }

    return str;
}

export default helper(padStart);
