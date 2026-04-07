// Intersection of Two Arrays — find common elements using a hash set
#include <vector>
#include <unordered_set>

std::vector<int> intersectionOfTwoArrays(const std::vector<int>& numbersA, const std::vector<int>& numbersB) {
    std::unordered_set<int> setA; // @step:initialize
    for (int num : numbersA) {
        setA.insert(num); // @step:insert-key
    }
    std::vector<int> result;
    for (int currentNum : numbersB) {
        if (setA.count(currentNum)) {
            // @step:lookup-key
            result.push_back(currentNum); // @step:key-found
            setA.erase(currentNum);
        }
    }
    return result; // @step:complete
}
