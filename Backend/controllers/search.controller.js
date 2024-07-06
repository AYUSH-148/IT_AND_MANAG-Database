import CollegeInfo from "../models/model.js"


export const getAlldata = async (req, res, next) => {
  let query = {};
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;

    if (req.query.searchTerm) {
      const searchTerm = req.query.searchTerm.trim();

      const titleRegex = { $regex: searchTerm, $options: 'i' };

      // Checking if title and searchTerm both match more than 2 characters
      const titleMatchLength = await CollegeInfo.countDocuments({ title: titleRegex });

      if (titleMatchLength > 2) {
        query = { title: titleRegex };
      }
      else if (req.query.searchTerm.trim().toLowerCase().includes("government") || req.query.searchTerm.trim().toLowerCase().includes("private")) {
        query = {
          type: { $regex: req.query.searchTerm, $options: 'i' }
        };
      }
      else {  
        query = {
          $or: [
            { title: titleRegex },
             { 'courses.name': { $regex: searchTerm, $options: 'i' } },
            { 'courses.avail_sub_courses': { $regex: searchTerm, $options: 'i' } },
          ],
        };
      }
    } else if (req.query.id) {
      query = {
        _id: req.query.id
      }
    }

    const result = await CollegeInfo.find(query)
      .skip(startIndex)
      .limit(limit);

    

    res.status(200).json({
      result,
      total:result.length,
    });
  } catch (error) {
    next(error);
  }
};

export const getFilteredData = async (req, res, next) => {
  const { type, location, s_course } = req.query;
  const formatString = (str) => str.replace(/-/g, ' ');

  const formattedLocation = location ? formatString(location) : '';
  const formattedCourse = s_course ? formatString(s_course) : '';

  try {
    const result = await CollegeInfo.find({
      ...(type && { type }),
      ...(formattedLocation && { location: { $regex: formattedLocation, $options: 'i' } }),
      ...(formattedCourse  && {
        $or: [
          { 'courses.name': { $regex: formattedCourse , $options: 'i' } },
          { 'courses.avail_sub_courses': { $regex: formattedCourse , $options: 'i' } },
        ],
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