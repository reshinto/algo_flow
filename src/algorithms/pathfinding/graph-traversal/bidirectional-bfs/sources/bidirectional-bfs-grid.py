from collections import deque
from typing import List, Tuple, Optional


# Bidirectional BFS — BFS from start and end simultaneously, meeting in the middle
def bidirectional_bfs(
    grid: List[List[dict]],
    start: Tuple[int, int],
    end: Tuple[int, int],
) -> dict:
    row_count = len(grid)  # @step:initialize
    col_count = len(grid[0])  # @step:initialize

    if start == end:
        return {"path": [start], "visited": [start]}  # @step:complete

    # Separate parent maps for forward and backward searches
    forward_parent = [[None] * col_count for _ in range(row_count)]  # @step:initialize
    backward_parent = [[None] * col_count for _ in range(row_count)]  # @step:initialize
    forward_visited = [[False] * col_count for _ in range(row_count)]  # @step:initialize
    backward_visited = [[False] * col_count for _ in range(row_count)]  # @step:initialize

    forward_queue = deque([(start[0], start[1])])  # @step:initialize,open-node
    backward_queue = deque([(end[0], end[1])])  # @step:initialize,open-node
    forward_visited[start[0]][start[1]] = True  # @step:open-node
    backward_visited[end[0]][end[1]] = True  # @step:open-node

    directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]
    all_visited = []

    while forward_queue or backward_queue:
        # Expand forward frontier one step
        if forward_queue:
            current_row, current_col = forward_queue.popleft()  # @step:close-node
            all_visited.append((current_row, current_col))  # @step:close-node

            for delta_row, delta_col in directions:
                neighbor_row = current_row + delta_row
                neighbor_col = current_col + delta_col
                if neighbor_row < 0 or neighbor_row >= row_count:
                    continue
                if neighbor_col < 0 or neighbor_col >= col_count:
                    continue
                if grid[neighbor_row][neighbor_col]["type"] == "wall":
                    continue
                if forward_visited[neighbor_row][neighbor_col]:
                    continue
                forward_visited[neighbor_row][neighbor_col] = True  # @step:open-node
                forward_parent[neighbor_row][neighbor_col] = (current_row, current_col)  # @step:open-node
                forward_queue.append((neighbor_row, neighbor_col))  # @step:open-node

                if backward_visited[neighbor_row][neighbor_col]:
                    path = build_path(forward_parent, backward_parent, (neighbor_row, neighbor_col))
                    return {"path": path, "visited": all_visited}  # @step:trace-path

        # Expand backward frontier one step
        if backward_queue:
            current_row, current_col = backward_queue.popleft()  # @step:close-node
            all_visited.append((current_row, current_col))  # @step:close-node

            for delta_row, delta_col in directions:
                neighbor_row = current_row + delta_row
                neighbor_col = current_col + delta_col
                if neighbor_row < 0 or neighbor_row >= row_count:
                    continue
                if neighbor_col < 0 or neighbor_col >= col_count:
                    continue
                if grid[neighbor_row][neighbor_col]["type"] == "wall":
                    continue
                if backward_visited[neighbor_row][neighbor_col]:
                    continue
                backward_visited[neighbor_row][neighbor_col] = True  # @step:open-node
                backward_parent[neighbor_row][neighbor_col] = (current_row, current_col)  # @step:open-node
                backward_queue.append((neighbor_row, neighbor_col))  # @step:open-node

                if forward_visited[neighbor_row][neighbor_col]:
                    path = build_path(forward_parent, backward_parent, (neighbor_row, neighbor_col))
                    return {"path": path, "visited": all_visited}  # @step:trace-path

    return {"path": [], "visited": all_visited}  # @step:complete


def build_path(
    forward_parent: List[List[Optional[Tuple[int, int]]]],
    backward_parent: List[List[Optional[Tuple[int, int]]]],
    meeting_point: Tuple[int, int],
) -> List[Tuple[int, int]]:
    forward_path = []
    current = meeting_point
    while current is not None:
        forward_path.append(current)
        current = forward_parent[current[0]][current[1]]
    forward_path.reverse()

    backward_path = []
    current = backward_parent[meeting_point[0]][meeting_point[1]]
    while current is not None:
        backward_path.append(current)
        current = backward_parent[current[0]][current[1]]

    return forward_path + backward_path
