// g++ -o huffman_test HuffmanCodingTree_test.cpp && ./huffman_test
#include "sources/HuffmanCodingTree.cpp"
#include <cassert>
#include <iostream>
#include <regex>

int main() {
    std::vector<std::pair<char, int>> freqs = {
        {'a', 5}, {'b', 9}, {'c', 12}, {'d', 13}, {'e', 16}, {'f', 45}
    };

    auto result = huffmanCodingTree(freqs);

    // test: produces encodings for all characters
    for (auto& pair : freqs) {
        assert(result.count(pair.first) > 0);
        assert(!result.at(pair.first).empty());
    }

    // test: valid binary strings
    std::regex binaryPattern("^[01]+$");
    for (auto& entry : result) {
        assert(std::regex_match(entry.second, binaryPattern));
    }

    // test: most frequent ('f') gets shortest code
    size_t fLen = result['f'].length();
    for (auto& pair : freqs) {
        if (pair.first != 'f') {
            assert(fLen <= result.at(pair.first).length());
        }
    }

    // test: prefix-free codes
    std::vector<std::string> codes;
    for (auto& entry : result) {
        codes.push_back(entry.second);
    }
    for (size_t idxA = 0; idxA < codes.size(); idxA++) {
        for (size_t idxB = 0; idxB < codes.size(); idxB++) {
            if (idxA != idxB) {
                bool isPrefix = codes[idxA].substr(0, codes[idxB].size()) == codes[idxB];
                assert(!(isPrefix && codes[idxA] != codes[idxB]));
            }
        }
    }

    // test: single character
    auto singleResult = huffmanCodingTree({{'x', 10}});
    assert(singleResult['x'] == "0");

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
