import { helper } from '@ember/component/helper';

export function startsWith(params/*, hash*/) {
    let str = params[0] || '',
        containedStr = params[1] || '';

    return str.toString().startsWith(containedStr);
}

export default helper(startsWith);
