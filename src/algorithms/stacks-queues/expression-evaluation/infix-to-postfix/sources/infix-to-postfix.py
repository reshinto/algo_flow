# Infix to Postfix — Dijkstra's Shunting-Yard: convert infix expression to postfix (RPN)
import re

def infix_to_postfix(expression):
    operator_precedence = {"+": 1, "-": 1, "*": 2, "/": 2}  # @step:initialize
    output_queue = []  # @step:initialize
    operator_stack = []  # @step:initialize

    # Tokenize: split on spaces or extract operands/operators/parens
    tokens = re.findall(r"[A-Za-z0-9]+|[+\-*/()]", expression)  # @step:initialize

    for current_token in tokens:  # @step:visit
        if re.match(r"^[A-Za-z0-9]+$", current_token):
            # Operand — send directly to output
            output_queue.append(current_token)  # @step:output
        elif current_token in operator_precedence:
            # Operator — pop higher/equal-precedence operators to output first
            while (  # @step:compare
                operator_stack
                and operator_stack[-1] != "("
                and operator_precedence.get(operator_stack[-1], 0)
                >= operator_precedence.get(current_token, 0)
            ):
                output_queue.append(operator_stack.pop())  # @step:pop
            operator_stack.append(current_token)  # @step:push
        elif current_token == "(":
            operator_stack.append(current_token)  # @step:push
        elif current_token == ")":
            # Pop to output until matching '(' is found
            while operator_stack and operator_stack[-1] != "(":
                output_queue.append(operator_stack.pop())  # @step:pop
            operator_stack.pop()  # @step:pop — discard the '('

    # Drain remaining operators to output
    while operator_stack:
        output_queue.append(operator_stack.pop())  # @step:pop

    return " ".join(output_queue)  # @step:complete
