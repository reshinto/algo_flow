// Aho-Corasick Search
// Multi-pattern string search using a trie augmented with failure links.
// Phase 1: Insert all patterns into a trie.
// Phase 2: Build failure links via BFS (similar to KMP failure function but for a trie).
// Phase 3: Scan text once, following failure links on mismatch, collecting all pattern matches.
// Time: O(n + m + z) where n = text length, m = total pattern chars, z = match count
// Space: O(m * k) where k = alphabet size

#include <string>
#include <vector>
#include <unordered_map>
#include <unordered_set>
#include <queue>

struct AhoCorasickNode {
    std::unordered_map<char, AhoCorasickNode*> children;
    AhoCorasickNode* failureLink;
    std::vector<std::string> outputPatterns;
    bool isEnd;

    AhoCorasickNode() : failureLink(nullptr), isEnd(false) {} // @step:initialize
};

AhoCorasickNode* createAhoCorasickNode() {
    return new AhoCorasickNode(); // @step:initialize
}

std::vector<std::string> ahoCorasickSearch(const std::string& text, const std::vector<std::string>& patterns) {
    AhoCorasickNode* root = createAhoCorasickNode(); // @step:initialize

    // Phase 1: Insert all patterns into the trie
    for (const std::string& pattern : patterns) {
        // @step:visit
        AhoCorasickNode* current = root; // @step:visit
        for (char ch : pattern) {
            // @step:insert-trie
            if (current->children.find(ch) == current->children.end()) {
                // @step:insert-trie
                current->children[ch] = createAhoCorasickNode(); // @step:insert-trie
            }
            current = current->children[ch]; // @step:traverse-trie
        }
        current->isEnd = true; // @step:mark-end-word
        current->outputPatterns.push_back(pattern); // @step:mark-end-word
    }

    // Phase 2: Build failure links via BFS
    std::queue<AhoCorasickNode*> bfsQueue; // @step:buildFailureLinks

    for (auto& childEntry : root->children) {
        // @step:buildFailureLinks
        childEntry.second->failureLink = root; // @step:buildFailureLinks
        bfsQueue.push(childEntry.second); // @step:buildFailureLinks
    }

    while (!bfsQueue.empty()) {
        // @step:buildFailureLinks
        AhoCorasickNode* current = bfsQueue.front();
        bfsQueue.pop(); // @step:buildFailureLinks

        for (auto& childEntry : current->children) {
            // @step:buildFailureLinks
            char ch = childEntry.first;
            AhoCorasickNode* childNode = childEntry.second;
            AhoCorasickNode* failureState = current->failureLink; // @step:buildFailureLinks

            while (failureState != nullptr && failureState->children.find(ch) == failureState->children.end()) {
                // @step:buildFailureLinks
                failureState = failureState->failureLink; // @step:buildFailureLinks
            }

            childNode->failureLink = failureState
                ? (failureState->children.count(ch) ? failureState->children[ch] : root)
                : root; // @step:buildFailureLinks

            if (childNode->failureLink == childNode) {
                // @step:buildFailureLinks
                childNode->failureLink = root; // @step:buildFailureLinks
            }

            // Propagate output patterns from failure link
            for (const std::string& outputPattern : childNode->failureLink->outputPatterns) {
                // @step:buildFailureLinks
                bool alreadyPresent = false;
                for (const std::string& existing : childNode->outputPatterns) {
                    if (existing == outputPattern) { alreadyPresent = true; break; }
                }
                if (!alreadyPresent) {
                    // @step:buildFailureLinks
                    childNode->outputPatterns.push_back(outputPattern); // @step:buildFailureLinks
                }
            }

            bfsQueue.push(childNode); // @step:buildFailureLinks
        }
    }

    // Phase 3: Search text using the automaton
    std::unordered_set<std::string> foundPatterns; // @step:traverse-trie
    AhoCorasickNode* current = root; // @step:traverse-trie

    for (char ch : text) {
        // @step:traverse-trie
        while (current != root && current->children.find(ch) == current->children.end()) {
            // @step:traverse-trie
            current = current->failureLink; // @step:traverse-trie
        }

        if (current->children.find(ch) != current->children.end()) {
            // @step:traverse-trie
            current = current->children[ch]; // @step:traverse-trie
        }

        for (const std::string& matchedPattern : current->outputPatterns) {
            // @step:found
            foundPatterns.insert(matchedPattern); // @step:found
        }
    }

    return std::vector<std::string>(foundPatterns.begin(), foundPatterns.end()); // @step:complete
}
