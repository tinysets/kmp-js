import { str_search, indexOf_java } from "./kmp";

setTimeout(() => {
    str_search("abca-abcabcd", "abcabcd");
    indexOf_java("abca-abcabcd", "abcabcd");
}, 1000);