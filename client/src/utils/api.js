const {getAPI,postAPI} = require("./axios")


const getRandomImages = (params) => getAPI('/randomimagecollection',params);

const getHashtags = (params) => getAPI('/gethashtags',params)

const getAllProfiles = (params) => getAPI('/getallprofiles',params)

const getProfile = (params) => getAPI('/getprofile',params)

const getImage = (params) => getAPI('/getimage',params)

const getAllProfileUsernames = (params) => getAPI('/getallprofileusernames',params)

const getAllImageTitles = (params) => getAPI('/getallimagetitles',params)

const search = (params) => getAPI('/search',params)

const login = (data) => postAPI('/login',data)

const follow = (data) => postAPI('/follow',data)

const unfollow = (data) => postAPI('/unfollow',data)

const imagecomment = (data) => postAPI('/imagecomment',data)

const profilecomment = (data) => postAPI('/profilecomment',data)

const editbio = (data) => postAPI('/editbio',data)

const editprofilepicture = (data) => postAPI('/editprofilepicture',data)

const editlocation = (data) => postAPI('/editlocation',data)

export {
    getRandomImages,
    getHashtags,
    getAllProfiles,
    getProfile,
    getImage,
    getAllProfileUsernames,
    getAllImageTitles,
    search,
    login,
    follow,
    unfollow,
    imagecomment,
    profilecomment,
    editbio,
    editprofilepicture,
    editlocation
}