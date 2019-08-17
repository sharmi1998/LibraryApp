const Express=require('express')
var app=new Express();
app.set('view engine','ejs');

app.use(Express.static(__dirname+"/public"));
books=[
    {
        'title':'In search of Lost Time',
        'author':'Marcel Proust',
        'publisher':'HarperCollins',
        'date_of_publication':'1971',
        'distributorName':'HarperCollins',
        'price':340,
        'Description':'Novel'


    },
    {
        title:"Don Quixote",
        author:"Miguel de Cervantes",
        publisher:"H&C Books",
        date_of_publication:"1940",
        distributorName:"H&C Books",
        price:840,
        Description:"Real World story"

    },
    {
        title:"Ulysses",
        author:"James Joyces",
        publisher:"H&C Books",
        date_of_publication:"1930",
        distributorName:"H&C Books",
        price:450,
        Description:"Story"
    },
    {
            title:"The Great Gatsby",
            author:"F.schoot",
            publisher:"Pearson",
            date_of_publication:"1959",
            distributorName:"H&C Books",
            price:740,
            Description:'Novel'
    
    },
    {
            title:"MobyDick",
            author:"Herman Melville",
            publisher:"Pearson",
            date_of_publication:"1851",
            distributorName:"H&C Books",
            price:200,
            Description:'AutoBiography'
    
        },
        {
            title:"Hamlet",
            author:"William Shakesphere",
            publisher:"pearson Books",
            date_of_publication:"1920",
            distributorName:"H&C Books",
            price:1090,
            Description:"Poems"
        },];
        a=[
            {
                AuthorName:'marcel proust',
                image: '/image/a.jpg',
                dob:'12-12-1870',
                place:'america'
            },
            {
                AuthorName:'Don Quixote',
                image:"/image/f.jpg",
                dob:'12-09-1870',
                place:'america'
            },
            {
                AuthorName:'James Joyces',
                image:"/image/b.jpg",
                dob:'10-09-1870',
                place:'europe'
            },{
                AuthorName:'F.schoot',
                image:"/image/c.jpg",
                dob:'10-09-1860',
                place:'singapore'
            },{
                AuthorName:'Herman Melville',
                image:"/image/d.jpg",
                dob:'1-09-1879',
                place:'new york'
            },{
                AuthorName:'William Shakesphere',
                image:"/image/e.jpg",
                dob:'11-03-1871',
                place:'london'
            },
        ];


app.get('/readmore/:id',(req,res)=>{

    const x=req.params.id;
    res.render('single',{'books': books[x],

    navbarrr:[{link:'/books',title:'books'},{link:'/authors',title:'authors'}],

    title:'Library'}   )

})


app.get('/authors1/:id',(req,res)=>{

    const x=req.params.id;
    res.render('authors1',{'a': a[x],

    navbarrr:[{link:'/books',title:'books'},{link:'/authors',title:'authors'}],

    title:'Library'}   )

})




app.get('/',(req,res)=>{
    res.render(
        'index',
        {
            navbarrr:[{link:'/books',title:'books'},{link:'/authors',title:'authors'}],

            title:'Library'
        }
    )
})
app.get('/books',(req,res)=>{
    res.render('books',{ navbarrr:[{link:'/books',title:'books'},{link:'/authors',title:'authors'}],title:'books',books:books})
})
app.get('/authors',(req,res)=>{
    res.render('author',{ navbarrr:[{link:'/books',title:'books'},{link:'/authors',title:'authors'}],title:'authors',a:a})
})
app.listen(process.env.PORT || 3004,()=>{
    console.log("server is running on http://localhost:3004")
    });