import json
from flask import Flask, jsonify, request,make_response
from flask_cors import CORS, cross_origin
from images import *


profiles = [
                {
                    "username": "JosesFarrell",
                    "profilePicture": sampleProfile4(),
                    "bio": "Award-winning twitter nerd. Introvert. Future teen idol. Beer fanatic. Lifelong bacon maven. Hardcore student. Proud tv fan.",
                    "location": "ad",
                    "imageCount": "15",
                    "followers": "12",
                    "following" : "32"

                },
                {
                    "username": "MaritaAnona",
                    "profilePicture": sampleProfile3(),
                    "bio": "Typical thinker. Total internet guru. Extreme tv ninja. Bacon evangelist.",
                    "location": "ax",
                    "imageCount": "15",
                    "followers": "18",
                    "following" : "32"

                },
                {
                    "username": "Epha",
                    "profilePicture": sampleProfile2(),
                    "bio": "Friendly entrepreneur. Gamer. Award-winning zombie ninja. Travel practitioner. Thinker. General web fanatic.",
                    "location": "ao",
                    "imageCount": "9898",
                    "followers": "12",
                    "following" : "32"

                },
                {
                    "username": "Cleve",
                    "profilePicture": sampleProfile(),
                    "bio": "Coffee lover. Falls down a lot. Freelance entrepreneur. Total twitter fan. Music trailblazer. Travel specialist.",
                    "location": "dz",
                    "imageCount": "15",
                    "followers": "12",
                    "following" : "1414"

                },
                {
                    "username": "Wollem",
                    "profilePicture": sampleProfile5(),
                    "bio": "Internet fanatic. Hipster-friendly beer practitioner. General coffee fan. Food ninja. Certified twitter fanatic.",
                    "location": "bb",
                    "imageCount": "15",
                    "followers": "666",
                    "following" : "32"

                }

            ]
def allProfiles():
    return profiles


profileComments = [
        {
            "comment": "I love your work! Please post more! :)",
            "commenter" : "MaritaAnona",
            "commenterPicture": allProfiles()[1]["profilePicture"]
        },
        {
            "comment": "Your photos are okay I guess",
            "commenter" : "Epha",
            "commenterPicture": allProfiles()[2]["profilePicture"]
        },
        {
            "comment": "#moredogsplz",
            "commenter" : "Wollem",
            "commenterPicture": allProfiles()[4]["profilePicture"]
        },
        {
            "comment": "Follow me please!",
            "commenter" : "Cleve",
            "commenterPicture": allProfiles()[3]["profilePicture"]
        }
    ]

def returnProfileComments():

    return profileComments

imageComments = [
        {
            "comment": "Love the photo!",
            "commenter" : "MaritaAnona",
            "commenterPicture": allProfiles()[1]["profilePicture"]
        },
        {
            "comment": "Wow, where was this??!",
            "commenter" : "Epha",
            "commenterPicture": allProfiles()[2]["profilePicture"]
        },
        {
            "comment": "Take me with you next time!",
            "commenter" : "Wollem",
            "commenterPicture": allProfiles()[4]["profilePicture"]
        },
        {
            "comment": "Amazing photo, which camera were you using??",
            "commenter" : "Cleve",
            "commenterPicture": allProfiles()[3]["profilePicture"]
        }
    ]

def returnImageComments():

    return imageComments

account = [
    {
        "username": "MaritaAnona",
        "password": "abcdefg",
        "followList": ["JosesFarrell","Epha","Cleve"]
    },
    {
        "username": "JosesFarrell",
        "password": "abcdefg",
        "followList": ["MaritaAnona","Epha","Cleve"]
    },
    {
        "username": "Cleve",
        "password": "abcdefg",
        "followList": ["JosesFarrell","Epha"]
    },
    {
        "username": "Wollem",
        "password": "abcdefg",
        "followList": ["JosesFarrell","Epha","Cleve"]
    },
    {
        "username": "Epha",
        "password": "abcdefg",
        "followList": ["JosesFarrell","Wollem","Cleve"]
    },
]






images = [
                {
                    "imageTitle": "Cute dog 1",
                    "imageCaption": "Check out my adorable puppy!!!",
                    "imageUploader": "JosesFarrell",
                    "imageBase64": sampleProfile(),
                    "imageUUID": "1"
                },
                {
                    "imageTitle": "Cute dog 2",
                    "imageCaption": "Check out my adorable puppy!!!",
                    "imageUploader": "MaritaAnona",
                    "imageBase64": sampleImage(),
                    "imageUUID": "2"
                },
                {
                    "imageTitle": "Cute dog 3",
                    "imageCaption": "Check out my adorable puppy!!!",
                    "imageUploader": "Cleve",
                    "imageBase64": sampleImage(),
                    "imageUUID": "3"
                },
                {
                    "imageTitle": "Cute dog 4",
                    "imageCaption": "Check out my adorable puppy!!!",
                    "imageUploader": "Wollem",
                    "imageBase64": sampleProfile(),
                    "imageUUID": "4"
                },
                {
                    "imageTitle": "Cute dog 5",
                    "imageCaption": "Check out my adorable puppy!!!",
                    "imageUploader": "Epha",
                    "imageBase64": sampleImage(),
                    "imageUUID": "5"
                },
                {
                    "imageTitle": "Cute dog 6",
                    "imageCaption": "Check out my adorable puppy!!!",
                    "imageUploader": "JosesFarrell",
                    "imageBase64": sampleProfile(),
                    "imageUUID": "6"
                },
                {
                    "imageTitle": "Cute dog 7",
                    "imageCaption": "Check out my adorable puppy!!!",
                    "imageUploader": "MaritaAnona",
                    "imageBase64": sampleImage(),
                    "imageUUID": "7"
                },
                {
                    "imageTitle": "Cute dog 8",
                    "imageCaption": "Check out my adorable puppy!!!",
                    "imageUploader": "Cleve",
                    "imageBase64": sampleProfile(),
                    "imageUUID": "8"
                },
                {
                    "imageTitle": "Cute dog 9",
                    "imageCaption": "Check out my adorable puppy!!!",
                    "imageUploader": "Wollem",
                    "imageBase64": sampleImage(),
                    "imageUUID": "9"
                },
                {
                    "imageTitle": "Cute dog 10",
                    "imageCaption": "Check out my adorable puppy!!!",
                    "imageUploader": "Epha",
                    "imageBase64": sampleImage(),
                    "imageUUID": "10"
                },
                {
                    "imageTitle": "Cute dog 11",
                    "imageCaption": "Check out my adorable puppy!!!",
                    "imageUploader": "JosesFarrell",
                    "imageBase64": sampleProfile(),
                    "imageUUID": "11"
                },
                {
                    "imageTitle": "Cute dog 12",
                    "imageCaption": "Check out my adorable puppy!!!",
                    "imageUploader": "MaritaAnona",
                    "imageBase64": sampleImage(),
                    "imageUUID": "12"
                },
                {
                    "imageTitle": "Cute dog 13",
                    "imageCaption": "Check out my adorable puppy!!!",
                    "imageUploader": "Cleve",
                    "imageBase64": sampleImage(),
                    "imageUUID": "13"
                },
                {
                    "imageTitle": "Cute dog 14",
                    "imageCaption": "Check out my adorable puppy!!!",
                    "imageUploader": "Wollem",
                    "imageBase64": sampleImage(),
                    "imageUUID": "14"
                },
                {
                    "imageTitle": "Cute dog 15",
                    "imageCaption": "Check out my adorable puppy!!!",
                    "imageUploader": "Epha",
                    "imageBase64": sampleProfile(),
                    "imageUUID": "15"
                },

            ]


def returnImages():
    return images


def returnUserImages(username):

    response = []

    for image in images:
        if image["imageUploader"] == username:
            response.append(image)
    
    return response

hashtags = [
                {
                    "hashtag": "dog",
                    "imageCount": "12"
                },
                {
                    "hashtag": "cat",
                    "imageCount": "15"
                },
                {
                    "hashtag": "parrot",
                    "imageCount": "14"
                },
                {
                    "hashtag": "monkey",
                    "imageCount": "130"
                },
                {
                    "hashtag": "horse",
                    "imageCount": "65"
                },
                {
                    "hashtag": "dog",
                    "imageCount": "12"
                },
                {
                    "hashtag": "cat",
                    "imageCount": "15"
                },
                {
                    "hashtag": "parrot",
                    "imageCount": "14"
                },
                {
                    "hashtag": "monkey",
                    "imageCount": "130"
                },
                {
                    "hashtag": "horse",
                    "imageCount": "65"
                },
                {
                    "hashtag": "dog",
                    "imageCount": "12"
                },
                {
                    "hashtag": "cat",
                    "imageCount": "15"
                },
                {
                    "hashtag": "parrot",
                    "imageCount": "14"
                },
                {
                    "hashtag": "monkey",
                    "imageCount": "130"
                },
                {
                    "hashtag": "horse",
                    "imageCount": "65"
                },
                {
                    "hashtag": "dog",
                    "imageCount": "12"
                },
                {
                    "hashtag": "cat",
                    "imageCount": "15"
                },
                {
                    "hashtag": "parrot",
                    "imageCount": "14"
                },
                {
                    "hashtag": "monkey",
                    "imageCount": "130"
                },
                {
                    "hashtag": "horse",
                    "imageCount": "65"
                },

            ]

def returnHashtags():
    return hashtags

app = Flask(__name__)
CORS(app, support_credentials=False)

def build_preflight_response():
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add('Access-Control-Allow-Headers', "*")
    response.headers.add('Access-Control-Allow-Methods', "*")
    return response
    
def build_actual_response(response):
    # response.headers.add("Access-Control-Allow-Origin", "*")
    return response


@app.route('/randomimagecollection',methods = ["OPTIONS","GET"])
def randomimagecollection():

    if request.method == "OPTIONS":
        return build_preflight_response
    elif request.method == "GET":
        print("calling")
        response =  {
            "RandomImageCollection": returnImages()
        }
        return build_actual_response(jsonify(response)),200

    

@app.route('/gethashtags',methods = ["OPTIONS","GET"])
def gethashtags():
    if request.method == "OPTIONS":
        return build_preflight_response
    elif request.method == "GET":
        response = {
            "getAllHashtags": returnHashtags()
        }

        return build_actual_response(jsonify(response)),200

@app.route('/getallprofileusernames',methods = ["OPTIONS","GET"])
def getallprofileusernames():
    if request.method == "OPTIONS":
        return build_preflight_response
    elif request.method == "GET":
        response = {"getAllProfileUsernames": []}

        for profile in allProfiles():
            response["getAllProfileUsernames"].append({
                "username" : profile["username"],
                "imageCount": profile["imageCount"]
            })
        return build_actual_response(jsonify(response)),200

@app.route('/getallimagetitles',methods = ["OPTIONS","GET"])
def getallimagetitles():
    if request.method == "OPTIONS":
        return build_preflight_response
    elif request.method == "GET":
        response = {"getAllImageTitles": []}

        for data in returnImages():
            response["getAllImageTitles"].append({
                "imageTitle" : data["imageTitle"],
                "imageUUID": data["imageUUID"]
            })
        return build_actual_response(jsonify(response)),200

@app.route('/getallprofiles')
def getallprofiles():
    if request.method == "OPTIONS":
        return build_preflight_response
    elif request.method == "GET":
        response = {
            "getAllProfiles": allProfiles()
        }

        return build_actual_response(jsonify(response)),200


@app.route('/getprofile', methods = ["OPTIONS","GET"])
def getprofile():
    if request.method == "OPTIONS":
        return build_preflight_response
    elif request.method == "GET":

        print("REQUEST DATA",request)
        username = request.args.get('username')
        print("USERNAME",username)
        response = {}
        for data in allProfiles():
            if data["username"] == username:
                response["profileData"] = data
                response["profileData"]["comments"] = returnProfileComments()
                response["profileData"]["imageData"] = returnUserImages(username)
                break
        

        return build_actual_response(jsonify(response)),200


@app.route('/getimage', methods = ["OPTIONS","GET"])
def getimage():
    if request.method == "OPTIONS":
        return build_preflight_response
    elif request.method == "GET":

        print("REQUEST DATA",request)
        imageUUID = request.args.get('imageUUID')
        print("UUID",imageUUID)
        response = {}
        for data in returnImages():
            if data["imageUUID"] == imageUUID:
                response["imageData"] = data
                response["comments"] = returnImageComments()
                response["imageData"]["hashtags"] = returnHashtags()
                break
        

        return build_actual_response(jsonify(response)),200


@app.route('/search', methods = ["OPTIONS","GET"])
def search():

    print(request.args)
    if request.method == "OPTIONS":
        return build_preflight_response
    elif request.method == "GET":
        searchType = request.args.get('searchType')
        value = request.args.get('value')
        print(type(value))
        print("SEARCH TYPE",searchType)
        print("VALUE",value)
        users = value.split(',')
        print("USERS LIST",users)
        response = {"data": returnImages()}
        return build_actual_response(jsonify(response)),200


@app.route('/login', methods = ["OPTIONS","POST"])
@cross_origin()
def login():
    if request.method == "OPTIONS":
        return build_preflight_response
    elif request.method == "POST":
        jsonData = request.json
        try:
            username = jsonData["username"]
            password = jsonData["password"]
            response = {}

            for act in account:
                if act["username"] == username:
                    if act["password"] == password:
                        response["loginData"] = act
                        response["verified"] = True
                        return build_actual_response(jsonify(response)),200
                    else:
                        response["verified"] = False
                        return build_actual_response(jsonify(response)),400
            
            
            response["verified"] = False
            return build_actual_response(jsonify(response)),400
        except:
            response["verified"] = False
            return build_actual_response(jsonify(response)),400


@app.route('/follow', methods = ["OPTIONS","POST"])
@cross_origin()
def follow():
    if request.method == "OPTIONS":
        return build_preflight_response
    elif request.method == "POST":
        jsonData = request.json
        username = jsonData["username"]
        follow = jsonData["follow"]
        response = {}
        for act in account:
            if act["username"] == username:
                act["followList"].append(follow)
                response["followList"] = act["followList"]
                return build_actual_response(jsonify(response)),200


@app.route('/unfollow', methods = ["OPTIONS","POST"])
@cross_origin()
def unfollow():
    if request.method == "OPTIONS":
        return build_preflight_response
    elif request.method == "POST":
        jsonData = request.json
        username = jsonData["username"]
        unfollow = jsonData["unfollow"]
        response = {}
        for act in account:
            if act["username"] == username:
                act["followList"].remove(unfollow)
                response["followList"] = act["followList"]
                return build_actual_response(jsonify(response)),200


@app.route('/profilecomment', methods = ["OPTIONS","POST"])
@cross_origin()
def profilecomment():
    if request.method == "OPTIONS":
        return build_preflight_response
    elif request.method == "POST":
        jsonData = request.json
        username = jsonData["username"]
        targetUsernameProfile = jsonData["targetUsernameProfile"]
        comment = jsonData["comment"]
        response = {}
        profilePic = None
        for act in profiles:
            if act["username"] == username:
                profilePic = act["profilePicture"]
        profileComments.append({
            "comment": comment,
            "commenter": username,
            "commenterPicture": profilePic

        })

        response["status"] = True
        return build_actual_response(jsonify(response)),200


@app.route('/imagecomment', methods = ["OPTIONS","POST"])
@cross_origin()
def imageComment():
    if request.method == "OPTIONS":
        return build_preflight_response
    elif request.method == "POST":
        jsonData = request.json
        username = jsonData["username"]
        targetImageUUID = jsonData["targetImageUUID"]
        comment = jsonData["comment"]
        response = {}
        profilePic = None
        for act in profiles:
            if act["username"] == username:
                profilePic = act["profilePicture"]
        imageComments.append({
            "comment": comment,
            "commenter": username,
            "commenterPicture": profilePic

        })

        response["status"] = True
        return build_actual_response(jsonify(response)),200


@app.route('/editbio', methods = ["OPTIONS","POST"])
@cross_origin()
def editbio():
    if request.method == "OPTIONS":
        return build_preflight_response
    elif request.method == "POST":
        jsonData = request.json
        username = jsonData["username"]
        bio = jsonData["bio"]
        response = {}
        profilePic = None
        for act in profiles:
            if act["username"] == username:
                act["bio"] = bio
                response["status"] = True
                return build_actual_response(jsonify(response)),200


@app.route('/createaccount', methods = ["OPTIONS","POST"])
@cross_origin()
def createaccount():
    if request.method == "OPTIONS":
        return build_preflight_response
    elif request.method == "POST":
        try:
            jsonData = request.json
            data = {
                "username" : jsonData["username"],
                "password":  jsonData["password"],
                "bio":  jsonData["bio"],
                "profilePicture": jsonData["profilePicture"].split(',')[1],
                "location": jsonData["location"],
                "imageCount": "0",
                "followers": "0",
                "following":"0"
            }
            profiles.append(data)
            response = {}
            response["status"] = True
            return build_actual_response(jsonify(response)),200
        except Exception as e:
            print(str(e))
            response = {
                "status": False
            }
            return build_actual_response(jsonify(response)),400




@app.route('/uploadimage', methods = ["OPTIONS","POST"])
@cross_origin()
def uploadimage():
    if request.method == "OPTIONS":
        return build_preflight_response
    elif request.method == "POST":
        try:
            jsonData = request.json
            data = {
                "imageUploader" : jsonData["imageUploader"],
                "imageBase64": jsonData["imageBase64"].split(',')[1],
                "imageTitle": jsonData["imageTitle"],
                "imageCaption": jsonData["imageCaption"],
                "hashtags": jsonData["hashtags"]
            }
            print(data["imageUploader"])
            response = {}
            response["status"] = True
            return build_actual_response(jsonify(response)),200
        except Exception as e:
            print(str(e))
            response = {
                "status": False
            }
            return build_actual_response(jsonify(response)),400

@app.route('/editlocation', methods = ["OPTIONS","POST"])
@cross_origin()
def editlocation():
    if request.method == "OPTIONS":
        return build_preflight_response
    elif request.method == "POST":
        jsonData = request.json
        username = jsonData["username"]
        location = jsonData["location"]
        response = {}
        profilePic = None
        for act in profiles:
            if act["username"] == username:
                act["location"] = location
                response["status"] = True
                return build_actual_response(jsonify(response)),200


@app.route('/editprofilepicture', methods = ["OPTIONS","POST"])
@cross_origin()
def editProfilePicture():
    if request.method == "OPTIONS":
        return build_preflight_response
    elif request.method == "POST":
        jsonData = request.json
        username = jsonData["username"]
        profilePicture = jsonData["profilePicture"].split(',')[1]

        response = {}
        profilePic = None
        for act in profiles:
            if act["username"] == username:
                act["profilePicture"] = profilePicture
                response["status"] = True
                return build_actual_response(jsonify(response)),200

@app.route('/deleteimage', methods = ["OPTIONS","POST"])
@cross_origin()
def deleteimage():
    if request.method == "OPTIONS":
        return build_preflight_response
    elif request.method == "POST":
        print("JSONDATA",request)
        jsonData = request.json
        username = jsonData["username"]
        imageUUID = jsonData["imageUUID"]
        response = {}
        profilePic = None
        for act in images:
            if act["imageUUID"] == imageUUID:
                images.remove(act)
                response["status"] = True
                return build_actual_response(jsonify(response)),200



if __name__ == '__main__':
    app.run(host = '0.0.0.0', port = 5000, debug=True)




