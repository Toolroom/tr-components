import { helper } from '@ember/component/helper';

export function split(params/*, hash*/) {
  let str = params[0],
    separator = params.separator || params[1],
    limit = params.limit || params[2] || undefined,
    removeEmpty = params.removeEmpty || params[3] || false,
    removeWhitespace = params.removeWhitespace || params[4] || false;

  if(str == null) return null;

  let arr = str.split(separator, limit);

  if(removeEmpty)
  {
      arr = arr.filter(function(item) {
          if(removeWhitespace) item = item.trim();
          return item !== '';
      });
  }

  return arr;
}

export default helper(split);
