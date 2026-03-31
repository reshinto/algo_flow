# Pascal's Triangle Construction
# Builds Pascal's triangle as a 2D matrix with numRows rows.
# Each inner element is the sum of the two elements above it; edges are always 1.
# Time: O(n²) — filling each cell in every row
# Space: O(1) extra (output matrix aside)


def pascals_triangle(num_rows: int) -> list[list[int]]:
    triangle: list[list[int]] = []  # @step:initialize

    for row_idx in range(num_rows):  # @step:initialize
        row = [0] * (row_idx + 1)  # @step:initialize

        row[0] = 1  # @step:compute-value
        row[row_idx] = 1  # @step:compute-value

        for col_idx in range(1, row_idx):
            row[col_idx] = triangle[row_idx - 1][col_idx - 1] + triangle[row_idx - 1][col_idx]  # @step:compute-value

        triangle.append(row)  # @step:complete

    return triangle  # @step:complete
