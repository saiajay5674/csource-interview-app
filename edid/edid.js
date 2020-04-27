const exec = require('child_process').exec;

async function getStudentData(pid) {

    return new Promise( (resolve, reject) => {
        
        exec("perl ./edid/edid.pl " + pid, function(err, stdout, stderr) {
    
            if(err) {
                console.log(err);
                reject(err);
            }
            data = stdout.split(';');
            let studentData = {
                name: data[0],
                major: data[1],
                class: data[2]
            }
            resolve(studentData);
        });
    })
}

module.exports = {
    getStudentData
}


