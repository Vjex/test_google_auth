// const mysql = require("mysql");

// //for development Use only
// const mySqlConnection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: 'cogent@123',
//     database: "cc_bareilly",
// });


// //Connectiong to database and executing MYSql Querry!!
// mySqlConnection.connect((err) => {
//     if (!err) {
//         console.log("DB Connection establlished!");
//     } else {
//         console.log(
//             "DB Connection failed and error is : " + JSON.stringify(err, undefined, 2)
//         );
//     }
// });

// //mySqlConnection.destroy();

// module.exports = mySqlConnection;