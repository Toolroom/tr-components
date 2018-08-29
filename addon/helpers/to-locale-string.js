import {helper} from '@ember/component/helper';

export function toFixed(params/*, hash*/) {
    if (!params || params.length === 0) return null;

    let value = params[0];

    return value.toLocaleString();
}

export default helper(toFixed);
