/** Correctness tests for the characterFrequencySort function. */
#include "sources/CharacterFrequencySort.cpp"
#include <cassert>
#include <string>
#include <iostream>
#include <algorithm>

int main() {
    // empty string
    assert(characterFrequencySort("") == "");

    // "tree" starts with "ee"
    std::string treeResult = characterFrequencySort("tree");
    assert(treeResult.substr(0, 2) == "ee");
    assert(treeResult.length() == 4);

    // "cccaaa" — both blocks of 3 grouped
    std::string cccaaaResult = characterFrequencySort("cccaaa");
    assert(cccaaaResult.length() == 6);
    std::string firstBlock = cccaaaResult.substr(0, 3);
    std::string secondBlock = cccaaaResult.substr(3, 3);
    assert(firstBlock == "ccc" || firstBlock == "aaa");
    assert(secondBlock == "ccc" || secondBlock == "aaa");
    assert(firstBlock != secondBlock);

    // "aab" starts with "aa"
    std::string aabResult = characterFrequencySort("aab");
    assert(aabResult.substr(0, 2) == "aa");
    assert(aabResult.length() == 3);

    // single character
    assert(characterFrequencySort("z") == "z");

    // all same characters
    assert(characterFrequencySort("aaaa") == "aaaa");

    // preserves all characters
    std::string input = "programming";
    std::string progResult = characterFrequencySort(input);
    assert(progResult.length() == input.length());
    for (char ch : std::string("graminop")) {
        assert(std::count(progResult.begin(), progResult.end(), ch) ==
               std::count(input.begin(), input.end(), ch));
    }

    // "eeebba" starts with "eee"
    std::string eeeResult = characterFrequencySort("eeebba");
    assert(eeeResult.substr(0, 3) == "eee");

    // "aabbcc" contiguous blocks of 2
    std::string aabbccResult = characterFrequencySort("aabbcc");
    assert(aabbccResult.length() == 6);
    for (int blockStart = 0; blockStart < 6; blockStart += 2) {
        assert(aabbccResult[blockStart] == aabbccResult[blockStart + 1]);
    }

    // uppercase and lowercase distinct
    std::string mixedResult = characterFrequencySort("Aabb");
    assert(mixedResult.substr(0, 2) == "bb");
    assert(mixedResult.length() == 4);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
