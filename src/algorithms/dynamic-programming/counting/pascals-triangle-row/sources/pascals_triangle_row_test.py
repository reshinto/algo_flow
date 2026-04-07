import importlib
import sys
import os

sys.path.insert(0, os.path.dirname(__file__))
mod = importlib.import_module("pascals-triangle-row")
pascals_triangle_row = mod.pascals_triangle_row

assert pascals_triangle_row(0) == [1], "row 0 should be [1]"
assert pascals_triangle_row(1) == [1, 1], "row 1 should be [1,1]"
assert pascals_triangle_row(2) == [1, 2, 1], "row 2 should be [1,2,1]"
assert pascals_triangle_row(3) == [1, 3, 3, 1], "row 3 should be [1,3,3,1]"
assert pascals_triangle_row(4) == [1, 4, 6, 4, 1], "row 4 should be [1,4,6,4,1]"
assert pascals_triangle_row(8) == [1, 8, 28, 56, 70, 56, 28, 8, 1], "row 8 check"

result6 = pascals_triangle_row(6)
assert len(result6) == 7, "row 6 should have length 7"

result5 = pascals_triangle_row(5)
assert result5[0] == 1 and result5[-1] == 1, "first and last should be 1"

result6_list = pascals_triangle_row(6)
row_sum = sum(result6_list)
assert row_sum == 64, "row 6 should sum to 64"

if __name__ == "__main__":
    print("All tests passed!")
