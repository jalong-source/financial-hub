// scholarship.js - Thành viên 3 (UI Designer) phụ trách
document.addEventListener('DOMContentLoaded', () => {
  const gpaInput = document.getElementById('gpa-input');
  const totalTuitionInput = document.getElementById('total-tuition');
  const btnCheck = document.getElementById('btn-check-scholarship');
  const resultDiv = document.getElementById('gpa-result');
  const cards = document.querySelectorAll('.scholarship-card');
  const summaryBox = document.getElementById('scholarship-summary');
  const detailLabel = document.getElementById('scholarship-detail');
  const amountTotal = document.getElementById('scholarship-amount');

  function formatVND(amount) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  }

  function evaluateScholarship() {
    const gpa = parseFloat(gpaInput.value);
    const baseTuition = parseFloat(totalTuitionInput.value) || 0;

    cards.forEach(card => card.classList.remove('active'));

    if (isNaN(gpa) || gpa < 0 || gpa > 4.0) {
      resultDiv.className = 'result error';
      resultDiv.textContent = '❌ Vui lòng nhập điểm GPA hợp lệ từ 0.00 đến 4.00!';
      summaryBox.style.display = 'none';
      return;
    }

    let achievedCard = null;
    let rate = 0;
    let title = '';

    if (gpa >= 3.60) {
      achievedCard = document.getElementById('card-xuat-sac');
      rate = 1.0;
      title = 'Học bổng Xuất sắc (100%)';
    } else if (gpa >= 3.20) {
      achievedCard = document.getElementById('card-gioi');
      rate = 0.75;
      title = 'Học bổng Giỏi (75%)';
    } else if (gpa >= 2.50) {
      achievedCard = document.getElementById('card-kha');
      rate = 0.50;
      title = 'Học bổng Khá (50%)';
    } else if (gpa >= 2.00) {
      achievedCard = document.getElementById('card-kk');
      rate = 0.25;
      title = 'Học bổng Khuyến khích (25%)';
    }

    if (achievedCard) {
      achievedCard.classList.add('active');
      const discount = baseTuition * rate;

      resultDiv.className = 'result success';
      resultDiv.innerHTML = `🎉 Chúc mừng! Với GPA <strong>${gpa.toFixed(2)}</strong>, bạn đủ điều kiện nhận <strong>${title}</strong>.`;

      detailLabel.textContent = `Mức hỗ trợ: ${(rate * 100)}% trên tổng học phí (${formatVND(baseTuition)})`;
      amountTotal.textContent = formatVND(discount);
      summaryBox.style.display = 'flex';
    } else {
      resultDiv.className = 'result';
      resultDiv.innerHTML = `⚠️ Với GPA <strong>${gpa.toFixed(2)}</strong>, bạn chưa đạt điều kiện tối thiểu nhận học bổng (GPA ≥ 2.00).`;
      summaryBox.style.display = 'none';
    }
  }

  btnCheck.addEventListener('click', evaluateScholarship);
  gpaInput.addEventListener('input', () => {
    if (gpaInput.value.trim() !== '') {
      evaluateScholarship();
    }
  });
});

