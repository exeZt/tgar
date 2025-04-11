export function getCookie(name: string) {
	const value = `; ${document.cookie}`;
	const parts: string[] | undefined = value.split(`; ${name}=`);
	if (parts.length === 2)
		return parts?.pop()?.split(';')?.shift();
}
