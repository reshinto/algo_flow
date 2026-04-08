// Tim Sort — hybrid of insertion sort for small runs + merge sort to combine them
const MIN_RUN_SIZE: usize = 4;

fn insertion_sort_run(sorted_array: &mut Vec<i64>, run_start: usize, run_end: usize) {
    // @step:insertion-pass
    for outer_index in (run_start + 1)..=run_end {
        // @step:insertion-pass
        let current_value = sorted_array[outer_index]; // @step:insertion-pass
        let mut inner_index = outer_index as isize - 1; // @step:insertion-pass

        while inner_index >= run_start as isize && sorted_array[inner_index as usize] > current_value {
            // @step:compare
            sorted_array[(inner_index + 1) as usize] = sorted_array[inner_index as usize]; // @step:swap
            inner_index -= 1; // @step:swap
        }
        sorted_array[(inner_index + 1) as usize] = current_value; // @step:swap
    }
}

fn merge_runs(sorted_array: &mut Vec<i64>, left_start: usize, mid_point: usize, right_end: usize) {
    // @step:merge
    let left_slice = sorted_array[left_start..=mid_point].to_vec(); // @step:merge
    let right_slice = sorted_array[(mid_point + 1)..=right_end].to_vec(); // @step:merge

    let mut left_pointer = 0usize; // @step:merge
    let mut right_pointer = 0usize; // @step:merge
    let mut merge_index = left_start; // @step:merge

    while left_pointer < left_slice.len() && right_pointer < right_slice.len() {
        // @step:compare
        if left_slice[left_pointer] <= right_slice[right_pointer] {
            // @step:compare
            sorted_array[merge_index] = left_slice[left_pointer]; // @step:merge
            left_pointer += 1; // @step:merge
        } else {
            sorted_array[merge_index] = right_slice[right_pointer]; // @step:merge
            right_pointer += 1; // @step:merge
        }
        merge_index += 1; // @step:merge
    }

    while left_pointer < left_slice.len() {
        sorted_array[merge_index] = left_slice[left_pointer]; // @step:merge
        left_pointer += 1; // @step:merge
        merge_index += 1; // @step:merge
    }

    while right_pointer < right_slice.len() {
        sorted_array[merge_index] = right_slice[right_pointer]; // @step:merge
        right_pointer += 1; // @step:merge
        merge_index += 1; // @step:merge
    }
}

fn tim_sort(input_array: &[i64]) -> Vec<i64> {
    // @step:initialize
    let mut sorted_array = input_array.to_vec(); // @step:initialize
    let array_length = sorted_array.len(); // @step:initialize

    // Sort individual runs using insertion sort
    let mut run_start = 0;
    while run_start < array_length {
        // @step:insertion-pass
        let run_end = (run_start + MIN_RUN_SIZE - 1).min(array_length - 1); // @step:insertion-pass
        insertion_sort_run(&mut sorted_array, run_start, run_end); // @step:insertion-pass
        run_start += MIN_RUN_SIZE;
    }

    // Merge sorted runs in increasing size
    let mut merge_size = MIN_RUN_SIZE;
    while merge_size < array_length {
        // @step:merge
        let mut left_start = 0;
        while left_start < array_length {
            // @step:merge
            let mid_point = (left_start + merge_size - 1).min(array_length - 1); // @step:merge
            let right_end = (left_start + 2 * merge_size - 1).min(array_length - 1); // @step:merge

            if mid_point < right_end {
                merge_runs(&mut sorted_array, left_start, mid_point, right_end); // @step:merge
            }
            left_start += 2 * merge_size;
        }
        merge_size *= 2;
    }

    // @step:mark-sorted
    sorted_array // @step:complete
}
