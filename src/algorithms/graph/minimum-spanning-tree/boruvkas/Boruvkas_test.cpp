#include "sources/Boruvkas.cpp"
#include <cassert>
#include <iostream>
#include <numeric>

int main() {
    auto makeEdge = [](const string& src, const string& tgt, int w) {
        return WeightedEdge{src, tgt, w};
    };
    auto totalWeight = [](const vector<WeightedEdge>& edges) {
        int sum = 0;
        for (auto& e : edges) sum += e.weight;
        return sum;
    };

    // Test 1: 6-node MST
    {
        vector<WeightedEdge> edges = {
            makeEdge("A","B",4), makeEdge("A","C",2), makeEdge("B","C",1), makeEdge("B","D",5),
            makeEdge("C","D",8), makeEdge("C","E",10), makeEdge("D","E",2), makeEdge("D","F",6), makeEdge("E","F",3)
        };
        auto result = Boruvkas::boruvkasAlgorithm(edges, {"A","B","C","D","E","F"});
        assert(result.size() == 5);
        assert(totalWeight(result) == 13);
    }

    // Test 2: V-1 edges
    {
        vector<WeightedEdge> edges = {makeEdge("A","B",3), makeEdge("A","C",1), makeEdge("B","C",2)};
        auto result = Boruvkas::boruvkasAlgorithm(edges, {"A","B","C"});
        assert(result.size() == 2);
    }

    // Test 3: cheapest outgoing edge
    {
        vector<WeightedEdge> edges = {makeEdge("A","B",1), makeEdge("B","C",5), makeEdge("A","C",3)};
        auto result = Boruvkas::boruvkasAlgorithm(edges, {"A","B","C"});
        assert(result.size() == 2);
        vector<int> weights;
        for (auto& e : result) weights.push_back(e.weight);
        sort(weights.begin(), weights.end());
        assert(weights[0] == 1);
        assert(weights[1] == 3);
    }

    // Test 4: minimum total weight
    {
        vector<WeightedEdge> edges = {makeEdge("A","B",2), makeEdge("B","C",3), makeEdge("A","C",10)};
        auto result = Boruvkas::boruvkasAlgorithm(edges, {"A","B","C"});
        assert(totalWeight(result) == 5);
        assert(result.size() == 2);
    }

    // Test 5: two-node graph
    {
        vector<WeightedEdge> edges = {makeEdge("A","B",6)};
        auto result = Boruvkas::boruvkasAlgorithm(edges, {"A","B"});
        assert(result.size() == 1);
        assert(result[0].weight == 6);
    }

    // Test 6: linear chain
    {
        vector<WeightedEdge> edges = {makeEdge("A","B",1), makeEdge("B","C",2), makeEdge("C","D",3)};
        auto result = Boruvkas::boruvkasAlgorithm(edges, {"A","B","C","D"});
        assert(result.size() == 3);
        assert(totalWeight(result) == 6);
    }

    // Test 7: same total weight as Kruskal's
    {
        vector<WeightedEdge> edges = {
            makeEdge("A","B",4), makeEdge("A","C",2), makeEdge("B","C",1), makeEdge("B","D",5),
            makeEdge("D","E",2), makeEdge("E","F",3), makeEdge("D","F",6)
        };
        auto result = Boruvkas::boruvkasAlgorithm(edges, {"A","B","C","D","E","F"});
        assert(result.size() == 5);
        assert(totalWeight(result) == 13);
    }

    cout << "All tests passed!" << endl;
    return 0;
}
