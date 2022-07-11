export default function debounce(func: Function, timeout: number = 500) {
	let timer: NodeJS.Timeout;
	return (...args: any) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			func.apply(this, args);
		}, timeout);
	};
}
