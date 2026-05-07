 function toggleDetails(id, chk) {
    var row = document.getElementById(id);
    if (row) {
        
        row.style.display = chk.checked ? "table-row" : "none";
    }
}

function showOrderForm() {
    // الحصول على جميع العناصر التي تحمل كلاس الوجبات
    var meals = document.getElementsByClassName('chk-meal');
    var hasSelection = false;
    
    // التحقق من وجود وجبة مختارة واحدة على الأقل
    for (var i = 0; i < meals.length; i++) {
        if (meals[i].checked) {
            hasSelection = true;
            break;
        }
    }
    
    if (!hasSelection) { 
        alert("يرجى اختيار وجبة أولاً!"); 
        return; 
    }
    
    // إظهار النموذج
    var form = document.getElementById("orderForm");
    if (form) {
        form.style.display = "block";
        form.scrollIntoView();
    }
}

function validateAndSend() {
    var name = document.getElementById("uName").value;
    var acc = document.getElementById("uAcc").value;
    var date = document.getElementById("uDate").value;
    var mob = document.getElementById("uMob").value;

    var nameRGX = /^[a-zA-Z]+ [a-zA-Z]+$/; // اسم مقطعين بالإنجليزية
    var accRGX = /^0\d{5}$/;              // 6 أرقام يبدأ بـ 0
    var dateRGX = /^(0[1-9]|[1-2][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/; // التاريخ dd-mm-yyyy
    var mobRGX = /^(093|098|099|094|095|096)\d{7}$/; // أرقام الموبايل السورية

    // التحقق من صحة المدخلات
    if(!nameRGX.test(name)) { alert("الاسم يجب أن يكون مقطعين بالإنجليزية فقط"); return; }
    if(!accRGX.test(acc)) { alert("رقم الحساب يجب أن يتكون من 6 أرقام ويبدأ بـ 0"); return; }
    if(!dateRGX.test(date)) { alert("صيغة التاريخ غير صحيحة، استخدم dd-mm-yyyy"); return; }
    if(!mobRGX.test(mob)) { alert("رقم الموبايل غير صحيح (يجب أن يبدأ بـ 09x)"); return; }

    // حساب السعر الإجمالي
    var sum = 0;
    var meals = document.getElementsByClassName('chk-meal');
    for (var j = 0; j < meals.length; j++) {
        if (meals[j].checked) {
            sum += parseInt(meals[j].value);
        }
    }
    
    var tax = sum * 0.1; // ضريبة 10%
    var total = sum + tax;
    
    alert("ملخص الطلب:\n" + 
          "المجموع: " + sum + " ل.س\n" + 
          "الضريبة (10%): " + tax + " ل.س\n" + 
          "الصافي النهائي: " + total + " ل.س");
}