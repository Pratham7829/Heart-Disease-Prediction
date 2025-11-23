document.getElementById("predictForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const formData = new FormData(this);
    let data = {};

    formData.forEach((value, key) => data[key] = Number(value));

    const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    const result = await response.json();

    let box = document.getElementById("result");
    box.style.display = "block";

    if(result.prediction === 1) {
        box.style.background = "#ffb3b3";
        box.innerHTML = "⚠ HIGH RISK of Heart Disease";
    } else {
        box.style.background = "#b3ffb3";
        box.innerHTML = "✔ LOW RISK of Heart Disease";
    }
});
