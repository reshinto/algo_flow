/** Correctness tests for the suffixArrayConstruction function. */
#include "SuffixArrayConstruction.cpp"
#include <cassert>
#include <iostream>
#include <vector>
#include <algorithm>
#include <string>

int main() {
    assert((suffixArrayConstruction("banana") == std::vector<int>{5, 3, 1, 0, 4, 2}));
    assert((suffixArrayConstruction("a") == std::vector<int>{0}));
    assert((suffixArrayConstruction("") == std::vector<int>{}));
    assert((suffixArrayConstruction("ab") == std::vector<int>{0, 1}));
    assert((suffixArrayConstruction("ba") == std::vector<int>{1, 0}));
    assert((suffixArrayConstruction("aaa") == std::vector<int>{2, 1, 0}));
    assert((suffixArrayConstruction("mississippi") == std::vector<int>{10, 7, 4, 1, 0, 9, 8, 6, 3, 5, 2}));

    std::vector<int> helloResult = suffixArrayConstruction("hello");
    assert(helloResult.size() == 5);

    std::string permText = "abracadabra";
    std::vector<int> permResult = suffixArrayConstruction(permText);
    std::vector<int> sortedResult = permResult;
    std::sort(sortedResult.begin(), sortedResult.end());
    for (int idx = 0; idx < (int)permText.length(); idx++) {
        assert(sortedResult[idx] == idx);
    }

    assert((suffixArrayConstruction("abab") == std::vector<int>{2, 0, 3, 1}));

    std::string text = "banana";
    std::vector<int> suffixArray = suffixArrayConstruction(text);
    for (int rankIdx = 0; rankIdx < (int)suffixArray.size() - 1; rankIdx++) {
        std::string currentSuffix = text.substr(suffixArray[rankIdx]);
        std::string nextSuffix = text.substr(suffixArray[rankIdx + 1]);
        assert(currentSuffix <= nextSuffix);
    }

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
