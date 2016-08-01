export default (()=>{
	let isMobile = false; //initiate as false
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		isMobile = true
	}
	return isMobile;
})()