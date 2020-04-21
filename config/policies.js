/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  // '*': true,

  ItemController:
  {
    userindex:"isUser",
    adminindex:"isAdmin",
    usersearch:"isUser",
    adminsearch:"isAdmin",
    usernoti:"isUser",
    useraccount:"isUser",
    adminnoti:"isAdmin",
    adminaccount:"isAdmin",
    adminadditem:"isAdmin",
    adminedititem:"isAdmin",
    adminaddbook:"isAdmin",
    adminaddgame:"isAdmin",
    adminaddgift:"isAdmin",
    adminaddmaterial:"isAdmin",
    adminaddnoti:"isAdmin",
    adminaddaccount:"isAdmin",
    adminuseredit:"isAdmin",
    adminuserdelete:"isAdmin",
    adminuserdetail:"isAdmin",
    adminuserupdate:"isAdmin",
    adminuserpwupdate:"isAdmin",
    adminaccountupdate:"isAdmin",
    adminpasswordupdate:"isAdmin",
    useraccountupdate:"isUser",
    userpasswordupdate:"isUser",
    cannotrenew:"isUser",
    useritemnotfound:"isUser",
    adminitemnotfound:"isAdmin",
    // userindex:"isUser",
    // usersearch:"isUser",
    // usernoti:"isUser",
    // useraccount:"isUser",
    // adminindex:"isAdmin",
    // adminsearch:"isAdmin",
    // adminnoti:"isAdmin",
    // adminaccount:"isAdmin",
    // adminadditem:"isAdmin",
    // adminaddbook:"isAdmin",
    // adminaddgame:"isAdmin",
    // adminaddgift:"isAdmin",
    // adminaddmaterial:"isAdmin",
  },

  BookController:
  {
    userbooksearch:"isUser",
    userbookresult:"isUser",
    userbookdetail:"isUser",
    userbookdetail2:"isUser",
    userbookreturn:"isUser",
    userbookreserve:"isUser",
    adminbooksearch:"isAdmin",
    adminbookresult:"isAdmin",
    adminbookdetail:"isAdmin",
    adminbookedit:"isAdmin",
    adminbookupdate:"isAdmin",
    adminbookdelete:"isAdmin",
    import_xlsx:"isAdmin",
    borrow:"isUser",
    return:"isUser",
    print:"isAdmin",
    useraddremark:"isUser",
    uploadphoto:"isAdmin",

    // userbooksearch:"isUser",
    // userbookresult:"isUser",
    // userbookdetail:"isUser",
    // adminbooksearch:"isAdmin",
    // adminbookresult:"isAdmin",
    // adminbookdetail:"isAdmin",
  },

  GameController:
  {
    usergamesearch:"isUser",
    usergameresult:"isUser",
    usergamedetail:"isUser",
    usergamedetail2:"isUser",
    usergamereturn:"isUser",
    usergamereserve:"isUser",
    admingamesearch:"isAdmin",
    admingameresult:"isAdmin",
    admingamedetail:"isAdmin",
    admingameedit:"isAdmin",
    admingameupdate:"isAdmin",
    admingamedelete:"isAdmin",
    import_xlsx:"isAdmin",
    borrow:"isUser",
    return:"isUser",
    print:"isAdmin",
    useraddremark:"isUser",
    uploadphoto:"isAdmin",

    // usergamesearch:"isUser",
    // usergameresult:"isUser",
    // usergamedetail:"isUser",
    // admingamesearch:"isAdmin",
    // admingameresult:"isAdmin",
    // admingamedetail:"isAdmin",
  },

  GiftController:
  {
    usergiftsearch:"isUser",
    usergiftresult:"isUser",
    usergiftdetail:"isUser",
    usergiftdetail2:"isUser",
    admingiftsearch:"isAdmin",
    admingiftresult:"isAdmin",
    admingiftdetail:"isAdmin",
    admingiftedit:"isAdmin",
    admingiftupdate:"isAdmin",
    admingiftdelete:"isAdmin",
    import_xlsx:"isAdmin",
    borrow:"isUser",
    return:"isUser",
    print:"isAdmin",
    useraddremark:"isUser",
    uploadphoto:"isAdmin",
    // usergiftsearch:"isUser",
    // usergiftresult:"isUser",
    // usergiftdetail:"isUser",
    // admingiftsearch:"isAdmin",
    // admingiftresult:"isAdmin",
    // admingiftdetail:"isAdmin",
  },

  MaterialController:
  {
    usermaterialsearch:"isUser",
    usermaterialresult:"isUser",
    usermaterialdetail:"isUser",
    usermaterialdetail2:"isUser",
    usermaterialreturn:"isUser",
    adminmaterialsearch:"isAdmin",
    adminmaterialresult:"isAdmin",
    adminmaterialdetail:"isAdmin",
    adminmaterialedit:"isAdmin",
    adminmaterialupdate:"isAdmin",
    adminmaterialdelete:"isAdmin",
    import_xlsx:"isAdmin",
    borrow:"isUser",
    return:"isUser",
    print:"isAdmin",
    useraddremark:"isUser",
    uploadphoto:"isAdmin",
    // usermaterialsearch:"isUser",
    // usermaterialresult:"isUser",
    // usermaterialdetail:"isUser",
    // adminmaterialsearch:"isAdmin",
    // adminmaterialresult:"isAdmin",
    // adminmaterialdetail:"isAdmin",
  }

};
