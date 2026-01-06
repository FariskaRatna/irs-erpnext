// Copyright (c) 2018, Frappe Technologies Pvt. Ltd. and contributors
// For license information, please see license.txt

frappe.ui.form.on("Project Update", {
	refresh: function (frm) {
		setTimeout(function() {
			let save_button = frm.page.wrapper.find('.primary-action');
			if (save_button.length > 0) {
				save_button.hide();

				let custom_button = $('<div>')
					.css({
						'text-align': 'right',
						'margin-top': '20px',
						'position': 'relative',
						'bottom': '10px',
						'width': '100%'
					}).appendTo(frm.$wrapper.find('.form-layout'));

				save_button.appendTo(custom_button);

				save_button.show();
			}
		}, 50);
	},

	onload: function (frm) {
		frm.set_value("naming_series", "UPDATE-.project.-.YY.MM.DD.-.####");
	},

	validate: function (frm) {
		frm.set_value("time", frappe.datetime.now_time());
		frm.set_value("date", frappe.datetime.nowdate());
	},
});
