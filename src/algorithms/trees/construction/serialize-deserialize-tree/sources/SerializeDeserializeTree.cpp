// Serialize and Deserialize Binary Tree (BFS / Level-Order)
// Serialization: BFS level-by-level, null nodes represented as "null"
// Deserialization: parse the string back into a tree using a queue

#include <string>
#include <queue>
#include <sstream>
#include <vector>

struct TreeNode {
    int value;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int val) : value(val), left(nullptr), right(nullptr) {}
};

std::string serializeTree(TreeNode* root) {
    if (root == nullptr) return "null"; // @step:initialize

    std::queue<TreeNode*> queue; // @step:initialize
    std::vector<std::string> parts; // @step:initialize
    queue.push(root);

    while (!queue.empty()) {
        // @step:search-node
        TreeNode* node = queue.front(); // @step:search-node
        queue.pop();

        if (node == nullptr) {
            parts.push_back("null"); // @step:visit
        } else {
            parts.push_back(std::to_string(node->value)); // @step:visit
            queue.push(node->left); // @step:build-node
            queue.push(node->right); // @step:build-node
        }
    }

    std::string result = "";
    for (int partIndex = 0; partIndex < (int)parts.size(); partIndex++) {
        if (partIndex > 0) result += ",";
        result += parts[partIndex];
    }
    return result; // @step:complete
}

TreeNode* deserializeTree(const std::string& data) {
    if (data == "null" || data.empty()) return nullptr; // @step:initialize

    std::vector<std::string> parts;
    std::stringstream ss(data);
    std::string token;
    while (std::getline(ss, token, ',')) parts.push_back(token); // @step:initialize

    std::string firstValue = parts[0]; // @step:select-element
    if (firstValue == "null") return nullptr;

    TreeNode* root = new TreeNode(std::stoi(firstValue)); // @step:build-node
    std::queue<TreeNode*> queue; // @step:initialize
    queue.push(root);
    int partIndex = 1; // @step:initialize

    while (!queue.empty() && partIndex < (int)parts.size()) {
        // @step:search-node
        TreeNode* currentNode = queue.front(); // @step:search-node
        queue.pop();

        std::string leftValue = parts[partIndex]; // @step:select-element
        partIndex++; // @step:select-element

        if (leftValue != "null") {
            TreeNode* leftNode = new TreeNode(std::stoi(leftValue)); // @step:build-node
            currentNode->left = leftNode; // @step:connect-child
            queue.push(leftNode); // @step:visit
        }

        if (partIndex < (int)parts.size()) {
            std::string rightValue = parts[partIndex]; // @step:select-element
            partIndex++; // @step:select-element

            if (rightValue != "null") {
                TreeNode* rightNode = new TreeNode(std::stoi(rightValue)); // @step:build-node
                currentNode->right = rightNode; // @step:connect-child
                queue.push(rightNode); // @step:visit
            }
        }
    }

    return root; // @step:complete
}
