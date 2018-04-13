import { helper } from '@ember/component/helper';

export function range(params/*, hash*/) {
  let first = params[0] || 0,
      last = params[1] || 0,
      inclusive = params[2] || false,
      target = [];

  if(inclusive) {
    if(first < last) {
      for(let current = first; current <= last; current++) target.push(current);
    } else {
      for(let current = first; current >= last; current--) target.push(current)
    }
  } else {
    if(first < last) {
      for(let current = first; current < last; current++) target.push(current);
    } else {
      for(let current = first; current > last; current--) target.push(current)
    }
  }

  return params;
}

export default helper(range);
