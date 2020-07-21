var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');


var app = express();
app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public/dist/softgrib-test-frontend/')));

//get api 
let totalRequest = [];
app.get('/api/v1/global/:partnerName',(req, res, next) =>{
	const partner = req. params.partnerName;
	if(!partner){
		res.status(400).json({
			status: 'failed',
			message: `Please provide partner name`,
			data: {}
		})

	}

	//add request info to the totalRequest array
	const addRequest = {
		requestedBy : partner,
		origin: req.get('host'),
		requestType : req.method,
		requestedAt : new Date()
	}
	console.log(addRequest)
	totalRequest.push(addRequest);
	res.status(200).json({
		status: 'success',
		message: `Hello ${partner}, You just send a get request`,
		data: totalRequest
	})
})

app.get('/api/v1/global/',(req, res, next) =>{
	res.status(200).json({
		status: 'success',
		message: `all request`,
		data: totalRequest
	})
})


app.get('*',(req,res) =>{
    res.sendFile(path.join(__dirname,'public/dist/softgrib-test-frontend/index.html'));
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
