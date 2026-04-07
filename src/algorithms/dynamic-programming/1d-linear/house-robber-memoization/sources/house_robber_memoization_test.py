import importlib
import sys
import os

sys.path.insert(0, os.path.dirname(__file__))
mod = importlib.import_module("house-robber-memoization")
house_robber_memoization = mod.house_robber_memoization

assert house_robber_memoization([]) == 0, "empty array should return 0"
assert house_robber_memoization([5]) == 5, "[5] should return 5"
assert house_robber_memoization([3, 10]) == 10, "[3, 10] should return 10"
assert house_robber_memoization([2, 7, 9, 3, 1]) == 12, "[2,7,9,3,1] should return 12"
assert house_robber_memoization([4, 4, 4, 4]) == 8, "[4,4,4,4] should return 8"
assert house_robber_memoization([1, 2, 3, 1]) == 4, "[1,2,3,1] should return 4"
assert house_robber_memoization([2, 1, 1, 2]) == 4, "[2,1,1,2] should return 4"
assert house_robber_memoization([5, 3, 4, 11, 2]) == 16, "[5,3,4,11,2] should return 16"

if __name__ == "__main__":
    print("All tests passed!")
