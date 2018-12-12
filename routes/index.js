var express = require('express');
var router = express.Router();
var qr = require('qr-image');
var moment= require('moment');
var formidable = require('formidable');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var http = require('http');
var nodemailer = require('nodemailer');
var current_date=moment().year();
var d3=require('d3');
var monk=require('monk');
    var db=monk('localhost:27017/visitorpass');
    var logininfo=db.get('logininfo');
    var sampling=db.get('sampling');
    var visitorpass=db.get('visitorpass');
    var bodyParser = require('body-parser');
    var multer = require('multer');
    var xlstojson = require("xls-to-json-lc");
    var xlsxtojson = require("xlsx-to-json-lc");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/dashboard', function(req, res, next) {
  var date = moment().format('DD-MM-YYYY');
  //console.log(date);
  visitorpass.find({},function(err,total){
  visitorpass.find({"vtdate":date},function(err,today){
  visitorpass.find({"place":"Kakinada"},function(err,docs){
  visitorpass.find({"place":"Rajamundry"},function(err,docs1){
  visitorpass.find({"place":"Peddapuram"},function(err,docs2){
  visitorpass.find({"place":"Samalkota"},function(err,docs3){
  visitorpass.find({"place":"Anaparthi"},function(err,docs4){
  visitorpass.find({"place":"Rangampeta"},function(err,docs5){
  visitorpass.find({"place":"Tuni"},function(err,docs6){
  visitorpass.find({"place":"Eluru"},function(err,docs7){
  visitorpass.find({"place":"Amalapuram"},function(err,docs8){
  visitorpass.find({"place":"Vijayawada"},function(err,docs9){
  visitorpass.find({"place":"Vizag"},function(err,docs10){
  visitorpass.find({"place":"Hyderabad"},function(err,docs11){
  res.locals.total=total.length;
  res.locals.today=today.length;
  res.locals.kakinada=docs.length;
  res.locals.Rajahmundry=docs1.length;
  res.locals.Peddapuram=docs2.length;
  res.locals.Samalkota=docs3.length;
  res.locals.Anaparthi=docs4.length;
  res.locals.Rangampeta=docs5.length;
  res.locals.Tuni=docs6.length;
  res.locals.Eluru=docs7.length;
  res.locals.Amalapuram=docs8.length;
  res.locals.Vijayawada=docs9.length;
  res.locals.Vizag=docs10.length;
  res.locals.Hyderabad=docs11.length;
  res.render('dashboard');
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
  });
});
router.get('/login',function(req,res){

  if(req.session && req.session.user){
    res.locals.user = req.session.user;
    res.redirect('home');
  }
  else{
    req.session.reset();
    res.render('login');
  }
});
router.get('/home',function(req,res){
if(req.session && req.session.user){
    res.locals.user = req.session.user;
      visitorpass.find({}, function(err,vdata){
      res.locals.visitordata = vdata;
      res.render('home');
    });
  }
else{
req.session.reset();
res.redirect('/login');

}

});

//login
router.post('/login',function(req,res){
  var uname=req.body.username;
  var pass=req.body.password;
    if(uname=="SECURITY" && pass=="ADITYASECURITY"){
      
        req.session.user = uname;
        res.redirect('/home');
      
    } 
    else{
      res.render('login', { error: 'Invalid username or password.' });
        
      }
  });


//LOGOUT
router.get('/logout', function(req, res){
  req.session.reset();
  res.redirect('/login');
});

//submit
router.post('/vpsubmit',function(req,res){
  var data={
    id1:req.body.id1,
    vname:req.body.vname,
    number:req.body.number,
    place:req.body.place,
    purpose:req.body.purpose,
    college:req.body.college,
    vehicle:req.body.vehicle,
    search:req.body.search,
    phone:req.body.phone,
    email:req.body.email,
    material:req.body.material,
    vfdate:req.body.vfdate,
    vtdate:req.body.vtdate,
    vtimein:req.body.vtimein,      
  };
  //insert data
    
 visitorpass.insert(data,function(err,docs){
     
     if(err)

         console.log(err);
    
 });
  res.redirect('/home');
});
//pdf
router.post('/pass', function(req, res) {  //code to fetch the data from database 
    visitorpass.find({},function(err,docs){
      //console.log(docs);
      res.send(docs);
    });
});
//email
router.post('/send', function(req,res){
//console.log(req.body.Email); 
if(req.body.vname == "" ) {
res.send("Error: Enter Name of the Visitor");
return false;
}
if(req.body.place == "" ) {
res.send("Error: Enter Place");
return false;
}
 else if(req.body.phone == ""){
  res.send("Error: Enter Phone Number");
  return false;
}
else if(req.body.vehicle == ""){
  res.send("Error: Enter VehicleNo");
  return false;
}
else if(req.body.material == ""){
  res.send("Error: Enter Material");
  return false;
}
else if(req.body.search == ""){
  res.send("Error: Enter Person to meet");
  return false;
}

else if(req.body.purpose == ""){
  res.send("Error: Enter Purpose to Visit");
  return false;
}
else if(req.body.college == ""){
  res.send("Error: Enter College to Visit");
  return false;
}
else if(req.body.vfdate == ""){
  res.send("Error: Enter Date");
  return false;
}
else if(req.body.vtdate == ""){
  res.send("Error: Enter To");
  return false;
}
else if(req.body.id1 == ""){
  res.send("Error: Enter ID");
  return false;
}
var transporter = nodemailer.createTransport({
    service: 'gmail',
     host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'myhub@aditya.ac.in',
        pass: 'Thub@123'
    }
});

var data= 'ID: '+req.body.id1+'\n'+'Name: '+req.body.vname+'\n'
               +'Purpose:'+req.body.purpose+'\n'+'Date: '+req.body.vfdate
               +'\n'+'Time: '+req.body.vtimein+'\n'+'Persontomeet: '+req.body.search+'\n'+'Mobile: '+req.body.phone+'\n'+'Material: '+req.body.material+'\n'+'VehicleNo: '+req.body.vehicle+'\n'
               +'College Visited:'+req.body.college;
var name = req.body.vname;              
var msg= "<!DOCTYPE html><html><head><metaname='viewport'content='width=device-width'><meta httpequiv='Content-Type' content='text/html; charset=UTF-8'<title>Visitorpass Email</title><style type='text/css'>@media only screen and (max-width: 620px) {table[class=body] h1 {font-size: 28px !important;table[class=body] p,table[class=body] ul,table[class=body] ol,table[class=body] td,table[class=body] span,table[class=body] a {font-size: 16px !important; table[class=body] .wrapper,table[class=body] .article {padding: 10px !important; }table[class=body] .content {padding: 0 !important; }table[class=body] .container {padding: 0 !important;width: 100% !important; }table[class=body] .main {border-left-width: 0 !important;border-radius: 0 !important;border-right-width: 0 !important; }table[class=body] .btn table {width: 100% !important; }table[class=body] .btn a {width: 100% !important; }table[class=body] .img-responsive {height: auto !important;max-width: 100% !important;width: auto !important; }}@media all {.ExternalClass {width: 100%; }.ExternalClass,.ExternalClass p,.ExternalClass span,.ExternalClass font,.ExternalClass td,.ExternalClass div {line-height: 100%; }.apple-link a {color: inherit !important;font-family: inherit !important;font-size: inherit !important;font-weight: inherit !important;line-height: inherit !important;text-decoration: none !important; }.btn-primary table td:hover {background-color: #34495e !important; }.btn-primary a:hover {background-color: #34495e !important;border-color: #34495e !important; } }</style></head><body class='' style='background-color:#f6f6f6;font-family:sans-serif;-webkit-font-smoothing:antialiased;font-size:14px;line-height:1.4;margin:0;padding:0;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;'><table border='0' cellpadding='0' cellspacing='0' class='body' style='border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;background-color:#f6f6f6;width:100%;'><tr><td style='font-family:sans-serif;font-size:14px;vertical-align:top;'>&nbsp;</td><td class='container' style='font-family:sans-serif;font-size:14px;vertical-align:top;display:block;maxwidth:580px;padding:10px;width:580px;Margin:0 auto !important;'><div class='content' style='box-sizing:border-box;display:block;Margin:0 auto;max-width:580px;padding:10px;'><!-- START CENTERED WHITE CONTAINER --><span class='preheader' style='color:transparent;display:none;height:0;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;visibility:hidden;width:0;'>This is preheader text. Some clients will show this text as a preview.</span><table class='main' style='border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;background:#fff;border-radius:3px;width:100%;'><tr><td class='wrapper' style='font-family:sans-serif;font-size:14px;vertical-align:top;box-sizing:border-box;padding:20px;'><table border='0' cellpadding='0' cellspacing='0' style='border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;width:100%;'><tr><td style='font-family:sans-serif;font-size:14px;vertical-align:top;'><p style='font-family:sans-serif;font-size:14px;font-weight:normal;margin:0;Margin-bottom:15px;'><b>Hello,"+name+"</b></p><p style='font-family:sans-serif;font-size:14px;font-weight:normal;margin:0;Margin-bottom:15px;'>Your request for Visitorpass was <b>Approved</b>.<br> Here are the full details:</p> <center>  <img id='barcode' src='https://api.qrserver.com/v1/create-qr-code/?data="+data+"&amp;size=250x250'title='T-HUB' width='100' height='100' /></center><table border='0' cellpadding='0' cellspacing='0' class='btn btn-primary' style='border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;box-sizing:border-box;width:100%;'><tbody><tr><td align='left' style='font-family:sans-serif;font-size:14px;vertical-align:top;padding-bottom:15px;'><center><table border='0' cellpadding='0' cellspacing='0' style='border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;width:100%;width:auto;'><tbody><tr><td style='font-family:sans-serif;font-size:14px;vertical-align:top;background-color:#ffffff;border-radius:5px;text-align:center;background-color:;'></td></tr></tbody></table></center></td></tr></tbody></table><p style='font-family:sans-serif;font-size:14px;font-weight:normal;margin:0;Margin-bottom:15px;'>Have a Good Day!.</p></td></tr></table></td></tr></table><!-- START FOOTER --><div class='footer' style='clear:both;padding-top:10px;textalign:center;width:100%;'><table border='0' cellpadding='0' cellspacing='0' style='border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;width:100%;'><tr><td class='content-block' style='font-family:sans-serif;font-size:14px;vertical-align:top;color:#999999;font-size:12px;text-align:center;'><span class='apple-link' style='color:#999999;font-size:12px;text-align:center;'>Aditya Educational Institutions,Surampalem,533437</span><br>This email is system generated, please do not respond to this email.</td></tr><tr><td class='content-block powered-by' style='font-family:sans-serif;font-size:14px;vertical-align:top;color:#999999;font-size:12px;text-align:center;'>Powered by <a href='http://thub.ac.edu.in' style='color:#3498db;text-decoration:underline;color:#999999;font-size:12px;text-align:center;text-decoration:none;'>T-HUB team</a>.</td></tr</table></div><p>Powered-by,<br><img src='http://ecourses.aec.edu.in/thub/images/myhublogo.png' width='84' height='50' alt='MyHubLogo'></p><!-- END FOOTER --><!-- END CENTERED WHITE CONTAINER --></div></td><td style='font-family:sans-serif;font-size:14px;vertical-align:top;'>&nbsp;</td></tr></table></body></html>"
var mailOptions = {
from: '"myHUB " <myhub@aditya.ac.in>', // sender address
to: req.body.email, // list of receivers
subject: 'Aditya Visitor Pass',
html: msg // html body
}
// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, response){
if(error){
res.send("Email could not sent due to error: "+error);
}else{
res.send("Email has been sent successfully");
}
});
});
//out time
router.post('/time', function(req,res){
  var outtime = moment().format('hh:mm');
  //console.log(outtime);
  //console.log(req.body.id);
  var id = req.body.id;
    visitorpass.update({"id1":id},{$set:{"timeout":outtime}},function(err,docs){
  res.send(docs);
  });
});
module.exports = router;

