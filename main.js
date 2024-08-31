const form = document.forms[0];
const height = document.getElementById("height");
const weight = document.getElementById("weight");
const submitBtn = document.querySelector("form .submit");
const metric= document.getElementById("metric");
const imperial= document.getElementById("imperial");
const heightUnit = document.querySelector(".height-unit");
const weightUnit = document.querySelector(".weight-unit");

// convert unit
imperial.addEventListener("change", function() {
    if (imperial.checked) {
        heightUnit.textContent = "inch";
        weightUnit.textContent = "pound";
    } else {
        heightUnit.textContent = "cm";
        weightUnit.textContent = "kg";
    }
    submitBtn.innerHTML = `
        <div class="initial">
            <h3>welcome!</h3>
            <p>Enter your height and weight and you'll see your BMI result here</p>
        </div>
    `;
});
metric.addEventListener("change", function() {
    if (metric.checked) {
        heightUnit.textContent = "cm";
        weightUnit.textContent = "kg";
    } else {
        heightUnit.textContent = "inch";
        weightUnit.textContent = "pound";
    }
    submitBtn.innerHTML = `
    <div class="initial">
        <h3>welcome!</h3>
        <p>Enter your height and weight and you'll see your BMI result here</p>
    </div>
`;
});

form.addEventListener("submit", function(e) {
    let bmi = 0;
    let remarks = [
        "Your BMI suggests that you are underweight.",
        "Your BMI suggests that you are of ideal weight.",
        "Your BMI suggests that you are overweight."
    ];
    let remark = "";
    let unit = "";
    const minBMI = 18.5;
    const maxBMI = 25;
    let minWeight = 0;
    let maxWeight = 0;
    e.preventDefault();
    if (!height.value || !weight.value) {
        submitBtn.innerHTML = `
        <div class="initial">
            <p>Please enter your height and weight</p>
        </div>
        `;
        setTimeout(function() {
            submitBtn.innerHTML = `
            <div class="initial">
                <h3>welcome!</h3>
                <p>Enter your height and weight and you'll see your BMI result here</p>
            </div>
            `;
        }, 1500);
        return;
    } else {
        if (metric.checked) {
            bmi = (parseFloat(weight.value) / Math.pow(parseFloat(height.value) / 100, 2)).toFixed(2);
            unit = "kg";
            minWeight = (minBMI * ((parseFloat(height.value) / 100) ** 2)).toFixed(2);
            maxWeight = (maxBMI * ((parseFloat(height.value) / 100) ** 2)).toFixed(2);
        } else {
            bmi = ((parseFloat(weight.value) / Math.pow(parseFloat(height.value), 2)) * 703).toFixed(2);
            unit = 'lbs';
            minWeight = ((minBMI * ((parseFloat(height.value)) ** 2)) / 703).toFixed(2);
            maxWeight = ((maxBMI * ((parseFloat(height.value)) ** 2)) / 703).toFixed(2);
        }
        if (bmi < minBMI) remark = remarks[0];
        else if (bmi > maxBMI) remark = remarks[2];
        else remark = remarks[1];
        submitBtn.innerHTML = `
        <div class="success">
            <div class="bmi">
                <p>your BMI is...</p>
                <h4>${bmi}</h4>
            </div>
            <div class="remark">
                <p>${remark}</span>.
                    Your ideal weight is between <span class="remark-2">${minWeight}</span> - <span>${maxWeight}</span><span> ${unit}</span>.
                </p>
            </div>
        </div>`;
        weight.value = "";
        height.value = "";
    }
});

