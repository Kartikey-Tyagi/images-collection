(function () {
    "use strict"
    const mainElement = document.querySelector("main");
    let myData;
    let myNum = Math.floor(Math.random() * 33);
    console.log(myNum);
    let count = myNum;
    let url = `https://picsum.photos/v2/list?page=${count}&limit=30`;

    // Fetch images api
    async function getData(url) {
        const fetchPromise = await fetch(url);
        const data = await fetchPromise.json();
        myData = data;
        for (const elem of myData) {
            addCards(elem);
        }
    };
    getData(url);
    // adding images card
    function addCards(data) {
        const card = document.createElement("article");
        card.innerHTML = `<div class='container'>${createCardContent(data)}</div>`;
        mainElement.appendChild(card);
    };
    // creating images card content
    function createCardContent(data) {
        let html = `<div class='imgBox'><a href='${data.download_url}' target='_blank'><img src='${data.download_url}' alt='background_image'></a></div>`;
        html += `<div class='content'><h3>Credits: ${data.author}</h3>`;
        html += `<p><strong>Size:</strong> ${data.width} x ${data.height}</p>`;
        html += `<p><strong>Source:</strong> <a href='${data.url}' target='_blank'> ${data.url}</a></p></div>`;
        return html;
    };
    // Next button
    document.getElementById("next").addEventListener('click', function (e) {
        e.preventDefault();
        if (count >= 33) {
            count = 0;
        }
        count++;
        mainElement.innerHTML = '';
        url = `https://picsum.photos/v2/list?page=${count}&limit=30`;
        console.log(url);
        getData(url);

    });
    // Previous button
    document.getElementById("previous").addEventListener('click', function (e) {
        e.preventDefault();
        if (count === 1) {
            count = 34;
        }
        count--;
        mainElement.innerHTML = '';
        url = `https://picsum.photos/v2/list?page=${count}&limit=30`;
        console.log(url);
        getData(url);
    });
}());