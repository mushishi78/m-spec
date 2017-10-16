export function incrementer(i: number) {
	return () => {
		i++;
		return i;
	};
}
