const btnDoxeo = document.getElementById("btnDoxeo");
const targetDiv = document.getElementById("targetDiv");
const TOKEN = "23f19c8617c23b";

const setText = data => {
    targetDiv.textContent = data;
};

const getData = () => {
    return new Promise((resolve, reject) => {
        setText("Solicitando autorización");
        setTimeout(() => {
            resolve(true);
        }, 2000);
    });
}

const showData = () => {
    return new Promise((resolve, reject) => {
        setText("Esperando a mostrar la información");
        setTimeout(() => {
            resolve(consultData);
        }, 2000);
    });
};

btnDoxeo.addEventListener("click", async evt => {
    let theExecuter;
    const authorization = await getData();
    if(authorization) {
        theExecuter = await showData();
        theExecuter();           
    }
});

const consultData = () => {
    fetch(`https://ipinfo.io/json?token=${TOKEN}`)
    .then(response => response.json())
    .then(data => {
        let htmlContent = ``;
        for(let property in data) {
            htmlContent += `<b>${property}: </b><span>${data[property]}</span><br>`;
        }
        targetDiv.innerHTML = htmlContent;
    }).catch(error => {
        targetDiv.textContent = "Error";
    });
};
