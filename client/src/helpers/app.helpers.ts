import { isArray as _isArray, isNaN, isNumber } from "lodash";
import moment from "moment";

const Helpers = {
	status(response: any, getMessage: boolean = true, key: string = "msg"): boolean {
		if (!response.data.status) {
			if (getMessage) {
				throw response.data[key ? key : "msg"];
			}
			throw "ERROR: Status: false";
		}
		return true;
	},

	isNil(value: any): boolean {
		return value === undefined || value === null;
	},

	getNumber(str: string, absoluteNumber: boolean = true): string {
		if (absoluteNumber) return str.replace(/[^.^\d]*/g, "");
		return str.replace(/[^0-9.-]/g, "");
	},

	uuid(): string {
		return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
			const r = (Math.random() * 16) | 0,
				v = c == "x" ? r : (r & 0x3) | 0x8;
			return v.toString(16);
		});
	},

	isNumpty(value: any, _objectsOnly: boolean = false): boolean {
		return typeof value === "number"
			? false
			: this.isNil(value) ||
					(this.getType(value) === "array" && value.length === 0 && !_objectsOnly) ||
					(this.getType(value) === "object" && this.emptyObject(value)) ||
					(typeof value === "string" && value.trim().length === 0);
	},

	getType(variable: any, asTypeOf: boolean = false): any {
		if (asTypeOf) return typeof variable;
		if (variable === true) return true;
		else if (variable === false) return false;
		else if (variable === null || variable === undefined) return null;
		else if (this.isDate(variable)) return "date";
		else if (Array.isArray(variable)) return "array";
		else if (isNumber(variable) || !isNaN(Number(variable))) return "number";
		else if (typeof variable === "string") return "string";
		else if ({}.toString.call(variable) === "[object Function]") return "function";
		else return "object";
	},

	emptyObject(value: any): boolean {
		let empty_object = true;
		if (this.getType(value) !== "object") {
			empty_object = false;
			return empty_object;
		}
		if (Object.keys(value).length === 0) {
			empty_object = true;
			return empty_object;
		}
		for (const k in value) {
			if (!this.isNil(value[k]) && value[k] !== "") {
				empty_object = false;
			}
		}
		return empty_object;
	},

	isDate(value: any): boolean {
		const regExp = /[a-zA-Z]/g;
		const v = value.toString();
		const verify = v.length > 8 ? v.substring(0, value.length - 6) : v;
		const validDate = moment(verify, "DD/MM/YY", true).isValid();
		const validMonth = moment(verify, "MM/YYYY", true).isValid();
		return (validDate || validMonth) && !regExp.test(verify) && verify.toString().includes("/");
	},
	isValidLoginPassword(password: string): boolean {
		return /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#/.,$?`|'-_*/%^&*[\]~_,()]{8,}$/.test(password);
	},
};

export default Helpers;
