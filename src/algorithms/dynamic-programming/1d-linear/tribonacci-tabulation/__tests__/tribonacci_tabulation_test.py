import importlib
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))
mod = importlib.import_module("tribonacci-tabulation")
tribonacci_tabulation = mod.tribonacci_tabulation

assert tribonacci_tabulation(0) == 0, "T(0) should be 0"
assert tribonacci_tabulation(1) == 1, "T(1) should be 1"
assert tribonacci_tabulation(2) == 1, "T(2) should be 1"
assert tribonacci_tabulation(4) == 4, "T(4) should be 4"
assert tribonacci_tabulation(7) == 24, "T(7) should be 24"
assert tribonacci_tabulation(10) == 149, "T(10) should be 149"

if __name__ == "__main__":
    print("All tests passed!")
