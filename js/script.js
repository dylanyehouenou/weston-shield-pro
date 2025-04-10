<script>
function handleFormSubmit(event) {
  event.preventDefault();
  const form = event.target;

  // Simulate form submission
  fetch(form.action, {
    method: form.method,
    body: new FormData(form),
  })
    .then(() => {
      // Redirect to the main page and scroll to a specific section
      window.location.href = "index.html#contact";
      alert("Votre message a été envoyé avec succès !");
    })
    .catch(() => {
      alert("Une erreur s'est produite. Veuillez réessayer.");
    });
}
</script>