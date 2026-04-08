// Cartesian Product
// Generates all ordered pairs (a, b) where a ∈ setA and b ∈ setB.
// Time: O(n × m) — one pair per combination of elements
// Space: O(n × m) for the result array

#include <iostream>
#include <vector>
#include <utility>

std::vector<std::pair<int,int>> cartesianProduct(std::vector<int> setA, std::vector<int> setB) {
    std::vector<std::pair<int,int>> result; // @step:initialize

    for (int elemA : setA) {
        for (int elemB : setB) {
            result.push_back({elemA, elemB}); // @step:generate-pair
        }
    }

    return result; // @step:complete
}

#ifndef TESTING
int main() {
    std::vector<int> setA = {1, 2, 3};
    std::vector<int> setB = {4, 5};
    auto result = cartesianProduct(setA, setB);
    for (auto& [elemA, elemB] : result) {
        std::cout << "(" << elemA << ", " << elemB << ")\n";
    }
    return 0;
}
#endif
