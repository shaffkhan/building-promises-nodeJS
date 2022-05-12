const fs = require('fs');
const { resolve } = require('path');
const sa = require("superagent");

//////////////we will create a new file

const newfilePro = file => {
    /////////it will return a function 
    return new Promise((resolve,reject) => {
        /////////now here inside this callback function we will do all the asynchronous work
        fs.readFile(file,(err , data) => {

            if(err){
                /////////reject is func which is used whrn our promise is not fullfilled (if error comes)
                reject("sorry error arised!!");
            }
    ///////////////////resolve is a function which is used to send the data to then function in case of successful promise    
            resolve(data);
        })
       
    })
}


const writeFilePro = (file,data) => {
    return new Promise((resolve,reject) => {
        fs.writeFile(file,data,err => {
            if(err) return reject("err occured");
            resolve("success");
        })
    })
}


newfilePro(__dirname+'/dog.txt').
then(data => {

    return sa.get("https://dog.ceo/api/breed/"+data+"/images/random")}).


    then(result => {
         console.log(result.body.message);
         return writeFilePro("dog-img.txt",result.body.message);
    }).
    
    
    then(()=>{
        console.log("saved successfully");
    }).
    
    catch(err =>{
            console.log(err.message);
          });


