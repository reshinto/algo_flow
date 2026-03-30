# Articulation Points — finds all cut vertices in an undirected graph using DFS with low-link values
def find_articulation_points(
    adjacency_list: dict[str, list[str]],
    node_ids: list[str],
) -> list[str]:
    discovery_time: dict[str, int] = {}  # @step:initialize
    low_link: dict[str, int] = {}  # @step:initialize
    articulation_points: set[str] = set()  # @step:initialize
    timer = [0]  # @step:initialize

    def dfs(node_id: str, parent_id: str | None) -> None:
        discovery_time[node_id] = timer[0]  # @step:visit
        low_link[node_id] = timer[0]  # @step:visit
        timer[0] += 1  # @step:visit
        child_count = 0  # @step:visit

        neighbors = adjacency_list.get(node_id, [])
        for neighbor_id in neighbors:
            if neighbor_id not in discovery_time:
                child_count += 1  # @step:visit-edge
                dfs(neighbor_id, node_id)  # @step:visit-edge
                low_link[node_id] = min(low_link[node_id], low_link[neighbor_id])  # @step:visit-edge

                # Root with multiple children is an articulation point
                if parent_id is None and child_count > 1:
                    articulation_points.add(node_id)  # @step:mark-articulation
                # Non-root: articulation point if no back edge from subtree
                if parent_id is not None and low_link[neighbor_id] >= discovery_time[node_id]:
                    articulation_points.add(node_id)  # @step:mark-articulation
            elif neighbor_id != parent_id:
                low_link[node_id] = min(low_link[node_id], discovery_time[neighbor_id])  # @step:visit-edge

    for node_id in node_ids:
        if node_id not in discovery_time:
            dfs(node_id, None)  # @step:initialize

    return list(articulation_points)  # @step:complete
