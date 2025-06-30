const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname,'public')));

app.set('view engine','ejs');


//render HOME page
app.get('/',(req,res)=>{

    fs.readdir('./files',(err,files)=>{

        res.render("index",{files:files});
    })
})

//read file by clicking the file card.
app.get('/file/:filename',(req,res)=>{
    fs.readFile(`./files/${req.params.filename}`,'utf-8',(err,fileData)=>{
        res.render("show",{filename:req.params.filename,fileData:fileData});
    })
})



//edit filename

app.get('/edit/:filename',(req,res)=>{
    res.render('edit',{filename:req.params.filename});
})



// post the edited filename
app.post('/edit',(req,res)=>{
    // let stage = true;
    // console.log(req.body.new)
    // if(req.body.new.includes('.txt'))
    // {
    //    stage=false;
    // }
    // else{
    //     stage=true;
    // }

    // if(stage)
    // {
    //     fs.rename(`./files/${req.body.previous}`,`./files/${req.body.new}.txt`,(err)=>{
    
    //         res.redirect('/')
    //     });
    // }
    // else{
    //     fs.rename(`./files/${req.body.previous}`,`./files/${req.body.new}`,(err)=>{
    
    //         res.redirect('/')
    //     });
    // }
          fs.rename(`./files/${req.body.previous}`,`./files/${req.body.new}`,(err)=>{
    
            res.redirect('/')
        });
})




//edit the content of file name
app.get('/editfileDetails/:filename/:fileData',(req,res)=>{
    res.render('editfileDetails',{filename:req.params.filename,fileData:req.params.fileData});
})




//post the edited content of the file
app.post('/editfile/:filename',(req,res)=>{
    console.log(req.body.fileDetails)
    fs.writeFile(`./files/${req.params.filename}`,req.body.fileDetails,(err)=>{    
        res.redirect('/');
    })
})


//delete the file

app.delete('/delete/:filename', (req, res) => {
    const filename = req.params.filename;

  
    
    fs.unlink(`./files/${filename}`, (err) => {
        if (err) {
            console.error('Error deleting file:', err);
            return res.status(500).send('Error deleting file');
        }

        res.status(200).send();  // Send a success response
    });
});


app.post('/create',(req,res)=>{
    console.log(req.body);
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.details,(err)=>{
      
        res.redirect('/');
    })
})


app.listen(3000,()=>{
    console.log('app is running');
})