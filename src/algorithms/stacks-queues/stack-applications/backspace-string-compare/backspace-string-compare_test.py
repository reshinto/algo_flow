import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

mod = importlib.import_module("backspace-string-compare")
backspace_string_compare = mod.backspace_string_compare

assert backspace_string_compare("ab#c", "ad#c") == True
assert backspace_string_compare("ab##", "c#d#") == True
assert backspace_string_compare("a#c", "b") == False
assert backspace_string_compare("", "") == True
assert backspace_string_compare("a", "a") == True
assert backspace_string_compare("abc", "a") == False
assert backspace_string_compare("#a", "a") == True
assert backspace_string_compare("nzp#o#g", "b#nzp#o#g") == True

if __name__ == "__main__":
    print("All tests passed!")
