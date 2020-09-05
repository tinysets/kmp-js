"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// from java src: String.java indexOf
function indexOf(source, sourceCount, target, targetCount) {
    let first = target[0];
    let max = sourceCount - targetCount;
    for (let i = 0; i <= max; i++) {
        /* Look for first character. */
        if (source[i] != first) {
            while (++i <= max && source[i] != first)
                ;
        }
        /* Found first character, now look at the rest of v2 */
        if (i <= max) {
            let j = i + 1;
            let end = j + targetCount - 1;
            for (let k = 1; j < end && source[j] == target[k]; j++, k++)
                ;
            if (j == end) {
                /* Found whole string. */
                return i;
            }
        }
    }
    return -1;
}
function indexOf_java(src, test) {
    if (!src || !test) {
        console.log(-1);
        return -1;
    }
    let src_len = src.length;
    let test_len = test.length;
    if (src_len == 0 || test_len == 0 || src_len < test_len) {
        console.log(-1);
        return -1;
    }
    let index = _indexOf_java(src, src_len, test, test_len);
    console.log(index);
    return index;
}
exports.indexOf_java = indexOf_java;
function _indexOf_java(src, src_len, test, test_len) {
    let maxIndex = src_len - test_len;
    let i = 0;
    while (i <= maxIndex) {
        while (i <= maxIndex) {
            if (src[i] == test[0]) {
                break;
            }
            else {
                i++;
            }
        }
        if (i <= maxIndex) {
            let start = i + 1;
            let end = i + test_len;
            for (let j = 1; j <= test_len - 1;) {
                if (src[start] == test[j]) {
                    start++;
                    j++;
                }
                else {
                    i++;
                    break;
                }
            }
            if (start == end) {
                return i;
            }
        }
    }
    return -1;
}
// https://www.cnblogs.com/dusf/p/kmp.html
function str_search(src, test) {
    if (!src || !test) {
        console.log(-1);
        return -1;
    }
    let src_len = src.length;
    let test_len = test.length;
    if (src_len == 0 || test_len == 0 || src_len < test_len) {
        console.log(-1);
        return -1;
    }
    let index = _str_search(src, src_len, test, test_len);
    console.log(index);
    return index;
}
exports.str_search = str_search;
function _str_search(src, src_len, test, test_len) {
    let next = new Array(test_len);
    next[0] = -1;
    next[1] = 0;
    for (let j = 2; j < test_len; j++) {
        // pre
        // post
        let pre_start = 0;
        let pre_end = j - 1 - 1;
        let post_start = 1;
        let post_end = j - 1;
        let k_start = pre_end;
        let k_end = pre_start;
        let final_k = 0;
        for (let k = k_start; k >= k_end; k--) {
            let succ = true;
            for (let i = 0; i <= k; i++) {
                if (test[i] != test[post_end - k + i]) {
                    succ = false;
                    break;
                }
            }
            if (succ) {
                final_k = k + 1;
                break;
            }
        }
        next[j] = final_k;
    }
    let i = 0;
    let j = 0;
    while ((src_len - i) >= test_len) { // 待检测长度大于等于测试字符串长度
        for (; j < test_len;) {
            if (src[i] == test[j]) {
                i++;
                j++;
            }
            else {
                j = next[j];
                if (j == -1) {
                    j = 0;
                    i++;
                }
                break;
            }
        }
        if (j == test_len) {
            // 成功
            return i - test_len;
        }
    }
}
//# sourceMappingURL=kmp.js.map