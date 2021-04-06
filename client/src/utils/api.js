const {getAPI,postAPI} = require("./axios")


const getRandomImages = (params) => getAPI('/randomimagecollection',params);



export {
    getRandomImages
}