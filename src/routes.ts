// Since it is a small API, I chose to manage all the routes in a single route file instead of separating them by controller.
import { Router } from "express";

import { CustomerController } from './controllers/customer.controller';
import { DishController } from './controllers/dish.controller';
import { OrderController } from './controllers/order.controller';
import { ReportController } from "./controllers/report.controller";

const router = Router();

const customerController = new CustomerController();
const dishController = new DishController();
const orderController = new OrderController();
const reportController = new ReportController();

// Customers
router.post('/customers', customerController.create);
router.get('/customers', customerController.getAll);
router.get('/customers/:id', customerController.getById);
router.put('/customers/:id', customerController.update);
router.delete('/customers/:id', customerController.delete);

// Dishes
router.post('/dishes', dishController.create);
router.get('/dishes', dishController.getAll);
router.get('/dishes/:id', dishController.getById);
router.put('/dishes/:id', dishController.update);
router.delete('/dishes/:id', dishController.delete);

// Orders
router.post('/orders', orderController.create);
router.get('/orders', orderController.getAll);
router.get('/orders/:id', orderController.getById);
router.put('/orders/:id', orderController.update);
router.delete('/orders/:id', orderController.delete);

// Report
router.get('/report/dishes-by-orders', reportController.getDishesByOrderCount)
router.get('/report/top-customers-orders', reportController.getTopCustomersByOrderCount)
router.get('/report/top-customers-spending', reportController.getTopCustomersBySpending)

export default router;