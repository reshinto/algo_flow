import importlib
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))
module = importlib.import_module("hierholzers")
hierholzers_algorithm = module.hierholzers_algorithm


def is_valid_eulerian_circuit(circuit, adjacency_list, start_node_id):
    if not circuit:
        return False
    if circuit[0] != start_node_id:
        return False
    if circuit[-1] != start_node_id:
        return False
    expected_edge_count = sum(len(neighbors) for neighbors in adjacency_list.values()) // 2
    return len(circuit) - 1 == expected_edge_count


def test_finds_eulerian_circuit_on_simple_triangle():
    adjacency_list = {"A": ["B", "C"], "B": ["A", "C"], "C": ["B", "A"]}
    circuit = hierholzers_algorithm(adjacency_list, "A")
    assert circuit[0] == "A"
    assert circuit[-1] == "A"
    assert is_valid_eulerian_circuit(circuit, adjacency_list, "A")


def test_finds_eulerian_circuit_on_default_5_node_graph():
    adjacency_list = {
        "A": ["B", "C", "D", "E"],
        "B": ["A", "C"],
        "C": ["B", "A"],
        "D": ["A", "E"],
        "E": ["D", "A"],
    }
    circuit = hierholzers_algorithm(adjacency_list, "A")
    assert circuit[0] == "A"
    assert circuit[-1] == "A"
    assert is_valid_eulerian_circuit(circuit, adjacency_list, "A")


def test_returns_single_node_circuit_for_graph_with_no_edges():
    adjacency_list = {"A": []}
    circuit = hierholzers_algorithm(adjacency_list, "A")
    assert circuit == ["A"]


def test_finds_eulerian_circuit_on_square():
    adjacency_list = {
        "A": ["B", "D"], "B": ["A", "C"], "C": ["B", "D"], "D": ["C", "A"],
    }
    circuit = hierholzers_algorithm(adjacency_list, "A")
    assert circuit[0] == "A"
    assert circuit[-1] == "A"
    assert is_valid_eulerian_circuit(circuit, adjacency_list, "A")


def test_finds_eulerian_circuit_on_two_triangles_sharing_a_node():
    adjacency_list = {
        "A": ["B", "C", "D", "E"],
        "B": ["A", "C"],
        "C": ["B", "A"],
        "D": ["A", "E"],
        "E": ["D", "A"],
    }
    circuit = hierholzers_algorithm(adjacency_list, "A")
    assert circuit[0] == "A"
    assert circuit[-1] == "A"
    assert len(circuit) == 7


def test_finds_eulerian_circuit_starting_from_non_hub_node():
    adjacency_list = {"A": ["B", "C"], "B": ["A", "C"], "C": ["B", "A"]}
    circuit = hierholzers_algorithm(adjacency_list, "B")
    assert circuit[0] == "B"
    assert circuit[-1] == "B"
    assert len(circuit) == 4


def test_produces_circuit_only_including_nodes_with_edges():
    adjacency_list = {"A": ["B", "C"], "B": ["A", "C"], "C": ["B", "A"]}
    circuit = hierholzers_algorithm(adjacency_list, "A")
    valid_nodes = {"A", "B", "C"}
    for node_id in circuit:
        assert node_id in valid_nodes


if __name__ == "__main__":
    test_finds_eulerian_circuit_on_simple_triangle()
    test_finds_eulerian_circuit_on_default_5_node_graph()
    test_returns_single_node_circuit_for_graph_with_no_edges()
    test_finds_eulerian_circuit_on_square()
    test_finds_eulerian_circuit_on_two_triangles_sharing_a_node()
    test_finds_eulerian_circuit_starting_from_non_hub_node()
    test_produces_circuit_only_including_nodes_with_edges()
    print("All tests passed!")
