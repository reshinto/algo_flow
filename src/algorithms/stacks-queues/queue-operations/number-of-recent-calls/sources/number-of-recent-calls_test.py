import importlib

mod = importlib.import_module("number-of-recent-calls")
number_of_recent_calls = mod.number_of_recent_calls

assert number_of_recent_calls([1, 100, 3001, 3002]) == [1, 2, 3, 3]
assert number_of_recent_calls([500]) == [1]
assert number_of_recent_calls([1, 500, 1000, 2000, 3000]) == [1, 2, 3, 4, 5]
assert number_of_recent_calls([1, 100, 3001, 3002, 6002]) == [1, 2, 3, 3, 2]
assert number_of_recent_calls([1, 3001]) == [1, 2]
assert number_of_recent_calls([1, 3002]) == [1, 1]
assert number_of_recent_calls([1, 3002, 6003, 9004]) == [1, 1, 1, 1]
assert number_of_recent_calls([]) == []
assert number_of_recent_calls([100, 200, 300, 400, 500]) == [1, 2, 3, 4, 5]
assert number_of_recent_calls([1000, 2000, 4001, 5001, 7002]) == [1, 2, 2, 2, 2]

if __name__ == "__main__":
    print("All tests passed!")
