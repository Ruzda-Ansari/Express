const express=require('express');
const uuid=require('uuid'); // bring the uuid package here
const router=express.Router();
const members = require('../../Members');


//Get all members
router.get('/',(req, res)=> res.json(members));

//Get single member
router.get('/:id',(req,res)=>{
    //res.json(members.filter(member => member.id === parseInt(req.params.id)));//when we pass the correct id in url
    //here we use filter method which filter the data grom members array
    //and (req.params.id):this will pass the id as string but in members array id is in int 
    //i.e. why we need to do conversion(parseInt()) 
    //member => member.id === parseInt(req.params.id) means member array with arrow func return 
    //member id equal to req.params.id.
    //(req.params.id) it's a part of Url 


    // when we pass incorrect id also in url and we want an error msg
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found){
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    }else{
        res.status(400).json({msg: ` No member with the id of ${req.params.id}`})
    }
});



// Create Member
router.post('/',(req,res)=>{
    //res.send(req.body)
    const newMember={
        id:uuid.v4(),
        name:req.body.name,
        email:req.body.email,
        status: 'active'
    }
    if(!newMember.name || !newMember.email){
        return res.status(400).json({msg:'please include a name and email'})
    }
    members.push(newMember); //adding newMember into the old members array
    res.json(members);
})

//Update Member
router.put('/:id',(req,res)=>{
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found){
        const updMember=req.body;
        members.forEach(member=>{
            if(member.id===parseInt(req.params.id)){
                member.name= updMember.name? updMember.name:member.name;
                member.email=updMember.email? updMember.email: member.email;
                res.json({msg:'Member Updated',member });
            }
        }); 
    }else{
        res.status(400).json({msg: ` No member with the id of ${req.params.id}`})
    }
});

//Delete Member
router.delete('/:id',(req,res)=>{
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found){
        res.json({msg:'Member Deleted', members: members.filter(member => member.id !== parseInt(req.params.id))});
    }else{
        res.status(400).json({msg: ` No member with the id of ${req.params.id}`})
    }
});


module.exports=router;