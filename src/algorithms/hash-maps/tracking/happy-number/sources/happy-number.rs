// Happy Number — detect happy numbers using digit-square-sum cycling with a hash set
use std::collections::HashSet;

fn digit_square_sum(mut num: u32) -> u32 {
    let mut total = 0; // @step:initialize
    while num > 0 {
        let digit = num % 10;
        total += digit * digit;
        num /= 10;
    }
    total
}

fn happy_number(start_number: u32) -> bool {
    let mut seen: HashSet<u32> = HashSet::new(); // @step:initialize
    let mut current = start_number;
    while current != 1 {
        seen.insert(current); // @step:insert-key
        current = digit_square_sum(current); // @step:process-element
        if seen.contains(&current) {
            // @step:check-duplicate
            return false; // @step:key-found
        }
    }
    true // @step:complete
}
