import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

mod = importlib.import_module("min-remove-to-make-valid")
min_remove_to_make_valid = mod.min_remove_to_make_valid

assert min_remove_to_make_valid("(ab)") == "(ab)"
assert min_remove_to_make_valid("a(b(c)d") == "ab(c)d"
assert min_remove_to_make_valid("a)b") == "ab"
assert min_remove_to_make_valid("))ab") == "ab"
assert min_remove_to_make_valid("ab((") == "ab"
assert min_remove_to_make_valid("lee(t(c)o)de)") == "lee(t(c)o)de"
assert min_remove_to_make_valid(")))") == ""
assert min_remove_to_make_valid("") == ""
assert min_remove_to_make_valid("abcdef") == "abcdef"
assert min_remove_to_make_valid("((()))") == "((()))"
assert min_remove_to_make_valid(")a(b(c)d(") == "ab(c)d"

if __name__ == "__main__":
    print("All tests passed!")
