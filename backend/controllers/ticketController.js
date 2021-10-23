const Ticket = require("../models/ticketModel");
const crudFactory = require("./crudFactory");
const catchAsync = require("../util/catchAsync");

exports.createTicket = crudFactory.create(Ticket, true);
exports.getAllTicket = crudFactory.getAll(Ticket, { belongsToUser: "ticket" });

exports.getTicket = crudFactory.getOne(Ticket, { belongsToUser: "ticket" });
exports.updateTicket = crudFactory.update(Ticket, { belongsToUser: "ticket" });
exports.deleteTicket = crudFactory.delete(Ticket, { belongsToUser: "ticket" });

exports.getStats = catchAsync(async (req, res, next) => {
  const status = ["Low", "High", "Medium"];

  const statsAggregate = Ticket.aggregate([
    {
      $match: {
        $or: [
          {
            project: {
              $in: req.user.projects,
            },
          },
          { createdBy: req.user._id },
        ],
      },
    },
    {
      $group: {
        _id: ["$status", "$priority", "$type"],
        numDocs: { $sum: 1 },
      },
    },
    {
      $unwind: "$_id",
    },
    {
      $group: {
        _id: "$_id",
        numDocs: { $sum: "$numDocs" },
      },
    },
    {
      $addFields: {
        categ: {
          $switch: {
            branches: [
              {
                case: { $in: ["$_id", ["New", "In progress", "Resolved"]] },
                then: "status",
              },
              {
                case: { $in: ["$_id", ["Issue", "Bug", "Feature"]] },
                then: "type",
              },
              {
                case: { $in: ["$_id", ["Low", "Medium", "High"]] },
                then: "priority",
              },
            ],
            default: "something",
          },
        },
      },
    },
  ]);
  req.user.role !== "admin"
    ? statsAggregate.pipeline()
    : statsAggregate.pipeline().shift();

  const stats = await statsAggregate;
  res.status(200).json({
    status: "success",
    data: {
      numTickets: stats.reduce(
        (accu, el) => (status.includes(el._id) ? accu + el.numDocs : accu),
        0
      ),
      stats,
    },
  });
});
