import importlib
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))
module = importlib.import_module("ford-fulkerson")
ford_fulkerson = module.ford_fulkerson


def test_computes_max_flow_for_simple_linear_path():
    graph = {"S": [{"target": "T", "capacity": 5}], "T": []}
    assert ford_fulkerson(graph, "S", "T") == 5


def test_computes_max_flow_limited_by_bottleneck_edge():
    graph = {"S": [{"target": "A", "capacity": 10}], "A": [{"target": "T", "capacity": 3}], "T": []}
    assert ford_fulkerson(graph, "S", "T") == 3


def test_computes_max_flow_across_two_parallel_paths():
    graph = {
        "S": [{"target": "A", "capacity": 5}, {"target": "B", "capacity": 5}],
        "A": [{"target": "T", "capacity": 5}],
        "B": [{"target": "T", "capacity": 5}],
        "T": [],
    }
    assert ford_fulkerson(graph, "S", "T") == 10


def test_computes_max_flow_for_default_6_node_network():
    graph = {
        "S": [{"target": "A", "capacity": 10}, {"target": "B", "capacity": 8}],
        "A": [{"target": "B", "capacity": 5}, {"target": "C", "capacity": 7}],
        "B": [{"target": "D", "capacity": 10}],
        "C": [{"target": "D", "capacity": 3}, {"target": "T", "capacity": 8}],
        "D": [{"target": "T", "capacity": 10}],
        "T": [],
    }
    assert ford_fulkerson(graph, "S", "T") == 17


def test_returns_zero_when_no_path_from_source_to_sink():
    graph = {"S": [{"target": "A", "capacity": 10}], "A": [], "T": []}
    assert ford_fulkerson(graph, "S", "T") == 0


def test_handles_graph_where_source_equals_sink():
    graph = {"S": []}
    assert ford_fulkerson(graph, "S", "S") == 0


def test_respects_capacity_limits():
    graph = {
        "S": [{"target": "A", "capacity": 4}, {"target": "B", "capacity": 2}],
        "A": [{"target": "B", "capacity": 4}, {"target": "T", "capacity": 2}],
        "B": [{"target": "T", "capacity": 4}],
        "T": [],
    }
    assert ford_fulkerson(graph, "S", "T") == 6


if __name__ == "__main__":
    test_computes_max_flow_for_simple_linear_path()
    test_computes_max_flow_limited_by_bottleneck_edge()
    test_computes_max_flow_across_two_parallel_paths()
    test_computes_max_flow_for_default_6_node_network()
    test_returns_zero_when_no_path_from_source_to_sink()
    test_handles_graph_where_source_equals_sink()
    test_respects_capacity_limits()
    print("All tests passed!")
