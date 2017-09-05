describe('Dashboard module', function(){
  var DashboardSrv,
      DashboardCtrl,
      apps = [
         {link: '', title: 'travelling officers database'},
         {link: '', title: 'travelling officers database'}
       ]

  beforeEach(function(){
    module('ngRoute');
    module('core.dashboard');
  })

  beforeEach(inject(function($controller, _dashSrv_){
    DashboardSrv = _dashSrv_
    DashboardCtrl = $controller
  }));

 describe('Dashboard Controller', function(){
   it('should be defined', function(){
     expect(DashboardCtrl).toBeDefined()
   });
 });

describe('Dashboard service', function(){
  it('service should exist', function(){
    expect(DashboardSrv).toBeDefined();
  });

  describe('.activate()', function(){
    it('should exist', function(){
      expect(DashboardSrv.activate).toBeDefined()
    })

    it('should return a list of apps', function(){
      expect(DashboardSrv.activate()).toEqual(apps)
    })

  })

  describe('.getUserAppList()', function(){
    it('should exist', function(){
      expect(DashboardSrv.getUserAppList).toBeDefined()
    });

  });
});
});
