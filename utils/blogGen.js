import fs from 'fs'
export const createPDF = async(body,title)=>{
    if(!body || !title) throw new Error("content not available");
        fs.writeFile(`./books/${title}`,body,(err)=>{
            if(err) throw err;
        })
    }