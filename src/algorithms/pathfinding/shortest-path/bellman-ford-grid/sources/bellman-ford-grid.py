from typing import List, Tuple, Optional


# Bellman-Ford Grid — shortest path via V-1 edge relaxation iterations
def bellman_ford_grid(
    grid: List[List[dict]],
    start: Tuple[int, int],
    end: Tuple[int, int],
) -> dict:
    row_count = len(grid)  # @step:initialize
    col_count = len(grid[0])  # @step:initialize
    vertex_count = row_count * col_count  # @step:initialize
    distance = [[float("inf")] * col_count for _ in range(row_count)]  # @step:initialize
    distance[start[0]][start[1]] = 0  # @step:initialize
    parent = [[None] * col_count for _ in range(row_count)]  # @step:initialize

    # Collect all passable edges
    edges = []  # @step:initialize
    for row_index in range(row_count):
        for col_index in range(col_count):
            if grid[row_index][col_index]["type"] == "wall":
                continue
            for delta_row, delta_col in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                neighbor_row = row_index + delta_row
                neighbor_col = col_index + delta_col
                if neighbor_row < 0 or neighbor_row >= row_count:
                    continue
                if neighbor_col < 0 or neighbor_col >= col_count:
                    continue
                if grid[neighbor_row][neighbor_col]["type"] == "wall":
                    continue
                edges.append((row_index, col_index, neighbor_row, neighbor_col))

    # Relax all edges V-1 times
    for _ in range(vertex_count - 1):
        updated = False
        for from_row, from_col, to_row, to_col in edges:
            if distance[from_row][from_col] == float("inf"):
                continue
            new_distance = distance[from_row][from_col] + 1  # @step:update-cost
            if new_distance < distance[to_row][to_col]:  # @step:update-cost
                distance[to_row][to_col] = new_distance  # @step:update-cost
                parent[to_row][to_col] = (from_row, from_col)
                updated = True
        if not updated:
            break  # Early termination if no updates

    # Collect visited cells
    visited = []  # @step:close-node
    for row_index in range(row_count):
        for col_index in range(col_count):
            if distance[row_index][col_index] < float("inf"):
                visited.append((row_index, col_index))  # @step:close-node

    if distance[end[0]][end[1]] == float("inf"):
        return {"path": [], "visited": visited}  # @step:complete

    path = reconstruct_path(parent, end)  # @step:trace-path
    return {"path": path, "visited": visited}  # @step:trace-path


def reconstruct_path(
    parent: List[List[Optional[Tuple[int, int]]]],
    end: Tuple[int, int],
) -> List[Tuple[int, int]]:
    path = []
    current = end
    while current is not None:
        path.append(current)
        current = parent[current[0]][current[1]]
    path.reverse()
    return path
