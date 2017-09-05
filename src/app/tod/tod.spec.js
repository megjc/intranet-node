describe('Travelling Officer Database module', function(){
  var srv,ctrl

  beforeEach(function(){
    module('ngRoute');
    module('apps.tod');
  })

  beforeEach(inject(function($controller, _todSrv_){
    srv = _todSrv_
    ctrl = $controller
  }));

 describe('TOD Controller', function(){
   it('should be defined', function(){
     expect(ctrl).toBeDefined()
   });
 });

 describe('TOD Service', function(){
   it('should be defined', function(){
     expect(srv).toBeDefined()
   });

  describe('getOfficers', function(){
    it('should be defined', function(){
       expect(srv.getOfficers).toBeDefined()
     })
  })

  describe('getOfficerById', function(){
    it('should be defined', function(){
      expect(srv.getOfficerById).toBeDefined()
    })
  })
 });
});
