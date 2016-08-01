export default (()=>{
	return !!(
		typeof window !== 'undefined'
	&&
		window.document
	&&
		window.document.createElement
	)
})()