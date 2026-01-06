frappe.listview_settings["Timesheet"] = {
	add_fields: ["status", "total_hours", "start_date", "end_date"],
	onload: function(listview) {
		listview.page_length = 100;

		$('button[data-value="20"]').removeClass("btn-info");
		$('button[data-value="100"]').addClass("btn-info");
		listview.refresh();
	},
	get_indicator: function (doc) {
		if (doc.status == "Billed") {
			return [__("Billed"), "green", "status,=," + "Billed"];
		}

		if (doc.status == "Payslip") {
			return [__("Payslip"), "green", "status,=," + "Payslip"];
		}

		if (doc.status == "Completed") {
			return [__("Completed"), "green", "status,=," + "Completed"];
		}
	},
};
