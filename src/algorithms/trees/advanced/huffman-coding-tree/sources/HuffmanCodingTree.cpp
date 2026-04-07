// Huffman Coding Tree — build optimal prefix-free encoding from character frequencies
#include <string>
#include <vector>
#include <map>
#include <algorithm>
using namespace std;

struct HuffmanNode {
    int freq;
    char charVal;
    bool isLeaf;
    HuffmanNode* left;
    HuffmanNode* right;
    HuffmanNode(char c, int f) : freq(f), charVal(c), isLeaf(true), left(nullptr), right(nullptr) {}
    HuffmanNode(int f, HuffmanNode* l, HuffmanNode* r) : freq(f), charVal(0), isLeaf(false), left(l), right(r) {}
};

void generateCodes(HuffmanNode* node, string code, map<char, string>& encodings) {
    if (!node) return;
    if (node->isLeaf) {
        encodings[node->charVal] = code.empty() ? "0" : code; // @step:encode-char
        return;
    }
    generateCodes(node->left, code + "0", encodings);  // @step:traverse-left
    generateCodes(node->right, code + "1", encodings); // @step:traverse-right
}

map<char, string> huffmanCodingTree(vector<pair<char, int>> frequencies) {
    vector<HuffmanNode*> minHeap;
    for (auto& [ch, freq] : frequencies) {
        minHeap.push_back(new HuffmanNode(ch, freq));
    } // @step:initialize

    // Sort ascending to simulate a min-heap
    sort(minHeap.begin(), minHeap.end(), [](HuffmanNode* nodeA, HuffmanNode* nodeB) {
        return nodeA->freq < nodeB->freq;
    }); // @step:select-min-freq

    while (minHeap.size() > 1) {
        // Extract two minimums
        HuffmanNode* leftNode = minHeap.front(); minHeap.erase(minHeap.begin()); // @step:select-min-freq
        HuffmanNode* rightNode = minHeap.front(); minHeap.erase(minHeap.begin()); // @step:select-min-freq

        // Merge into a new internal node
        HuffmanNode* merged = new HuffmanNode(leftNode->freq + rightNode->freq, leftNode, rightNode); // @step:build-node

        // Re-insert maintaining sorted order
        auto insertPos = find_if(minHeap.begin(), minHeap.end(), [&](HuffmanNode* node) {
            return node->freq > merged->freq;
        });
        minHeap.insert(insertPos, merged); // @step:build-node
    }

    HuffmanNode* huffmanRoot = minHeap.empty() ? nullptr : minHeap[0];
    map<char, string> encodings;
    generateCodes(huffmanRoot, "", encodings);
    return encodings; // @step:complete
}
