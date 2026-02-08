// Copyright (c) 2026, Frappe Technologies Pvt. Ltd. and contributors
// For license information, please see license.txt

frappe.query_reports["Period of Employee"] = {
	"filters": [
		{
			fieldname: "department",
			label: "Department",
			fieldtype: "Link",
			options: "Department",
			reqd: 0
		}
	]
};
