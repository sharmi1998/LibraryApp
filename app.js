const Express=require('express')
var app=new Express();
app.set('view engine','ejs');

app.use(Express.static(__dirname+"/public"));

app.get('/',(req,res)=>{
    res.render(
        'index',
        {
            navbarrr:[{link:'/books',title:'books'},{link:'/authors',title:'authors'}],

            title:'Library'
        }
    )
})
app.listen(process.env.PORT || 3004,()=>{
    console.log("server is running on http://localhost:3004")
    });