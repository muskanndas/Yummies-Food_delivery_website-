import jwt from "jsonwebtoken";

const isAuth = async(req, res, next)=>{
  try {
    //Cookie se token nikal rahe hain
    const token = req.cookies.token;
    if(!token){
      return res.status(400).json({message:"token not found"});
    }
    //verify token 
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    if(!decodeToken){
      return res.status(400).json({message:"token not verify"});
    }
    //baad me remove kr dena 
    console.log(decodeToken);
    //Token ke andar se userId nikal kar
    // request object me attach kar rahe hain
    req.userId = decodeToken.userId;
    next();
  } catch (error) {
    return res.status(500).json({message:"isAuth error"});
  }

};
export default isAuth;