const bodyParser = require('body-parser');
const router = require("express").Router();
// const app = express();
const User = require("../model/model");

router.use(bodyParser.json())
router.use( bodyParser.urlencoded({
      extended: false,
    }),
  )
//schema for country , state, city

const country = require("../model/country");
const state = require("../model/state");
const city = require("../model/city");
//schema for vender invoice

const invoice = require("../model/venderinvoice");



router.post("/registration", (req, res) => {
  // console.log("req", req);
  // return false;
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    chooseadate: req.body.chooseadate,
    phonenumber: req.body.phonenumber,
    password: req.body.password,
    country: req.body.country,
    state: req.body.state,
    city: req.body.city,
  });
  user
    .save()
    .then(() => {
      res.json(user);
      console.log("registration successfully!!");
    })
    .catch((err) => {
      res.json(err);
      console.log(err);
    });
});

router.post("/login", async (req, res) => {
  if (req.body.password && req.body.email) {
    let logindata = await User.findOne(req.body).select("-password");
    if (logindata) {
      
      res.send(logindata);
    } else {
      res.send({ result: "NO USER FOUND" });
    }
  }
});






router.get("/", async (req, res) => {
  try {
    const userdata = await User.find();
    res.send(userdata);
  } catch (err) {
    res.send(err);
  }
});

router.get("/getregistration/:id", async (req, res, next) => {
  try {
    const getdatabyId = await User.findById(req.params.id);
    console.log(getdatabyId);
    if (!getdatabyId) {
      return res.status(404).send();
    } else {
      res.send(getdatabyId);
    }
  } catch (err) {
    res.send(err);
  }
});


router.put("/updatedata/:id", async (req, res, next) => {
  try {
    const userid = req.params.id;

    const updatedatabyId = await User.findByIdAndUpdate(
      { _id: userid },
      { $set: req.body }
    );

    console.log(updatedatabyId);
    if (!updatedatabyId) {
      return res.status(404).send();
    } else {
      res.send(updatedatabyId);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/deletedata/:id",async(req,res)=>{
  try{
    const deleteid = req.params.id;
    const deletedatabyid = await User.findByIdAndRemove({_id:deleteid},{$set:req.body})
    if(!deletedatabyid){
        return res.status(404).send()
    }else{
      res.send(deletedatabyid);
      console.log(deletedatabyid,"delete data successfully!!")
    }

  }catch(err){
     console.log(err);
     res.status(500).send("Internal Server Error");
  }
})


router.get('/home', (req, res) => {
  if (req.session && req.session.user) {
    res.send('You are logged in');
  } else {
    res.status(401).send('Unauthorized');
  }
});






//api for country

router.post("/country", async (req, res) => {
  try {
    const countrydata = new country(req.body);
    const result = await countrydata.save();
    res.status(201).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/country", async (req, res) => {
  try {
    const countrydata = await country.find();
    // console.log("hello1---"+ countrydata);
    res.send(countrydata);
  } catch (err) {
    res.send(err);
  }
});

//api for state

router.post("/state", async (req, res) => {
  try {
    const statedata = new state(req.body);
    const result = await statedata.save();
    res.status(201).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/state", async (req, res) => {
  const countryId = req.query.country;
  const statedata = await state.find({ country: countryId });
  console.log(statedata);
  res.send(statedata);
});

//api for city
router.post("/city", async (req, res) => {
  try {
    const citydata = new city(req.body);
    const result = await citydata.save();
    res.status(201).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
});
router.get("/city", async (req, res) => {
  try {
    const stateId = req.query.state;
    const citydata = await city.find({ state: stateId });
    console.log(citydata);
    res.send(citydata);
  } catch (err) {
    res.send(err);
  }
});



//routing for vender invoice

router.post('/createvender',(req,res)=>{
  //  console.log("req", req);
  // return false;
 const invoicedata = new invoice({
  InvoiceNo: req.body.InvoiceNo,
  Date: req.body.Date,
  Mobilenumber:req.body.Mobilenumber,
  Status:req.body.Status,
  country: req.body.country,
  state: req.body.state,
  city: req.body.city,
});

 invoicedata.save()
  .then(() => {
    res.json(invoicedata);
    console.log("venderinvoice added successfully!!");
  })
  .catch((err) => {
    res.json(err);
    console.log(err);
  });
});

router.get('/getallvender',async(res,req)=>{
 
  try {
    const venderdata = await Invoice.find();
    console.log(venderdata)
    res.send(venderdata);
  } catch (err) {
    console.log(err)
    res.send(err);
  }

});


module.exports = router;
