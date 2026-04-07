import importlib
import sys
import os

sys.path.insert(0, os.path.dirname(__file__))
mod = importlib.import_module("catalan-numbers")
catalan_number = mod.catalan_number

assert catalan_number(0) == 1, "C(0) should be 1"
assert catalan_number(1) == 1, "C(1) should be 1"
assert catalan_number(2) == 2, "C(2) should be 2"
assert catalan_number(3) == 5, "C(3) should be 5"
assert catalan_number(5) == 42, "C(5) should be 42"
assert catalan_number(8) == 1430, "C(8) should be 1430"

if __name__ == "__main__":
    print("All tests passed!")
