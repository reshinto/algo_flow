#include "sources/SortCharactersByFrequency.cpp"
#include <cassert>
#include <iostream>
#include <algorithm>

int main() {
    std::string result1 = sortCharactersByFrequency("tree");
    assert(result1.substr(0, 2) == "ee");
    assert(result1.size() == 4);

    std::string result2 = sortCharactersByFrequency("z");
    assert(result2 == "z");

    std::string result3 = sortCharactersByFrequency("cccaab");
    assert(result3.substr(0, 3) == "ccc");
    assert(result3.size() == 6);

    std::string result4 = sortCharactersByFrequency("aaaa");
    assert(result4 == "aaaa");

    std::string input = "mississippi";
    std::string result5 = sortCharactersByFrequency(input);
    assert(result5.size() == input.size());
    std::string sortedInput = input;
    std::sort(sortedInput.begin(), sortedInput.end());
    std::string sortedResult = result5;
    std::sort(sortedResult.begin(), sortedResult.end());
    assert(sortedResult == sortedInput);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
