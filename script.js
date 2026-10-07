const sidebar = document.querySelector('.sidebar');
const toast = document.querySelector('#toast');
const dialog = document.querySelector('#update-dialog');
const portfolioTotal = document.querySelector('#portfolio-total');

function showToast(title = 'Portfolio updated', detail = 'Your changes are now visible.') {
  toast.querySelector('strong').textContent = title;
  toast.querySelector('small').textContent = detail;
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 2600);
}

document.querySelector('.mobile-menu').addEventListener('click', () => sidebar.classList.toggle('open'));
document.addEventListener('click', (event) => {
  if (window.innerWidth <= 760 && sidebar.classList.contains('open') && !sidebar.contains(event.target) && !event.target.closest('.mobile-menu')) sidebar.classList.remove('open');
});

document.querySelectorAll('.nav-item').forEach((item) => item.addEventListener('click', () => {
  document.querySelectorAll('.nav-item').forEach((link) => link.classList.remove('active'));
  item.classList.add('active');
  if (item.dataset.section !== 'Overview') showToast(item.dataset.section, 'This workspace view is ready for your data.');
}));

document.querySelectorAll('.period-tabs button').forEach((button) => button.addEventListener('click', () => {
  document.querySelectorAll('.period-tabs button').forEach((tab) => tab.classList.remove('active'));
  button.classList.add('active');
  document.querySelector('.chart-line').style.strokeDasharray = button.dataset.period === '1M' ? '5 3' : 'none';
}));

document.querySelector('#update-portfolio').addEventListener('click', () => dialog.showModal());
document.querySelector('#portfolio-form').addEventListener('submit', (event) => {
  const submitter = event.submitter;
  if (submitter?.value === 'cancel') return;
  event.preventDefault();
  const amount = Number(document.querySelector('#value-input').value);
  if (!Number.isFinite(amount) || amount < 0) return;
  portfolioTotal.textContent = `R ${amount.toLocaleString('en-ZA')}`;
  document.querySelector('.chart-summary strong').textContent = `R${amount.toLocaleString('en-ZA')}`;
  dialog.close();
  showToast();
});

document.querySelector('#refresh-data').addEventListener('click', (event) => {
  event.currentTarget.classList.add('spin');
  window.setTimeout(() => {
    event.currentTarget.classList.remove('spin');
    showToast('Everything is up to date', 'All four providers synced successfully.');
  }, 600);
});

document.querySelector('#role-switcher').addEventListener('change', (event) => {
  const roleNames = { client: 'Client', broker: 'Broker workspace', management: 'Partner overview', company: 'Company portfolio' };
  showToast(roleNames[event.target.value], 'Dashboard perspective switched successfully.');
});

document.querySelector('#contact-adviser').addEventListener('click', () => showToast('Message started', 'Candice will be notified of your request.'));
document.querySelector('#notifications').addEventListener('click', () => showToast('2 new notifications', 'Your latest statements are ready to review.'));
document.querySelectorAll('.text-button, .insight button').forEach((button) => button.addEventListener('click', () => showToast(button.textContent.replace('→', '').trim(), 'This action is ready to connect to your workflow.')));
