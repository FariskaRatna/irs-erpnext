# Copyright (c) 2026, Frappe Technologies Pvt. Ltd. and contributors
# For license information, please see license.txt

import frappe


def execute(filters=None):
	# columns, data = [], []
	filters = filters or {}

	conditions = []
	values = {}

	if filters.get("project"):
		conditions.append("td.project = %(project)s")
		values["project"] = filters.get("project")

	if filters.get("employee"):
		conditions.append("t.allocated_to = %(employee)s")
		values["employee"] = filters.get("employee")

	condition_sql = ""
	if conditions:
		condition_sql = " AND " + " AND ".join(conditions)

	columns = [
		{
			"label": "Employee",
			"fieldname": "employee",
			"fieldtype": "Data",
			"width": 250
		},
		{
			"label": "Total Tasks",
			"fieldname": "total_tasks",
			"fieldtype": "Int",
			"width": 120
		}
	]

	data = frappe.db.sql(f"""
		SELECT
			COALESCE(u.full_name, t.allocated_to) AS employee,
			COUNT(td.name) AS total_tasks
		FROM `tabToDo` t
		JOIN `tabTask` td
			ON t.reference_name = td.name
		LEFT JOIN `tabUser` u
			ON u.name = t.allocated_to
		WHERE
			t.reference_type = 'Task'
			AND td.docstatus < 2
			{condition_sql}
		GROUP BY employee
		ORDER BY total_tasks DESC
	""", values, as_dict=True)
	
	return columns, data
