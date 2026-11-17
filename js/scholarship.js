/**
 * FINANCIAL HUB - SCHOLARSHIP.JS
 * Xử lý kiểm tra điều kiện học bổng (GPA & ĐRL) và kích hoạt hiệu ứng Card Active
 */

document.addEventListener('DOMContentLoaded', () => {
  initScholarshipEvaluation();
});

function initScholarshipEvaluation() {
  const gpaInput = document.getElementById('input-gpa');
  const drlInput = document.getElementById('input-drl');
  const btnQuickMax = document.getElementById('btn-quick-max');

  const cardExc = document.getElementById('card-excellence');
  const cardVg = document.getElementById('card-verygood');
  const cardGood = document.getElementById('card-good');

  const badgeExc = document.getElementById('badge-excellence');
  const badgeVg = document.getElementById('badge-verygood');
  const badgeGood = document.getElementById('badge-good');

  const evalTitle = document.getElementById('eval-title');
  const evalMsg = document.getElementById('eval-message');

  if (!gpaInput || !drlInput) return;

  function evaluate() {
    const gpa = parseFloat(gpaInput.value) || 0;
    const drl = parseInt(drlInput.value) || 0;

    // Reset tất cả thẻ
    [cardExc, cardVg, cardGood].forEach(card => {
      if (card) card.classList.remove('active');
    });

    [badgeExc, badgeVg, badgeGood].forEach(badge => {
      if (badge) {
        badge.className = 'card-badge-status locked';
        badge.textContent = 'Chưa đạt';
      }
    });

    // Cập nhật từng tiêu chí
    updateCriteria('crit-exc-gpa', gpa >= 3.8);
    updateCriteria('crit-exc-drl', drl >= 90);

    updateCriteria('crit-vg-gpa', gpa >= 3.6);
    updateCriteria('crit-vg-drl', drl >= 85);

    updateCriteria('crit-good-gpa', gpa >= 3.2);
    updateCriteria('crit-good-drl', drl >= 80);

    // Xét mức cao nhất đạt được
    if (gpa >= 3.8 && drl >= 90) {
      // Đạt Xuất sắc
      cardExc.classList.add('active');
      badgeExc.className = 'card-badge-status achieved';
      badgeExc.textContent = 'ĐANG ĐẠT';
      evalTitle.textContent = '🎉 Chúc mừng bạn!';
      evalTitle.style.color = 'var(--gold-accent)';
      evalMsg.textContent = 'Bạn đủ điều kiện nhận Học bổng Xuất sắc (Miễn giảm 100% học phí).';
    } else if (gpa >= 3.6 && drl >= 85) {
      // Đạt Giỏi
      cardVg.classList.add('active');
      badgeVg.className = 'card-badge-status achieved';
      badgeVg.textContent = 'ĐANG ĐẠT';
      evalTitle.textContent = '👏 Rất xuất sắc!';
      evalTitle.style.color = 'var(--lime-accent)';
      evalMsg.textContent = 'Bạn đủ điều kiện nhận Học bổng Giỏi (Miễn giảm 50% học phí).';
    } else if (gpa >= 3.2 && drl >= 80) {
      // Đạt Khuyến khích
      cardGood.classList.add('active');
      badgeGood.className = 'card-badge-status achieved';
      badgeGood.textContent = 'ĐANG ĐẠT';
      evalTitle.textContent = '👍 Chúc mừng!';
      evalTitle.style.color = 'var(--mint-primary)';
      evalMsg.textContent = 'Bạn đủ điều kiện nhận Học bổng Khuyến khích (Miễn giảm 25% học phí).';
    } else {
      evalTitle.textContent = 'ℹ️ Chưa đạt học bổng';
      evalTitle.style.color = 'var(--text-muted)';
      evalMsg.textContent = 'Hãy cố gắng nâng GPA ≥ 3.20 và ĐRL ≥ 80 để nhận học bổng ở học kỳ này!';
    }
  }

  function updateCriteria(elementId, isMet) {
    const el = document.getElementById(elementId);
    if (!el) return;
    const icon = el.querySelector('.criteria-icon');
    if (isMet) {
      el.className = 'criteria-item criteria-met';
      if (icon) icon.textContent = '✔';
    } else {
      el.className = 'criteria-item criteria-unmet';
      if (icon) icon.textContent = '●';
    }
  }

  gpaInput.addEventListener('input', evaluate);
  drlInput.addEventListener('input', evaluate);

  if (btnQuickMax) {
    btnQuickMax.addEventListener('click', () => {
      gpaInput.value = '3.90';
      drlInput.value = '95';
      evaluate();
    });
  }

  // Chạy lần đầu
  evaluate();
}
