import heapq


# Prim's Algorithm — grow MST from start node by always selecting the cheapest outgoing edge
def prims_algorithm(
    adjacency_list: dict[str, list[tuple[str, int]]],
    start_node_id: str,
) -> list[dict[str, str | int]]:
    mst_edges: list[dict[str, str | int]] = []  # @step:initialize
    in_mst_set: set[str] = set()  # @step:initialize
    in_mst_set.add(start_node_id)  # @step:initialize

    # Priority queue entries: (weight, source_node_id, target_node_id)
    priority_queue: list[tuple[int, str, str]] = []  # @step:initialize

    for neighbor_id, edge_weight in adjacency_list.get(start_node_id, []):  # @step:initialize
        heapq.heappush(priority_queue, (edge_weight, start_node_id, neighbor_id))  # @step:initialize

    while priority_queue:
        edge_weight, source_id, target_id = heapq.heappop(priority_queue)  # @step:dequeue

        if target_id in in_mst_set:  # @step:dequeue
            continue

        in_mst_set.add(target_id)  # @step:visit
        mst_edges.append({"source": source_id, "target": target_id, "weight": edge_weight})  # @step:add-to-mst

        for neighbor_id, neighbor_weight in adjacency_list.get(target_id, []):  # @step:relax-edge
            if neighbor_id not in in_mst_set:  # @step:relax-edge
                heapq.heappush(priority_queue, (neighbor_weight, target_id, neighbor_id))  # @step:relax-edge

    return mst_edges  # @step:complete
