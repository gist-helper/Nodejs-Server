// server file임.
// Nodejs는 web server 기능제공하는데 dynamic page도 지원.
    // Apache, Enginx는 static pages(html의 코드변경안됨)만.
    // Client가 create하면 이 인자 포함해서 server에 전해야하므로 req가 변함.
    // 그럼 이에 맞게 새로운 res를 보내줘야하므로 dynamic page.

/* Web server vs WAS(web application server)
web server : static page 제공 / dynamic page req를 WAS에 보내고 res를 client에 전달
    static content들은 web server에서 처리해서 server의 부담 줄임.
WAS(web container, servlet container) : dynamic content 제공위해 만들어진 application server.
    db 조회, 다양한 로직 처리. 정적 page 까지 하게되면 dynamic page 처리 느려져 page 노출시간 오래걸림.
    WAS = web server + web container
*/

const fs = require('fs');
const path = require('path');
const express = require('express'); // require()로 express module 불러옴.
const { log } = require('console');
const app = express(); // app 객체에 담음
const port = 8807;

/*
app.get() 함수는 정규 표현식, request handler(함수임) 2개를 받음.
localhost:3000/으로 들어갔을때 콜백함수 실행. :== routing.
    정규표현식 : URL 패턴에 대한 RegExp받음. 와일드카드 라이팅(*)=모든 URL 처리.
    handler : server가 특정 요청받을 때마다 실행되는 함수.
    - 최소 2개 para. 받음. 요청, 응답.
    ** 특정 요청이란 보통 HTTP 메서드(예: GET), URL 경로(예: 프로토콜이 지정되지 않은 URL), 호스트와 포트로 정의
*/

// 1. 현재 시간(Locale)
const curr = new Date();
const utc = curr.getTime() + (curr.getTimezoneOffset() * 60 * 1000);
const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
const kr_curr = new Date(utc + KR_TIME_DIFF);

app.get('/', (req, res)=>{
    res.send("Starbucks with Deung.");
    // res.end('Hello World!?? San?asdfsad');
});

// app.get('/meals/kor', (req, res) => {
    // const m = kr_curr.getMonth() + 1;
    // const d = kr_curr.getDate();
    // const h = kr_curr.getHours();
// 
    // let month = m;
    // let date = d;
    // let meal = '';
    // let days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    // let name = '';
// 
    // if (Boolean(9 <= h && h < 13)) {
        // meal = 'l';
    // } else if (Boolean(13 <= h && h < 19)) {
        // meal = 'd';
    // } else {
        // meal = 'b';
        // date = d + 1;
// 
        // if (Boolean(date > days[m-1])) {
            // month = m + 1;
            // date = 1;
            // if (Boolean(month > 12)) {
                // month = 1;
            // }
        // }
    // }
    // month = String(month);
    // if  (Boolean(month.length == 1)) {
        // month = month.padStart(2, '0');
    // }
// 
    // name = month + '_' + date + '_'  + meal + '_kor.json';
    // console.log(name);
// 
// // 파일 있는지 확인. fs 등등 is dir. 이걸 sync로.
    // const Dir = path.join(__dirname, 'meals_data', name);
    // var isExist = 1;
    // try {
        // fs.statSync(Dir);
    //   } catch (error) {
    //   
        // //   파일이 없다면 에러 발생
        //   if (error.code === "ENOENT") {
            // isExist = 0; 
            // console.log("파일이 존재하지 않습니다.");
        //   }
        // }
    // 
// 
    // if(isExist) {
        // const file = fs.readFileSync(Dir, 'utf8');
        // const jsonData = JSON.parse(file);
        // const jsonMeals = jsonData.meal;
        // var kom = jsonMeals.meal_date;
        // console.log(kom);
        // res.json(resData);
    // } else {
        // res.send("Sorry.... kor")
    // }
// 
// });

app.post('/meals/kor', (req, res) => {
// app.get('/meals/kor', (req, res) => {
    const m = kr_curr.getMonth() + 1;
    // const m = 8;
    const d = kr_curr.getDate();
    // const d = 31;
    // const h = kr_curr.getHours();
    // const h = 13;
    // console.log("now hour : " + h);

    let month = m;
    let date = d;
    let meal = '';
    let days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let name = '';

    if (Boolean(9 <= h && h < 13)) {
        meal = 'l';
    } else if (Boolean(13 <= h && h < 19)) {
        meal = 'd';
    } else {
        meal = 'b';
        date = d + 1;

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
    } else {
        meal = 'b';
        date = d + 1;

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


// app.get('/meals/eng', (req, res) => {
    // const m = kr_curr.getMonth() + 1;
    // const d = kr_curr.getDate();
    // const h = kr_curr.getHours();
// 
    // let month = m;
    // let date = d;
    // let meal = '';
    // let days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    // let name = '';
// 
    // if (Boolean(9 <= h && h < 13)) {
        // meal = 'l';
    // } else if (Boolean(13 <= h && h < 19)) {
        // meal = 'd';
    // } else {
        // meal = 'b';
        // date = d + 1;
// 
        // if (Boolean(date > days[m-1])) {
            // month = m + 1;
            // date = 1;
            // if (Boolean(month > 12)) {
                // month = 1;
            // }
        // }
    // }
    // month = String(month);
    // if  (Boolean(month.length == 1)) {
        // month = month.padStart(2, '0');
    // }
// 
    // name = month + '_' + date + '_'  + meal + '_eng.json';
    // console.log(name);
// 
// // 파일 있는지 확인. fs 등등 is dir. 이걸 sync로.
    // const Dir = path.join(__dirname, 'meals_data', name);
    // var isExist = 1;
    // try {
        // fs.statSync(Dir);
    //   } catch (error) {
    //   
          // // 파일이 없다면 에러 발생
        //   if (error.code === "ENOENT") {
            // isExist = 0; 
            // console.log("파일이 존재하지 않습니다.");
        //   }
        // }
// 
    // if(isExist) {
        // const file = fs.readFileSync(Dir, 'utf8');
        // const jsonData = JSON.parse(file);
        // const jsonMeals = jsonData.meal;
        // console.log(jsonMeals);
        // res.json(jsonData);
    // } else {
        // res.send("Sorry........... eng")
    // }
// });

// listen : localhost:3000과 연결해줌
app.listen(port, ()=>{
    console.log('http://localhost:%s', port);
});
