function getFeedCof(url, isWinOnly, elementsClasses) {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', url);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.send();

    xhr.onload = function () {
        try {
            var data = JSON.parse(xhr.responseText);

            if (xhr.status >= 400) {
                console.log(`Error ${xhr.status}: ${data.message}`);
            } else {

                var cof1 = (+data.coff_p1).toFixed(2);
                var cof2 = (+data.coff_p2).toFixed(2);
                var p1 = data.p1;
                var p2 = data.p2;

                var days = new Date(data.event_date_utc).toLocaleDateString("en-US", {day: '2-digit'});
                var month = new Date(data.event_date_utc).toLocaleDateString("en-US", {month: '2-digit'});
                var time = new Date(data.event_date_utc).toLocaleDateString("ru-KK", {
                    hour: '2-digit',
                    minute: 'numeric'
                }).split(' ')[1];

                //var date = `${days}.${month}   ${time}`;
                var date = `${days}.${month}`;
                
                //var el1 = document.querySelector(`.${elementsClasses[0]}`);
                //var el2 = document.querySelector(`.${elementsClasses[1]}`);
                var el4 = document.querySelector(`.${elementsClasses[0]}`);
                var el5 = document.querySelector(`.${elementsClasses[1]}`);
                var el6 = document.querySelector(`.${elementsClasses[2]}`);
                

                //el1.innerHTML += cof1;
                //el2.innerHTML += cof2;
                el4.innerHTML += p1;
                el5.innerHTML += p2;
                el6.innerHTML += date;                

                

                if (!isWinOnly) {
                    var coff_draw = (+data.coff_draw).toFixed(2);
                    var el3 = document.querySelector(`.${elementsClasses[2]}`);
                    el3.innerHTML += coff_draw;
                }
            }
        } catch (err) {
            throw new Error(err);
        }
    };

    xhr.onerror = function (err) {
        console.log(err);
    };
}