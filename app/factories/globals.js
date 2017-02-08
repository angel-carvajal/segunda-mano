export default function($log, LxNotificationService) {
	let alertMsg = (alertType, msg, logMsg) => {
		$log[alertType](logMsg);
		LxNotificationService[alertType](msg);
	};
	return {
		alertMsg
	};
}