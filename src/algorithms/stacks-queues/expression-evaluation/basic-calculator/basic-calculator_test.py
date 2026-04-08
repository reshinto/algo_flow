import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))
import sys

mod = importlib.import_module("basic-calculator")
basic_calculator = mod.basic_calculator

assert basic_calculator("1 + 1") == 2
assert basic_calculator(" 2-1 + 2 ") == 3
assert basic_calculator("(1+(4+5+2)-3)+(6+8)") == 23
assert basic_calculator("1 + (2 - 3)") == 0
assert basic_calculator("42") == 42
assert basic_calculator("10 - 3") == 7
assert basic_calculator("(((1 + 2)))") == 3
assert basic_calculator("1 - (2 + 3)") == -4

if __name__ == "__main__":
    print("All tests passed!")
