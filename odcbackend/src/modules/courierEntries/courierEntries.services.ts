import { CourierEntry } from "./courierEnrties.model";

type CourierFilter = {
  year?: string;
  month?: number;
  page?: number;
  limit?: number;
};

// CREATE
export const createCourierEntryService = async (
  data: any
) => {
  return await CourierEntry.create(data);
};

// GET ALL WITH PAGINATION
export const getCourierEntriesService = async (
  filterData: CourierFilter
) => {
  const {
    year,
    month,
    page = 1,
    limit = 10,
  } = filterData;

  const filter: any = { isDeleted: false };

  const yearValue = year ? Number(year) : undefined;

  // YEAR FILTER
  if (yearValue) {
    const start = new Date(yearValue, 0, 1);
    const end = new Date(
      yearValue,
      11,
      31,
      23,
      59,
      59
    );

    filter.entryDate = {
      $gte: start,
      $lte: end,
    };
  }

  // MONTH FILTER
  if (yearValue && month) {
    const start = new Date(
      yearValue,
      month - 1,
      1
    );

    const end = new Date(
      yearValue,
      month,
      0,
      23,
      59,
      59
    );

    filter.entryDate = {
      $gte: start,
      $lte: end,
    };
  }

  const skip = (page - 1) * limit;

  const total = await CourierEntry.countDocuments(
    filter
  );

  const data = await CourierEntry.find(filter)
    .populate("courierId")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  return {
    total,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
    pageSize: limit,
    data,
  };
};

// GET BY ID
export const getCourierEntryByIdService = async (
  id: string
) => {
  return await CourierEntry.findById(id).populate(
    "courierId"
  );
};

// UPDATE
export const updateCourierEntryService = async (
  id: string,
  data: any
) => {
  return await CourierEntry.findByIdAndUpdate(
    id,
    data,
    { new: true }
  );
};

// DELETE
export const deleteCourierEntryService = async (
  id: string
) => {
  return await CourierEntry.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
};