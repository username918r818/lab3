"use strict";

const canvas = document.getElementById("graphImage");
const ctx = canvas.getContext("2d");

// noinspection JSSuspiciousNameCombination
canvas.height = canvas.width;

const hatchWidth = 20 / 2;
const hatchGap = 56;

function redrawGraph(r) {
    let w = canvas.width;
    let h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    ctx.lineWidth = 2;
    ctx.strokeStyle = "grey";

    // y axis
    ctx.beginPath();
    ctx.moveTo(w / 2, 0);
    ctx.lineTo(w / 2 - 10, 15);
    ctx.moveTo(w / 2, 0);
    ctx.lineTo(w / 2 + 10, 15);
    ctx.moveTo(w / 2, 0);
    ctx.lineTo(w / 2, h);
    ctx.stroke();
    ctx.closePath();

    // x axis
    ctx.beginPath();
    ctx.moveTo(w, h / 2);
    ctx.lineTo(w - 15, h / 2 - 10);
    ctx.moveTo(w, h / 2);
    ctx.lineTo(w - 15, h / 2 + 10);
    ctx.moveTo(w, h / 2);
    ctx.lineTo(0, h / 2);
    ctx.stroke();
    ctx.closePath();

    // риски
    ctx.beginPath();
    ctx.moveTo(w / 2 - hatchWidth, h / 2 - hatchGap);
    ctx.lineTo(w / 2 + hatchWidth, h / 2 - hatchGap);
    ctx.moveTo(w / 2 - hatchWidth, h / 2 - hatchGap * 2);
    ctx.lineTo(w / 2 + hatchWidth, h / 2 - hatchGap * 2);
    ctx.moveTo(w / 2 - hatchWidth, h / 2 + hatchGap);
    ctx.lineTo(w / 2 + hatchWidth, h / 2 + hatchGap);
    ctx.moveTo(w / 2 - hatchWidth, h / 2 + hatchGap * 2);
    ctx.lineTo(w / 2 + hatchWidth, h / 2 + hatchGap * 2);
    ctx.moveTo(w / 2 - hatchGap, h / 2 - hatchWidth);
    ctx.lineTo(w / 2 - hatchGap, h / 2 + hatchWidth);
    ctx.moveTo(w / 2 - hatchGap * 2, h / 2 - hatchWidth);
    ctx.lineTo(w / 2 - hatchGap * 2, h / 2 + hatchWidth);
    ctx.moveTo(w / 2 + hatchGap, h / 2 - hatchWidth);
    ctx.lineTo(w / 2 + hatchGap, h / 2 + hatchWidth);
    ctx.moveTo(w / 2 + hatchGap * 2, h / 2 - hatchWidth);
    ctx.lineTo(w / 2 + hatchGap * 2, h / 2 + hatchWidth);
    ctx.stroke();
    ctx.closePath();

    // Рисуем первую четверть (квадрат)
    ctx.fillStyle = "#4040bf55";
    ctx.fillRect(150 - 2 * hatchGap, 150, hatchGap * 2, hatchGap);

    // треугольник
    ctx.beginPath();
    ctx.moveTo(150, 150 + hatchGap);
    ctx.lineTo(150 + hatchGap, 150);
    ctx.lineTo(150, 150);
    ctx.closePath();

    // сектор
    ctx.arc(150, 150, hatchGap, 0, (-1 / 2) * Math.PI, true);
    ctx.fill();

    ctx.moveTo(150, 150);
    ctx.strokeStyle = "#4040bf55";
    ctx.closePath();

    // точки
    let points = arrayTable();
    ctx.fillStyle = "#B22222";
    let pointSize = hatchGap / 5;
    if (!(isNaN(r) || r === null))
        for (let i = 0; i < points.length; i++) {
            let x = points[i][0];
            let y = points[i][1];
            // x = (x - 150) / hatchGap * Number(R) / 2;
            // y = (150 - y) / hatchGap * Number(R) / 2;
            x = x * 2 * hatchGap / Number(r) + 150;
            y = y * 2 * hatchGap / Number(r) * (-1) + 150;
            if (!(x < 0 || x > w || y < 0 || y > h)) {
                ctx.fillRect(x - pointSize / 2, y - pointSize / 2, pointSize, pointSize);
            }

        }

    const fontSize = hatchGap / 3.5;
    ctx.fillStyle = "black";

    ctx.font = `500 ${fontSize * 1.4}px Roboto`;
    ctx.fillText("y", w / 2 - hatchWidth * 2.8, 15);
    ctx.fillText("x", w - 20, h / 2 - hatchWidth * 2.4);

    let label1, label2;

    if (isNaN(r)) {
        label1 = r + "/2";
        label2 = r;
    } else if (r === null) {
        label1 = "R/2";
        label2 = "R";
    } else {
        label1 = r / 2;
        label2 = r;
    }

    ctx.font = `800 ${fontSize}px Roboto`;
    ctx.fillText(label1, w / 2 + hatchGap - 3, h / 2 + hatchWidth * 2.8);
    ctx.fillText(label2, w / 2 + hatchGap * 2 - 3, h / 2 + hatchWidth * 2.8);
    ctx.fillText("-" + label1, w / 2 - hatchGap - 7, h / 2 + hatchWidth * 2.8);
    ctx.fillText(
        "-" + label2,
        w / 2 - hatchGap * 2 - 7,
        h / 2 + hatchWidth * 2.8
    );

    ctx.fillText(label1, w / 2 + hatchWidth * 2, h / 2 - hatchGap + 3);
    ctx.fillText(label2, w / 2 + hatchWidth * 2, h / 2 - hatchGap * 2 + 3);
    ctx.fillText("-" + label1, w / 2 + hatchWidth * 2, h / 2 + hatchGap + 3);
    ctx.fillText("-" + label2, w / 2 + hatchWidth * 2, h / 2 + hatchGap * 2 + 3);
}

async function sendForm(x, y, R) {
    const x_elem = document.getElementById("newPointForm:x");
    x_elem.value = x;
    const y_elem = document.getElementById("newPointForm:y");
    y_elem.value = y;

    const r_elem = document.getElementById("rLinks");
    for (const child of r_elem.children) {
        if (child.innerHTML == R) {
            child.click();
            console.log("click");
        }
    }
}


canvas.onclick = async (e) => {

    // относительные координаты клика
    let x = e.pageX - canvas.offsetLeft;
    let y = e.pageY - canvas.offsetTop;

    let R = document.getElementById("rSelect").value;

    if (R === null || isNaN(R)) {
        alert("Выберите R");
        return;
    }

    // абсолютные координаты клика
    x = ((x - 150) / hatchGap * Number(R) / 2).toFixed(1);
    y = ((150 - y) / hatchGap * Number(R) / 2).toFixed(1);

    await sendForm(x, y, R);
}
// function getR() {
//     let r = document.getElementById("rForGrapgh");
//     r.getElementsByTagName("input");
//     for (let i = 0; i < r.length; i++) {
//         if (r[i].checked) {
//             return r[i].value;
//         }
//     }
// }

window.addEventListener("load", (event) => {
    // let r = document.getElementById("rForGrapgh").getElementsByTagName("input");
    // // for (let i = 0; i < r.length; i++) {
    // //     r[i].addEventListener("click", redrawGraph(r[i].value));
    // // }
    redrawGraph(1);
});

// write function that receives an html table and makes an array
// <table id='results'><tbody><tr><td>X</td><td>Y</td><td>R</td><td>Result</td></tr><tr><td>-0.1</td><td>-0.1</td><td>5.0</td><td>true<tr><td>-0.6</td><td>0.6</td><td>5.0</td><td>true</td></tr></tbody></table>
function arrayTable() {
    let tableBody = document.getElementById("pointTable").getElementsByTagName("tbody")[0];
    let rows = tableBody.getElementsByTagName("tr");
    let result = [];
    for (let i = 0; i < rows.length; i++) {
        let cells = rows[i].getElementsByTagName("td");
        let row = [];
        for (let j = 0; j < cells.length; j++) {
            row.push(cells[j].innerHTML);
        }
        result.push(row);
    }
    return result;
}