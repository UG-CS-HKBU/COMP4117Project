/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/
  //Homepage
  '/': 'UserController.login',

  //Login/Logout
  'GET /user/login': 'UserController.login',
  'POST /user/login': 'UserController.login',
  'POST /user/logout': 'UserController.logout',
  // 'POST /user/:id/borrowbook/add/:fk': 'UserController.addborrowbook',
  // 'POST /user/:id/borrowbook/remove/:fk': 'UserController.removeborrowbook',
  'POST /user/borrowbook': 'UserController.addborrowbook',
  'POST /user/returnbook': 'UserController.removeborrowbook',
  'POST /user/borrowgame': 'UserController.addborrowgame',
  'POST /user/returngame': 'UserController.removeborrowgame',
  // 'POST /user/borrowmaterial': 'UserController.addborrowmaterial',
  // 'POST /user/returnmaterial': 'UserController.removeborrowmaterial',
  'POST /user/renewborrowbook/:fk': 'UserController.renewborrowbook',
  'POST /user/renewborrowgame/:fk': 'UserController.renewborrowgame',
  'POST /user/renewborrowmaterial/:fk': 'UserController.renewborrowmaterial',
  'POST /user/borrowgift/:id': 'UserController.addborrowgift',
  'POST /user/borrowmaterial/:id': 'UserController.addborrowmaterial',
  'POST /user/returnmaterial/:id': 'UserController.removeborrowmaterial',
  'POST /user/addreservebook/:id': 'UserController.addreservebook',
  'POST /user/removereservebook/:id': 'UserController.removereservebook',
  'POST /user/addreservegame/:id': 'UserController.addreservegame',
  'POST /user/removereservegame/:id': 'UserController.removereservegame',

  //Usermainpage
  '    /item/userindex': 'ItemController.userindex',
  '    /item/usernoti': 'ItemController.usernoti',
  '    /item/useraccount': 'ItemController.useraccount',
  '    /item/usersearch': 'ItemController.usersearch',
  'POST /item/useraccountupdate/:id': 'ItemController.useraccountupdate',
  'GET /item/useraccountupdate/:id': 'ItemController.useraccountupdate',
  'POST /item/userpasswordupdate/:id': 'ItemController.userpasswordupdate',
  'GET /item/userpasswordupdate/:id': 'ItemController.userpasswordupdate',
  '    /item/noaccount': 'ItemController.noaccount',
  '    /item/wrongpassword': 'ItemController.wrongpassword',
  '    /item/cannotrenew': 'ItemController.cannotrenew',
  

  //Vistormainpage
  '    /item/vistorsearch': 'ItemController.vistorsearch',
  '    /item/vistornotlogin': 'ItemController.vistornotlogin',

  //Adminmainpage
  '    /item/adminindex': 'ItemController.adminindex',
  '    /item/adminnoti': 'ItemController.adminnoti',
  '    /item/adminaccount': 'ItemController.adminaccount',
  '    /item/adminsearch': 'ItemController.adminsearch',
  '    /item/adminedititem': 'ItemController.adminedititem',
  '    /item/adminadditem': 'ItemController.adminadditem',
  '    /item/adminaddbook': 'ItemController.adminaddbook',
  '    /item/adminaddgame': 'ItemController.adminaddgame',
  '    /item/adminaddgift': 'ItemController.adminaddgift',
  '    /item/adminaddmaterial': 'ItemController.adminaddmaterial',
  '    /item/adminaddaccount': 'ItemController.adminaddaccount',
  '    /item/adminuseredit': 'ItemController.adminuseredit',
  'POST /item/adminuserdelete/:id': 'ItemController.adminuserdelete',
  '   /item/adminuserdetail/:id': 'ItemController.adminuserdetail',
  'POST /item/adminuserupdate/:id': 'ItemController.adminuserupdate',
  'GET /item/adminuserupdate/:id': 'ItemController.adminuserupdate',
  'POST /item/adminuserpwupdate/:id': 'ItemController.adminuserpwupdate',
  'GET /item/adminuserpwupdate/:id': 'ItemController.adminuserpwupdate',
  'POST /item/adminaccountupdate/:id': 'ItemController.adminaccountupdate',
  'GET /item/adminaccountupdate/:id': 'ItemController.adminaccountupdate',
  'POST /item/adminpasswordupdate/:id': 'ItemController.adminpasswordupdate',
  'GET /item/adminpasswordupdate/:id': 'ItemController.adminpasswordupdate',
  '/item/adminpasswordupdate/:id': 'ItemController.adminpasswordupdate',
  '    /item/adminaddnoti': 'ItemController.adminaddnoti',

  //UserBookpage
  '   /book/userbooksearch': 'BookController.userbooksearch',
  'GET /book/userbookresult': 'BookController.userbookresult',
  '   /book/userbookdetail/:id': 'BookController.userbookdetail',
  '   /book/userbookdetail2/:id': 'BookController.userbookdetail2',
  '   /book/userbookreturn/:id': 'BookController.userbookreturn',
  '   /book/userbookreserve/:id': 'BookController.userbookreserve',
  'GET   /book/useraddremark/:id': 'BookController.useraddremark',
  'POST  /book/useraddremark/:id': 'BookController.useraddremark',

  //UserGamepage
  '   /game/usergamesearch': 'GameController.usergamesearch',
  'GET /game/usergameresult': 'GameController.usergameresult',
  '   /game/usergamedetail/:id': 'GameController.usergamedetail',
  '   /game/usergamedetail2/:id': 'GameController.usergamedetail2',
  '   /game/usergamereturn/:id': 'GameController.usergamereturn',
  '   /game/usergamereserve/:id': 'GameController.usergamereserve',
  'GET   /game/useraddremark/:id': 'GameController.useraddremark',
  'POST  /game/useraddremark/:id': 'GameController.useraddremark',

  //UserGiftpage
  '   /gift/usergiftsearch': 'GiftController.usergiftsearch',
  'GET /gift/usergiftresult': 'GiftController.usergiftresult',
  '   /gift/usergiftdetail/:id': 'GiftController.usergiftdetail',
  '   /gift/usergiftdetail2/:id': 'GiftController.usergiftdetail2',
  'GET   /gift/useraddremark/:id': 'GiftController.useraddremark',
  'POST  /gift/useraddremark/:id': 'GiftController.useraddremark',

  //UserMaterialpage
  '   /material/usermaterialsearch': 'MaterialController.usermaterialsearch',
  'GET /material/usermamterialresult': 'MaterialController.usermaterialresult',
  '   /material/usermaterialdetail/:id': 'MaterialController.usermaterialdetail',
  '   /material/usermaterialdetail2/:id': 'MaterialController.usermaterialdetail2',
  '   /material/usermaterialreturn/:id': 'MaterialController.usermaterialreturn',
  'GET   /material/useraddremark/:id': 'MaterialController.useraddremark',
  'POST  /material/useraddremark/:id': 'MaterialController.useraddremark',

  //AdminBookpage
  '   /book/adminbooksearch': 'BookController.adminbooksearch',
  'GET /book/adminbookresult': 'BookController.adminbookresult',
  '   /book/adminbookdetail/:id': 'BookController.adminbookdetail',
  '   /book/adminbookedit': 'BookController.adminbookedit',
  'GET /book/adminbookupdate/:id': 'BookController.adminbookupdate',
  'POST /book/adminbookupdate/:id': 'BookController.adminbookupdate',
  'POST /book/adminbookdelete/:id': 'BookController.adminbookdelete',

  //AdminGamepage
  '   /game/admingamesearch': 'GameController.admingamesearch',
  'GET /game/admingameresult': 'GameController.admingameresult',
  '   /game/admingamedetail/:id': 'GameController.admingamedetail',
  '   /game/admingameedit': 'GameController.admingameedit',
  'GET /game/admingameupdate/:id': 'GameController.admingameupdate',
  'POST /game/admingameupdate/:id': 'GameController.admingameupdate',
  'POST /game/admingamedelete/:id': 'GameController.admingamedelete',



  //AdminGiftpage
  '   /gift/admingiftsearch': 'GiftController.admingiftsearch',
  'GET /gift/admingiftresult': 'GiftController.admingiftresult',
  '   /gift/admingiftdetail/:id': 'GiftController.admingiftdetail',
  '   /gift/admingiftedit': 'GiftController.admingiftedit',
  'GET /gift/admingiftupdate/:id': 'GiftController.admingiftupdate',
  'POST /gift/admingiftupdate/:id': 'GiftController.admingiftupdate',
  'POST /gift/admingiftdelete/:id': 'GiftController.admingiftdelete',

  //AdminMaterialpage
  '   /material/adminmaterialsearch': 'MaterialController.adminmaterialsearch',
  'GET /material/adminmamterialresult': 'MaterialController.adminmaterialresult',
  '   /material/adminmaterialdetail/:id': 'MaterialController.adminmaterialdetail',
  '   /material/adminmaterialedit': 'MaterialController.adminmaterialedit',
  'GET /material/adminmaterialupdate/:id': 'MaterialController.adminmaterialupdate',
  'POST /material/adminmaterialupdate/:id': 'MaterialController.adminmaterialupdate',
  'POST /material/adminmaterialdelete/:id': 'MaterialController.adminmaterialdelete',

  //VistorBookpage
  '    /book/vistorbooksearch': 'BookController.vistorbooksearch',
  'GET /book/vistorbookresult': 'BookController.vistorbookresult',
  '   /book/vistorbookdetail/:id': 'BookController.vistorbookdetail',

  //VistorGamepage
  '   /game/vistorgamesearch': 'GameController.vistorgamesearch',
  'GET /game/vistorgameresult': 'GameController.vistorgameresult',
  '   /game/vistorgamedetail/:id': 'GameController.vistorgamedetail',

  //import
  '/book/import_xlsx': 'BookController.import_xlsx',
  '/game/import_xlsx': 'GameController.import_xlsx',
  '/gift/import_xlsx': 'GiftController.import_xlsx',
  '/material/import_xlsx': 'MaterialController.import_xlsx',

  '/book/borrow':'BookController.borrow',
  '/book/return':'BookController.return',
  '/book/print':'BookController.print',

  '/game/borrow':'GameController.borrow',
  '/game/return':'GameController.return',
  '/game/print':'GameController.print',

  '/gift/borrow/:id':'GiftController.borrow',
  '/gift/return':'GiftController.return',
  '/gift/print':'GiftController.print',

  '/material/borrow/:id':'MaterialController.borrow',
  '/material/return/:id':'MaterialController.return',
  '/material/print':'MaterialController.print',

  // 'GET /book/upload1/:id': 'BookController.upload1',
  // 'POST /book/upload1/:id': 'BookController.upload1',
  'GET /book/uploadphoto/:id': 'BookController.uploadphoto',
  'POST /book/uploadphoto/:id': 'BookController.uploadphoto',

  'GET /game/uploadphoto/:id': 'GameController.uploadphoto',
  'POST /game/uploadphoto/:id': 'GameController.uploadphoto',

  'GET /gift/uploadphoto/:id': 'GiftController.uploadphoto',
  'POST /gift/uploadphoto/:id': 'GiftController.uploadphoto',

  'GET /material/uploadphoto/:id': 'MaterialController.uploadphoto',
  'POST /material/uploadphoto/:id': 'MaterialController.uploadphoto',

  '/item/visitoritemnotfound': 'ItemController.visitoritemnotfound',
  '/item/useritemnotfound': 'ItemController.useritemnotfound',
  '/item/adminitemnotfound': 'ItemController.adminitemnotfound',

  







  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
