import { helper } from '@ember/component/helper';

export function split(params, hash) {
  let str = params[0],
    separator = hash.separator || params[1],
    limit = hash.limit || params[2] || undefined,
    removeEmpty = hash.removeEmpty || params[3] || false,
    removeWhitespace = hash.removeWhitespace || params[4] || false;

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
