const {getAPI,postAPI} = require("./axios")


const getRandomImages = (params) => getAPI('/randomimagecollection',params);

const getHashtags = (params) => getAPI('/gethashtags',params)

const getAllProfiles = (params) => getAPI('/getallprofiles',params)

const getProfile = (params) => getAPI('/getprofile',params)

export {
    getRandomImages,
    getHashtags,
    getAllProfiles,
    getProfile
}