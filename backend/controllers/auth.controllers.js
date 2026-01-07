import User from '../models/user.model.js';
import generateToken from '../utils/token.js';
import bcrypt from 'bcryptjs';
//handler for user signup

 export const signUp = async(req, res) => {

  try {
    const {fullName, email, password, mobile, role} = req.body;
    //check if user already exists
     let user = await User.findOne({email});
    if(user){
      return res.status(400).json({message: "User already exists"});
    }
    //check password length
    if(password.length < 6){
      return res.status(400).json({message: "Password must be at least 6 characters"});
    }
    //check mobile number length
    if(mobile.length < 10){
      return res.status(400).json({message: "Mobile number must be at least 10 characters"});
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    //create new user
    user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      mobile,
      role
    });

    // generate token 
    const token  = await generateToken(user._id);

    //parse token in cookie
    res.cookie("token", token, { 
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000 });

      return res.status(201).json(user);
  }
  catch (error){
       return res.status(500).json({message: "Error in signup", error: error.message});
  }
};

export const signIn = async(req, res) => {

  try {
    const { email, password} = req.body;
    //check if user does not  exists
     const user = await User.findOne({email});
    if(!user){
      return res.status(400).json({message: "User does not exist"});
    }
    //compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      return res.status(400).json({message: "Invalid password"});
    }
    
    // generate token 
    const token  = await generateToken(user._id);

    //parse token in cookie
    res.cookie("token", token, { 
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000 });

      return res.status(201).json(user);
  }
  catch (error){
       return res.status(500).json({message: "Error in signIn", error: error.message});
  }
};

export const signOut = async(req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({message: "Signed out successfully"});
  }
  catch (error) {
    return res.status(500).json({message: "Error in sign out", error: error.message});
  }
}