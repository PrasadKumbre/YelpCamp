// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.validated-form')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
})()

const input = document.getElementById('image');
const preview = document.getElementById('preview');
let selectedFiles = [];

input.addEventListener('change', function (event) {
    selectedFiles = Array.from(event.target.files);
    renderPreview();
});

// managing images perview.

function renderPreview() {
    preview.innerHTML = '';

    selectedFiles.forEach((file, index) => {
        const reader = new FileReader();

        reader.onload = function (e) {
            const container = document.createElement('div');
            container.classList.add('position-relative');
            container.style.width = '100px';

            const img = document.createElement('img');
            img.src = e.target.result;
            img.classList.add('img-thumbnail');
            img.style.width = '100px';
            img.style.height = '100px';
            img.style.objectFit = 'cover';

            const fileName = document.createElement('div');
            fileName.textContent = file.name;
            fileName.style.fontSize = '0.75rem';
            fileName.classList.add('text-center', 'mt-1');

            const removeBtn = document.createElement('button');
            removeBtn.textContent = '×';
            removeBtn.classList.add('btn', 'btn-sm', 'btn-danger', 'position-absolute');
            removeBtn.style.top = '2px';
            removeBtn.style.right = '2px';
            removeBtn.style.borderRadius = '50%';
            removeBtn.style.padding = '0 6px';
            removeBtn.style.lineHeight = '1';

            removeBtn.addEventListener('click', function () {
                selectedFiles.splice(index, 1);
                updateFileList();
                renderPreview(); // Re-render preview without dispatching input change
            });

            container.appendChild(img);
            container.appendChild(removeBtn);
            container.appendChild(fileName);
            preview.appendChild(container);
        };

        reader.readAsDataURL(file);
    });
}

function updateFileList() {
    const dataTransfer = new DataTransfer();
    selectedFiles.forEach(file => dataTransfer.items.add(file));
    input.files = dataTransfer.files;
}