const shuffleArray = (array: string[]): string[] => {
    const array_copy = [ ...array ];
    const shuffled_array: string[] = [];
    while (array_copy.length) {
        shuffled_array.push(array_copy.pop() as string);
    }
    return shuffled_array;
}

export default shuffleArray;