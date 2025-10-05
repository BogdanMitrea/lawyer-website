// Mobile menu
const hamb = document.getElementById('hamb');
const drawer = document.getElementById('drawer');
hamb.addEventListener('click', () => drawer.classList.toggle('open'));

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('show');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.14 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Contact form (Web3Forms integration)
const form = document.getElementById('form');
const success = document.getElementById('success');
const error = document.getElementById('error');

form.addEventListener('submit', function (ev) {
  ev.preventDefault();

  const formData = new FormData(form);

  // Reset messages
  success.style.display = 'none';
  if (error) error.style.display = 'none';

  fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    body: formData
  })
    .then(async (response) => {
      const json = await response.json();
      if (json.success) {
        success.style.display = 'block';
        form.reset();
      } else {
        if (error) error.style.display = 'block';
      }
    })
    .catch(() => {
      if (error) error.style.display = 'block';
    });
});
