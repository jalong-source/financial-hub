/**
 * TECHSTORE E-COMMERCE - MAIN.JS
 * Xử lý logic cơ bản, tính toán giỏ hàng và validation
 */

document.addEventListener('DOMContentLoaded', () => {
  initCartCalculations();
  initFormValidation();
});

/**
 * Tính toán giỏ hàng thời gian thực: Tạm tính, Thuế (10%), Phí ship và Tổng thanh toán
 */
function initCartCalculations() {
  const cartTable = document.getElementById('cart-table');
  if (!cartTable) return;

  const qtyInputs = cartTable.querySelectorAll('.quantity-field');
  const subtotalDisplay = document.getElementById('subtotal-display');
  const taxDisplay = document.getElementById('tax-display');
  const shippingDisplay = document.getElementById('shipping-display');
  const grandTotalDisplay = document.getElementById('grand-total-display');
  const cartCounter = document.getElementById('cart-item-count');

  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  });

  function calculateTotals() {
    let subtotal = 0;
    let totalItems = 0;
    const rows = cartTable.querySelectorAll('.cart-item-row');

    rows.forEach(row => {
      const unitPrice = parseFloat(row.dataset.unitPrice) || 0;
      const qtyInput = row.querySelector('.quantity-field');
      const quantity = parseInt(qtyInput.value) || 0;

      const lineTotal = unitPrice * quantity;
      subtotal += lineTotal;
      totalItems += quantity;

      // Cập nhật thành tiền từng dòng
      const lineTotalEl = row.querySelector('.line-total');
      if (lineTotalEl) {
        lineTotalEl.textContent = formatter.format(lineTotal);
        lineTotalEl.dataset.lineTotal = lineTotal;
      }
    });

    const shippingFee = subtotal > 0 ? 40000 : 0;
    const tax = Math.round(subtotal * 0.1); // 10% VAT
    const grandTotal = subtotal + shippingFee + tax;

    if (subtotalDisplay) subtotalDisplay.textContent = formatter.format(subtotal);
    if (taxDisplay) taxDisplay.textContent = formatter.format(tax);
    if (shippingDisplay) shippingDisplay.textContent = formatter.format(shippingFee);
    if (grandTotalDisplay) grandTotalDisplay.textContent = formatter.format(grandTotal);
    if (cartCounter) cartCounter.textContent = `${totalItems} sản phẩm`;
  }

  // Lắng nghe thay đổi số lượng
  qtyInputs.forEach(input => {
    input.addEventListener('change', (e) => {
      if (e.target.value < 1) e.target.value = 1;
      calculateTotals();
    });
    input.addEventListener('input', calculateTotals);
  });

  // Lắng nghe nút xóa sản phẩm
  const removeButtons = cartTable.querySelectorAll('.btn-remove-cart');
  removeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const row = e.target.closest('.cart-item-row');
      if (row) {
        row.remove();
        calculateTotals();
      }
    });
  });
}

/**
 * Xử lý kiểm tra Form thông tin nhận hàng
 */
function initFormValidation() {
  const form = document.getElementById('shipping-order-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    if (!form.checkValidity()) {
      e.preventDefault();
      e.stopPropagation();
      alert('Vui lòng kiểm tra và điền đầy đủ các thông tin bắt buộc trước khi đặt hàng.');
    } else {
      e.preventDefault();
      alert('Đơn hàng của bạn đã được tiếp nhận thành công!');
    }
  });
}
