import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

mod = importlib.import_module("remove-k-digits")
remove_k_digits = mod.remove_k_digits

assert remove_k_digits("1432219", 3) == "1219"
assert remove_k_digits("10200", 1) == "200"
assert remove_k_digits("10", 2) == "0"
assert remove_k_digits("12345", 0) == "12345"
assert remove_k_digits("100", 1) == "0"
assert remove_k_digits("9", 1) == "0"
assert remove_k_digits("12345", 3) == "12"
assert remove_k_digits("1111111", 3) == "1111"
assert remove_k_digits("9876", 2) == "76"
assert remove_k_digits("12345", 5) == "0"

if __name__ == "__main__":
    print("All tests passed!")
