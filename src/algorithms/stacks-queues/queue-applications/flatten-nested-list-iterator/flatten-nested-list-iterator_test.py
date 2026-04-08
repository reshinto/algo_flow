import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

mod = importlib.import_module("flatten-nested-list-iterator")
flatten_nested_list_iterator = mod.flatten_nested_list_iterator

assert flatten_nested_list_iterator([[1, [2]], 3, [4, [5, 6]]]) == [1, 2, 3, 4, 5, 6]
assert flatten_nested_list_iterator([1, 2, 3, 4]) == [1, 2, 3, 4]
assert flatten_nested_list_iterator([[[7]]]) == [7]
assert flatten_nested_list_iterator([]) == []
assert flatten_nested_list_iterator([[[ ]]]) == []
assert flatten_nested_list_iterator([[1, 2], [3, 4], [5, 6]]) == [1, 2, 3, 4, 5, 6]
assert flatten_nested_list_iterator([[[[42]]]]) == [42]
assert flatten_nested_list_iterator([1, [2, [3, [4]]]]) == [1, 2, 3, 4]
assert flatten_nested_list_iterator([[1], [2], [3]]) == [1, 2, 3]
assert flatten_nested_list_iterator([[1, 1], 2, [1, 1]]) == [1, 1, 2, 1, 1]

if __name__ == "__main__":
    print("All tests passed!")
