document.addEventListener('DOMContentLoaded', () => {
    const courseInput = document.getElementById('course-input');
    const creditsInput = document.getElementById('credits-input');
    const gradeInput = document.getElementById('grade-input');
    const addCourseBtn = document.getElementById('add-course-btn');
    const courseList = document.getElementById('course-list');
    const totalGpaDisplay = document.getElementById('total-gpa');

    let courses = JSON.parse(localStorage.getItem('gpaCourses')) || [];

    const gradePoints = {
        'A+': 4.0, 'A': 4.0, 'A-': 3.7,
        'B+': 3.3, 'B': 3.0, 'B-': 2.7,
        'C+': 2.3, 'C': 2.0, 'C-': 1.7,
        'D+': 1.3, 'D': 1.0, 
        'E': 0.0, 'F': 0.0
    };

    function init() {
        renderCourses();
        calculateGPA();
    }

    function renderCourses() {
        courseList.innerHTML = '';
        if (courses.length === 0) {
            courseList.innerHTML = '<li class="empty-state">No courses added yet.</li>';
            return;
        }

        courses.forEach((course, index) => {
            const li = document.createElement('li');
            li.className = 'idea-item';
            li.innerHTML = `
                <div class="idea-header">
                    <span class="idea-user">${course.name}</span>
                    <button class="delete-idea-btn" data-index="${index}" title="Remove Course">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                </div>
                <div class="idea-text" style="display: flex; gap: 1rem; margin-top: 0.5rem; font-size: 0.9rem; color: var(--text-muted);">
                    <span>Credits: <strong>${course.credits}</strong></span>
                    <span>Grade: <strong>${course.grade}</strong></span>
                </div>
            `;
            courseList.appendChild(li);
        });
    }

    function calculateGPA() {
        let totalCredits = 0;
        let totalPoints = 0;

        courses.forEach(course => {
            const points = gradePoints[course.grade.toUpperCase()] || 0;
            totalPoints += points * course.credits;
            totalCredits += course.credits;
        });

        const gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';
        totalGpaDisplay.textContent = gpa;
    }

    function saveData() {
        localStorage.setItem('gpaCourses', JSON.stringify(courses));
    }

    addCourseBtn.addEventListener('click', () => {
        const name = courseInput.value.trim();
        const credits = parseFloat(creditsInput.value);
        const grade = gradeInput.value.trim().toUpperCase();

        if (!name) {
            alert('Please enter a course name!');
            return;
        }
        if (isNaN(credits) || credits <= 0) {
            alert('Please enter a valid number of credits!');
            return;
        }
        if (!gradePoints.hasOwnProperty(grade)) {
            alert(`Invalid grade! Accepted grades: ${Object.keys(gradePoints).join(', ')}`);
            return;
        }

        courses.push({ name, credits, grade });
        
        // Reset inputs
        courseInput.value = '';
        creditsInput.value = '';
        gradeInput.value = '';

        saveData();
        renderCourses();
        calculateGPA();
    });

    courseList.addEventListener('click', (e) => {
        const deleteBtn = e.target.closest('.delete-idea-btn');
        if (deleteBtn) {
            const index = parseInt(deleteBtn.getAttribute('data-index'));
            courses.splice(index, 1);
            saveData();
            renderCourses();
            calculateGPA();
        }
    });

    init();
});
