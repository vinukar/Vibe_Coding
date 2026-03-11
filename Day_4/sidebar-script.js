document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('events-sidebar');
    const toggleBtns = document.querySelectorAll('#sidebar-toggle');
    const body = document.body;

    // Check localStorage to maintain state across pages
    const isSidebarClosed = localStorage.getItem('sidebarClosed') === 'true';

    if (isSidebarClosed) {
        sidebar.classList.add('minimized');
        body.classList.add('sidebar-closed');
    }

    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            sidebar.classList.toggle('minimized');
            body.classList.toggle('sidebar-closed');

            // Save state
            const isClosed = sidebar.classList.contains('minimized');
            localStorage.setItem('sidebarClosed', isClosed);
        });
    });
});
