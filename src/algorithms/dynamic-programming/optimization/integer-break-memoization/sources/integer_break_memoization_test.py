import importlib
import sys
import os

sys.path.insert(0, os.path.dirname(__file__))
mod = importlib.import_module("integer-break-memoization")
integer_break_memoization = mod.integer_break_memoization

assert integer_break_memoization(2) == 1, "n=2 should return 1"
assert integer_break_memoization(3) == 2, "n=3 should return 2"
assert integer_break_memoization(4) == 4, "n=4 should return 4"
assert integer_break_memoization(5) == 6, "n=5 should return 6"
assert integer_break_memoization(6) == 9, "n=6 should return 9"
assert integer_break_memoization(7) == 12, "n=7 should return 12"
assert integer_break_memoization(8) == 18, "n=8 should return 18"
assert integer_break_memoization(9) == 27, "n=9 should return 27"
assert integer_break_memoization(10) == 36, "n=10 should return 36"
assert integer_break_memoization(13) == 108, "n=13 should return 108"

if __name__ == "__main__":
    print("All tests passed!")
