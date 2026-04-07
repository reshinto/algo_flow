import importlib

mod = importlib.import_module("min-stack")
min_stack = mod.min_stack

assert min_stack([5, 3, 7, 1, 8]) == 1
assert min_stack([1, 2, 3]) == 1
assert min_stack([3, 2, 1]) == 1
assert min_stack([42]) == 42
assert min_stack([7, 7, 7]) == 7
assert min_stack([5, -3, 2, -1]) == -3
assert min_stack([1, 5, 10, 20]) == 1
assert min_stack([20, 10, 5, 1]) == 1

if __name__ == "__main__":
    print("All tests passed!")
