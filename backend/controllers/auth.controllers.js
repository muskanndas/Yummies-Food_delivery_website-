import User from '../models/user.model.js';
import { sendotpmail } from '../utils/mail.js';
import generateToken from '../utils/token.js';
import bcrypt from 'bcryptjs';

//handler for user signup


//{/*signup controller*/}
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

//{/*signin controller/*}
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

//{/*signout controller*/}
export const signOut = async(req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({message: "Signed out successfully"});
  }
  catch (error) {
    return res.status(500).json({message: "Error in sign out", error: error.message});
  }
}

//{/ send otp on email for password controller/*}

//step-1 
export const sendOtp = async(req, res) => {
 try {
  const {email} = req.body;
  const user = await User.findOne({email});
  if(!user){
    return res.status(400).json({message: "User not found"});
  }
   const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.resetotp = otp;
    user.otpExpire = Date.now()+5*60*1000;
    user.isotpverified = false;
    await user.save();
    await sendotpmail(user.email, otp);
    return res.status(200).json({message: "OTP sent successfully"});}
   catch (error) {
          return res.status(500).json({message: "Error in sending OTP", error: error.message});
  }};

  //{/*verify otp controller */}
  //step 2
 export const verifyotp= async(req, res) => {
    try {
      const { email, otp } = req.body;
      const user = await User.findOne({ email });
     if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.resetotp) {
      return res.status(400).json({ message: "OTP not generated" });
    }

    if (Date.now() > user.otpExpire) {
      return res.status(400).json({ message: "OTP expired" });
    }
     if (user.resetotp !== String(otp)) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
      if (Date.now() > user.otpExpire) {
        return res.status(400).json({ message: "OTP expired" });
      }
      user.isotpverified = true;
      user.resetotp = undefined;
      user.otpExpire = undefined;
      await user.save();
      return res.status(200).json({ message: "OTP verified successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Error in verifying otp", error: error.message})
    }
  };

  //{/*reset password controller*/}
  //step-3
  export const resetPassword = async(req, res) => {
    try {
      const { email, newPassword } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
      if (!user.isotpverified) {
        return res.status(400).json({ message: "OTP not verified" });
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      user.isotpverified = false;
      await user.save();
      return res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Error in resetting password", error: error.message });
    }
  };


  //controller for google authentication 
  export const googleAuth = async (req, res) => {
    try {
      const { fullName,email,mobile,role } = req.body;
      let user  = await User.findOne({email});
      //case-1 user does not exist->Sign Up
      if(!user){
         user = await User.create({
          fullName,email,mobile,role
         });
        }

      //case-2 user exists->sign in 
          // generate token 
    const token  = await generateToken(user._id);

    //parse token in cookie
    res.cookie("token", token, { 
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000 });

      return res.status(201).json(user);
      
    } catch (error) {
      return res.status(500).json({ message: " Error in google authentication", error})
    }
  };