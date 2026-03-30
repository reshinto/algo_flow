# Bridges (Cut Edges) — finds all bridge edges in an undirected graph using DFS with low-link values
def find_bridges(
    adjacency_list: dict[str, list[str]],
    node_ids: list[str],
) -> list[tuple[str, str]]:
    discovery_time: dict[str, int] = {}  # @step:initialize
    low_link: dict[str, int] = {}  # @step:initialize
    bridges: list[tuple[str, str]] = []  # @step:initialize
    timer = [0]  # @step:initialize

    def dfs(node_id: str, parent_id: str | None) -> None:
        discovery_time[node_id] = timer[0]  # @step:visit
        low_link[node_id] = timer[0]  # @step:visit
        timer[0] += 1  # @step:visit

        neighbors = adjacency_list.get(node_id, [])
        for neighbor_id in neighbors:
            if neighbor_id not in discovery_time:
                dfs(neighbor_id, node_id)  # @step:visit-edge
                low_link[node_id] = min(low_link[node_id], low_link[neighbor_id])  # @step:visit-edge

                if low_link[neighbor_id] > discovery_time[node_id]:
                    bridges.append((node_id, neighbor_id))  # @step:mark-bridge
            elif neighbor_id != parent_id:
                low_link[node_id] = min(low_link[node_id], discovery_time[neighbor_id])  # @step:visit-edge

    for node_id in node_ids:
        if node_id not in discovery_time:
            dfs(node_id, None)  # @step:initialize

    return bridges  # @step:complete
