import frappe
from frappe.utils import nowdate, getdate

def reset_employee_reimbursement(force=False):
    today = getdate(nowdate())

    # Tambahkan opsi force=True untuk bypass tanggal
    if today.day == 1 or force:
        employees = frappe.get_all("Employee", fields=["name", "total_reimbursement"])

        for emp in employees:
            total_reimbursement = emp.total_reimbursement or 0

            frappe.db.set_value("Employee", emp.name, "reimbursement_used", 0)
            frappe.db.set_value("Employee", emp.name, "balance", total_reimbursement)

        frappe.db.commit()
        frappe.logger().info(f"✅ Reimbursement reset for {len(employees)} employees on {today}")
