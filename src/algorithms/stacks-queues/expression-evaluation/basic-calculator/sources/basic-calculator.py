# Basic Calculator — evaluate a simple expression string with +, -, (, ) using a stack for sign propagation
import re

def basic_calculator(expression: str) -> int:
    sign_stack: list[int] = []  # @step:initialize
    running_total: int = 0  # @step:initialize
    current_sign: int = 1  # @step:initialize

    tokens = re.findall(r'\d+|[+\-()]', expression)  # @step:initialize

    for current_token in tokens:  # @step:visit
        current_token = current_token.strip()
        if not current_token:
            continue

        if current_token.isdigit() or (len(current_token) > 1 and current_token.isdigit()):
            running_total += current_sign * int(current_token)  # @step:evaluate
        elif current_token == '+':
            current_sign = 1  # @step:visit
        elif current_token == '-':
            current_sign = -1  # @step:visit
        elif current_token == '(':
            # Save current running total and sign, then reset for the sub-expression
            sign_stack.append(running_total)  # @step:push
            sign_stack.append(current_sign)  # @step:push
            running_total = 0  # @step:push
            current_sign = 1  # @step:push
        elif current_token == ')':
            # Pop sign and previous total, merge sub-expression result into parent context
            popped_sign = sign_stack.pop()  # @step:pop
            prev_total = sign_stack.pop()  # @step:pop
            running_total = prev_total + popped_sign * running_total  # @step:pop

    return running_total  # @step:complete
