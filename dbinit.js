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

//cur = db.cursor()
//btkor = json.load(open('./meals_data/*
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

const temp = `
	SELECT * from meals
`;

db.each(createQuery);

//files.forEach((name, index) => {
//	if (path.extname(name) == '.json') {
//	const filepath = path.join(dir, name)	
//    const file = fs.readFileSync(filepath, 'utf8');
//    const m = JSON.parse(file).meal;
//	
//	const insertQuery = `
//		insert into meals values(${m.title}, ${m.meal_date}, ${m.kind_of_meal}, ${m.menu})
//	`;
//	console.log(index);
//	//console.log(insertQuery);	
//	db.run(insertQuery);
//	return false;
//	}
//	});

for (var i=0; i<files.length; i++) {
	var name = files[i];
	if (path.extname(name) == '.json') {
	const filepath = path.join(dir, name);	
    const file = fs.readFileSync(filepath, 'utf8');
    const m = JSON.parse(file).meal;
	
	const insertQuery = `
		insert into meals(filename, menu) values("${name}", "${m.menu}")
	`;
	console.log(insertQuery);
	console.log(i);
	db.run(insertQuery);
	}
};

//db.run(temp);

//db.all(temp, [], (err, rows) => {
//	console.log(rows);
//		});

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


