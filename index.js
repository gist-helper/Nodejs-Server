const fs = require('fs');
const path = require('path');
const express = require('express'); // require()로 express module 불러옴.
const { log } = require('console');
const app = express(); // app 객체에 담음
const port = 8808;

/* DB 관련*/
const mysql = require('mysql');  // mysql 모듈 로드
const conn = {  // mysql 접속 설정
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'mysql 워크벤치 설치할때 설정한 비밀번호',
    database: 'test'
};

app.get('/', (req, res)=>{
    res.send("Starbucks with Deung.");
    // res.end('Hello World!?? San?asdfsad');
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
    console.log(name);

    const Dir = path.join(__dirname, 'meals_data', name);
    var isExist = 1;
    try {
        fs.statSync(Dir);
      } catch (error) {
      
          if (error.code === "ENOENT") {
            isExist = 0; 
            console.log("파일이 존재하지 않습니다.");
          }
        }
    
    var content = '';
    var time_content = ''; 
    // 17~19 이런거 추가

    if(isExist) {
        const file = fs.readFileSync(Dir, 'utf8');
        const jsonData = JSON.parse(file);
        const jsonMeals = jsonData.meal;
        content = (jsonMeals.meal_date + " " + jsonMeals.kind_of_meal + "\n\n" +
        jsonMeals.title + "\n\n" + jsonMeals.menu);
    } else {

    }
    const responseBody = {
        version: "2.0",
        template: {
          outputs: [
            {
              simpleText: {
                text: content
              }
            }
          ]
        }
      };

    res.status(200).send(responseBody);
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

    const Dir = path.join(__dirname, 'meals_data', name);
    var isExist = 1;
    try {
        fs.statSync(Dir);
      } catch (error) {
      
          if (error.code === "ENOENT") {
            isExist = 0; 
            console.log("파일이 존재하지 않습니다.");
          }
        }
    
    var content = '';
    var time_content = ''; 
    // 17~19 이런거 추가

    if(isExist) {
        const file = fs.readFileSync(Dir, 'utf8');
        const jsonData = JSON.parse(file);
        const jsonMeals = jsonData.meal;
        content = (jsonMeals.meal_date + " " + jsonMeals.kind_of_meal + "\n\n" +
        jsonMeals.title + "\n\n" + jsonMeals.menu);
    } else {

    }
    const responseBody = {
        version: "2.0",
        template: {
          outputs: [
            {
              simpleText: {
                text: content
              }
            }
          ]
        }
      };
    
    res.status(200).send(responseBody);
});

app.listen(port, ()=>{
    console.log('http://localhost:%s', port);
});
