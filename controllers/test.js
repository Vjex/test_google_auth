// 'use strict';
// const Client = require('ssh2-sftp-client');
// const fs = require('fs');
// const mySqlConnection = require('../middlewares/dbConnection');


// //method to move the files at sftp server to our local folder..
// exports.getHttp = (req, res, next) => {



//     ///Now Insert The New Execution Time.
//     //Sftp Config Details.
//     const config = {
//         host: 'SFTP.Bajajfinserv.in',
//         username: 'CC_Bareilly',
//         password: 'Pass@2021',
//         port: '22',
//         privateKey: fs.readFileSync('../assets/ccsaheb.ppk')
//     };

//     const sftp = new Client();


//     sftp.connect(config).then(() => {
//         // will return an array of objects with information about all files in the remote folder
//         return sftp.list('/');
//     }).then(async(data) => {

//         // let remoteFilePath = '/' + data[1].name;
//         // let remoteFilePath = '/Inbound';
//         // let remoteFilePathProcess = '/Process';

//         let remoteFilePath = '/Process';
//         let remoteFilePathProcess = '/Inbound';


//         // data.forEach(element => {
//         //     console.log(element.name);
//         // });

//         // console.log(data.length);



//         // console.log(remoteFilePath);
//         sftp.list(remoteFilePath).then(
//             async(dataFinl) => {
//                 var i = 0;

//                 //console.log(dataFinl);
//                 console.log(dataFinl.length);

//                 if (dataFinl.length > 0) {
//                     // Rename the remote file (or directory)

//                     // dataFinl.forEach(function(element, index, array) {
//                     for (i; i < dataFinl.length; i++) {
//                         var element = dataFinl[i];
//                         // console.log(element);
//                         //  console.log(element.name);
//                         var existingFilepath = remoteFilePath + '/' + element.name;
//                         var newFilepath = remoteFilePathProcess + '/' + element.name;
//                         console.log(existingFilepath);
//                         console.log(newFilepath);

//                         //  Move File
//                         // sftp.rename(existingFilepath, newFilepath);

//                         await sftp.get(existingFilepath).then((stream) => {
//                             //If Any File Moved To our Server then Insert New Execution Time.
//                             // isFileUpdated = true;
//                             // save to local - server folder from the SFTP Folder

//                             let fileFinal = '/var/www/html/CC_Bareilly/upload/Inbound/' + element.name;
//                             //  console.log(fileFinal.toString());
//                             //Copy File 
//                             fs.writeFile(fileFinal, stream, (err) => {
//                                 if (err) console.log(err);
//                             });
//                             //Move File.
//                             sftp.rename(existingFilepath, newFilepath);

//                         });

//                         if (i == (dataFinl.length - 1)) {
//                             sftp.end();
//                             return res.status(200).json({
//                                 msg: 'Files Moved SuccessFully.',

//                             });
//                         }
//                         // });
//                     }

//                 } else {
//                     sftp.end();
//                     return res.status(200).json({
//                         msg: 'No File in Inbound Folder.',

//                     });
//                 }




//                 // sftp.end();
//                 // return res.status(200).json({
//                 //     dataFinl,

//                 // });


//                 // //Download All Files At SFTP  Inbound Folder.
//                 // if (dataFinl.length > 0) {


//                 //     var i = 0;
//                 //     var file;
//                 //     for (i; i < dataFinl.length; i++) {

//                 //         isFileUpdated = false;
//                 //         file = dataFinl[i];
//                 //         // console.log('final Lopp');
//                 //         // console.log(dateToCheck);
//                 //         // console.log(typeof dateToCheck);
//                 //         // console.log(file.modifyTime);
//                 //         // console.log(typeof file.modifyTime);
//                 //         //var fileModifyDateTime = new Date(file.modifyTime);

//                 //         //validating that This File Needs To Be Saved Or Not.
//                 //         if (file.modifyTime > dateToCheck) {


//                 //             var remoteFilePathfinal = remoteFilePath + '/' + file.name;

//                 //             await sftp.get(remoteFilePathfinal).then((stream) => {
//                 //                 //If Any File Moved To our Server then Insert New Execution Time.
//                 //                 isFileUpdated = true;
//                 //                 // save to local - server folder from the SFTP Folder

//                 //                 let fileFinal = '/var/www/html/CC_Bareilly/upload/Inbound/' + file.name;
//                 //                 //  console.log(fileFinal.toString());
//                 //                 fs.writeFile(fileFinal, stream, (err) => {
//                 //                     if (err) console.log(err);
//                 //                 })

//                 //             });


//                 //         }

//                 //         // //Insert The Execution Details To Database if Needed.
//                 //         // if (isFileUpdated) {

//                 //         // } else {
//                 //         //     //Close Sftp Cnnection 
//                 //         //     sftp.end();
//                 //         //     return res.status(200).json({
//                 //         //         message: "success but no file needed to move.",
//                 //         //         status: 2
//                 //         //     });
//                 //         // }

//                 //     }




//                 // } else {
//                 //     sftp.end();
//                 //     return res.status(200).json({
//                 //         message: "success but no file found in SFTP Inbound Folder.",
//                 //         status: 3
//                 //     });
//                 // }
//             });

//     }).catch((err) => {
//         console.log(err, 'catch error');
//         return res.status(200).json({
//             message: "SFTP connection Failed.",
//             status: 4
//         });
//     });



// };