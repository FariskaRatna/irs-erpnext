# Copyright (c) 2026, Frappe Technologies Pvt. Ltd. and contributors
# For license information, please see license.txt

import frappe
from datetime import date


def execute(filters=None):
	filters = filters or {}
	department = filters.get("department")

	today = date.today()

	buckets = {
        "< 1 Tahun": 0,
        "1 - 3 Tahun": 0,
        "3 - 5 Tahun": 0,
        "> 5 Tahun": 0,
    }

	conditions = []
	values = {}

	if department:
		conditions.append("department = %(department)s")
		values["department"] = department

	condition_sql = ""
	if conditions:
		condition_sql = " AND " + " AND ".join(conditions)

	employees = frappe.db.sql(f"""
		SELECT date_of_joining
		FROM `tabEmployee`
		WHERE status = 'Active'
			AND date_of_joining IS NOT NULL
			{condition_sql}
	""", values, as_dict=True)

	for emp in employees:
		years = (today - emp.date_of_joining).days / 365

		if years < 1:
			buckets["< 1 Tahun"] += 1
		elif years < 3:
			buckets["1 - 3 Tahun"] += 1
		elif years < 5:
			buckets["3 - 5 Tahun"] += 1
		else:
			buckets["> 5 Tahun"] += 1

	columns = [
		{"label": "Masa Kerja", "fieldname": "masa_kerja", "fieldtype": "Data"},
		{"label": "Jumlah", "fieldname": "jumlah", "fieldtype": "Int"},
	]

	data = [{"masa_kerja": k, "jumlah": v} for k, v in buckets.items()]

	chart = {
		"data": {
			"labels": list(buckets.keys()),
			"datasets": [
				{"name": "Jumlah Pegawai", "values": list(buckets.values())}
			],
		},
		"type": "bar",
	}

	return columns, data, None, chart