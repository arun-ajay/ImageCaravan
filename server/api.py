# import the necessary packages
import flask
import json
import mariadb
from flask import jsonify, request
from images import *

app = flask.Flask(__name__)
app.config["DEBUG"] = True

def build_preflight_response():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add('Access-Control-Allow-Headers', "*")
    response.headers.add('Access-Control-Allow-Methods', "*")
    return response
    
def build_actual_response(response):
    #response.headers.add("Access-Control-Allow-Origin", "*")
    return response

# configuration used to connect to MariaDB
config = {
    'host': '127.0.0.1',
    'port': 3306,
    'user': 'nour',
    'password': 'Winxclub1',
    'database': 'ImageCaravan'
}

#route to get random image collection
@app.route('/randomimagecollection', methods = ['OPTIONS','GET'])
def randomimagecollection():
    if request.method == 'OPTIONS':
        return build_preflight_response
    elif request.method == 'GET':       
        try:
            conn = mariadb.connect(**config)
            cur = conn.cursor()
            cur.execute("select * from Image where visible = '1' ")
            randomImages = cur.fetchall()
            if randomImages is not None:
                print (type(randomImages))
                randomImages = list(randomImages)
                conn.close()

                random = []
                for item in randomImages:
                    randomImage = {
                        'imageTitle' : item [0],
                        'imageCaption' : item [2],
                        'imageUploader' : item [4],
                        'imageBase64' : item [3],
                        'imageUUID' : item [1]
                    }
                    random.append(randomImage)
                body = {
                    'randomImageCollection' : random
                }
            else:
                body = {
                    'randomImageCollection': []
                }
            return build_actual_response(jsonify(body)), 200

        except Exception as e:
            body = {
                'Error': "Can't get random image collection!"
            }
            print("ERROR MSG:",str(e))
            return build_actual_response(jsonify(body)), 400

# route to get all image titles 
@app.route('/getallimagetitles', methods = ['OPTIONS','GET'])
def getallimagetitles():
    if request.method == 'OPTIONS':
        return build_preflight_response
    elif request.method == 'GET':       
        try:
            conn = mariadb.connect(**config)
            cur = conn.cursor()
            cur.execute("select imageTitle, imageUUID from Image where visible = '1'")
            imageTitles = cur.fetchall()

            if imageTitles is not None:
                print (type(imageTitles))
                imageTitles = list(imageTitles)
                conn.close()

                Images = []
                for item in imageTitles:
                    Image = {
                        'imageTitle' : item [0],
                        'imageUUID' : item [1]
                    }
                    Images.append(Image)

                body = {
                    'getAllImageTitles' : Images
                }
            else:
                body = {
                    'getAllImageTitles': []
                }
            return build_actual_response(jsonify(body)), 200

        except Exception as e:
            body = {
                'Error': "Can't get all image titles!"
            }
            print("ERROR MSG:",str(e))
            return build_actual_response(jsonify(body)), 400

#route to get all hashtags
@app.route ('/gethashtags', methods = ['OPTIONS', 'GET'])
def gethashtags():
    if request.method == 'OPTIONS':
        return build_preflight_response
    elif request.method == 'GET':       
        try:
            conn = mariadb.connect(**config)
            cur = conn.cursor()
            cur.execute("select hashtag, count(hashtag) AS CountOf FROM hashtag WHERE visible = '1' GROUP BY hashtag ")
            hashtags = cur.fetchall()

            if hashtags is not None:
                print (type(hashtags))
                print (hashtags)
                hashtags = list(hashtags)
                conn.close()

                hashtag = []
                for item in hashtags:
                    tags = {
                        'hashtag' : item [0],
                        'imageCount' : item [1]
                    }
                    hashtag.append(tags)

                body = {
                    'getAllHashtags' : hashtag
                }
            else:
                body = {
                    'getAllHashtags': []
                }
            return build_actual_response(jsonify(body)), 200

        except Exception as e:
            body = {
                'Error': "Can't get all hashtags!"
            }
            print("ERROR MSG:",str(e))
            return build_actual_response(jsonify(body)), 400

# route to get all profile usernames
@app.route('/getallprofileusernames', methods = ['OPTIONS','GET'])
def getallprofileusernames():
    if request.method == 'OPTIONS':
        return build_preflight_response
    elif request.method == 'GET':       
        try:
            conn = mariadb.connect(**config)
            cur = conn.cursor()
            #cur.execute("select imageUploader, COUNT(imageUploader) as CountOf from image group by imageUploader;")
            cur.execute("SELECT * FROM users")
            userNames = cur.fetchall()

            if userNames is not None:
                print (type(userNames))
                print(userNames)
                userNames = list(userNames)
                conn.close()

                Users = []
                for item in userNames:
                    
                    User = {
                        'username' : item [1],
                        'imageCount' : len(json.loads(item[6]))
                    }
                    Users.append(User)

                body = {
                    'getAllProfileUsernames' : Users
                }
            else:
                body = {
                    'getAllProfileUsernames': []
                }
            return build_actual_response(jsonify(body)), 200

        except Exception as e:
            body = {
                'Error': "Can't get all profile usernames!"
            }
            print("ERROR MSG:",str(e))
            return body, 400

# route to get all profiles
@app.route('/getallprofiles', methods = ['OPTIONS','GET'])
def getallprofiles():
    if request.method == 'OPTIONS':
        return build_preflight_response
    elif request.method == 'GET':       
        try:
            conn = mariadb.connect(**config)
            cur = conn.cursor()
            cur.execute("select users.username, users.profilePicture, users.bio, users.location, (select count(*) from followers where users.username = followers.username) as followersCount, (select count(*) from following where users.username = following.username) as followingCount, (select count(*) from image where users.username = image.imageUploader) as imageCount from users;")
            allProfiles = cur.fetchall()

            if allProfiles is not None:
                print(type(allProfiles))
                print(allProfiles)
                allProfiles= list(allProfiles)
                conn.close()

                profiles = []
                for item in allProfiles:
                    profile = {
                        'username' : item [0],
                        'profilePicture' : item [1],
                        'bio' : item [2],
                        'location' : item[3],
                        'followers' : item [4],
                        'following' : item[5],
                        'imageCount' : item [6]
                    }
                    profiles.append(profile)

                body = {
                    'getAllProfiles' : profiles
                }
            else:
                body = {
                    'getAllProfiles': []
                }
            return build_actual_response(jsonify(body)), 200

        except Exception as e:
            body = {
                'Error': "Can't get all profiles!"
            }
            print("ERROR MSG:",str(e))
            return body, 400

# route to get a single profile
@app.route('/getprofile', methods = ['OPTIONS','GET'])
def getprofile():
    if request.method == 'OPTIONS':
        return build_preflight_response
    elif request.method == 'GET':       
        try:
            conn = mariadb.connect(**config)
            cur = conn.cursor()
            
            username = request.args.get('username')
            print("USERNAME",username)
            cur.execute("SELECT * FROM USERS WHERE username = ?",(username,))

            dbProfileData = cur.fetchone()
            print(dbProfileData)
            dbProfileData = list(dbProfileData)
            dbProfileData[6] = dbProfileData[6].split(",")
            print(dbProfileData)
            response = {}
            response["profileData"] = {}
            response["profileData"]["username"] = dbProfileData[1]
            response["profileData"]["bio"] = dbProfileData[3]
            response["profileData"]["location"] = dbProfileData[4]
            response["profileData"]["profilePicture"] = dbProfileData[5]
            
            cur.execute("SELECT * FROM FOLLOWERS WHERE username = ?",(username,))
            followersList = []
            followersData = cur.fetchall()
            for follower in followersData:
                followersList.append(follower[1])

            response["profileData"]["followersList"] = followersList
            
            cur.execute("SELECT * FROM FOLLOWING WHERE username = ?",(username,))
            followingList = []
            followingData = cur.fetchall()
            for following in followingData:
                followingList.append(following[1])

            response["profileData"]["followingList"] = followingList

            cur.execute("SELECT * FROM IMAGE WHERE imageUploader=? AND visible = 1",(username,))
            imageList = []
            imageData = cur.fetchall()
            for image in imageData:
                imageOBJ = {}
                imageOBJ["imageTitle"] = image[0]
                imageOBJ["imageCaption"] = image[2]
                imageOBJ["imageUploader"] = image[4]
                imageOBJ["imageBase64"] = image[3]
                imageOBJ["imageUUID"] = image[1]
                imageList.append(imageOBJ)
            
            response["profileData"]["imageData"] = imageList

            cur.execute("SELECT * FROM profilecomments JOIN users on users.username = profilecomments.commenter where profile = ? ", (username,))
            commentsList = []
            commentData = cur.fetchall()
            for comment in commentData:
                commentOBJ = {}
                commentOBJ["comment"] = comment [1]
                commentOBJ["commenter"] = comment [2]
                commentOBJ["commenterPicture"] = comment [8]
                commentsList.append(commentOBJ)
            response["profileData"]["comments"] = commentsList

            conn.close()

            return build_actual_response(jsonify(response))
        except Exception as e:
            print(str(e))

# route to get a single image
@app.route('/getimage', methods = ['OPTIONS','GET'])
def getimage():
    if request.method == 'OPTIONS':
        return build_preflight_response
    elif request.method == 'GET':
        try:
            conn = mariadb.connect(**config)
            cur = conn.cursor()

            imageUUID = request.args.get('imageUUID')
            print("IMAGEUUID",imageUUID)
            cur.execute("SELECT * FROM IMAGE WHERE imageUUID = ?",(imageUUID,))
            dbImageData = cur.fetchone()

            response = {}
            response["imageData"] = {}
            response["imageData"]["imageTitle"] = dbImageData[0]
            response["imageData"]["imageCaption"] = dbImageData[2]
            response["imageData"]["imageUUID"] = dbImageData[1]
            response["imageData"]["imageBase64"] = dbImageData[3]

            cur.execute("select hashtag, count(hashtag) AS CountOf FROM hashtag GROUP BY hashtag")
            hashtagData = cur.fetchall()

            hashtagList = []
            for hashtag in hashtagData:
                tags = {
                    'hashtag' : hashtag [0],
                    'imageCount' : hashtag [1]
                }
                hashtagList.append(tags)
            response["imageData"]["hashtagList"] = hashtagList

            cur.execute("SELECT * FROM imagecomments WHERE imageUUID=?",(imageUUID,))
            commentList = []
            commentData = cur.fetchall()
            for comment in commentData:
                commentOBJ = {}
                commentOBJ["comment"] = comment[0]
                commentOBJ["commenter"] = comment[1]
                commentOBJ["commenterPicture"] = comment[2]
                commentList.append(commentOBJ)
            response["imageData"]["commentData"] = commentList

            conn.close()

            return build_actual_response(jsonify(response))

        except Exception as e:
            print(str(e))

# route to return search data
@app.route('/search', methods = ['OPTIONS','GET'])
def search():
    if request.method == 'OPTIONS':
        return build_preflight_response
    elif request.method == 'GET':
        try:
            conn = mariadb.connect(**config)
            cur = conn.cursor()
        
            searchType = request.args.get('searchType')
            value = request.args.get('value')
            print(type(value))
            #print("SEARCH TYPE",searchType)
            #print("VALUE",value)
            user = value.split(',')
            #print("USERS LIST",users)
            image = value.split(',')
            #print("IMAGETITLE LIST",imageTitle)
            hash = value.split(',')
            #print("HASHTAG LIST",hashtag)

            print (user)
            if searchType == "user":
                response = {}
                imageUploaders = []
                for value in user:
                    cur.execute("SELECT * from image WHERE imageUploader = ? AND visible = '1'", (value,))
                    imageData = cur.fetchall()
                    print(imageData)
                    
                    for image in imageData:
                        imageOBJ = {}
                        imageOBJ["imageTitle"] = image[0]
                        imageOBJ["imageCaption"] = image[2]
                        imageOBJ["imageUploader"] = image[4]
                        imageOBJ["ImageBase64"] = image [3]
                        imageOBJ["imageUUID"] = image[1]
                        if imageOBJ not in imageUploaders:
                            imageUploaders.append(imageOBJ)
                response["data"] = imageUploaders

            if searchType == "image":
                imageTitles = []
                response = {}
                for value in image:
                    cur.execute("SELECT * from image WHERE imageTitle = ? AND visible = '1'", (value,))
                    imagesData = cur.fetchall()
    
                    for image in imagesData:
                        imageOBJ = {}
                        imageOBJ["imageTitle"] = image[0]
                        imageOBJ["imageCaption"] = image[2]
                        imageOBJ["imageUploader"] = image[4]
                        imageOBJ["ImageBase64"] = image [3]
                        imageOBJ["imageUUID"] = image[1]
                        if imageOBJ not in imageTitles:
                            imageTitles.append(imageOBJ)
                response["data"] = imageTitles

            if searchType == "hash":
                hashTags = []
                response = {}
                for value in hash:
                    cur.execute("SELECT * from image JOIN hashtag on image.imageUUID = hashtag.imageUUID where hashtag = ? AND visible = '1'",(value,))
                    hashtagData = cur.fetchall()
                    
                    for hashtag in hashtagData:
                        hashtagOBJ = {}
                        hashtagOBJ["imageTitle"] = hashtag[0]
                        hashtagOBJ["imageCaption"] = hashtag[2]
                        hashtagOBJ["imageUploader"] = hashtag[4]
                        hashtagOBJ["ImageBase64"] = hashtag[3]
                        hashtagOBJ["imageUUID"] = hashtag[1]
                        if hashtagOBJ not in hashTags:
                            hashTags.append(hashtagOBJ)
                response["data"] = hashTags
                    
            conn.close()
                            
            return build_actual_response(jsonify(response)), 200

        except Exception as e:
            body = {
                'Error': "Search failed"
            }
            print("ERROR MSG:",str(e))
            return body, 400

@app.route('/createaccount', methods = ['OPTIONS', 'POST'])
def createacccount():
    if request.method == "OPTIONS":
        return build_preflight_response
    elif request.method == "POST":
        try:
            jsonData = request.json

            rowData = [] # Data to be uploaded to database
            rowData.append(jsonData["username"])
            rowData.append(jsonData["password"])
            rowData.append(jsonData["bio"])
            if jsonData["profilePicture"] is None:
                rowData.append(samplePicture())
            else:
                rowData.append(jsonData["profilePicture"].split(',')[1])
            rowData.append(jsonData["location"])
            rowData.append(json.dumps([])) #imageList is empty 

            conn = mariadb.connect(**config)
            cur = conn.cursor()
            cur.execute("SELECT * FROM users WHERE username = ?" , (jsonData["username"],))
            userData = cur.fetchone()

            if userData is not None:
                conn.close()
                return build_actual_response(jsonify({
                    "Message" : "There already exists a user with this username!"
                })), 400
            else:
                cur.execute("INSERT INTO users (username, password, bio, profilePicture, location, imageList) VALUES (?,?,?,?,?,?)", tuple(rowData))
                conn.commit()
                conn.close()
                return build_actual_response(jsonify({
                "Message" : "You have successfully created an account!"
            })) , 200
        except Exception as e:
            body = {
                'Error': "Creat account failed!"
            }
            print("ERROR MSG:",str(e))
            return body, 400

@app.route('/login', methods = ['OPTIONS','POST'])
def login():
    if request.method == "OPTIONS":
        return build_preflight_response
    elif request.method == "POST":
        try: 
            jsonData = request.json

            rowData = [] # Data to be uploaded to database
            rowData.append(jsonData["username"])
            rowData.append(jsonData["password"])

            conn = mariadb.connect(**config)
            cur = conn.cursor()
            cur.execute("SELECT * FROM users WHERE username = ? AND password = ? ",tuple(rowData))
            userData = cur.fetchone()
            print(userData)

            cur.execute("SELECT distinct following FROM Following WHERE username = ?",(jsonData["username"],))
            followingData = cur.fetchall()
            print(followingData)

            cur.execute("SELECT * FROM users WHERE username = ?",(jsonData["username"],))
            imageData = cur.fetchone()
            print(imageData)

            if userData is not None:
                response = {}
                response["loginData"] = {}
                response["verified"] = {}
                response["verified"] = "1"
                response["loginData"]["username"] = imageData[1]
                response["loginData"]["profilePicture"] = imageData[5]
                followList = []
                for follow in followingData:
                    followList.append(follow[0])
                response["loginData"]["followList"] = followList
                return build_actual_response(jsonify(response)), 200

            conn.close()
        except Exception as e:
            body = {
                'Error': "userName or password combination does not exit!"
            }
            print("ERROR MSG:",str(e))
            return body, 400

@app.route('/uploadimage', methods = ['OPTIONS', 'POST'])
def uploadimage():
    if request.method == "OPTIONS":
        return build_preflight_response
    elif request.method == "POST":
        try:
            jsonData = request.json

            rowData = [] # Data to be uploaded to database
            if jsonData["imageUploader"] is None:
                rowData.append("Anonymous")
            else:
                rowData.append(jsonData["imageUploader"])
            rowData.append(jsonData["imageBase64"].split(',')[1])
            rowData.append(jsonData["imageTitle"])
            rowData.append(jsonData["imageCaption"])
            rowData.append(jsonData["hashtags"])

            conn = mariadb.connect(**config)
            cur = conn.cursor()
            cur.execute("INSERT INTO image (imageUploader, imageBase64, imageTitle, imageCaption) VALUES (?,?,?,?)", tuple(rowData))
            conn.commit()

            cur.execute("SELECT max(imageUUID) from image")
            imageUUID = cur.fetchall()
            print (imageUUID)
            imageUUID = imageUUID[0][0]

            for hashtag in rowData[4]:
                cur.execute("INSERT INTO hashtag (hashtag,imageUUID) VALUES (?,?)",(hashtag,imageUUID,))
                conn.commit()

            result = []
            cur.execute("SELECT imageList from users where username = ?", (jsonData["imageUploader"],))
            images = cur.fetchone()
            images = images[0]
            result = json.loads(images)
            print(result)
            print(type(result))

            cur.execute("SELECT max(imageUUID) from image ")
            imageUUID2 = cur.fetchall()
            imageUUID2 = imageUUID2[0][0]

            result.append(imageUUID2)

            print(result)
            final = json.dumps(result)

            imageList = []
            for image in result:
                cur.execute ("UPDATE users SET imagelist = ? WHERE username = ?", (json.dumps(result),jsonData["imageUploader"],))
                conn.commit()

            conn.close()
            return build_actual_response(jsonify({
                "Status" : "1"
            })) , 200
        except Exception as e:
            body = {
                'Error': "Can't upload picture!"
            }
            print("ERROR MSG:",str(e))
            return build_actual_response(jsonify(body)), 400
# route to follow a person
@app.route('/follow', methods = ['OPTIONS','POST'])
def follow():
    if request.method == 'OPTIONS':
        return build_preflight_response
    elif request.method == 'POST':
        try:
            jsonData = request.json

            rowData = []
            rowData.append(jsonData["username"])
            rowData.append(jsonData["follow"])

            conn = mariadb.connect(**config)
            cur = conn.cursor()
            cur.execute("INSERT INTO following (username, following) VALUES (?,?)", tuple(rowData))
            result = cur.fetchall
            conn.commit()

            cur.execute("INSERT INTO followers (follower, username) VALUES (?,?)", tuple(rowData))
            conn.commit()

            cur.execute("SELECT distinct following FROM Following WHERE username = ?",(jsonData["username"],))
            followingData = cur.fetchall()
            print(followingData)

            response = {}
            followList = []
            for follow in followingData:
                followList.append(follow[0])
            response["followList"] = followList
            return build_actual_response(jsonify(response)), 200

            conn.close()
        except Exception as e:
            body = {
                'Error': "Can't follow user!"
            }
            print("ERROR MSG:",str(e))
            return build_actual_response(jsonify(body)), 400

@app.route('/unfollow', methods = ['OPTOINS', 'POST'])
def unfollow():
    if request.method == 'OPTIONS':
        return build_preflight_response
    elif request.method == 'POST':
        try: 
            jsonData = request.json

            rowData = []
            rowData.append(jsonData["username"])
            rowData.append(jsonData["unfollow"])

            conn = mariadb.connect(**config)
            cur = conn.cursor()
            cur.execute("DELETE FROM Following WHERE username = ? AND following = ?", tuple(rowData))
            conn.commit()
            
            cur.execute("DELETE FROM Followers WHERE follower = ? AND username = ?", tuple(rowData))
            conn.commit()

            cur.execute("SELECT distinct following FROM Following WHERE username = ?",(jsonData["username"],))
            followingData = cur.fetchall()
            print(followingData)

            response = {}
            followList = []
            for follow in followingData:
                followList.append(follow[0])
            response["followList"] = followList
            return build_actual_response(jsonify(response)), 200

            conn.close()
        except Exception as e:
            body = {
                'Error': "Can't unfollow user!"
            }
            print("ERROR MSG:",str(e))
            return build_actual_response(jsonify(body)), 400

@app.route('/imagecomment', methods = ['OPTIONS', 'POST'])
def imagecomment():
    if request.method == 'OPTIONS':
        return build_preflight_response
    elif request.method == 'POST':
        try:
            jsonData = request.json

            rowData = []
            rowData.append(jsonData["targetImageUUID"])
            rowData.append(jsonData["comment"])
            rowData.append(jsonData["username"])

            conn = mariadb.connect(**config)
            cur = conn.cursor()

            cur.execute("SELECT visible from image WHERE imageUUID = ?", (jsonData["targetImageUUID"],))
            imageStatus = cur.fetchone()
            print(imageStatus)

            if imageStatus == "1":
                cur.execute("INSERT INTO imagecomments VALUES (?,?,?)", tuple(rowData))
                conn.commit()
                conn.close()

                return build_actual_response(jsonify({
                    "Status" : "1"
                })) , 200
        except Exception as e:
            body = {
                'Error': "Can't comment on image!"
            }
            print("ERROR MSG:",str(e))
            return build_actual_response(jsonify(body)), 400


@app.route('/profilecomment', methods = ['OPTIONS', 'POST'])
def profilecomment():
    if request.method == 'OPTIONS':
        return build_preflight_response
    elif request.method == 'POST':
        try:
            jsonData = request.json

            rowData = []
            rowData.append(jsonData["targetUsernameProfile"]) #profile
            rowData.append(jsonData["comment"])
            rowData.append(jsonData["username"]) #commenter 
            
            conn = mariadb.connect(**config)
            cur = conn.cursor()

            cur.execute("INSERT INTO profilecomments VALUES (?,?,?)", tuple(rowData))
            conn.commit()
            conn.close()

            return build_actual_response(jsonify({
                "Status" : "1"
            })) , 200
        except Exception as e:
            body = {
                'Error': "Can't comment on profile!"
            }
            print("ERROR MSG:",str(e))
            return build_actual_response(jsonify(body)), 400

@app.route('/deleteimage', methods = ['OPTIONS', 'POST'])
def deleteimage():
    if request.method == 'OPTIONS':
        return build_preflight_response
    elif request.method == 'POST':
        try:
            jsonData = request.json

            rowData = []
            rowData.append(jsonData["username"])
            rowData.append(jsonData["imageUUID"])

            conn = mariadb.connect(**config)
            cur = conn.cursor()

            cur.execute("UPDATE image SET visible = '0' WHERE imageUUID = ?",(jsonData["imageUUID"],))
            conn.commit()
            
            cur.execute("UPDATE hashtag SET visible = '0' WHERE imageUUID = ?",(jsonData["imageUUID"],))
            conn.commit()

            cur.execute("select imagelist from users where username = ?", (jsonData["username"],))
            result = cur.fetchone()
            result = result[0]
            print(result)
            final = json.dumps(result)
            final = json.loads(result)
            print(final)
            imageUUID = int(jsonData["imageUUID"])
            final.remove(imageUUID)
            final = json.dumps(final)
            print(final)

            cur.execute("UPDATE users set imagelist = ? where username = ?", (final,jsonData["username"],))
            conn.commit()
            conn.close()

            return build_actual_response(jsonify({
                "Status" : "1"
            })) , 200
        except Exception as e:
            body = {
                'Error': "Can't delete picture!"
            }
            print("ERROR MSG:",str(e))
            return build_actual_response(jsonify(body)), 400

@app.route('/editlocation', methods = ['OPTIONS', 'POST'])
def editlocation():
    if request.method == 'OPTIONS':
        return build_preflight_response
    elif request.method == 'POST':
        try:
            jsonData = request.json

            rowData = []
            rowData.append(jsonData["location"])
            rowData.append(jsonData["username"])

            conn = mariadb.connect(**config)
            cur = conn.cursor()

            cur.execute("UPDATE users SET location = ? WHERE username = ?", tuple(rowData))
            conn.commit()
            conn.close()

            return build_actual_response(jsonify({
                "Status" : "1"
            })) , 200
        except Exception as e:
            body = {
                'Error': "Can't edit location!"
            }
            print("ERROR MSG:",str(e))
            return build_actual_response(jsonify(body)), 400

@app.route('/editprofilepicture', methods = ['OPTIONS', 'POST'])
def editprofilepicture():
    if request.method == 'OPTIONS':
        return build_preflight_response
    elif request.method == 'POST':
        try:
            jsonData = request.json

            rowData = []
            rowData.append(jsonData["profilePicture"].split(',')[1])
            rowData.append(jsonData["username"])

            conn = mariadb.connect(**config)
            cur = conn.cursor()

            cur.execute("UPDATE users SET profilePicture = ? WHERE username = ?", tuple(rowData))
            conn.commit()
            conn.close()

            return build_actual_response(jsonify({
                "Status" : "1"
            })) , 200
        except Exception as e:
            body = {
                'Error': "Can't edit profile picture!"
            }
            print("ERROR MSG:",str(e))
            return build_actual_response(jsonify(body)), 400

@app.route('/editbio', methods = ['OPTIONS', 'POST'])
def editbio():
    if request.method == 'OPTIONS':
        return build_preflight_response
    elif request.method == 'POST':
        try:
            jsonData = request.json

            rowData = []
            rowData.append(jsonData["bio"])
            rowData.append(jsonData["username"])

            conn = mariadb.connect(**config)
            cur = conn.cursor()

            cur.execute("UPDATE users SET bio = ? WHERE username = ?", tuple(rowData))
            conn.commit()
            conn.close()

            return build_actual_response(jsonify({
                "Status" : "1"
            })) , 200
        except Exception as e:
            body = {
                'Error': "Can't edit bio!"
            }
            print("ERROR MSG:",str(e))
            return build_actual_response(jsonify(body)), 400
          
if __name__ == '__main__':
    app.run()