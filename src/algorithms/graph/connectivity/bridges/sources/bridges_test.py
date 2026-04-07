import importlib
import sys
import os

sys.path.insert(0, os.path.dirname(__file__))
bridges_module = importlib.import_module("bridges")
find_bridges = bridges_module.find_bridges


def test_finds_two_bridges_in_default_7_node_graph():
    adjacency_list = {
        "A": ["B", "C"],
        "B": ["A", "C"],
        "C": ["B", "A", "D"],
        "D": ["C", "E"],
        "E": ["D", "F", "G"],
        "F": ["E", "G"],
        "G": ["F", "E"],
    }
    node_ids = ["A", "B", "C", "D", "E", "F", "G"]
    result = find_bridges(adjacency_list, node_ids)
    assert len(result) == 2, f"Expected 2 bridges, got {len(result)}"
    bridge_sets = [frozenset(bridge) for bridge in result]
    assert frozenset(["C", "D"]) in bridge_sets, f"Expected C-D bridge, got {bridge_sets}"
    assert frozenset(["D", "E"]) in bridge_sets, f"Expected D-E bridge, got {bridge_sets}"


def test_returns_no_bridges_for_cycle_graph():
    adjacency_list = {
        "A": ["B", "C"],
        "B": ["A", "C"],
        "C": ["A", "B"],
    }
    result = find_bridges(adjacency_list, ["A", "B", "C"])
    assert len(result) == 0, f"Expected empty, got {result}"


def test_finds_single_bridge_in_two_node_graph():
    adjacency_list = {"A": ["B"], "B": ["A"]}
    result = find_bridges(adjacency_list, ["A", "B"])
    assert len(result) == 1, f"Expected 1 bridge, got {len(result)}"
    assert frozenset(result[0]) == frozenset(["A", "B"]), f"Expected A-B, got {result[0]}"


def test_finds_all_edges_as_bridges_in_path_graph():
    adjacency_list = {
        "A": ["B"],
        "B": ["A", "C"],
        "C": ["B", "D"],
        "D": ["C"],
    }
    result = find_bridges(adjacency_list, ["A", "B", "C", "D"])
    assert len(result) == 3, f"Expected 3 bridges, got {len(result)}"


def test_returns_empty_for_fully_connected_graph():
    adjacency_list = {
        "A": ["B", "C", "D"],
        "B": ["A", "C", "D"],
        "C": ["A", "B", "D"],
        "D": ["A", "B", "C"],
    }
    result = find_bridges(adjacency_list, ["A", "B", "C", "D"])
    assert len(result) == 0, f"Expected empty, got {result}"


def test_handles_disconnected_graph_with_bridges_in_each_component():
    adjacency_list = {
        "A": ["B"],
        "B": ["A"],
        "C": ["D"],
        "D": ["C"],
    }
    result = find_bridges(adjacency_list, ["A", "B", "C", "D"])
    assert len(result) == 2, f"Expected 2 bridges, got {len(result)}"
    bridge_sets = [frozenset(bridge) for bridge in result]
    assert frozenset(["A", "B"]) in bridge_sets
    assert frozenset(["C", "D"]) in bridge_sets


def test_returns_no_bridges_for_single_isolated_node():
    result = find_bridges({"A": []}, ["A"])
    assert len(result) == 0, f"Expected empty, got {result}"


if __name__ == "__main__":
    test_finds_two_bridges_in_default_7_node_graph()
    test_returns_no_bridges_for_cycle_graph()
    test_finds_single_bridge_in_two_node_graph()
    test_finds_all_edges_as_bridges_in_path_graph()
    test_returns_empty_for_fully_connected_graph()
    test_handles_disconnected_graph_with_bridges_in_each_component()
    test_returns_no_bridges_for_single_isolated_node()
    print("All tests passed!")
