// Copyright (c) 2015, Frappe Technologies Pvt. Ltd. and Contributors
// License: GNU General Public License v3. See license.txt

frappe.provide("erpnext.projects");

frappe.ui.form.on("Task", {
	setup: function (frm) {
		frm.make_methods = {
			Timesheet: () =>
				frappe.model.open_mapped_doc({
					method: "erpnext.projects.doctype.task.task.make_timesheet",
					frm: frm,
				}),
		};
	},

	refresh: function(frm) {
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
		frm.set_query("task", "depends_on", function () {
			let filters = {
				name: ["!=", frm.doc.name],
			};
			if (frm.doc.project) filters["project"] = frm.doc.project;
			return {
				filters: filters,
			};
		});

		frm.set_query("parent_task", function () {
			let filters = {
				is_group: 1,
				name: ["!=", frm.doc.name],
			};
			if (frm.doc.project) filters["project"] = frm.doc.project;
			return {
				filters: filters,
			};
		});
	},

	is_group: function (frm) {
		frappe.call({
			method: "erpnext.projects.doctype.task.task.check_if_child_exists",
			args: {
				name: frm.doc.name,
			},
			callback: function (r) {
				if (r.message.length > 0) {
					let message = __(
						"Cannot convert Task to non-group because the following child Tasks exist: {0}.",
						[r.message.join(", ")]
					);
					frappe.msgprint(message);
					frm.reload_doc();
				}
			},
		});
	},

	validate: function (frm) {
		frm.doc.project && frappe.model.remove_from_locals("Project", frm.doc.project);
	},
});
