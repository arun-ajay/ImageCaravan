const {getAPI,postAPI} = require("./axios")


const getRandomImages = (params) => getAPI('/randomimagecollection',params);

const getHashtags = (params) => getAPI('/gethashtags',params)

const getAllProfiles = (params) => getAPI('/getallprofiles',params)

export {
    getRandomImages,
    getHashtags,
    getAllProfiles
}