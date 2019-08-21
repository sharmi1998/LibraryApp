const Express=require('express')
var bodyParser=require('body-parser')
var app=new Express()
var request=require('request')
const Mongoose=require('mongoose');
app.set('view engine','ejs')
app.use(Express.static(__dirname+"/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
const   LibModel=Mongoose.model("libraries",{
    title:String,
    author:String,
    publisher:String,
    image:String
    
    
});
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
            res.send("<script>alert('successfully added')</script>        <script> window.location.href='/' </script>");
        }
    })

})

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

   




// books=[
//     {
//         'title':'In search of Lost Time',
//         'author':'Marcel Proust',
//         'publisher':'HarperCollins',
//         'date_of_publication':'1971',
//         'distributorName':'HarperCollins',
//         'price':340,
//         'Description':'Novel'


//     },
//     {
//         title:"Don Quixote",
//         author:"Miguel de Cervantes",
//         publisher:"H&C Books",
//         date_of_publication:"1940",
//         distributorName:"H&C Books",
//         price:840,
//         Description:"Real World story"

//     },
//     {
//         title:"Ulysses",
//         author:"James Joyces",
//         publisher:"H&C Books",
//         date_of_publication:"1930",
//         distributorName:"H&C Books",
//         price:450,
//         Description:"Story"
//     },
//     {
//             title:"The Great Gatsby",
//             author:"F.schoot",
//             publisher:"Pearson",
//             date_of_publication:"1959",
//             distributorName:"H&C Books",
//             price:740,
//             Description:'Novel'
    
//     },
//     {
//             title:"MobyDick",
//             author:"Herman Melville",
//             publisher:"Pearson",
//             date_of_publication:"1851",
//             distributorName:"H&C Books",
//             price:200,
//             Description:'AutoBiography'
    
//         },
//         {
//             title:"Hamlet",
//             author:"William Shakesphere",
//             publisher:"pearson Books",
//             date_of_publication:"1920",
//             distributorName:"H&C Books",
//             price:1090,
//             Description:"Poems"
//         },];
//         a=[
//             {
//                 AuthorName:'marcel proust',
//                 image: '/image/a.jpg',
//                 dob:'12-12-1870',
//                 place:'america'
//             },
//             {
//                 AuthorName:'Don Quixote',
//                 image:"/image/f.jpg",
//                 dob:'12-09-1870',
//                 place:'america'
//             },
//             {
//                 AuthorName:'James Joyces',
//                 image:"/image/b.jpg",
//                 dob:'10-09-1870',
//                 place:'europe'
//             },{
//                 AuthorName:'F.schoot',
//                 image:"/image/c.jpg",
//                 dob:'10-09-1860',
//                 place:'singapore'
//             },{
//                 AuthorName:'Herman Melville',
//                 image:"/image/d.jpg",
//                 dob:'1-09-1879',
//                 place:'new york'
//             },{
//                 AuthorName:'William Shakesphere',
//                 image:"/image/e.jpg",
//                 dob:'11-03-1871',
//                 place:'london'
//             },
//         ];

app.get('/singlebookFetchApi/:id',(req,res)=>{

    var id=req.params.id;

    result=LibModel.find({_id:id},(error,data)=>{
        if(error){
            throw error;
        }
        else{

            res.send(data);
        }
    })

})


app.get('/readmore/:id',(req,res)=>{

    var id=req.params.id;


    const ApiUrl="http://localhost:3004/singlebookFetchApi/"+id;

   
request(ApiUrl,(error,response,body)=>{
    var books=JSON.parse(body);
    console.log(books)
    res.render('single',{ navbarrr:[{link:'/books',title:'books'},{link:'/authors',title:'authors'},{link:'/addbook',title:'addbook'},{link:'/books',title:'viewbook'}
],title:'books',books:books[0]})
   // res.render('books',{data:'data'})
})

})


app.get('/authors1/:id',(req,res)=>{

    const x=req.params.id;
    res.render('authors1',{'a': a[x],

    navbarrr:[{link:'/books',title:'books'},{link:'/authors',title:'authors'},{link:'/addbook',title:'addbook'},{link:'/books',title:'viewbook'}],

    title:'Library'}   )

})




app.get('/',(req,res)=>{
    res.render(
        'index',
        {
            navbarrr:[{link:'/books',title:'books'},{link:'/authors',title:'authors'},{link:'/addbook',title:'addbook'},{link:'/books',title:'viewbook'}],

            title:'Library'
        }
    )
})

app.get('/books',(req,res)=>{

    const viewall="http://localhost:3004/viewall"



request(viewall,(error,response,body)=>{
    var data=JSON.parse(body);
    console.log(data)
    res.render('books',{ navbarrr:[{link:'/books',title:'books'},{link:'/authors',title:'authors'},{link:'/addbook',title:'addbook'},{link:'/books',title:'viewbook'}
],title:'books',data})
   // res.render('books',{data:'data'})
})

})


app.get('/authors',(req,res)=>{
    res.render('author',{ navbarrr:[{link:'/books',title:'books'},{link:'/authors',title:'authors'},{link:'/addbook',title:'addbook'},{link:'/books',title:'viewbook'}],title:'authors',a:a})
})
app.get('/addbook',(req,res)=>{
    res.render('addb',{title:'addbooks'})
})

app.listen(process.env.PORT || 3004,()=>{
    console.log("server is running on http://localhost:3004")
    });