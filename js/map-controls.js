document.addEventListener("DOMContentLoaded", function() {

    const toggleStructure = document.getElementById("toggleStructure");

    /* Visa grupper */
    if (toggleStructure) {
        toggleStructure.addEventListener("click", function() {
            document.body.classList.toggle("show-structure");
            if (document.body.classList.contains("show-structure")) {
                toggleStructure.textContent = "Dölj grupper";
            } else {
                toggleStructure.textContent = "Visa grupper";
            }
        });
    }

});
