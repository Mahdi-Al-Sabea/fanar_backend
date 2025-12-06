
import mongoose from "mongoose";
import bcrypt from "bcrypt";


export const UserRole = {
  SUPER_ADMIN: "superAdmin",
  TEAM_LEAD: "teamLead",
  DEVELOPER: "developer",
};

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    role: { type: String, enum: Object.values(UserRole), required: true },
    password: { type: String, required: true },
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  },
  { timestamps: true }
);


userSchema.pre("save", async function () { 
    if (!this.isModified("password")) {
        return; // Return early if password isn't modified
    }

    // Mongoose waits for this promise (await bcrypt.hash) to resolve.
    // If it rejects (throws an error), Mongoose automatically handles it.
    this.password = await bcrypt.hash(this.password, 10); 
});

export const User = mongoose.model("User", userSchema);
