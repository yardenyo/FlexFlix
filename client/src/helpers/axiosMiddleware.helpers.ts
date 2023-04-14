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
		const expirationTime = localStorage.getItem("expirationTime");
		if (expirationTime) {
			const now = new Date();
			const expiration = new Date(expirationTime);
			if (now.getTime() > expiration.getTime()) {
				localStorage.removeItem("jwt-token");
				localStorage.removeItem("expirationTime");
				const win: Window = window;
				win.location = "/login";
			}
		}
		request.headers["Authorization"] = `Bearer ${localStorage.getItem("jwt-token")}`;
		return request;
	},
	requestRejected(error: any): any {
		return error;
	},
};
