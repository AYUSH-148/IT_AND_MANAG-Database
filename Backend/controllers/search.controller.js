import CollegeInfo from "../models/model.js"


export const getAlldata = async (req, res, next) => {
  
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    // const sortDirection = req.query.order === 'asc' ? 1 : -1;

    const query = {
      ...(req.query.type && { type: req.query.type }),
      ...(req.query.id && { _id: req.query.id }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: 'i' } },
          { description: { $regex: req.query.searchTerm, $options: 'i' } },
          {
            'courses.name': { $regex: req.query.searchTerm, $options: 'i' },
          },
          {
            'courses.avail_sub_courses': { $regex: req.query.searchTerm, $options: 'i' }
          }
        ],
      }),
    };

    const result = await CollegeInfo.find(query)
      .skip(startIndex)
      .limit(limit);
    // .sort({ updatedAt: sortDirection });

    const total = result.length;

    res.status(200).json({
      result,
      total,
    });
  } catch (error) {
    next(error);
  }
};