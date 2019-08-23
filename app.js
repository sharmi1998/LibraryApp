const Express=require('express');
var app=new Express();
app.set('view engine','ejs');
var request=require('request');
var Mongoose=require('mongoose');
var bodyparser=require('body-parser');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
var LibModel=Mongoose.model("library",{
    title:String,
    author:String,
    publisher:String,
    date_of_publication:String,
    distributor:String,
    price:String,
    description:String,
    pic:String

});
var AuthorModel=Mongoose.model("libraryAuthor",{
    name:String,
    place:String,
    dob:String,
    image:String
});

app.use(Express.static(__dirname+"/public"));
//Mongoose.connect("mongodb://localhost:27017/library")

Mongoose.connect("mongodb+srv://sharmi1998:sharmi1998@cluster0-rwxfj.mongodb.net/test?retryWrites=true&w=majority")

app.post('/read',(req,res)=>{

    console.log('test')
    console.log(req.body)
    var library=new LibModel(req.body);
    var result=library.save((error,data)=>{
        if(error){
            throw error;
         
        }
        else{
            console.log(data)
            res.send("<script>alert('successfully added')</script>        <script> window.location.href='/' </script>");
        }
    })

})

app.post('/read1',(req,res)=>
{
    var author=new AuthorModel(req.body);
    var result=author.save((error)=>{
        if(error)
        {
            throw error;
        }
        else{
            res.send("<script> window.location.href='/addauthor' </script>       <script>alert('successfully added')</script>" );
        }
    });
  
});

// app.post('/read1',(req,res)=>{

//     // console.log('test')
//     // console.log(req.body)
//     var author=new AuthorModel(req.body);
//     var result=author.save((error,data)=>{
//         if(error){
//             throw error;
         
//         }
//         else{
//             res.send("<script>alert('successfully added')</script>        <script> window.location.href='/' </script>");
//         }
//     })

// })

app.get('/read1',(req,res)=>
{
    AuthorModel.find((error,data)=>
{
    if(error)
    {
        throw error;
    }
    else{
        res.send(data);
    }
});

});





app.get('/viewall',(req,res)=>{

    result=LibModel.find((error,data)=>{
        if(error){
            throw error;
        }
        else{
            res.send(data);
        }
    })
    
    })
// app.get('/viewbook',(req,res)=>{
//     request(viewall,(error,response,body)=>{
//         var data=JSON.parse(body);
//         console.log(data)
//         res.render('view',{'data':data})
//     })
    
//     })

app.get('/singlebookFetchApi/:id',(req,res)=>{

    var id=req.params.id;

    LibModel.find({_id:id},(error,data)=>{
        if(error){
            throw error;
        }
        else{

            res.send(data);
        }
    })

})

app.get('/authorFetchApi/:id',(req,res)=>{

    var id=req.params.id;

    AuthorModel.find({_id:id},(error,data)=>{
        if(error){
            throw error;
        }
        else{

            res.send(data);
        }
    })

})


app.get('/readmore/:id',(req,res)=>{

    var x=req.params.id;


    const ApiUrl="https://libmanage.herokuapp.com/singlebookFetchApi/"+x;

   
request(ApiUrl,(error,response,body)=>{
    var books=JSON.parse(body);
    console.log(books)
    res.render('single',{ navbarrr:[{link:'/books',title:'books'},{link:'/author',title:'authors'},{link:'/addbook',title:'addbook'},{link:'/addauthor',title:'AddAuthor'}
],title:'books',books:books[0]})
   // res.render('books',{data:'data'})
})

})
app.get('/authors1/:id',(req,res)=>{

    var x=req.params.id;


    const ApiUrl="https://libmanage.herokuapp.com/authorFetchApi/"+x;

   
request(ApiUrl,(error,response,body)=>{
    var author=JSON.parse(body);
    console.log(author)
    res.render('authors1',{ navbarrr:[{link:'/books',title:'books'},{link:'/author',title:'authors'},{link:'/addbook',title:'addbook'},{link:'/addauthor',title:'AddAuthor'}
],title:'authors',"author":author[0]})
   // res.render('books',{data:'data'})
})

})

    // const x=req.params.id;
    // res.render('authors1',{'a': a[x],

    // navbarrr:[{link:'/books',title:'books'},{link:'/authors',title:'authors'},{link:'/addbook',title:'addbook'},{link:'/addauthor',title:'AddAuthor'}],

    // title:'Library'}   )





app.get('/',(req,res)=>{
    res.render(
        'index',
        {
            navbarrr:[{link:'/books',title:'books'},{link:'/author',title:'authors'},{link:'/addbook',title:'addbook'},{link:'/addauthor',title:'AddAuthor'}],

            title:'Library'
        }
    )
})

app.get('/books',(req,res)=>{

    const viewall="https://libmanage.herokuapp.com/viewall"



request(viewall,(error,response,body)=>{
    var data=JSON.parse(body);
    console.log(data)
    res.render('books',{ navbarrr:[{link:'/books',title:'books'},{link:'/author',title:'authors'},{link:'/addbook',title:'addbook'},{link:'/addauthor',title:'AddAuthor'}
],title:'books',data:data})
   // res.render('books',{data:'data'})
})

})

app.get('/author',(req,res)=>{
   // const authorlink="http://localhost:3000/getauthorApi";
   const authorlink="https://libmanage.herokuapp.com/getauthorApi"
   
    request(authorlink,(error,response,body)=>{
        var a=JSON.parse(body);
        if(error)
        {
            throw error;
        }
        else{
            res.render('author',{ navbarrr:[{link:'/books',title:'books'},{link:'/author',title:'authors'},{link:'/addbook',title:'addbook'},{link:'/addauthor',title:'AddAuthor'}
    ],title:'author',a:a})
        }
        
    });
});


// app.get('/authors',(req,res)=>{



//     request(authorlink,(error,response,body)=>{
//         var authors=JSON.parse(body);
//         // console.log(author)
//         if(error){
//             throw error;
//         }
//         else{
//         res.render('author',{ navbarrr:[{link:'/books',title:'books'},{link:'/authors',title:'authors'},{link:'/addbook',title:'addbook'},{link:'/addauthor',title:'AddAuthor'}
//     ],title:'author',authors:authors})
// }
       // res.render('books',{data:'data'})

    



app.get('/addbook',(req,res)=>{
    res.render('addbook',{navbarrr:[{link:'/books',title:'books'},{link:'/author',title:'authors'},{link:'/addbook',title:'addbook'},{link:'/addauthor',title:'AddAuthor'}]})
})
app.get('/addauthor',(req,res)=>{
    res.render('addauthor',{navbarrr:[{link:'/books',title:'books'},{link:'/author',title:'authors'},{link:'/addbook',title:'addbook'},{link:'/addauthor',title:'AddAuthor'}]})
})
app.listen(process.env.PORT || 3004,()=>{
    console.log("server is running on http://localhost:3004")
})