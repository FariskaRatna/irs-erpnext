frappe.listview_settings["Project Update"] = {
    onload: function(listview) {
        listview.page_length = 100;

        $('button[data-value="20"]').removeClass("btn-info");
        $('button[data-calue="100"]').addClass("btn-info");
        listview.refresh();
    }
}