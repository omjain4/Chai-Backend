import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";



const registerUser = asyncHandler(async (req, res) => {
    // Extract fields from request body
    const { fullname, email, username, password } = req.body;
    
    // Validate fields
    if ([fullname, email, username, password].some((field) => field?.trim() === "")) {
      throw new ApiError(400, "All fields are required");
    }
  
    // Check if user already exists
    const existedUser = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (existedUser) {
      throw new ApiError(409, "User with email or username already exists");
    }
  
    // Get file paths from req.files
    const avatarLocalPath = req.files?.avatar[0]?.path;
     const coverImageLocalPath = req.files?.coverImage[0]?.path;
  
   
    // Check if avatar is uploaded
    if (!avatarLocalPath) {
      throw new ApiError(400, "Avatar file is required");
    }
  
    // Upload files to Cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);
  
   
    // Check if avatar upload was successful
    if (!avatar) {
      throw new ApiError(400, "Avatar file is required");
    }
  
    // Create user in database
    const user = await User.create({
      fullName:fullname,
      avatar: avatar.url,
      coverImage: coverImage?.url || "",
      email,
      password,
      username: username.toLowerCase(),
    });
  
    // Fetch the created user (excluding sensitive fields)
    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );
  
    // Check if user was created successfully
    if (!createdUser) {
      throw new ApiError(500, "Something went wrong while registering the user");
    }
  
    // Return success response
    return res
      .status(201)
      .json(new ApiResponse(200, createdUser, "User registered successfully"));
  });
export{
    registerUser
}