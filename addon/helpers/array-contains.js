import { helper } from '@ember/component/helper';

export function arrayContains(params/*, hash*/) {
  let array = params[0],
    item = params[1];
  
  return array.includes(item)
}

export default helper(arrayContains);
