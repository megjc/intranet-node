/**
 *
 */
'use strict'
let statements = {
    UPDATE: 'UPDATE employees SET name = ?, email = ?, position = ?, classification_id = ?, activity_id = ?, allowance_type = ? WHERE id = ?',
    GET: "SELECT employees.id, employees.name, employees.position, employees.classification_id, allowances.title, activities.title AS `act_title`, allowances.amount FROM employees"
          + " INNER JOIN allowances ON employees.allowance_type = allowances.id"
          + " INNER JOIN activities ON employees.activity_id = activities.id WHERE employees.is_traveling = 'T' ORDER BY activities.title ASC",
    GETTYPE: "SELECT employees.id, employees.name, employees.position, employees.classification_id, activities.title, employees.start_date, employees.end_date FROM employees"
          + " INNER JOIN activities ON employees.activity_id = activities.id WHERE ?? = ? ORDER BY activities.title ASC",
    SHOW: 'SELECT employees.id, employees.name, employees.email, employees.position, employees.classification_id, '
          + 'employees.activity_id, employees.allowance_type, vehicles.id as `vehicle_id`, vehicles.make, vehicles.model, vehicles.year AS `vehicle_year`, vehicles.plate, vehicles.comments, vehicles.is_owner FROM ?? '
          + ' LEFT JOIN vehicles ON employees.id = vehicles.emp_id WHERE employees.id = ?',
    TRAVEL_OFFICERS: 'SELECT * FROM ?? WHERE ?? = ?',
    UPDATEVEHICLE: 'UPDATE vehicles SET plate = ?, make = ?, model = ?, year = ? WHERE id = ?',
    UPDATEDOC: 'UPDATE documents SET expiry_date = ? WHERE id = ? AND employee_id = ?',
    EXPIREDDOCS: "SELECT d.id, d.title, d.expiry_date, d.employee_id, e.name, e.email FROM documents AS `d` INNER JOIN employees as `e` ON e.id = d.employee_id WHERE e.is_traveling = 'T' AND d.expiry_date <= NOW() AND d.expiry_date != '2000-01-01 00:00:00' ORDER BY e.name ASC",
    GETDOCS: 'SELECT id, first_name, last_name, position, (SELECT COUNT(id) FROM documents WHERE employee_id = employees.id AND expires_on < NOW() ) as expired_docs FROM employees WHERE ?? = ? HAVING expired_docs > 0'
}
exports.statements = statements
