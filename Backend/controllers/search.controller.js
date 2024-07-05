import CollegeInfo from "../models/model.js"


export const getAlldata = async (req, res, next) => {
  let query = {};
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;

    if (req.query.searchTerm) {
      const searchTerm = req.query.searchTerm.trim() ;
      
      const titleRegex = { $regex: searchTerm, $options: 'i' };

      // Check if title and searchTerm both match more than 2 characters
      const titleMatchLength = await CollegeInfo.countDocuments({ title: titleRegex });

      if ( titleMatchLength > 2) {
        // Search only by title if both title and searchTerm match more than 5 characters
        query = { title: titleRegex };
      }
      else if ( req.query.searchTerm.trim().toLowerCase().includes("government") || req.query.searchTerm.trim().toLowerCase().includes("private")) {
        query = {
          type: { $regex: req.query.searchTerm, $options: 'i' }
        };
      }
      else {
        // Search by multiple fields if the above condition is not met
        query = {
          $or: [
            { title: titleRegex },
            { description: { $regex: searchTerm, $options: 'i' } },
            { 'courses.name': { $regex: searchTerm, $options: 'i' } },
            { 'courses.avail_sub_courses': { $regex: searchTerm, $options: 'i' } },
          ],
        };
      }
    }else if(req.query.id){
      query = {
        _id: req.query.id
      }
    }

    const result = await CollegeInfo.find(query)
      .skip(startIndex)
      .limit(limit);

    const total = await CollegeInfo.countDocuments(query);

    res.status(200).json({
      result,
      total,
    });
  } catch (error) {
    next(error);
  }
};