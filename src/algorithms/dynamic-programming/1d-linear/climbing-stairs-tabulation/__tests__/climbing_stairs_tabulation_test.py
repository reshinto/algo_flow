import importlib
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))
mod = importlib.import_module("climbing-stairs-tabulation")
climbing_stairs_tabulation = mod.climbing_stairs_tabulation

assert climbing_stairs_tabulation(0) == 1, "0 stairs should return 1"
assert climbing_stairs_tabulation(1) == 1, "1 stair should return 1"
assert climbing_stairs_tabulation(2) == 2, "2 stairs should return 2"
assert climbing_stairs_tabulation(3) == 3, "3 stairs should return 3"
assert climbing_stairs_tabulation(4) == 5, "4 stairs should return 5"
assert climbing_stairs_tabulation(6) == 13, "6 stairs should return 13"
assert climbing_stairs_tabulation(7) == 21, "7 stairs should return 21"

if __name__ == "__main__":
    print("All tests passed!")
