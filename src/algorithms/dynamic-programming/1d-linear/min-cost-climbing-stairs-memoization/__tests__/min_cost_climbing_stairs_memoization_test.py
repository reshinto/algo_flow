import importlib
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))
mod = importlib.import_module("min-cost-climbing-stairs-memoization")
min_cost_climbing_stairs_memoization = mod.min_cost_climbing_stairs_memoization

assert min_cost_climbing_stairs_memoization([]) == 0, "empty array should return 0"
assert min_cost_climbing_stairs_memoization([10]) == 0, "[10] single step should return 0"
assert min_cost_climbing_stairs_memoization([10, 15]) == 10, "[10,15] should return 10"
assert min_cost_climbing_stairs_memoization([10, 15, 20]) == 15, "[10,15,20] should return 15"
assert min_cost_climbing_stairs_memoization([10, 15, 20, 5, 25, 10]) == 30, "default input should return 30"
assert min_cost_climbing_stairs_memoization([1, 100, 1, 1, 1, 100, 1, 1, 100, 1]) == 6, "leetcode example should return 6"
assert min_cost_climbing_stairs_memoization([5, 5, 5, 5]) == 10, "equal costs should return 10"
assert min_cost_climbing_stairs_memoization([0, 0, 0, 0]) == 0, "all zeros should return 0"

if __name__ == "__main__":
    print("All tests passed!")
