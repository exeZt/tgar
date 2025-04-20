export default {
	host: import.meta.env.VITE_PRODUCTION === false ? 'http://localhost:4554/' : '/',
}