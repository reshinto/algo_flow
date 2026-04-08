import importlib
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))
mod = importlib.import_module("unique-paths")
unique_paths = mod.unique_paths

assert unique_paths(3, 7) == 28, "3x7 grid should return 28"
assert unique_paths(1, 1) == 1, "1x1 grid should return 1"
assert unique_paths(3, 2) == 3, "3x2 grid should return 3"
assert unique_paths(3, 3) == 6, "3x3 grid should return 6"
assert unique_paths(1, 5) == 1, "single row should return 1"
assert unique_paths(5, 1) == 1, "single column should return 1"
assert unique_paths(5, 5) == 70, "5x5 grid should return 70"
assert unique_paths(7, 7) == 924, "7x7 grid should return 924"

if __name__ == "__main__":
    print("All tests passed!")
