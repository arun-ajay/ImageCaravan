import json
from flask import Flask, jsonify, request
from images import *


profileComments = [
        {
            "comment": "I love your work! Please post more! :)",
            "commenter" : "MaritaAnona",
            "commenterPicture": sampleProfile3()
        },
        {
            "comment": "Your photos are okay I guess",
            "commenter" : "Epha",
            "commenterPicture": sampleProfile2()
        },
        {
            "comment": "#moredogsplz",
            "commenter" : "Wollem",
            "commenterPicture": sampleProfile5()
        },
        {
            "comment": "Follow me please!",
            "commenter" : "Cleve",
            "commenterPicture": sampleProfile()
        }
    ]

def returnProfileComments():

    return profileComments

imageComments = [
        {
            "comment": "Love the photo!",
            "commenter" : "MaritaAnona",
            "commenterPicture": sampleProfile3()
        },
        {
            "comment": "Wow, where was this??!",
            "commenter" : "Epha",
            "commenterPicture": sampleProfile2()
        },
        {
            "comment": "Take me with you next time!",
            "commenter" : "Wollem",
            "commenterPicture": sampleProfile5()
        },
        {
            "comment": "Amazing photo, which camera were you using??",
            "commenter" : "Cleve",
            "commenterPicture": sampleProfile()
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
                    "imageBase64": sampleProfile(),
                    "imageUUID": "3"
                },
                {
                    "imageTitle": "Cute dog 4",
                    "imageCaption": "Check out my adorable puppy!!!",
                    "imageUploader": "Wollem",
                    "imageBase64": sampleImage(),
                    "imageUUID": "4"
                },
                {
                    "imageTitle": "Cute dog 5",
                    "imageCaption": "Check out my adorable puppy!!!",
                    "imageUploader": "Epha",
                    "imageBase64": sampleProfile(),
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
                    "imageBase64": sampleProfile(),
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
                    "imageBase64": sampleProfile(),
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

def build_preflight_response():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add('Access-Control-Allow-Headers', "*")
    response.headers.add('Access-Control-Allow-Methods', "*")
    return response
    
def build_actual_response(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
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
                response["profileData"]["imageData"] = returnImages()
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

        response = {"data": returnImages()}
        return build_actual_response(jsonify(response)),200


@app.route('/login', methods = ["OPTIONS","GET"])
def login():

    print(request.json)
    if request.method == "OPTIONS":
        return build_preflight_response
    elif request.method == "POST":
        jsonData = request.json
        username = jsonData["username"]
        password = jsonData["password"]

        response = {"data": returnImages()}
        return build_actual_response(jsonify(response)),200

if __name__ == '__main__':
    app.run(host = '0.0.0.0', port = 5000, debug=True)



