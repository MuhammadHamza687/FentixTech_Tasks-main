// Student Registration System - JavaScript

// ==================== Data Management ====================
let students = JSON.parse(localStorage.getItem('students')) || [];
let editingIndex = null;
const editModal = new bootstrap.Modal(document.getElementById('editModal'));

// ==================== Form Elements ====================
const form = document.getElementById('registrationForm');
const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const courseInput = document.getElementById('course');
const tableBody = document.getElementById('tableBody');
const emptyMessage = document.getElementById('emptyMessage');

// Edit Modal Elements
const editForm = document.getElementById('editForm');
const editFullNameInput = document.getElementById('editFullName');
const editEmailInput = document.getElementById('editEmail');
const editPhoneInput = document.getElementById('editPhone');
const editCourseInput = document.getElementById('editCourse');
const saveEditBtn = document.getElementById('saveEditBtn');

// ==================== Validation Functions ====================

/**
 * Validate Full Name
 * - Required field
 * - Minimum 3 characters
 * - Only letters and spaces allowed
 */
function validateFullName(name) {
    const errors = [];
    
    if (!name.trim()) {
        errors.push('Full name is required');
    } else if (name.trim().length < 3) {
        errors.push('Full name must be at least 3 characters');
    } else if (!/^[a-zA-Z\s]+$/.test(name)) {
        errors.push('Full name can only contain letters and spaces');
    }
    
    return errors;
}

/**
 * Validate Email
 * - Required field
 * - Must be valid email format
 */
function validateEmail(email) {
    const errors = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email.trim()) {
        errors.push('Email address is required');
    } else if (!emailRegex.test(email)) {
        errors.push('Please enter a valid email address');
    }
    
    return errors;
}

/**
 * Validate Phone Number
 * - Required field
 * - Must be 10-15 digits
 * - Can include +, -, spaces, parentheses
 */
function validatePhone(phone) {
    const errors = [];
    const phoneRegex = /^[\d\s\-\+\(\)]{10,15}$/;
    const digitsOnly = phone.replace(/\D/g, '');
    
    if (!phone.trim()) {
        errors.push('Phone number is required');
    } else if (!phoneRegex.test(phone)) {
        errors.push('Phone number must be 10-15 digits');
    } else if (digitsOnly.length < 10) {
        errors.push('Phone number must contain at least 10 digits');
    }
    
    return errors;
}

/**
 * Validate Course Selection
 * - Required field
 * - Must be selected
 */
function validateCourse(course) {
    const errors = [];
    
    if (!course.trim()) {
        errors.push('Please select a course');
    }
    
    return errors;
}

/**
 * Display Validation Errors
 */
function displayError(inputId, errors) {
    const input = document.getElementById(inputId);
    const errorElement = document.getElementById(inputId + 'Error');
    
    if (errors.length > 0) {
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        errorElement.textContent = errors[0];
        errorElement.classList.add('show');
        return false;
    } else {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
        errorElement.classList.remove('show');
        errorElement.textContent = '';
        return true;
    }
}

/**
 * Clear All Error Messages and Validation States
 */
function clearAllErrors() {
    const inputs = ['fullName', 'email', 'phone', 'course'];
    inputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        const errorElement = document.getElementById(inputId + 'Error');
        input.classList.remove('is-invalid', 'is-valid');
        errorElement.classList.remove('show');
        errorElement.textContent = '';
    });
}

/**
 * Validate Entire Form
 */
function validateForm() {
    const fullNameErrors = validateFullName(fullNameInput.value);
    const emailErrors = validateEmail(emailInput.value);
    const phoneErrors = validatePhone(phoneInput.value);
    const courseErrors = validateCourse(courseInput.value);
    
    const isFullNameValid = displayError('fullName', fullNameErrors);
    const isEmailValid = displayError('email', emailErrors);
    const isPhoneValid = displayError('phone', phoneErrors);
    const isCourseValid = displayError('course', courseErrors);
    
    return isFullNameValid && isEmailValid && isPhoneValid && isCourseValid;
}

// ==================== Real-time Validation ====================

fullNameInput.addEventListener('blur', () => {
    const errors = validateFullName(fullNameInput.value);
    displayError('fullName', errors);
});

emailInput.addEventListener('blur', () => {
    const errors = validateEmail(emailInput.value);
    displayError('email', errors);
});

phoneInput.addEventListener('blur', () => {
    const errors = validatePhone(phoneInput.value);
    displayError('phone', errors);
});

courseInput.addEventListener('change', () => {
    const errors = validateCourse(courseInput.value);
    displayError('course', errors);
});

// ==================== Form Submission ====================

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (validateForm()) {
        const student = {
            id: Date.now(),
            fullName: fullNameInput.value.trim(),
            email: emailInput.value.trim(),
            phone: phoneInput.value.trim(),
            course: courseInput.value
        };
        
        students.push(student);
        saveStudents();
        renderTable();
        clearForm();
        clearAllErrors();
        
        // Show success message (optional)
        showSuccessMessage('Student registered successfully!');
    }
});

/**
 * Clear Form Fields
 */
function clearForm() {
    form.reset();
    clearAllErrors();
}

/**
 * Show Success Message
 */
function showSuccessMessage(message) {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-success alert-dismissible fade show';
    alertDiv.setAttribute('role', 'alert');
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    form.parentElement.insertBefore(alertDiv, form);
    
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}

// ==================== Table Rendering ====================

/**
 * Render Students Table
 */
function renderTable() {
    tableBody.innerHTML = '';
    
    if (students.length === 0) {
        emptyMessage.style.display = 'table-row';
        return;
    }
    
    emptyMessage.style.display = 'none';
    
    students.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${escapeHtml(student.fullName)}</td>
            <td>${escapeHtml(student.email)}</td>
            <td>${escapeHtml(student.phone)}</td>
            <td>${escapeHtml(student.course)}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-success btn-sm" onclick="editStudent(${index})">
                        Edit
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="deleteStudent(${index})">
                        Delete
                    </button>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// ==================== Edit Functionality ====================

/**
 * Open Edit Modal
 */
function editStudent(index) {
    editingIndex = index;
    const student = students[index];
    
    editFullNameInput.value = student.fullName;
    editEmailInput.value = student.email;
    editPhoneInput.value = student.phone;
    editCourseInput.value = student.course;
    
    clearEditErrors();
    editModal.show();
}

/**
 * Clear Edit Form Errors
 */
function clearEditErrors() {
    const inputs = ['editFullName', 'editEmail', 'editPhone', 'editCourse'];
    inputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        const errorElement = document.getElementById(inputId + 'Error');
        input.classList.remove('is-invalid', 'is-valid');
        errorElement.classList.remove('show');
        errorElement.textContent = '';
    });
}

/**
 * Validate Edit Form
 */
function validateEditForm() {
    const fullNameErrors = validateFullName(editFullNameInput.value);
    const emailErrors = validateEmail(editEmailInput.value);
    const phoneErrors = validatePhone(editPhoneInput.value);
    const courseErrors = validateCourse(editCourseInput.value);
    
    const isFullNameValid = displayError('editFullName', fullNameErrors);
    const isEmailValid = displayError('editEmail', emailErrors);
    const isPhoneValid = displayError('editPhone', phoneErrors);
    const isCourseValid = displayError('editCourse', courseErrors);
    
    return isFullNameValid && isEmailValid && isPhoneValid && isCourseValid;
}

/**
 * Save Edit Changes
 */
saveEditBtn.addEventListener('click', () => {
    if (validateEditForm()) {
        students[editingIndex] = {
            ...students[editingIndex],
            fullName: editFullNameInput.value.trim(),
            email: editEmailInput.value.trim(),
            phone: editPhoneInput.value.trim(),
            course: editCourseInput.value
        };
        
        saveStudents();
        renderTable();
        editModal.hide();
        showSuccessMessage('Student information updated successfully!');
    }
});

// Real-time validation in edit form
editFullNameInput.addEventListener('blur', () => {
    const errors = validateFullName(editFullNameInput.value);
    displayError('editFullName', errors);
});

editEmailInput.addEventListener('blur', () => {
    const errors = validateEmail(editEmailInput.value);
    displayError('editEmail', errors);
});

editPhoneInput.addEventListener('blur', () => {
    const errors = validatePhone(editPhoneInput.value);
    displayError('editPhone', errors);
});

editCourseInput.addEventListener('change', () => {
    const errors = validateCourse(editCourseInput.value);
    displayError('editCourse', errors);
});

// ==================== Delete Functionality ====================

/**
 * Delete Student Record
 */
function deleteStudent(index) {
    if (confirm('Are you sure you want to delete this student record?')) {
        students.splice(index, 1);
        saveStudents();
        renderTable();
        showSuccessMessage('Student record deleted successfully!');
    }
}

// ==================== LocalStorage Management ====================

/**
 * Save Students to LocalStorage
 */
function saveStudents() {
    localStorage.setItem('students', JSON.stringify(students));
}

/**
 * Load Students from LocalStorage
 */
function loadStudents() {
    students = JSON.parse(localStorage.getItem('students')) || [];
    renderTable();
}

// ==================== Initialization ====================

// Load students on page load
document.addEventListener('DOMContentLoaded', () => {
    loadStudents();
});
