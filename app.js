const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

const restaurantsRouter = require('./routes/restaurants');
const reviewsRouter = require('./routes/reviews');
const activitiesRouter = require('./routes/activities');

const generateDataRouter = require('./routes/generateData');

//express란 함수를 실행시키면 object가 return 된다
//conventionally app이라 칭함
const app = express();

app.use(
	cors({
		origin: 'http://localhost:3005'
	})
);

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//specify middleware
app.use('/api/restaurants', restaurantsRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/generatedata', generateDataRouter);

//assgin PORT as dynamic value as the hosting env can be vary
//CLI export PORT=5000 시 env지정 가능
const port = process.env.PORT || 3002;
app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports.app = app;

//app은 여러개의 method를 가지는데
// app.get('/', (req, res) => {
// 	res.send('Hello world');
// });

// app.get('/api/courses', (req, res) => {
// 	res.send(courses);
// });

// /api/courses/1  :sth 해주므로서 param을 읽을 수 있다
//multiple param도 가능
// app.get('/api/courses/:id', (req, res) => {
// 	res.send(req.params.id);
// });

// app.get('/api/courses/:id', (req, res) => {
// 	const course = courses.find((c) => c.id === parseInt(req.params.id));
// 	if (!course) {
// 		res.status(404).send('The course with the given ID was not found!');
// 	} else {
// 		res.send(course);
// 	}
// });

// app.post('/api/courses', (req, res) => {
// 	const course = {
// 		id: courses.length + 1,
// 		name
// 	};
// });
