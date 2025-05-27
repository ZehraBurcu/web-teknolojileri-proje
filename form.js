function javascriptFormSubmit() {
    const form = document.getElementById('mainForm');
    const emailInput = document.getElementById('mainEmail');
    const passwordInput = document.getElementById('mainPassword');
    const roleSelect = document.getElementById('mainRole');
    const termsCheckbox = document.getElementById('mainTerms');
    const textboxInput = document.getElementById('mainTextbox');
  
    if (form.checkValidity()) {
      console.log('JavaScript form gönderildi');
      console.log('Email:', emailInput.value);
      console.log('Password:', passwordInput.value);
      console.log('Role:', roleSelect.value);
      console.log('TextBox:', textboxInput.value);
      console.log('Terms Accepted:', termsCheckbox.checked);
    } else {
      console.log('Lütfen formu doğru şekilde doldurun.');
    }
  }
  
  function javascriptFormReset() {
    const form = document.getElementById('mainForm');
    form.reset();
    console.log('JavaScript form temizlendi');
  }
  