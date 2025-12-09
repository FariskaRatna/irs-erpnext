frappe.listview_settings["Employee"] = {
	add_fields: ["status", "branch", "department", "designation", "image"],
	filters: [["status", "=", "Active"]],
	get_indicator: function (doc) {
		return [
			__(doc.status, null, "Employee"),
			{ Active: "green", Inactive: "red", Left: "gray", Suspended: "orange" }[doc.status],
			"status,=," + doc.status,
		];
	},

	refresh: listview => {
		$('span.level-item.list-liked-by-me.hidden-xs').remove();
        $('span.list-row-like.hidden-xs').remove();
        $('span.comment-count.d-flex.align-items-center').remove();
        $('span.mx-2').remove();

        setTimeout(() => {
            $('.list-row .level-right').css({
                "flex": "0 0 70px",
                "max-width": "70px",
                "padding": "0 4px",
                "margin": "0",
                "text-align": "right",
                "white-space": "nowrap",
                "overflow": "hidden"
            });

            $('.list-row-head .level-right').css({
                "flex": "0 0 70px",
                "max-width": "70px",
                "padding": "0 4px",
                "margin": "0",
                "text-align": "right",
                "white-space": "nowrap",
                "overflow": "hidden"
            });
        }, 0)
	}
};
