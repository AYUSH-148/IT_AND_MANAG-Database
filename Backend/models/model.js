import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true
    },
   
    avg_package:{
      type: String,   
    },
    url: {
      type: String,
      required:true
    },
    img: {
      type: String,
      default: "https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    rate: {
      type: String,
      required: false
    },
    location: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: false
    },
    fees: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required:true
    },
    contact:[String],
    courses: [
      {
        name: String,
        fees_yearly:[String],
        exam_accepted: String,
        num_courses: Number,
        avail_sub_courses: [String]
      }
    ],
  },
  {
    timestamps: true,
  }
);

const CollegeInfo = mongoose.model("CollegeInfo", schema);
export default CollegeInfo;