# Evaluate Reverse Polish Notation — push operands, pop two and compute on operators
def evaluate_reverse_polish(tokens):
    operand_stack = []  # @step:initialize
    operators = {"+", "-", "*", "/"}  # @step:initialize
    for current_token in tokens:  # @step:visit
        if current_token in operators:
            operand_b = operand_stack.pop()  # @step:evaluate
            operand_a = operand_stack.pop()  # @step:evaluate
            if current_token == "+":  # @step:evaluate
                result = operand_a + operand_b
            elif current_token == "-":  # @step:evaluate
                result = operand_a - operand_b
            elif current_token == "*":  # @step:evaluate
                result = operand_a * operand_b
            else:
                result = int(operand_a / operand_b)  # @step:evaluate (truncate toward zero)
            operand_stack.append(result)  # @step:push
        else:
            operand_stack.append(int(current_token))  # @step:push
    return operand_stack[0]  # @step:complete
