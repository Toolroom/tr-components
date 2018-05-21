import { helper } from '@ember/component/helper';

export function startsWith(params/*, hash*/) {
    let str = params[0] || '',
        containedStr = params[1] || '',
        base = str.toString();

    if(!base.startsWith)
    {
        return base.indexOf(containedStr) === 0;
    }

    return base.startsWith(containedStr);
}

export default helper(startsWith);
