document.addEventListener("DOMContentLoaded", function() {

    const toggleStructure = document.getElementById("toggleStructure");

    if (toggleStructure) {
        toggleStructure.addEventListener("click", function() {

            const isShowing = document.body.classList.toggle("show-structure");

            // Hitta alla hover-bilder och sätt opacity direkt via JS
            const hoverImages = document.querySelectorAll('.hover-image');
            hoverImages.forEach(img => {
                img.style.opacity = isShowing ? '1' : '0';
            });

            toggleStructure.textContent = isShowing ? "Dölj grupper" : "Visa grupper";
        });
    }

});
