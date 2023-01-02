// 'use strict';
// const Client = require('ssh2-sftp-client');
// const fs = require('fs');
// // const mySqlConnection = require('../middlewares/dbConnection');
// const saveSftp = require('../middlewares/getAndSveTheFile');


// //method to move the files at sftp server to our local folder..
// exports.getHttp = (req, res, next) => {

//     //Insert The New Execution dateTime.
//     var insrtCQ = "INSERT INTO `cronlog` ( `file_type`) VALUES ( 'sftpnode')";

//     mySqlConnection.query(insrtCQ, (err, insertRow, fields) => {
//         if (err) {
//             return res.status(500).json({
//                 error: "DataBase Error!!",
//                 status: 0
//             });
//         } else {

//             console.log('innnn');


//             //First get the Previous Execution Time.
//             var selectQ = "SELECT `execution_time` FROM `last_execution` Order By id DESC limit 1";


//             mySqlConnection.query(selectQ, (err, rows, fields) => {
//                 if (err) {
//                     return res.status(500).json({
//                         error: "DataBase Error!!",

//                         status: 0
//                     });
//                 } else {

//                     try {

//                         var dateToCheck;
//                         var isFileUpdated = false;

//                         //Check for first Time Execution and laterOn
//                         if (rows.length > 0) {
//                             // console.log('IF');
//                             dateToCheck = new Date(rows[0]['execution_time']);
//                             dateToCheck = dateToCheck.getTime();
//                         } else {
//                             // console.log('ELSE');
//                             //5 days Back Just To Ensure all files should be there. 
//                             dateToCheck = new Date();
//                             dateToCheck.setDate(dateToCheck.getDate() - 5);
//                             dateToCheck = dateToCheck.getTime();
//                         }

//                         // console.log(dateToCheck);

//                         ///Now Insert The New Execution Time.
//                         //Sftp Config Details.
//                         const config = {
//                             host: 'SFTP.Bajajfinserv.in',
//                             username: 'CC_Bareilly',
//                             password: 'Pass@2021',
//                             port: '22',
//                             privateKey: fs.readFileSync('../assets/ccsaheb.ppk')
//                         };

//                         const sftp = new Client();


//                         sftp.connect(config).then(() => {
//                             // will return an array of objects with information about all files in the remote folder
//                             return sftp.list('/');
//                         }).then(async(data) => {

//                             // let remoteFilePath = '/' + data[1].name;
//                             //Folder to Read
//                             let remoteFilePath = '/Inbound';
//                             //Folder To Move
//                             let remoteFilePathProcess = '/Process';

//                             sftp.list(remoteFilePath).then(
//                                 async(dataFinl) => {

//                                     //Download All Files At SFTP  Inbound Folder.
//                                     if (dataFinl.length > 0) {


//                                         var i = 0;
//                                         var file;

//                                         for (i; i < (dataFinl.length + 1); i++) {

//                                             //Return Response If All Loop Exeuted
//                                             if (i == (dataFinl.length)) {
//                                                 //Cose SFT Connection


//                                                 sftp.end();


//                                                 //Insert The Dtaa if Required 
//                                                 if (isFileUpdated) {

//                                                     //Insert The New Execution dateTime.
//                                                     var insrtQ = "INSERT INTO `last_execution` ( `execution_time`) VALUES ( ?)";
//                                                     var values = [new Date()];

//                                                     mySqlConnection.query(insrtQ, values, (err, insertRow, fields) => {
//                                                         if (err) {
//                                                             return res.status(500).json({
//                                                                 error: "DataBase Error!!",
//                                                                 status: 0
//                                                             });
//                                                         } else {
//                                                             return res.status(200).json({
//                                                                 message: "success file found in SFTP Inbound Folder and Moved to Local.",
//                                                                 status: 1,
//                                                                 length: dataFinl.length
//                                                             });
//                                                         }
//                                                     });
//                                                 } else {
//                                                     return res.status(200).json({
//                                                         message: "success but no file found in SFTP Inbound Folder.",
//                                                         status: 3,
//                                                         length: dataFinl.length

//                                                     });
//                                                 }

//                                             }


//                                             //Assign File got to Our Var.
//                                             file = dataFinl[i];

//                                             // console.log('final Lopp');
//                                             // console.log(dateToCheck);
//                                             // console.log(typeof dateToCheck);
//                                             // console.log(file.modifyTime);
//                                             // console.log(typeof file.modifyTime);
//                                             //var fileModifyDateTime = new Date(file.modifyTime);

//                                             //validating that This File Needs To Be Saved Or Not.
//                                             if (file.modifyTime > dateToCheck) {


//                                                 var remoteFilePathfinal = remoteFilePath + '/' + file.name;
//                                                 //  var existingFilepath = remoteFilePath + '/' + file.name;
//                                                 var newFilepath = remoteFilePathProcess + '/' + file.name;

//                                                 await sftp.get(remoteFilePathfinal).then((stream) => {
//                                                     //If Any File Moved To our Server then Insert New Execution Time.
//                                                     isFileUpdated = true;
//                                                     // save to local - server folder from the SFTP Folder

//                                                     let fileFinal = '/var/www/html/CC_Bareilly/upload/Inbound/' + file.name;
//                                                     //  console.log(fileFinal.toString());
//                                                     fs.writeFile(fileFinal, stream, (err) => {
//                                                         if (err) console.log(err);
//                                                     });

//                                                     //Move File.
//                                                     sftp.rename(remoteFilePathfinal, newFilepath);

//                                                 });


//                                             }



//                                         }


//                                     } else {
//                                         sftp.end();
//                                         return res.status(200).json({
//                                             message: "success but no file found in SFTP Inbound Folder.",
//                                             status: 3
//                                         });
//                                     }
//                                 });

//                         }).catch((err) => {
//                             console.log(err, 'catch error');
//                             return res.status(200).json({
//                                 message: "SFTP connection Failed.",
//                                 status: 4
//                             });
//                         });
//                     } catch (error) {
//                         console.log(error);
//                         return res.status(200).json({
//                             message: "Error in Execution.",
//                             status: 5
//                         });
//                     }

//                 }
//             });

//             // //First get the Previous Execution Time.
//             // var selectQ = "SELECT `execution_time` FROM `last_execution` Order By id DESC limit 1";


//             // mySqlConnection.query(selectQ, (err, rows, fields) => {
//             //     if (err) {
//             //         return res.status(500).json({
//             //             error: "DataBase Error!!",

//             //             status: 0
//             //         });
//             //     } else {

//             //         try {

//             //             var dateToCheck;
//             //             var isFileUpdated = false;

//             //             //Check for first Time Execution and laterOn
//             //             if (rows.length > 0) {
//             //                 // console.log('IF');
//             //                 dateToCheck = new Date(rows[0]['execution_time']);
//             //                 dateToCheck = dateToCheck.getTime();
//             //             } else {
//             //                 // console.log('ELSE');
//             //                 //5 days Back Just To Ensure all files should be there. 
//             //                 dateToCheck = new Date();
//             //                 dateToCheck.setDate(dateToCheck.getDate() - 5);
//             //                 dateToCheck = dateToCheck.getTime();
//             //             }

//             //             // console.log(dateToCheck);

//             //             ///Now Insert The New Execution Time.
//             //             //Sftp Config Details.
//             //             const config = {
//             //                 host: 'SFTP.Bajajfinserv.in',
//             //                 username: 'CC_Bareilly',
//             //                 password: 'Pass@2021',
//             //                 port: '22',
//             //                 privateKey: fs.readFileSync('../assets/ccsaheb.ppk')
//             //             };

//             //             const sftp = new Client();


//             //             sftp.connect(config).then(() => {
//             //                 // will return an array of objects with information about all files in the remote folder
//             //                 return sftp.list('/');
//             //             }).then(async(data) => {

//             //                 let remoteFilePath = '/' + data[1].name;

//             //                 sftp.list(remoteFilePath).then(
//             //                     async(dataFinl) => {

//             //                         //Download All Files At SFTP  Inbound Folder.
//             //                         if (dataFinl.length > 0) {


//             //                             var i = 0;
//             //                             var file;


//             //                             for (i; i < dataFinl.length; i++) {

//             //                                 file = dataFinl[i];
//             //                                 // console.log('final Lopp');
//             //                                 // console.log(dateToCheck);
//             //                                 // console.log(typeof dateToCheck);
//             //                                 // console.log(file.modifyTime);
//             //                                 // console.log(typeof file.modifyTime);
//             //                                 //var fileModifyDateTime = new Date(file.modifyTime);

//             //                                 //validating that This File Needs To Be Saved Or Not.
//             //                                 if (file.modifyTime > dateToCheck) {
//             //                                     isFileUpdated = true;


//             //                                 }

//             //                                 //If Loop Index Is Last The If Need To Insert And Saave File Then Do So
//             //                                 if (i == (dataFinl.length - 1) && isFileUpdated) {
//             //                                     //     //Insert The New Execution dateTime.
//             //                                     var insrtQ = "INSERT INTO `last_execution` ( `execution_time`) VALUES ( ?)";
//             //                                     var values = [new Date()];

//             //                                     mySqlConnection.query(insrtQ, values, (err, insertRow, fields) => {
//             //                                         if (err) {
//             //                                             return res.status(500).json({
//             //                                                 error: "DataBase Error!!",
//             //                                                 status: 0
//             //                                             });
//             //                                         } else {
//             //                                             sftp.end();
//             //                                             //Call Our Midle To Get And Save The File.
//             //                                             saveSftp.getFileAndSaveFromSFTP();

//             //                                         }
//             //                                     });
//             //                                 }



//             //                             }


//             //                         } else {
//             //                             sftp.end();
//             //                             return res.status(200).json({
//             //                                 message: "success but no file found in SFTP Inbound Folder.",
//             //                                 status: 3
//             //                             });
//             //                         }
//             //                     });

//             //             }).catch((err) => {
//             //                 console.log(err, 'catch error');
//             //                 return res.status(200).json({
//             //                     message: "SFTP connection Failed.",
//             //                     status: 4
//             //                 });
//             //             });
//             //         } catch (error) {
//             //             console.log(error);
//             //             return res.status(200).json({
//             //                 message: "Error in Execution.",
//             //                 status: 5
//             //             });
//             //         }

//             //     }
//             // });
//         }
//     });
// };



// //  //Insert The Execution Details To Database if Needed.
// //  if (isFileUpdated) {
// //     //Insert The New Execution dateTime.
// //     var insrtQ = "INSERT INTO `last_execution` ( `execution_time`) VALUES ( ?)";
// //     var values = [new Date()];

// //     mySqlConnection.query(insrtQ, values, (err, insertRow, fields) => {
// //         if (err) {
// //             return res.status(500).json({
// //                 error: "DataBase Error!!",
// //                 status: 0
// //             });
// //         } else {

// //             //Close Sftp Cnnection 
// //             sftp.end();
// //             return res.status(200).json({
// //                 message: "success and Moved Some Files.",
// //                 status: 1
// //             });
// //         }
// //     });
// // } else {
// //     //Close Sftp Cnnection 
// //     sftp.end();
// //     return res.status(200).json({
// //         message: "success but no file needed to move.",
// //         status: 2
// //     });
// // }