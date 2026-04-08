import importlib
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))
mod = importlib.import_module("knapsack-01")
knapsack_01 = mod.knapsack_01

assert knapsack_01([2, 3, 4, 5], [3, 4, 5, 6], 8) == 10, "default input should return 10"
assert knapsack_01([1, 2, 3], [6, 10, 12], 5) == 22, "[1,2,3] values=[6,10,12] cap=5 should return 22"
assert knapsack_01([2], [3], 1) == 0, "item too heavy should return 0"
assert knapsack_01([1], [1], 1) == 1, "exact fit should return 1"
assert knapsack_01([], [], 10) == 0, "empty items should return 0"
assert knapsack_01([2, 3], [4, 5], 0) == 0, "zero capacity should return 0"
assert knapsack_01([3, 5], [4, 10], 5) == 10, "[3,5] values=[4,10] cap=5 should return 10"
assert knapsack_01([1, 2, 3], [1, 6, 10], 5) == 16, "best combo should return 16"
assert knapsack_01([3], [5], 9) == 5, "0/1 constraint: item used at most once"

if __name__ == "__main__":
    print("All tests passed!")
