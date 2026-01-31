/* --- 1. SELECCIÓN DE ELEMENTOS --- */
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const bars = document.querySelectorAll('.strength-bar');
const submitBtn = document.getElementById('submitBtn');
const passwordForm = document.getElementById('passwordForm');
const errorAlert = document.getElementById('errorAlert');
const closeError = document.getElementById('closeError');

// Requisitos
const reqLength = document.getElementById('req-length');
const reqUpper = document.getElementById('req-upper');
const reqNumber = document.getElementById('req-number');

/* --- 2. FUNCIONALIDAD DE LOS OJOS (VER CONTRASEÑA) --- */
// Usamos un selector universal para todos los iconos de ojo
document.querySelectorAll('.toggle-password').forEach(toggleIcon => {
    toggleIcon.addEventListener('click', function() {
        // Buscamos el input que está justo antes o dentro del mismo grupo
        const targetId = this.getAttribute('data-target');
        const input = document.getElementById(targetId);
        
        // Cambiar el tipo de input
        const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
        input.setAttribute('type', type);
        
        // Alternar el icono (ojo abierto / ojo tachado)
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
    });
});

/* --- 3. ACTUALIZACIÓN VISUAL DE REQUISITOS --- */
const updateRequirement = (el, isMet) => {
    const icon = el.querySelector('.icon');
    if (isMet) {
        el.classList.add('met');
        icon.textContent = '✓';
    } else {
        el.classList.remove('met');
        icon.textContent = '×';
    }
};

/* --- 4. VALIDACIÓN DE FUERZA DE CONTRASEÑA --- */
const checkPassword = () => {
    const val = passwordInput.value;
    let score = 0;

    const isLongEnough = val.length >= 8;
    const hasUpper = /[A-Z]/.test(val);
    const hasNumber = /[0-9!@#$%^&*]/.test(val);

    updateRequirement(reqLength, isLongEnough);
    updateRequirement(reqUpper, hasUpper);
    updateRequirement(reqNumber, hasNumber);

    if (isLongEnough) score++;
    if (hasUpper) score++;
    if (hasNumber) score++;

    // Pintar barras
    bars.forEach((bar, i) => {
        bar.className = 'strength-bar';
        if (i < score) {
            if (score === 1) bar.classList.add('weak');
            if (score === 2) bar.classList.add('medium');
            if (score === 3) bar.classList.add('strong');
        }
    });

    // Habilitar botón solo si cumple los 3 requisitos de seguridad
    submitBtn.disabled = (score < 3);
};

/* --- 5. LÓGICA DE ENVÍO Y REDIRECCIÓN --- */
passwordForm.addEventListener('submit', (e) => {
    e.preventDefault(); 

    // Validar si las contraseñas coinciden
    if (passwordInput.value !== confirmPasswordInput.value) {
        // NO coinciden: Mostrar alerta de error
        errorAlert.style.display = 'flex';
        
        // Ocultar automáticamente tras 4 segundos
        setTimeout(() => {
            errorAlert.style.display = 'none';
        }, 4000);

    } else {
        // SI coinciden: Redirigir automáticamente
        errorAlert.style.display = 'none';
        window.location.href = 'login_proveedor.html';
    }
});

/* --- 6. EVENTOS DE ENTRADA Y CIERRE --- */
passwordInput.addEventListener('input', checkPassword);
confirmPasswordInput.addEventListener('input', checkPassword);

if (closeError) {
    closeError.addEventListener('click', () => {
        errorAlert.style.display = 'none';
    });
}