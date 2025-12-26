import { User, UserRole } from "../Models/User.model.js";

export const createUser = async (req, res) => {
    try {
      const { name, email, role, password } = req.body;

      if (![UserRole.TEAM_LEAD, UserRole.DEVELOPER].includes(role)) {
        return res.status(400).json({ error: "Invalid role for creation" });
      }
  

      const exists = await User.findOne({ email });
      if (exists) return res.status(400).json({ error: "Email already exists" });
  
      const newUser = new User({ name, email, role, password });
      await newUser.save();
  
      res.status(201).json(newUser);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

  export const getUsers = async (req, res) => {
    try {
      const users = await User.find().select("-password").where("role").ne(UserRole.SUPER_ADMIN);
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  };

  export const updateUser = async(req , res) =>{
    console.log("Update user request params:");
    try{
      console.log("Update user request body:", req.body);
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new:true}
    ).select("-password");


    if(!updated) {
      return res.status(404).json({message:"User not found"});
    }

    return res.json(updated)
    }catch(err){
     return res.status(500).json({error:err.message});
    }
  }


  export const deleteUser = async (req,res) =>{
    try{
      const deleted = await User.findByIdAndDelete(req.params.id);

      if(!deleted){
        return res.status(404).json({message:"user not found"});
      }

      return res.json({message:"User deleted succesfully"});
    }catch(err){
return res.status(500).json({error:err.message})
    }
  }
