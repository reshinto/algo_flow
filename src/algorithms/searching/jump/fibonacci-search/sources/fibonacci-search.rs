// Fibonacci Search — use Fibonacci numbers to divide the array and narrow the search range
fn fibonacci_search(sorted_array: &[i32], target_value: i32) -> i32 {
    // @step:initialize
    let array_length = sorted_array.len(); // @step:initialize
    if array_length == 0 {
        return -1; // @step:initialize
    }

    let mut fib_m2 = 0usize; // @step:initialize — Fibonacci(k-2)
    let mut fib_m1 = 1usize; // @step:initialize — Fibonacci(k-1)
    let mut fib_m = fib_m1 + fib_m2; // @step:initialize — Fibonacci(k)

    // Find the smallest Fibonacci number >= array_length
    while fib_m < array_length {
        // @step:initialize
        fib_m2 = fib_m1; // @step:initialize
        fib_m1 = fib_m; // @step:initialize
        fib_m = fib_m1 + fib_m2; // @step:initialize
    }

    let mut offset: i64 = -1; // @step:initialize

    while fib_m > 1 {
        let compare_index = ((offset + fib_m2 as i64) as usize).min(array_length - 1); // @step:compare
        let compare_value = sorted_array[compare_index]; // @step:compare

        if compare_value < target_value {
            // @step:eliminate
            // Target is in the right portion — advance offset
            fib_m = fib_m1; // @step:eliminate
            fib_m1 = fib_m2; // @step:eliminate
            fib_m2 = fib_m - fib_m1; // @step:eliminate
            offset = compare_index as i64; // @step:eliminate
        } else if compare_value > target_value {
            // @step:eliminate
            // Target is in the left portion — shrink range
            fib_m = fib_m2; // @step:eliminate
            fib_m1 = fib_m1.saturating_sub(fib_m2); // @step:eliminate
            fib_m2 = fib_m.saturating_sub(fib_m1); // @step:eliminate
        } else {
            // @step:found
            return compare_index as i32; // @step:found
        }
    }

    // Check the remaining element
    let last_index = (offset + 1) as usize;
    if fib_m1 == 1 && last_index < array_length && sorted_array[last_index] == target_value {
        // @step:compare,found
        return last_index as i32; // @step:found
    }

    -1 // @step:complete
}
