import { helper } from '@ember/component/helper';

export function trNameFor(params/*, hash*/) {
  if(!params || !params[0]) return;

  return params[0].constructor.modelName;
}

export default helper(trNameFor);
