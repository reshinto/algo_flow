// Intro Sort — starts with Quick Sort, falls back to Heap Sort when depth limit exceeded,
// uses Insertion Sort for small partitions
const INSERTION_SORT_THRESHOLD: usize = 16;

fn insertion_sort_slice(sorted_array: &mut Vec<i64>, slice_start: usize, slice_end: usize) {
    // @step:insertion-pass
    for outer_index in (slice_start + 1)..=slice_end {
        // @step:insertion-pass
        let current_value = sorted_array[outer_index]; // @step:insertion-pass
        let mut inner_index = outer_index as isize - 1; // @step:insertion-pass

        while inner_index >= slice_start as isize && sorted_array[inner_index as usize] > current_value {
            // @step:compare
            sorted_array[(inner_index + 1) as usize] = sorted_array[inner_index as usize]; // @step:swap
            inner_index -= 1; // @step:swap
        }
        sorted_array[(inner_index + 1) as usize] = current_value; // @step:swap
    }
}

fn heapify(sorted_array: &mut Vec<i64>, heap_size: usize, root_index: usize) {
    // @step:heapify
    let mut largest_index = root_index; // @step:heapify
    let left_child = 2 * root_index + 1; // @step:heapify
    let right_child = 2 * root_index + 2; // @step:heapify

    if left_child < heap_size && sorted_array[left_child] > sorted_array[largest_index] {
        // @step:compare
        largest_index = left_child; // @step:heapify
    }
    if right_child < heap_size && sorted_array[right_child] > sorted_array[largest_index] {
        // @step:compare
        largest_index = right_child; // @step:heapify
    }

    if largest_index != root_index {
        // @step:swap
        sorted_array.swap(root_index, largest_index); // @step:swap
        heapify(sorted_array, heap_size, largest_index); // @step:heapify
    }
}

fn heap_sort_slice(sorted_array: &mut Vec<i64>, slice_start: usize, slice_end: usize) {
    // @step:heapify
    let slice_length = slice_end - slice_start + 1; // @step:heapify

    // Build max heap over the slice
    if slice_length >= 2 {
        for build_index in (0..=(slice_length / 2).saturating_sub(1)).rev() {
            // @step:heapify
            heapify(sorted_array, slice_length, build_index); // @step:heapify
        }
    }

    // Extract elements one by one
    for extract_index in (1..slice_length).rev() {
        // @step:swap
        sorted_array.swap(slice_start, slice_start + extract_index); // @step:swap
        heapify(sorted_array, extract_index, 0); // @step:heapify
    }
}

fn lomuto_partition(sorted_array: &mut Vec<i64>, partition_start: usize, partition_end: usize) -> usize {
    // @step:partition
    let pivot_value = sorted_array[partition_end]; // @step:partition
    let mut partition_index = partition_start as isize - 1; // @step:partition

    for scan_index in partition_start..partition_end {
        // @step:compare
        if sorted_array[scan_index] <= pivot_value {
            // @step:compare
            partition_index += 1; // @step:swap
            sorted_array.swap(partition_index as usize, scan_index); // @step:swap
        }
    }

    sorted_array.swap((partition_index + 1) as usize, partition_end); // @step:swap
    (partition_index + 1) as usize // @step:partition
}

fn intro_sort_recurse(
    sorted_array: &mut Vec<i64>,
    range_start: usize,
    range_end: usize,
    depth_limit: usize,
) {
    if range_end <= range_start {
        return;
    }
    let range_size = range_end - range_start + 1;

    if range_size <= INSERTION_SORT_THRESHOLD {
        // @step:insertion-pass
        insertion_sort_slice(sorted_array, range_start, range_end); // @step:insertion-pass
        return;
    }

    if depth_limit == 0 {
        // @step:heapify
        heap_sort_slice(sorted_array, range_start, range_end); // @step:heapify
        return;
    }

    let pivot_index = lomuto_partition(sorted_array, range_start, range_end); // @step:partition
    if pivot_index > 0 {
        intro_sort_recurse(sorted_array, range_start, pivot_index - 1, depth_limit - 1); // @step:partition
    }
    intro_sort_recurse(sorted_array, pivot_index + 1, range_end, depth_limit - 1); // @step:partition
}

fn intro_sort(input_array: &[i64]) -> Vec<i64> {
    // @step:initialize
    let mut sorted_array = input_array.to_vec(); // @step:initialize
    let array_length = sorted_array.len(); // @step:initialize

    if array_length <= 1 {
        return sorted_array; // @step:complete
    }

    let depth_limit = 2 * (array_length as f64).log2() as usize; // @step:initialize
    intro_sort_recurse(&mut sorted_array, 0, array_length - 1, depth_limit); // @step:partition

    // @step:mark-sorted
    sorted_array // @step:complete
}
