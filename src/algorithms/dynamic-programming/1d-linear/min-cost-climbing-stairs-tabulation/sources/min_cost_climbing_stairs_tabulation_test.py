import importlib
import sys
import os

sys.path.insert(0, os.path.dirname(__file__))
mod = importlib.import_module("min-cost-climbing-stairs-tabulation")
min_cost_climbing_stairs_tabulation = mod.min_cost_climbing_stairs_tabulation

assert min_cost_climbing_stairs_tabulation([]) == 0, "empty array should return 0"
assert min_cost_climbing_stairs_tabulation([10, 15]) == 10, "[10,15] should return 10"
assert min_cost_climbing_stairs_tabulation([10, 15, 20]) == 15, "[10,15,20] should return 15"
assert min_cost_climbing_stairs_tabulation([10, 15, 20, 5, 25, 10]) == 30, "default input should return 30"
assert min_cost_climbing_stairs_tabulation([1, 100, 1, 1, 1, 100, 1, 1, 100, 1]) == 6, "leetcode example should return 6"
assert min_cost_climbing_stairs_tabulation([5]) == 0, "[5] should return 0"
assert min_cost_climbing_stairs_tabulation([3, 3]) == 3, "[3,3] should return 3"

if __name__ == "__main__":
    print("All tests passed!")
