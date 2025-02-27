function colebrook(f_guess, Re, epsilon, D) {
    const tol = 1e-6;
    const max_iter = 1000000000;
    let f = f_guess;

    for (let i = 0; i < max_iter; i++) {
        const term1 = -2.0 * Math.log10(epsilon / (3.7 * D) + 2.51 / (Re * Math.sqrt(f)));
        const term2 = 1 / Math.sqrt(f);
        const f_new = 1 / (term1 ** 2 * term2);

        if (Math.abs(f_new - f) < tol) {
            return f_new;
        }

        f = f_new;
    }

    throw new Error("Colebrook equation did not converge within the maximum number of iterations.");
}

function calculateFrictionFactor() {
    const reynolds = parseFloat(document.getElementById("reynolds").value);
    const roughness = parseFloat(document.getElementById("roughness").value);
    const diameter = parseFloat(document.getElementById("diameter").value);

    const f_guess = 0.02;

    try {
        const frictionFactor = colebrook(f_guess, reynolds, roughness, diameter);
        document.getElementById("result").textContent = `The Darcy friction factor (f) is: ${frictionFactor.toFixed(6)}`;
    } catch (error) {
        document.getElementById("result").textContent = error.message;
    }
}
