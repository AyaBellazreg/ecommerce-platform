const router = require('express').Router();
const { verifyTokenAndAuthorization, 
    verifyTokenAndAdmin } = require("./verifyToken");
const Product = require("../models/Product");

router.post('/',verifyTokenAndAdmin, async (req, res) => {
    const newProduct = new Product(req.body);

    try{
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    }
    catch(err) {
        res.status(500).json(err);
    }
});

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {

    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedProduct);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.status(200).json("Product has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //GET PRODUCT
  router.get("/find/:id", async (req, res)=>{
    try{
      const product = await Product.findById(req.params.id);
      res.status(200).json(product);
    }
    catch(err){
      res.status(404).json(err);
    }
  });

    //GET ALL PRODUCT
    router.get("/", async (req, res)=>{
        let products;
        const productQuery = req.query;
        try{
            if(productQuery.new){
             products = await Product.find().sort({createdAt:-1}).limit(1);
            }
            else if(productQuery.category){
              products = await Product.find({
                categories: {
                  $in: [productQuery.category]
                }
              })
            }
            else{
              products = await Product.find();
            }
          res.status(200).json(products);
        }
        catch(err){
          res.status(404).json(err);
        }
      });

      
router.get("/income", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;

