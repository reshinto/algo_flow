// Isomorphic Strings — check if two strings are isomorphic using bidirectional char mapping
#include <string>
#include <unordered_map>

bool isomorphicStrings(const std::string& textA, const std::string& textB) {
    std::unordered_map<char, char> aToB; // @step:initialize
    std::unordered_map<char, char> bToA; // @step:initialize
    if (textA.size() != textB.size()) return false; // @step:initialize
    for (int charIndex = 0; charIndex < (int)textA.size(); charIndex++) {
        char charA = textA[charIndex];
        char charB = textB[charIndex];
        auto itAB = aToB.find(charA); // @step:lookup-key
        auto itBA = bToA.find(charB); // @step:lookup-key
        if (itAB == aToB.end() && itBA == bToA.end()) {
            aToB[charA] = charB; // @step:insert-key
            bToA[charB] = charA; // @step:insert-key
        } else if (itAB != aToB.end() && itAB->second == charB &&
                   itBA != bToA.end() && itBA->second == charA) {
            continue; // @step:key-found
        } else {
            return false; // @step:key-not-found
        }
    }
    return true; // @step:complete
}
