const fs = require('fs');
const path = require('path');
const express = require('express'); // require()로 express module 불러옴.
const { log } = require('console');
const app = express(); // app 객체에 담음
const port = 8808;


const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./db/my.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
      console.error(err.message);
  } else {
      console.log('connected to the mydb database.');
  }
});


app.get('/', (req, res)=>{
    res.send("starbucks with deung.");
    // res.end('hello world!?? san?asdfsad');
});

app.post('/meals/kor', (req, res) => {
    const curr = new Date();
    const utc = curr.getTime() + (curr.getTimezoneOffset() * 60 * 1000);
    const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
    const kr_curr = new Date(utc + KR_TIME_DIFF);

    const m = kr_curr.getMonth() + 1;
    // const m = 8;
    const d = kr_curr.getDate();
    // const d = 31;
    const h = kr_curr.getHours();
    // const h = 19;

    let month = m;
    let date = d;
    let meal = '';
    let days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let name = '';

    if (Boolean(9 <= h && h < 13)) {
        meal = 'l';
    } else if (Boolean(13 <= h && h < 19)) {
        meal = 'd';
    } else if (Boolean(19 <= h && h < 24)) {
        meal = 'b';
        date = d + 1;
    } else {
        meal = 'b';
        // date = d + 1;

        if (Boolean(date > days[m-1])) {
            month = m + 1;
            date = 1;
            if (Boolean(month > 12)) {
                month = 1;
            }
        }
    }
    month = String(month);
    date = String(date);
    if  (Boolean(month.length == 1)) {
        month = month.padStart(2, '0');
    }
    if (Boolean(date.length == 1)) {
        date = date.padStart(2, '0');
    }

    name = month + '_' + date + '_'  + meal + '_kor.json';

    const dir = path.join(__dirname, 'meals_data', name);
    const selectQuery = `
      SELECT menu 
      from meals 
      where filename = "${name}"
    `;
    
    var nowmenu = '';
    db.all(selectQuery, [], (err, rows) => {
      if (err) {
        res.status(200).send("error !!! call SAN");
        console.log(err);
      } else {
      nowmenu = rows[0].menu;
      console.log('b', nowmenu);

      const responseBody = {
        version: "2.0",
        template: {
          outputs: [
            {
              simpleText: {
                text: rows[0].menu
              }
            }
          ]
        }
      };
    res.status(200).send(responseBody);
    }
  });
});

app.post('/meals/eng', (req, res) => {
    const curr = new Date();
    const utc = curr.getTime() + (curr.getTimezoneOffset() * 60 * 1000);
    const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
    const kr_curr = new Date(utc + KR_TIME_DIFF);

    const m = kr_curr.getMonth() + 1;
    const d = kr_curr.getDate();
    const h = kr_curr.getHours();

    let month = m;
    let date = d;
    let meal = '';
    let days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let name = '';

    if (Boolean(9 <= h && h < 13)) {
        meal = 'l';
    } else if (Boolean(13 <= h && h < 19)) {
        meal = 'd';
    } else if (Boolean(19 <= h && h < 24)) {
        meal = 'b';
        date = d + 1;
    } else {
        meal = 'b';
        // date = d + 1;

        if (Boolean(date > days[m-1])) {
            month = m + 1;
            date = 1;
            if (Boolean(month > 12)) {
                month = 1;
            }
        }
    }

    month = String(month);
    date = String(date);
    if  (Boolean(month.length == 1)) {
        month = month.padStart(2, '0');
    }
    if (Boolean(date.length == 1)) {
        date = date.padStart(2, '0');
    }

    name = month + '_' + date + '_'  + meal + '_eng.json';
    console.log(name);

    const dir = path.join(__dirname, 'meals_data', name);
    const selectQuery = `
    SELECT menu 
    from meals 
    where filename = "${name}"
    `;
  
    var nowmenu = '';
    db.all(selectQuery, [], (err, rows) => {
      if (err) {
        res.status(200).send("ERROR !!! call SAN");
        console.log(err);
      } else {
      nowmenu = rows[0].menu;
      console.log('b', nowmenu);
    
      const responseBody = {
        version: "2.0",
        template: {
          outputs: [
            {
              simpleText: {
                text: rows[0].menu
              }
            }
          ]
        }
      };

      res.status(200).send(responseBody);  
      };
    });
});

app.listen(port, ()=>{
    console.log('http://localhost:%s', port);
});
