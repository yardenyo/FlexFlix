export default {
	responseFulfilled(response: any): any {
		return response;
	},
	responseRejected(error: any): any {
		if ([302, 401, 403].includes(error.response.status)) {
			const win: Window = window;
			win.location = "/login";
		} else {
			return error;
		}
	},
	requestFulfilled(request: any): any {
		request.headers["X-Requested-With"] = "XMLHttpRequest";
		return request;
	},
	requestRejected(error: any): any {
		return error;
	},
};
