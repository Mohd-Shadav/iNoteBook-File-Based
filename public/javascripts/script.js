
    document.addEventListener("DOMContentLoaded", () => {
        const deleteButtons = document.querySelectorAll('.delete-btn');

        deleteButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
            
                const filename = button.getAttribute('data-filename');

                fetch(`/delete/${filename}`, {
                    method: 'DELETE',
                })
                .then(response => {
                    if (response.ok) {
                        window.location.reload(); // Reload the page to reflect the change
                    } else {
                        alert('Error deleting file.');
                    }
                })
                .catch(error => console.error('Error:', error));
            });
        });
    });
