// Flatten Nested List Iterator — use a stack to peel nested lists layer by layer
#include <iostream>
#include <stack>
#include <variant>
#include <vector>

struct NestedItem;
using NestedItemVariant = std::variant<int, std::vector<NestedItem>>;

struct NestedItem {
    NestedItemVariant value;
};

std::vector<int> flattenNestedListIterator(std::vector<NestedItem> nestedList) {
    std::stack<NestedItem> stack; // @step:initialize
    // Push in reverse order so first element is processed first
    for (int itemIdx = static_cast<int>(nestedList.size()) - 1; itemIdx >= 0; itemIdx--) {
        stack.push(nestedList[itemIdx]);
    }
    std::vector<int> result; // @step:initialize
    while (!stack.empty()) {
        NestedItem top = stack.top(); stack.pop(); // @step:pop
        if (std::holds_alternative<int>(top.value)) {
            result.push_back(std::get<int>(top.value)); // @step:visit
        } else {
            const auto& items = std::get<std::vector<NestedItem>>(top.value);
            for (int itemIdx = static_cast<int>(items.size()) - 1; itemIdx >= 0; itemIdx--) {
                stack.push(items[itemIdx]); // @step:push
            }
        }
    }
    return result; // @step:complete
}

int main() {
    // Example: [[1,1],2,[1,1]]
    std::vector<NestedItem> nested = {
        {std::vector<NestedItem>{{1}, {1}}},
        {2},
        {std::vector<NestedItem>{{1}, {1}}}
    };
    auto result = flattenNestedListIterator(nested);
    for (int val : result) std::cout << val << " ";
    std::cout << std::endl;
    return 0;
}
