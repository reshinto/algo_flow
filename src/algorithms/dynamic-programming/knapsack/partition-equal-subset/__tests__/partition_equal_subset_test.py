import importlib
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))
mod = importlib.import_module("partition-equal-subset")
partition_equal_subset = mod.partition_equal_subset

assert partition_equal_subset([1, 5, 11, 5]) == True, "[1,5,11,5] should return True"
assert partition_equal_subset([1, 2, 3, 5]) == False, "[1,2,3,5] should return False"
assert partition_equal_subset([1, 1]) == True, "[1,1] should return True"
assert partition_equal_subset([1]) == False, "[1] should return False"
assert partition_equal_subset([1, 2, 4]) == False, "[1,2,4] odd sum should return False"
assert partition_equal_subset([3, 3, 3, 3]) == True, "[3,3,3,3] should return True"
assert partition_equal_subset([2, 2, 1, 1]) == True, "[2,2,1,1] should return True"
assert partition_equal_subset([1, 2, 5]) == False, "[1,2,5] should return False"

if __name__ == "__main__":
    print("All tests passed!")
