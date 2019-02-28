class AppController {
   constructor(model) {
      this._model = model;
      this.create = this.create.bind(this);
   }

   create (req, res, next) {
      let obj = req.body;
      let object = new this._model(obj);
      object.save().then((savedObject) => {
            const userResponse = {
              'statusCode': 200,
              'status': 'success'
            }
            return res.status(200).json(userResponse);
      }, (err) => {
        var returnErrors = err.message;
        try {
          returnErrors = JSON.parse(returnErrors);
        } catch (e) {

        }
        res.status(200).json({
          'statusCode': 201,
          'status': 'error',
          'errors': returnErrors
        });
      });
   }
}

module.exports = AppController;
