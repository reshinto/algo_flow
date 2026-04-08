import importlib
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))
mod = importlib.import_module("integer-break-tabulation")
integer_break_tabulation = mod.integer_break_tabulation

assert integer_break_tabulation(2) == 1, "n=2 should return 1"
assert integer_break_tabulation(3) == 2, "n=3 should return 2"
assert integer_break_tabulation(4) == 4, "n=4 should return 4"
assert integer_break_tabulation(5) == 6, "n=5 should return 6"
assert integer_break_tabulation(6) == 9, "n=6 should return 9"
assert integer_break_tabulation(8) == 18, "n=8 should return 18"
assert integer_break_tabulation(10) == 36, "n=10 should return 36"

if __name__ == "__main__":
    print("All tests passed!")
