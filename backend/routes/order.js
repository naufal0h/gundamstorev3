const orderRoute = require("express").Router();
const OrderController = require("../controllers/OrderController");
const authentication = require("../middlewares/auth");

orderRoute.get("/all", OrderController.getAllOrders); //just for admin
orderRoute.get("/:id", authentication, OrderController.getOrder);
orderRoute.get("/", authentication, OrderController.getOrdersByUserId);
orderRoute.post("/checkout", authentication, OrderController.create);
orderRoute.put("/payment/:id", authentication, OrderController.updatePayment);
orderRoute.put("/cancel/:id", authentication, OrderController.cancel);
orderRoute.get("/unpaid", authentication, OrderController.orderUnpaid);

module.exports = orderRoute;
