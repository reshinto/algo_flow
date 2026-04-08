import importlib
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))
mod = importlib.import_module("lis-memoization")
lis_memoization = mod.lis_memoization

assert lis_memoization([]) == 0, "empty sequence should return 0"
assert lis_memoization([42]) == 1, "single element should return 1"
assert lis_memoization([5, 4, 3, 2, 1]) == 1, "strictly descending should return 1"
assert lis_memoization([1, 2, 3, 4, 5]) == 5, "strictly ascending should return 5"
assert lis_memoization([10, 9, 2, 5, 3, 7, 101, 18]) == 4, "[10,9,2,5,3,7,101,18] should return 4"
assert lis_memoization([3, 10, 2, 1, 20]) == 3, "[3,10,2,1,20] should return 3"
assert lis_memoization([3, 2]) == 1, "[3,2] should return 1"
assert lis_memoization([50, 3, 10, 7, 40, 80]) == 4, "[50,3,10,7,40,80] should return 4"
assert lis_memoization([7, 7, 7, 7]) == 1, "all equal elements should return 1"
assert lis_memoization([1, 3, 6, 7, 9, 4, 10, 5, 6]) == 6, "[1,3,6,7,9,4,10,5,6] should return 6"

if __name__ == "__main__":
    print("All tests passed!")
