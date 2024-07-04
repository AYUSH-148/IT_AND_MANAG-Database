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
      default: "--"
    },
    url: {
      type: String,
      default: "https://www.collegedekho.com/"
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
      required: true
    },
    fees: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    courses: [
      {
        name: String,
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