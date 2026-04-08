import importlib
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))
mod = importlib.import_module("fibonacci-tabulation")
fibonacci_tabulation = mod.fibonacci_tabulation

assert fibonacci_tabulation(0) == 0, "F(0) should be 0"
assert fibonacci_tabulation(1) == 1, "F(1) should be 1"
assert fibonacci_tabulation(2) == 1, "F(2) should be 1"
assert fibonacci_tabulation(8) == 21, "F(8) should be 21"
assert fibonacci_tabulation(10) == 55, "F(10) should be 55"
assert fibonacci_tabulation(15) == 610, "F(15) should be 610"

if __name__ == "__main__":
    print("All tests passed!")
