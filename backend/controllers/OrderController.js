const {
  Product,
  Order,
  LineItem,
  ShoppingCart,
  User,
  ProductImage,
} = require("../models");

class OrderController {
  //hanya untuk admin
  static async getAllOrders(req, res, next) {
    try {
      let orders = await Order.findAll({
        include: Product,
      });
      res.status(200).json(orders);
    } catch (err) {
      next(err);
    }
  }
  static async create(req, res, next) {
    try {
      const id = +req.userData.id;
      const { qty, ProductId } = req.body;
      //buat table order
      let result = await Order.create({
        UserId: id,
      });
      //membuat table line item dimana OrderId sama dengan id dari table order yang telah dibuat diatas
      let resultLine = await LineItem.create({
        OrderId: result.id,
        ProductId,
        qty,
        status: "order",
      });
      //cari data line item dimana OrderId sama dengan id di table order yang dibuat diatas
      let resultGet = await LineItem.findOne({
        include: [Product, Order],
        where: { OrderId: resultLine.OrderId },
      });

      //mengambil data price di table product yang telah dicari diatas
      let tempPrice = resultGet.Product.price;
      //mengambil data qty di table product yang telah dicari diatas
      let tempQty = resultGet.qty;
      // menghitung subtotal yaitu price dikali qty
      let tempsubtotal = tempPrice * tempQty;

      // menghitung discount berdasarkan jumlah qty
      let tempDiscount;
      if (resultGet.qty > 2) {
        tempDiscount = (tempsubtotal * 5) / 100;
      } else {
        tempDiscount = 0;
      }

      //mengambil data tax di table product yang telah dicari diatas
      let tempTax = resultGet.Order.tax;
      //menghitung tax yaitu subtotal dikali 10 %
      let tempTotalTax = (tempsubtotal * tempTax) / 100;
      // menghitung totalDue yaitu subtotal - discount + tax
      let totalDue = tempsubtotal - tempDiscount + tempTotalTax;

      //update table order masukan data-data yang telah dihitung diatas
      let resultUpdate = await Order.update(
        {
          subtotal: tempsubtotal,
          discount: tempDiscount,
          totalDue: totalDue,
          totalQty: tempQty,
          status: "unpaid",
        },
        { where: { id: resultGet.OrderId } }
      );

      let resultt = await Order.findOne({
        where: { id: resultLine.OrderId },
      });
      res.status(201).json(resultt);
    } catch (err) {
      next(err);
    }
  }
  //update setelah pembayaran
  static async updatePayment(req, res, next) {
    // const UserId = +req.userData.id
    const OrderId = +req.params.id;
    // const { paymentTrasaction } = req.body
    try {
      // let order = await Order.findOne({
      //     where: { UserId: id, status: 'unpaid' }
      // })

      let result = await Order.update(
        {
          paymentTrasaction: "debit",
          status: "ready to collect",
        },
        {
          where: { id: OrderId },
        }
      );

      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }
  //update jika pembatalan order
  static async cancel(req, res, next) {
    try {
      // const UserId = +req.userData.id
      const OrderId = +req.params.id;

      // let order = await Order.findOne({
      //     where: { UserId: UserId, status: 'unpaid' }
      // })

      let result = await Order.update(
        {
          status: "cancelled",
        },
        {
          where: { id: OrderId },
        }
      );

      const lineItems = await LineItem.findAll({
        include: Product,
        where: { OrderId: OrderId },
      });

      for (const lineItem of lineItems) {
        const product = await Product.findByPk(lineItem.ProductId);

        await Product.update(
          {
            stock: product.stock + lineItem.qty,
            totalSold: product.totalSold - lineItem.qty,
          },
          {
            where: { id: lineItem.ProductId },
          }
        );
      }

      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }

  //mengambil order berdasarkan order id
  static async getOrder(req, res, next) {
    try {
      // const UserId = +req.userData.id;
      const OrderId = +req.params.id;
      let result = await Order.findOne({
        include: [
          {
            model: Product,
            include: [ProductImage],
          },
          User,
        ],
        where: {
          // UserId: UserId,
          id: OrderId,
        },
      });
      result
        ? res.status(201).json(result)
        : res.status(404).json({ message: "Not Found" });
    } catch (err) {
      next(err);
    }
  }

  //mengambil data semua order berdasarkan user id di access token
  static async getOrdersByUserId(req, res, next) {
    try {
      const id = +req.userData.id;
      let result = await Order.findAll({
        include: [
          {
            model: Product,
            include: [ProductImage],
          },
          User,
        ],
        where: { UserId: id },
      });
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }

  //mengambil data order yang belum dibayar dan user id di access token
  static async orderUnpaid(req, res, next) {
    try {
      const id = +req.userData.id;
      let result = await Order.findOne(
        {},
        {
          where: { UserId: id, status: "unpaid" },
        }
      );
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = OrderController;
