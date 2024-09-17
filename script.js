document.addEventListener('DOMContentLoaded', () => {
    const resumeForm = document.getElementById('resumeForm');
    const resumeOutput = document.getElementById('resumeOutput');
    const downloadPDFButton = document.getElementById('downloadPDF');
    const editResumeButton = document.getElementById('editResume');
    const shareableLinkDiv = document.getElementById('shareableLink');
    const resumeURLInput = document.getElementById('resumeURL');
    const toggleButton = document.getElementById('toggleButton');

    // Handle form submission
    resumeForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(resumeForm);
        const resumeContent = `
            <h1>Resume</h1>
            <h2>Personal Information</h2>
            <p>Name: ${formData.get('name')}</p>
            <p>Email: ${formData.get('email')}</p>
            <p>Phone: ${formData.get('phone')}</p>
            <h2>Qualification</h2>
            <p>${formData.get('qualification')}</p>
            <h2>Experience</h2>
            <p>${formData.get('experience')}</p>
            <h2>Skills</h2>
            <p>${formData.get('skills')}</p>
        `;

        // Display resume content
        resumeOutput.style.display = 'block';
        shareableLinkDiv.style.display = 'none';
        
        // Handle PDF download
        downloadPDFButton.addEventListener('click', () => {
            const opt = {
                margin: 1,
                filename: 'resume.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
            };

            html2pdf().from(resumeContent).set(opt).save();
        });

        // Generate a shareable link (for demonstration, use local storage)
        const resumeData = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            qualification: formData.get('qualification'),
            experience: formData.get('experience'),
            skills: formData.get('skills')
        };

        const uniqueID = new Date().getTime(); // Just a simple unique ID
        localStorage.setItem(`resume_${uniqueID}`, JSON.stringify(resumeData));
        const shareableURL = `${window.location.href}?resumeID=${uniqueID}`;

        resumeURLInput.value = shareableURL;
        shareableLinkDiv.style.display = 'block';
    });

    // Toggle view button
    toggleButton.addEventListener('click', () => {
        const resumeForm = document.getElementById('resumeForm');
        if (resumeForm.style.display === 'none') {
            resumeForm.style.display = 'block';
            toggleButton.innerHTML = '<em><strong>View</strong></em>';
        } else {
            resumeForm.style.display = 'none';
            toggleButton.innerHTML = '<em><strong>Hide</strong></em>';
        }
    });

    // Edit resume button
    editResumeButton.addEventListener('click', () => {
        resumeOutput.style.display = 'none';
        resumeForm.style.display = 'block';
        toggleButton.innerHTML = '<em><strong>Hide</strong></em>';
    });
});
