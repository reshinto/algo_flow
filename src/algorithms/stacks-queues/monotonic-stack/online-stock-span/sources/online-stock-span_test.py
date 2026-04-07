import importlib

mod = importlib.import_module("online-stock-span")
online_stock_span = mod.online_stock_span

assert online_stock_span([100, 80, 60, 70, 60, 75, 85]) == [1, 1, 1, 2, 1, 4, 6]
assert online_stock_span([50]) == [1]
assert online_stock_span([100, 90, 80, 70]) == [1, 1, 1, 1]
assert online_stock_span([10, 20, 30, 40]) == [1, 2, 3, 4]
assert online_stock_span([50, 50, 50, 50]) == [1, 2, 3, 4]
assert online_stock_span([3, 1, 2]) == [1, 1, 2]
assert online_stock_span([5, 10]) == [1, 2]
assert online_stock_span([10, 5]) == [1, 1]
assert online_stock_span([7, 7]) == [1, 2]
assert online_stock_span([1, 3, 1, 3, 1]) == [1, 2, 1, 4, 1]

if __name__ == "__main__":
    print("All tests passed!")
