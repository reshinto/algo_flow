# Happy Number — detect happy numbers using digit-square-sum cycling with a hash set
def digit_square_sum(num):
    total = 0  # @step:initialize
    while num > 0:
        digit = num % 10
        total += digit * digit
        num //= 10
    return total


def happy_number(start_number):
    seen = set()  # @step:initialize
    current = start_number
    while current != 1:
        seen.add(current)  # @step:insert-key
        current = digit_square_sum(current)  # @step:process-element
        if current in seen:  # @step:check-duplicate
            return False  # @step:key-found
    return True  # @step:complete
