import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

mod = importlib.import_module("decode-string")
decode_string = mod.decode_string

assert decode_string("3[a]") == "aaa"
assert decode_string("3[a2[c]]") == "accaccacc"
assert decode_string("2[abc]3[cd]ef") == "abcabccdcdcdef"
assert decode_string("abc") == "abc"
assert decode_string("5[z]") == "zzzzz"
assert decode_string("2[2[a]]") == "aaaa"
assert decode_string("") == ""
assert decode_string("10[a]") == "aaaaaaaaaa"
assert decode_string("a2[b]c") == "abbc"

if __name__ == "__main__":
    print("All tests passed!")
