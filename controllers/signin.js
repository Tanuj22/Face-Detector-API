const forSignIn = (req,res,db,bcrypt)=>{
	const{email,password} =req.body;
	if(!email || !password){
		return res.status(400).json('incorrect signin credentials');
	}
	db('login').select('email','hash').where('email','=',email)
	.then(data=>{
		const isCorrect = bcrypt.compareSync(password, data[0].hash);
		if(isCorrect){
			return db('users').select('*').where('email','=',email)
			.then(user =>{
				res.json(user[0])
			})
			.catch(err=>res.status(400).json('unable to get user'))
		}else{
			res.status(400).json('wrong password')
		}
	})
	.catch(err=>res.status(400).json('wrong email'))
}

module.exports={
	forSignIn :forSignIn
};