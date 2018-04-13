import { helper } from '@ember/component/helper';

export function padEnd(params/*, hash*/) {
    let str = params[0],
        length = params[1] || 0,
        char = params[2] || ' ';

    if(str === null || str === undefined) return null;

    str = str.toString();

    while(str.length < length) {
        str = str + char;
    }

    return str;
}

export default helper(padEnd);
