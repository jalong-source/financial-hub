/**
 * main.js — Financial Hub
 * ──────────────────────────────────────────────
 * Xử lý sự kiện DOM: input, change, click, submit.
 * File này chỉ thao tác DOM, gọi hàm từ logic.js & data.js.
 * Phụ thuộc: data.js, logic.js
 */

'use strict';

(function () {

  /* ============================================================
     SCHOLARSHIP PAGE — Xét học bổng theo GPA
     ============================================================ */

  const gpaInput        = document.getElementById('gpaInput');
  const gpaResult       = document.getElementById('gpaResult');
  const scholarshipGrid = document.getElementById('scholarshipGrid');

  // Guard: chỉ chạy khi ở trang scholarship
  if (gpaInput && gpaResult && scholarshipGrid) {
    const cards = scholarshipGrid.querySelectorAll('.scholarship-card');

    /**
     * Cập nhật trạng thái thẻ Cards dựa trên GPA.
     * @param {number} gpa - Điểm GPA hợp lệ
     */
    function updateScholarshipCards(gpa) {
      const tier = getScholarshipTier(gpa);

      // Xóa trạng thái active tất cả thẻ
      cards.forEach(function (card) {
        card.classList.remove('active');
      });

      if (tier) {
        // Thêm .has-active để CSS dim các thẻ còn lại
        scholarshipGrid.classList.add('has-active');

        // Tìm đúng thẻ theo data-min-gpa và gắn .active
        cards.forEach(function (card) {
          var cardMinGPA = parseFloat(card.dataset.minGpa);
          if (cardMinGPA === tier.minGPA) {
            card.classList.add('active');
          }
        });

        // Hiển thị thông báo kết quả
        gpaResult.innerHTML =
          '🎉 Xếp loại: <span class="highlight" style="color: var(--card-neon, var(--accent))">' +
          tier.level +
          '</span> — Học bổng <span class="highlight" style="color: var(--neon-gold)">' +
          tier.percent + '%</span>';
      } else {
        // GPA quá thấp — không đạt học bổng
        scholarshipGrid.classList.remove('has-active');
        gpaResult.innerHTML =
          '<span style="color: var(--neon-red)">' +
          '⚠️ GPA dưới 2.00 — Chưa đủ điều kiện nhận học bổng.' +
          '</span>';
      }
    }

    /**
     * Xóa toàn bộ trạng thái UI.
     */
    function clearState() {
      cards.forEach(function (card) {
        card.classList.remove('active');
      });
      scholarshipGrid.classList.remove('has-active');
      gpaResult.innerHTML = '';
    }

    /**
     * Xử lý khi người dùng nhập GPA.
     */
    function handleGPAInput() {
      var result = validateGPA(gpaInput.value);

      if (!result.valid && result.error === '') {
        // Input rỗng → xóa trạng thái
        clearState();
        gpaInput.classList.remove('error');
        return;
      }

      if (!result.valid) {
        // GPA không hợp lệ → báo lỗi
        clearState();
        gpaInput.classList.add('error');
        gpaResult.innerHTML =
          '<span style="color: var(--neon-red)">' + result.error + '</span>';
        return;
      }

      // GPA hợp lệ → cập nhật cards
      gpaInput.classList.remove('error');
      updateScholarshipCards(result.value);
    }

    /**
     * Hàm debounce — trì hoãn thực thi để tránh gọi quá nhiều lần.
     * @param {Function} fn - Hàm cần debounce
     * @param {number} delay - Milliseconds trì hoãn
     * @returns {Function}
     */
    function debounce(fn, delay) {
      var timer;
      return function () {
        var context = this;
        var args    = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
          fn.apply(context, args);
        }, delay);
      };
    }

    // ── Gắn sự kiện ──────────────────────────────────────────
    gpaInput.addEventListener('input', debounce(handleGPAInput, 200));

    gpaInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleGPAInput();
      }
    });

    // Focus input khi tải trang
    gpaInput.focus();
  }

})();
