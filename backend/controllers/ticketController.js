const Ticket = require("../models/ticketModel");
const crudFactory = require("./crudFactory");

exports.createTicket = crudFactory.create(Ticket, true);
exports.getAllTicket = crudFactory.getAll(Ticket, { belongsToUser: "ticket" });
exports.getTicket = crudFactory.getOne(Ticket, { belongsToUser: "ticket" });
exports.updateTicket = crudFactory.update(Ticket, { belongsToUser: "ticket" });
exports.deleteTicket = crudFactory.delete(Ticket, { belongsToUser: "ticket" });
