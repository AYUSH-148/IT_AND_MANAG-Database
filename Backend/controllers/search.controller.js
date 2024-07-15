import CollegeInfo from "../models/model.js"


export const getAlldata = async (req, res, next) => {
  let query = {};
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;

    if (req.query.searchTerm) {
      const searchTerm = req.query.searchTerm;
 
      // const titleMatchDocs = await CollegeInfo.countDocuments({ title: searchTerm });
      // // console.log("searchTerm",searchTerm);
      // if (titleMatchDocs === 1) {
      //   console.log("yo yo",searchTerm)
      //   query = { title: searchTerm };
      // } 
      if (req.query.searchTerm.trim().toLowerCase().includes("government") || req.query.searchTerm.trim().toLowerCase().includes("private")) {
        query = {
          type: { $regex: req.query.searchTerm, $options: 'i' }
        };
      } else {  
        query = {
          $or: [
            { title: searchTerm },
            { 'courses.name': { $regex: searchTerm, $options: 'i' } },
            { 'courses.avail_sub_courses': { $regex: searchTerm, $options: 'i' } }
          ]
        };
      }
    } else if (req.query.id) {
      console.log(req.query.id)
      query = {
        _id: req.query.id
      }
    } 
    console.log(query)
    const result = await CollegeInfo.find(query)
      .skip(startIndex)
      .limit(limit);

    res.status(200).json({
      result,
      total: result.length,
    });
  } catch (error) {
    next(error);
  }
};


export const getFilteredData = async (req, res, next) => {
  const { type, location, s_course } = req.query;
  // console.log(type,location,s_course);
  try {
    const result = await CollegeInfo.find({
      ...(type && { type }),
      ...(location && { location: { $regex: location, $options: 'i' } }),
      ...(s_course  && {
          'courses.avail_sub_courses': { $regex: s_course , $options: 'i' }
      }),
    }) 
    res.status(200).json({
      result,
      total: result.length,
    });
  } catch (error) {
    next(error);
  }
}

export const getNameSuggestions = async(req,res,next)=>{
  const {searchTerm} = req.query;
  try {
    const result = await CollegeInfo.find({
      title : { $regex: searchTerm, $options: 'i' }
    },'title')
    res.status(200).json({
      result,
      total: result.length,
    });
  } catch (error) {
    next(error);
  }
}