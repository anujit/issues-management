var mongoose = require('mongoose');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var port = process.env.PORT || 8080;

var db = 'mongodb://testuser:test123@ds041404.mlab.com:41404/anujit-first';
mongoose.connect(db);

var Schema = mongoose.Schema;

var issueSchema = new Schema({
  name : String,
  description : String,
  reported_by : String,
  created_at:Date,
  updated_at:Date
});

issueSchema.pre('save',function(next){
  var currentDate = new Date();

  this.updated_at = currentDate;

  if(!this.created_at) this.created_at = currentDate;


  next();

});

var Issue = mongoose.model('Issue',issueSchema);

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(express.static('public'));



var router = express.Router();

app.use('/api',router);

// get all issues..
router.route('/issues').get(function(req,res){
  Issue.find({},function(err,issues){
    if(err) throw err;

    res.json(issues);
  });
});

//create new issue..
router.route('/issues').post(function(req,res){
  var data  = req.body.data
  console.log("body :", typeof data);

  var dataParams = {
  name : data.name,
  description : data.description,
  reported_by : data.reported_by
}

console.log("data params : " , dataParams);
  var issue = new Issue(dataParams);

  issue.save(function(err, response){
    console.log("save respose" , response);
    if(err) res.send(err);

    res.json({message:'Issue created successfully..'})
  })

});

//update and delete an issue
router.route('/issues/:issue_id')
.put(function(req,res){
  Issue.findById(req.params.issue_id,function(err,issue){
    if(err) res.send(err);

    issue.description = req.body.description || issue.description;
    issue.name = req.body.name || issue.name;

    issue.save(function(err){
      if(err) res.send(err);

      res.json({message:"Issue updated successfully"});
    });

  });
})
.delete(function(req,res){
  Issue.remove({
    _id : req.params.issue_id
  },function(err,issue){
    if(err) res.send(err);

    res.json({message:"Successfully deleted"});
  });
});

app.listen(port);

console.log('Server started on port '+port);
