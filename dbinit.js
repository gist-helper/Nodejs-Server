const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

let db = new sqlite3.Database('./db/my.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the mydb database.');
    }
});

const dir = path.join(__dirname, 'meals_data');
var files = fs.readdirSync(dir); 
// const dropQuery = `
//     DROP TABLE IF EXISTS meals 
// `;

// const createQuery = `
//   CREATE TABLE IF NOT EXISTS meals(
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     title VARCHAR(30),
// 	    date DATE,
// 	    kind_of_meal VARCHAR(10),
// 	    menu VARCHAR(300)
//   )
// `;

const createQuery = `
    CREATE TABLE IF NOT EXISTS meals(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        filename VARCHAR(30),
        menu VARCHAR(500)
    )
`;
/*
동기화 문제 있음. table DROP하고 node dbinit.js 하면 table 없다고 뜸.
한번 더 node 실행하면 정상적으로 insert됨. 그러니 create부분 어디로 옮겨.
*/

db.each(createQuery);

for (var i=0; i<files.length; i++) {
	var name = files[i];
	if (path.extname(name) == '.json') {
	const filepath = path.join(dir, name);	
    const file = fs.readFileSync(filepath, 'utf8');
    const m = JSON.parse(file).meal;
    
    temp = m.meal_date + ' ' + m.kind_of_meal + '\n\n' + m.title + '\n\n' + m.menu
	const insertQuery = `
		insert into meals(filename, menu) values("${name}", "${temp}")
	`;
	console.log(insertQuery);
	console.log(i);
	db.run(insertQuery);
	}
};

//db.serialize(() => {
//    db.each(dropQuery);
//    db.each(insertQuery);
//    db.each(dummyDataQuery);
//});

db.close((err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Close the database connection.');
    }
});


