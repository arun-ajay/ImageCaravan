const {getAPI,postAPI} = require("./axios")


const getRandomImages = (params) => getAPI('/randomimagecollection',params);

const getHashtags = (params) => getAPI('/gethashtags',params)

const getAllProfiles = (params) => getAPI('/getallprofiles',params)

const getProfile = (params) => getAPI('/getprofile',params)

const getImage = (params) => getAPI('/getimage',params)

const getAllProfileUsernames = (params) => getAPI('/getallprofileusernames',params)

const getAllImageTitles = (params) => getAPI('/getallimagetitles',params)

const search = (params) => getAPI('/search',params)

export {
    getRandomImages,
    getHashtags,
    getAllProfiles,
    getProfile,
    getImage,
    getAllProfileUsernames,
    getAllImageTitles,
    search
}