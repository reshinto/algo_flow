import importlib
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))
mod = importlib.import_module("perfect-squares")
perfect_squares = mod.perfect_squares

assert perfect_squares(12) == 3, "n=12 should return 3"
assert perfect_squares(13) == 2, "n=13 should return 2"
assert perfect_squares(1) == 1, "n=1 should return 1"
assert perfect_squares(4) == 1, "n=4 should return 1"
assert perfect_squares(7) == 4, "n=7 should return 4"
assert perfect_squares(0) == 0, "n=0 should return 0"
assert perfect_squares(9) == 1, "n=9 should return 1"
assert perfect_squares(5) == 2, "n=5 should return 2"
assert perfect_squares(11) == 3, "n=11 should return 3"

if __name__ == "__main__":
    print("All tests passed!")
