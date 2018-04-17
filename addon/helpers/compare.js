import { helper } from '@ember/component/helper';

export function compare(params/*, hash*/) {
    if(params.length === 3) {
        let v1 = params[0],
            op = params[1],
            v2 = params[2];

        if(v1 instanceof Date) v1 = v1.getTime();
        if(v2 instanceof Date) v2 = v2.getTime();

        switch(op) {
            case "==":
                return v1 == v2;
            case "===":
                return v1 === v2;
            case "!=":
                return v1 != v2;
            case "!==":
                return v1 !== v2;
            case ">":
                return v1 > v2;
            case ">=":
                return v1 >= v2;
            case "<":
                return v1 < v2;
            case "<=":
                return v1 <= v2;
            case "&&":
                return v1 && v2;
            case "||":
                return v1 || v2;
        }
    }
    return params[0] === params[1];
}

export default helper(compare);
