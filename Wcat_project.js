
let inputArr = process.argv.slice(2);
let fs = require('fs');


let CmdArr =[];
let fileArr = [];
for(let i=0; i<inputArr.length; i++){
    if(inputArr[i].charAt(0)=="-" || inputArr[i].charAt(0)==">"){
        CmdArr.push(inputArr[i]);
    }
    
    else{
        fileArr.push(inputArr[i]);
    }
}

for(let i=0; i<fileArr.length; i++){
    let file_exist=fs.existsSync(fileArr[i])
    if(file_exist==false){
        console.log(fileArr[i]+" file does not exist");
        return;
    }
}

let buffer = "";
for(let i=0; i<fileArr.length; i++){
    let file_content = fs.readFileSync(fileArr[i]);
    if(i==0){
        buffer=file_content;
    }
    else{
        buffer=buffer+'\r\n'+'\r\n'+file_content;
    }
}

let cmd_s= CmdArr.includes('-s');
let cmd_n= CmdArr.includes('-n');
let cmd_b= CmdArr.includes('-b');
let cmd_override=CmdArr.includes('>');
let cmd_append=CmdArr.includes('>>');

if(cmd_b || cmd_n || cmd_s){
    let buff_Arr=[];
    buff_Arr=buffer.split('\r\n');
    // console.log(buff_Arr);



    if(cmd_b && cmd_n){
        console.log("both commands -n and -b cannot occur simultneously");
        return;
    }
   
    else if(cmd_s){
        
        for(let i=0; i<buff_Arr.length; i++){
            if(buff_Arr[i]=="" && buff_Arr[i-1]=="")
            {
                buff_Arr[i]=null;
                //buffer[i-1]=null;
            }

            else if(buff_Arr[i]=="" && buff_Arr[i-1]==null)
            {
                buff_Arr[i]=null;
            }

        }
        // console.log(buff_Arr);

        //command S and B
        if(cmd_b && cmd_s){
            
            let count=1;
            // console.log(buff_Arr);
            for(let i=0; i<buff_Arr.length; i++){
                if(buff_Arr[i]!=null && buff_Arr[i]!=""){
                    console.log(count+" "+buff_Arr[i]+"");
                    count++;
                }
                else if(buff_Arr[i]==""){
                    console.log(buff_Arr[i]+"");
                }
            }
            return;
        }

        //command S and N
        else if(cmd_s && cmd_n){
            let count=1;
            for(let i=0; i<buff_Arr.length; i++){
                if(buff_Arr[i]!=null){
                    console.log(count+" "+buff_Arr[i]+"");
                    count++;
                }
            }
            return;
        }

        else if(cmd_s){
            //for -s command
            // console.log(buff_Arr);
            for(let i=0; i<buff_Arr.length; i++){
                if(buff_Arr[i]!=null){
                    console.log(buff_Arr[i]+"");
                }
            
            }
        }

    }
    else if(cmd_n){
        for(let i=0; i<buff_Arr.length; i++){
            let j=i+1;
            console.log(j+" "+buff_Arr[i]);
            
        }
        return;
    }
    else if(cmd_b){
        // console.log(buff_Arr);
        let count=1
        for(let i=0; i<buff_Arr.length; i++){
            if(buff_Arr[i]!=""){
                console.log(count+" "+buff_Arr[i]);
                count++;
            }
            else{
                console.log("");
            }
            
        }
        return;
    }


}
else if(cmd_override){
    console.log("override command activated");
    // fs.writeFileSync(fileArr[1],fileArr[0]+"");
}
else{
    console.log(buffer);
}
