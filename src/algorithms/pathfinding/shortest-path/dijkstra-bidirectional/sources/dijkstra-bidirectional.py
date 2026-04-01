import heapq
from typing import List, Tuple, Optional


# Dijkstra Bidirectional — two simultaneous Dijkstra searches meeting in the middle
def dijkstra_bidirectional(
    grid: List[List[dict]],
    start: Tuple[int, int],
    end: Tuple[int, int],
) -> dict:
    row_count = len(grid)  # @step:initialize
    col_count = len(grid[0])  # @step:initialize

    # Forward search from start
    forward_distance = [[float("inf")] * col_count for _ in range(row_count)]  # @step:initialize
    forward_distance[start[0]][start[1]] = 0  # @step:initialize
    forward_parent = [[None] * col_count for _ in range(row_count)]  # @step:initialize
    forward_visited = [[False] * col_count for _ in range(row_count)]  # @step:initialize

    # Reverse search from end
    reverse_distance = [[float("inf")] * col_count for _ in range(row_count)]  # @step:initialize
    reverse_distance[end[0]][end[1]] = 0  # @step:initialize
    reverse_parent = [[None] * col_count for _ in range(row_count)]  # @step:initialize
    reverse_visited = [[False] * col_count for _ in range(row_count)]  # @step:initialize

    forward_queue = [(0, start[0], start[1])]  # @step:initialize,open-node
    reverse_queue = [(0, end[0], end[1])]  # @step:initialize,open-node

    directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]
    all_visited = []
    best_cost = float("inf")
    meeting_point = None

    while forward_queue or reverse_queue:
        if forward_queue:
            f_dist, f_row, f_col = heapq.heappop(forward_queue)  # @step:close-node
            if not forward_visited[f_row][f_col]:
                forward_visited[f_row][f_col] = True  # @step:close-node
                all_visited.append((f_row, f_col))

                if reverse_visited[f_row][f_col]:
                    total_cost = forward_distance[f_row][f_col] + reverse_distance[f_row][f_col]
                    if total_cost < best_cost:
                        best_cost = total_cost
                        meeting_point = (f_row, f_col)

                for delta_row, delta_col in directions:
                    neighbor_row = f_row + delta_row
                    neighbor_col = f_col + delta_col
                    if neighbor_row < 0 or neighbor_row >= row_count:
                        continue
                    if neighbor_col < 0 or neighbor_col >= col_count:
                        continue
                    if grid[neighbor_row][neighbor_col]["type"] == "wall":
                        continue
                    if forward_visited[neighbor_row][neighbor_col]:
                        continue
                    new_dist = forward_distance[f_row][f_col] + 1
                    if new_dist < forward_distance[neighbor_row][neighbor_col]:
                        forward_distance[neighbor_row][neighbor_col] = new_dist  # @step:open-node
                        forward_parent[neighbor_row][neighbor_col] = (f_row, f_col)
                        heapq.heappush(forward_queue, (new_dist, neighbor_row, neighbor_col))

        if reverse_queue:
            r_dist, r_row, r_col = heapq.heappop(reverse_queue)  # @step:close-node
            if not reverse_visited[r_row][r_col]:
                reverse_visited[r_row][r_col] = True  # @step:close-node
                all_visited.append((r_row, r_col))

                if forward_visited[r_row][r_col]:
                    total_cost = forward_distance[r_row][r_col] + reverse_distance[r_row][r_col]
                    if total_cost < best_cost:
                        best_cost = total_cost
                        meeting_point = (r_row, r_col)

                for delta_row, delta_col in directions:
                    neighbor_row = r_row + delta_row
                    neighbor_col = r_col + delta_col
                    if neighbor_row < 0 or neighbor_row >= row_count:
                        continue
                    if neighbor_col < 0 or neighbor_col >= col_count:
                        continue
                    if grid[neighbor_row][neighbor_col]["type"] == "wall":
                        continue
                    if reverse_visited[neighbor_row][neighbor_col]:
                        continue
                    new_dist = reverse_distance[r_row][r_col] + 1
                    if new_dist < reverse_distance[neighbor_row][neighbor_col]:
                        reverse_distance[neighbor_row][neighbor_col] = new_dist  # @step:open-node
                        reverse_parent[neighbor_row][neighbor_col] = (r_row, r_col)
                        heapq.heappush(reverse_queue, (new_dist, neighbor_row, neighbor_col))

        if meeting_point is not None:
            forward_min = forward_queue[0][0] if forward_queue else float("inf")
            reverse_min = reverse_queue[0][0] if reverse_queue else float("inf")
            if forward_min + reverse_min >= best_cost:
                break

    if meeting_point is None:
        return {"path": [], "visited": all_visited}  # @step:complete

    forward_path = reconstruct_path(forward_parent, meeting_point)  # @step:trace-path
    reverse_path = reconstruct_reverse_path(reverse_parent, meeting_point)  # @step:trace-path
    path = forward_path + reverse_path[1:]  # @step:trace-path
    return {"path": path, "visited": all_visited}  # @step:trace-path


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


def reconstruct_reverse_path(
    reverse_parent: List[List[Optional[Tuple[int, int]]]],
    meeting_point: Tuple[int, int],
) -> List[Tuple[int, int]]:
    path = []
    current = meeting_point
    while current is not None:
        path.append(current)
        current = reverse_parent[current[0]][current[1]]
    return path
