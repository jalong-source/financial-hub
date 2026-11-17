// dashboard.js - Thành viên 1 (Team Lead) phụ trách tích hợp
document.addEventListener('DOMContentLoaded', () => {
  const gpaInput = document.getElementById('d-gpa');
  const creditPriceInput = document.getElementById('d-credit-price');
  const btnUpdate = document.getElementById('btn-dashboard-update');
  const checkboxes = document.querySelectorAll('.d-cb');

  const totalCreditsEl = document.getElementById('d-total-credits');
  const totalTuitionEl = document.getElementById('d-total-tuition');
  const scholarshipLevelEl = document.getElementById('d-scholarship-level');
  const debtEl = document.getElementById('d-debt');
  const formulaEl = document.getElementById('d-formula');
  const grandTotalEl = document.getElementById('d-grand-total');

  const cards = {
    xs: document.getElementById('d-card-xs'),
    g: document.getElementById('d-card-g'),
    k: document.getElementById('d-card-k'),
    kk: document.getElementById('d-card-kk')
  };

  function formatVND(n) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(n);
  }

  function getScholarship(gpa) {
    if (gpa >= 3.60) return { key: 'xs', rate: 1.0, title: 'Xuất sắc (100%)' };
    if (gpa >= 3.20) return { key: 'g', rate: 0.75, title: 'Giỏi (75%)' };
    if (gpa >= 2.50) return { key: 'k', rate: 0.50, title: 'Khá (50%)' };
    if (gpa >= 2.00) return { key: 'kk', rate: 0.25, title: 'Khuyến khích (25%)' };
    return { key: null, rate: 0, title: '0% (Không đạt)' };
  }

  function refreshDashboard() {
    const gpa = parseFloat(gpaInput.value) || 0;
    const price = parseFloat(creditPriceInput.value) || 0;

    Object.values(cards).forEach(c => c && c.classList.remove('active'));

    const sch = getScholarship(gpa);
    if (sch.key && cards[sch.key]) {
      cards[sch.key].classList.add('active');
    }

    scholarshipLevelEl.textContent = sch.title;

    let totalCredits = 0;
    let tuition = 0;

    checkboxes.forEach(cb => {
      const row = cb.closest('tr');
      const credits = parseInt(cb.dataset.credits, 10) || 0;
      const cost = credits * price;
      row.querySelector('.d-cost').textContent = formatVND(cost);

      if (cb.checked) {
        totalCredits += credits;
        tuition += cost;
        row.style.opacity = '1';
      } else {
        row.style.opacity = '0.45';
      }
    });

    const discount = tuition * sch.rate;
    const debt = Math.max(0, tuition - discount);

    totalCreditsEl.textContent = `${totalCredits} TC`;
    totalTuitionEl.textContent = formatVND(tuition);
    debtEl.textContent = formatVND(debt);
    grandTotalEl.textContent = formatVND(debt);

    formulaEl.textContent = `Học phí gốc ${formatVND(tuition)} - Miễn giảm ${formatVND(discount)} = Còn lại ${formatVND(debt)}`;
  }

  btnUpdate.addEventListener('click', refreshDashboard);
  gpaInput.addEventListener('input', refreshDashboard);
  creditPriceInput.addEventListener('input', refreshDashboard);
  checkboxes.forEach(cb => cb.addEventListener('change', refreshDashboard));

  refreshDashboard();
});

