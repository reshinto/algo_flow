// Expression Tree Evaluation — build expression tree from postfix, then evaluate
#include <string>
#include <vector>
#include <stack>
#include <sstream>
using namespace std;

struct ExprNode {
    string token;
    ExprNode* left;
    ExprNode* right;
    ExprNode(string t) : token(t), left(nullptr), right(nullptr) {}
};

long long evaluate(ExprNode* node) {
    if (!node) return 0;
    if (!node->left && !node->right) return stoll(node->token); // @step:visit

    long long leftValue = evaluate(node->left);  // @step:traverse-left
    long long rightValue = evaluate(node->right); // @step:traverse-right

    if (node->token == "+") return leftValue + rightValue; // @step:visit
    if (node->token == "-") return leftValue - rightValue; // @step:visit
    if (node->token == "*") return leftValue * rightValue; // @step:visit
    if (node->token == "/") return leftValue / rightValue; // @step:visit
    return 0;
}

long long expressionTreeEvaluation(string expression) {
    istringstream stream(expression);
    string token;
    vector<string> tokens;
    while (stream >> token) tokens.push_back(token); // @step:initialize

    stack<ExprNode*> stk; // @step:initialize

    for (const string& tok : tokens) {
        bool isNumber = true;
        for (char ch : tok) {
            if (!isdigit(ch)) { isNumber = false; break; }
        }
        if (isNumber) {
            stk.push(new ExprNode(tok)); // @step:build-node
        } else {
            ExprNode* rightOperand = stk.top(); stk.pop(); // @step:connect-child
            ExprNode* leftOperand = stk.top(); stk.pop();  // @step:connect-child
            ExprNode* node = new ExprNode(tok);
            node->left = leftOperand;
            node->right = rightOperand;
            stk.push(node); // @step:build-node
        }
    }

    ExprNode* root = stk.empty() ? nullptr : stk.top();
    return evaluate(root); // @step:complete
}
