let base = window.smilecampus_config.base_url
let smilecampus = {
  api: {
    userApi: {
      userInfo: `${base}/api/UserApi/user_info`,
      getControlTypes: `${base}/api/UserApi/getControlTypes`,
      upload: `${base}/api/UserApi/upload`,
      logout: `${base}/api/UserApi/logout`,
    },
    OrgStructApi: {
      getStruct: `${base}/api/OrgStructApi/getStruct`
    },
    searchApi: {
      globalSearch: `${base}/api/SearchApi/globalSearch`,
    },
    MessageApi: {
      create_for_push: `${base}/api/MessageApi/create_for_push`,
    }
  }
}

export default smilecampus;
