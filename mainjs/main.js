$(document).ready(function () {
  $(".detailsToggle").change(function () {
    var detailRow = $(this).closest("tr").next(".details");
    if ($(this).is(":checked")) {
      detailRow.fadeIn("slow");
    } else {
      detailRow.fadeOut("slow");
    }
  });
});
$("#form-overlay").hide();
$("#continue-btn").click(function () {
  if ($('input[name="property"]:checked').length > 0) {
    $("#form-overlay").show();
  } else {
    alert("الرجاء اختيار عقار");
  }
});

function generateCaptcha() {
  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let captcha = "";
  for (let i = 0; i < 6; i++) {
    captcha += chars[Math.floor(Math.random() * chars.length)];
  }
  $("#captcha-code").text(captcha);
}

generateCaptcha();

$("#submit-btn").click(function () {
  const fullName = $("#full-name").val();
  const nationalId = $("#national-id").val();
  const birthDate = $("#birth-date").val();
  const mobile = $("#mobile").val();
  const email = $("#email").val();
  const captchaInput = $("#captcha").val();
  const captchaCode = $("#captcha-code").text();
  let errorMessage = "";

  const namePattern = /^[\u0621-\u064A\s]+$/;
  if (fullName && !namePattern.test(fullName)) {
    errorMessage += "الاسم الكامل يجب أن يحتوي على أحرف هجائية فقط.\n";
  }

  const idPattern = /^(0[1-9]|1[0-4])\d{9}$/;
  if (!idPattern.test(nationalId)) {
    errorMessage += "الرقم الوطني غير صحيح.\n";
  }

  const datePattern2 =
    /([1-2][0-9]|[0][1-9]|[3][0-1]-([0][1-9]|[1][0-2])-[1-9][0-9][0-9]{2})/;
  if (birthDate && !datePattern2.test(birthDate)) {
    errorMessage += "تاريخ الولادة غير صحيح.\n";
  }

  const mobilePattern = /^(09[3-9]\d{7})$/;
  if (mobile && !mobilePattern.test(mobile)) {
    errorMessage += "رقم الموبايل غير صحيح.\n";
  }

  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (email && !emailPattern.test(email)) {
    errorMessage += "الإيميل غير صحيح.\n";
  }

  if (captchaInput !== captchaCode) {
    errorMessage += "الرمز Captcha غير صحيح.\n";
  }

  if (errorMessage) {
    $("#form-error").text(errorMessage);
  } else {
    $("#form-error").text("");
    const selectedProperty = $('input[name="property"]:checked').val();
    $("#application-form").hide();
    $("#selected-property").text(
      "تم تقديم الطلب بنجاح للعقار: " + selectedProperty
    );
    $("#success-message").show();
    // إخفاء رسالة التأكيد بعد خمس ثواني
    setTimeout(function () {
      $("#form-overlay").hide();
      $("#success-message").fadeOut("slow");
    }, 5000); // 5000 ميلي ثانية = 5 ثواني
  }
});
