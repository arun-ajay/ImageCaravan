import React,{Component} from 'react';
import styles from './profile.module.scss';
import {Redirect} from 'react-router';
import queryString from 'query-string';

import {getProfile,deleteimage,follow,unfollow,profilecomment,editbio,editlocation,editprofilepicture} from "utils/api";

import {Grid,Card,Transition,Image,Label,Flag,Form, Button,Header,Icon, Loader, Comment,Popup,Dropdown} from 'semantic-ui-react'



const countryOptions = [{key: 'af', value: 'af', flag: 'af', text: 'Afghanistan' },
{key: 'ax', value: 'ax', flag: 'ax', text: 'Aland Islands' },
{key: 'al', value: 'al', flag: 'al', text: 'Albania' },
{key: 'dz', value: 'dz', flag: 'dz', text: 'Algeria' },
{key: 'as', value: 'as', flag: 'as', text: 'American Samoa' },
{key: 'ad', value: 'ad', flag: 'ad', text: 'Andorra' },
{key: 'ao', value: 'ao', flag: 'ao', text: 'Angola' },
{key: 'ai', value: 'ai', flag: 'ai', text: 'Anguilla' },
{key: 'ag', value: 'ag', flag: 'ag', text: 'Antigua' },
{key: 'ar', value: 'ar', flag: 'ar', text: 'Argentina' },
{key: 'am', value: 'am', flag: 'am', text: 'Armenia' },
{key: 'aw', value: 'aw', flag: 'aw', text: 'Aruba' },
{key: 'au', value: 'au', flag: 'au', text: 'Australia' },
{key: 'at', value: 'at', flag: 'at', text: 'Austria' },
{key: 'az', value: 'az', flag: 'az', text: 'Azerbaijan' },
{key: 'bs', value: 'bs', flag: 'bs', text: 'Bahamas' },
{key: 'bh', value: 'bh', flag: 'bh', text: 'Bahrain' },
{key: 'bd', value: 'bd', flag: 'bd', text: 'Bangladesh' },
{key: 'bb', value: 'bb', flag: 'bb', text: 'Barbados' },
{key: 'by', value: 'by', flag: 'by', text: 'Belarus' },
{key: 'be', value: 'be', flag: 'be', text: 'Belgium' },
{key: 'bz', value: 'bz', flag: 'bz', text: 'Belize' },
{key: 'bj', value: 'bj', flag: 'bj', text: 'Benin' },
{key: 'bm', value: 'bm', flag: 'bm', text: 'Bermuda' },
{key: 'bt', value: 'bt', flag: 'bt', text: 'Bhutan' },
{key: 'bo', value: 'bo', flag: 'bo', text: 'Bolivia' },
{key: 'ba', value: 'ba', flag: 'ba', text: 'Bosnia' },
{key: 'bw', value: 'bw', flag: 'bw', text: 'Botswana' },
{key: 'bv', value: 'bv', flag: 'bv', text: 'Bouvet Island' },
{key: 'br', value: 'br', flag: 'br', text: 'Brazil' },
{key: 'vg', value: 'vg', flag: 'vg', text: 'British Virgin Islands' },
{key: 'bn', value: 'bn', flag: 'bn', text: 'Brunei' },
{key: 'bg', value: 'bg', flag: 'bg', text: 'Bulgaria' },
{key: 'bf', value: 'bf', flag: 'bf', text: 'Burkina Faso' },
{key: 'mm', value: 'mm', flag: 'mm', text: 'Burma' },
{key: 'bi', value: 'bi', flag: 'bi', text: 'Burundi' },
{key: 'tc', value: 'tc', flag: 'tc', text: 'Caicos Islands' },
{key: 'kh', value: 'kh', flag: 'kh', text: 'Cambodia' },
{key: 'cm', value: 'cm', flag: 'cm', text: 'Cameroon' },
{key: 'ca', value: 'ca', flag: 'ca', text: 'Canada' },
{key: 'cv', value: 'cv', flag: 'cv', text: 'Cape Verde' },
{key: 'ky', value: 'ky', flag: 'ky', text: 'Cayman Islands' },
{key: 'cf', value: 'cf', flag: 'cf', text: 'Central African Republic' },
{key: 'td', value: 'td', flag: 'td', text: 'Chad' },
{key: 'cl', value: 'cl', flag: 'cl', text: 'Chile' },
{key: 'cn', value: 'cn', flag: 'cn', text: 'China' },
{key: 'cx', value: 'cx', flag: 'cx', text: 'Christmas Island' },
{key: 'cc', value: 'cc', flag: 'cc', text: 'Cocos Islands' },
{key: 'co', value: 'co', flag: 'co', text: 'Colombia' },
{key: 'km', value: 'km', flag: 'km', text: 'Comoros' },
{key: 'cg', value: 'cg', flag: 'cg', text: 'Congo Brazzaville' },
{key: 'cd', value: 'cd', flag: 'cd', text: 'Congo' },
{key: 'ck', value: 'ck', flag: 'ck', text: 'Cook Islands' },
{key: 'cr', value: 'cr', flag: 'cr', text: 'Costa Rica' },
{key: 'ci', value: 'ci', flag: 'ci', text: 'Cote Divoire' },
{key: 'hr', value: 'hr', flag: 'hr', text: 'Croatia' },
{key: 'cu', value: 'cu', flag: 'cu', text: 'Cuba' },
{key: 'cy', value: 'cy', flag: 'cy', text: 'Cyprus' },
{key: 'cz', value: 'cz', flag: 'cz', text: 'Czech Republic' },
{key: 'dk', value: 'dk', flag: 'dk', text: 'Denmark' },
{key: 'dj', value: 'dj', flag: 'dj', text: 'Djibouti' },
{key: 'dm', value: 'dm', flag: 'dm', text: 'Dominica' },
{key: 'do', value: 'do', flag: 'do', text: 'Dominican Republic' },
{key: 'ec', value: 'ec', flag: 'ec', text: 'Ecuador' },
{key: 'eg', value: 'eg', flag: 'eg', text: 'Egypt' },
{key: 'sv', value: 'sv', flag: 'sv', text: 'El Salvador' },
{key: 'gb', value: 'gb', flag: 'gb', text: 'England' },
{key: 'gq', value: 'gq', flag: 'gq', text: 'Equatorial Guinea' },
{key: 'er', value: 'er', flag: 'er', text: 'Eritrea' },
{key: 'ee', value: 'ee', flag: 'ee', text: 'Estonia' },
{key: 'et', value: 'et', flag: 'et', text: 'Ethiopia' },
{key: 'eu', value: 'eu', flag: 'eu', text: 'European Union' },
{key: 'fk', value: 'fk', flag: 'fk', text: 'Falkland Islands' },
{key: 'fo', value: 'fo', flag: 'fo', text: 'Faroe Islands' },
{key: 'fj', value: 'fj', flag: 'fj', text: 'Fiji' },
{key: 'fi', value: 'fi', flag: 'fi', text: 'Finland' },
{key: 'fr', value: 'fr', flag: 'fr', text: 'France' },
{key: 'gf', value: 'gf', flag: 'gf', text: 'French Guiana' },
{key: 'pf', value: 'pf', flag: 'pf', text: 'French Polynesia' },
{key: 'tf', value: 'tf', flag: 'tf', text: 'French Territories' },
{key: 'ga', value: 'ga', flag: 'ga', text: 'Gabon' },
{key: 'gm', value: 'gm', flag: 'gm', text: 'Gambia' },
{key: 'ge', value: 'ge', flag: 'ge', text: 'Georgia' },
{key: 'de', value: 'de', flag: 'de', text: 'Germany' },
{key: 'gh', value: 'gh', flag: 'gh', text: 'Ghana' },
{key: 'gi', value: 'gi', flag: 'gi', text: 'Gibraltar' },
{key: 'gr', value: 'gr', flag: 'gr', text: 'Greece' },
{key: 'gl', value: 'gl', flag: 'gl', text: 'Greenland' },
{key: 'gd', value: 'gd', flag: 'gd', text: 'Grenada' },
{key: 'gp', value: 'gp', flag: 'gp', text: 'Guadeloupe' },
{key: 'gu', value: 'gu', flag: 'gu', text: 'Guam' },
{key: 'gt', value: 'gt', flag: 'gt', text: 'Guatemala' },
{key: 'gw', value: 'gw', flag: 'gw', text: 'Guinea-Bissau' },
{key: 'gn', value: 'gn', flag: 'gn', text: 'Guinea' },
{key: 'gy', value: 'gy', flag: 'gy', text: 'Guyana' },
{key: 'ht', value: 'ht', flag: 'ht', text: 'Haiti' },
{key: 'hm', value: 'hm', flag: 'hm', text: 'Heard Island' },
{key: 'hn', value: 'hn', flag: 'hn', text: 'Honduras' },
{key: 'hk', value: 'hk', flag: 'hk', text: 'Hong Kong' },
{key: 'hu', value: 'hu', flag: 'hu', text: 'Hungary' },
{key: 'is', value: 'is', flag: 'is', text: 'Iceland' },
{key: 'in', value: 'in', flag: 'in', text: 'India' },
{key: 'io', value: 'io', flag: 'io', text: 'Indian Ocean Territory' },
{key: 'id', value: 'id', flag: 'id', text: 'Indonesia' },
{key: 'ir', value: 'ir', flag: 'ir', text: 'Iran' },
{key: 'iq', value: 'iq', flag: 'iq', text: 'Iraq' },
{key: 'ie', value: 'ie', flag: 'ie', text: 'Ireland' },
{key: 'il', value: 'il', flag: 'il', text: 'Israel' },
{key: 'it', value: 'it', flag: 'it', text: 'Italy' },
{key: 'jm', value: 'jm', flag: 'jm', text: 'Jamaica' },
{key: 'jp', value: 'jp', flag: 'jp', text: 'Japan' },
{key: 'jo', value: 'jo', flag: 'jo', text: 'Jordan' },
{key: 'kz', value: 'kz', flag: 'kz', text: 'Kazakhstan' },
{key: 'ke', value: 'ke', flag: 'ke', text: 'Kenya' },
{key: 'ki', value: 'ki', flag: 'ki', text: 'Kiribati' },
{key: 'kw', value: 'kw', flag: 'kw', text: 'Kuwait' },
{key: 'kg', value: 'kg', flag: 'kg', text: 'Kyrgyzstan' },
{key: 'la', value: 'la', flag: 'la', text: 'Laos' },
{key: 'lv', value: 'lv', flag: 'lv', text: 'Latvia' },
{key: 'lb', value: 'lb', flag: 'lb', text: 'Lebanon' },
{key: 'ls', value: 'ls', flag: 'ls', text: 'Lesotho' },
{key: 'lr', value: 'lr', flag: 'lr', text: 'Liberia' },
{key: 'ly', value: 'ly', flag: 'ly', text: 'Libya' },
{key: 'li', value: 'li', flag: 'li', text: 'Liechtenstein' },
{key: 'lt', value: 'lt', flag: 'lt', text: 'Lithuania' },
{key: 'lu', value: 'lu', flag: 'lu', text: 'Luxembourg' },
{key: 'mo', value: 'mo', flag: 'mo', text: 'Macau' },
{key: 'mk', value: 'mk', flag: 'mk', text: 'Macedonia' },
{key: 'mg', value: 'mg', flag: 'mg', text: 'Madagascar' },
{key: 'mw', value: 'mw', flag: 'mw', text: 'Malawi' },
{key: 'my', value: 'my', flag: 'my', text: 'Malaysia' },
{key: 'mv', value: 'mv', flag: 'mv', text: 'Maldives' },
{key: 'ml', value: 'ml', flag: 'ml', text: 'Mali' },
{key: 'mt', value: 'mt', flag: 'mt', text: 'Malta' },
{key: 'mh', value: 'mh', flag: 'mh', text: 'Marshall Islands' },
{key: 'mq', value: 'mq', flag: 'mq', text: 'Martinique' },
{key: 'mr', value: 'mr', flag: 'mr', text: 'Mauritania' },
{key: 'mu', value: 'mu', flag: 'mu', text: 'Mauritius' },
{key: 'yt', value: 'yt', flag: 'yt', text: 'Mayotte' },
{key: 'mx', value: 'mx', flag: 'mx', text: 'Mexico' },
{key: 'fm', value: 'fm', flag: 'fm', text: 'Micronesia' },
{key: 'md', value: 'md', flag: 'md', text: 'Moldova' },
{key: 'mc', value: 'mc', flag: 'mc', text: 'Monaco' },
{key: 'mn', value: 'mn', flag: 'mn', text: 'Mongolia' },
{key: 'me', value: 'me', flag: 'me', text: 'Montenegro' },
{key: 'ms', value: 'ms', flag: 'ms', text: 'Montserrat' },
{key: 'ma', value: 'ma', flag: 'ma', text: 'Morocco' },
{key: 'mz', value: 'mz', flag: 'mz', text: 'Mozambique' },
{key: 'na', value: 'na', flag: 'na', text: 'Namibia' },
{key: 'nr', value: 'nr', flag: 'nr', text: 'Nauru' },
{key: 'np', value: 'np', flag: 'np', text: 'Nepal' },
{key: 'an', value: 'an', flag: 'an', text: 'Netherlands Antilles' },
{key: 'nl', value: 'nl', flag: 'nl', text: 'Netherlands' },
{key: 'nc', value: 'nc', flag: 'nc', text: 'New Caledonia' },
{key: 'pg', value: 'pg', flag: 'pg', text: 'New Guinea' },
{key: 'nz', value: 'nz', flag: 'nz', text: 'New Zealand' },
{key: 'ni', value: 'ni', flag: 'ni', text: 'Nicaragua' },
{key: 'ne', value: 'ne', flag: 'ne', text: 'Niger' },
{key: 'ng', value: 'ng', flag: 'ng', text: 'Nigeria' },
{key: 'nu', value: 'nu', flag: 'nu', text: 'Niue' },
{key: 'nf', value: 'nf', flag: 'nf', text: 'Norfolk Island' },
{key: 'kp', value: 'kp', flag: 'kp', text: 'North Korea' },
{key: 'mp', value: 'mp', flag: 'mp', text: 'Northern Mariana Islands' },
{key: 'no', value: 'no', flag: 'no', text: 'Norway' },
{key: 'om', value: 'om', flag: 'om', text: 'Oman' },
{key: 'pk', value: 'pk', flag: 'pk', text: 'Pakistan' },
{key: 'pw', value: 'pw', flag: 'pw', text: 'Palau' },
{key: 'ps', value: 'ps', flag: 'ps', text: 'Palestine' },
{key: 'pa', value: 'pa', flag: 'pa', text: 'Panama' },
{key: 'py', value: 'py', flag: 'py', text: 'Paraguay' },
{key: 'pe', value: 'pe', flag: 'pe', text: 'Peru' },
{key: 'ph', value: 'ph', flag: 'ph', text: 'Philippines' },
{key: 'pn', value: 'pn', flag: 'pn', text: 'Pitcairn Islands' },
{key: 'pl', value: 'pl', flag: 'pl', text: 'Poland' },
{key: 'pt', value: 'pt', flag: 'pt', text: 'Portugal' },
{key: 'pr', value: 'pr', flag: 'pr', text: 'Puerto Rico' },
{key: 'qa', value: 'qa', flag: 'qa', text: 'Qatar' },
{key: 're', value: 're', flag: 're', text: 'Reunion' },
{key: 'ro', value: 'ro', flag: 'ro', text: 'Romania' },
{key: 'ru', value: 'ru', flag: 'ru', text: 'Russia' },
{key: 'rw', value: 'rw', flag: 'rw', text: 'Rwanda' },
{key: 'sh', value: 'sh', flag: 'sh', text: 'Saint Helena' },
{key: 'kn', value: 'kn', flag: 'kn', text: 'Saint Kitts and Nevis' },
{key: 'lc', value: 'lc', flag: 'lc', text: 'Saint Lucia' },
{key: 'pm', value: 'pm', flag: 'pm', text: 'Saint Pierre' },
{key: 'vc', value: 'vc', flag: 'vc', text: 'Saint Vincent' },
{key: 'ws', value: 'ws', flag: 'ws', text: 'Samoa' },
{key: 'sm', value: 'sm', flag: 'sm', text: 'San Marino' },
{key: 'gs', value: 'gs', flag: 'gs', text: 'Sandwich Islands' },
{key: 'st', value: 'st', flag: 'st', text: 'Sao Tome' },
{key: 'sa', value: 'sa', flag: 'sa', text: 'Saudi Arabia' },
{key: 'sn', value: 'sn', flag: 'sn', text: 'Senegal' },
{key: 'cs', value: 'cs', flag: 'cs', text: 'Serbia' },
{key: 'rs', value: 'rs', flag: 'rs', text: 'Serbia' },
{key: 'sc', value: 'sc', flag: 'sc', text: 'Seychelles' },
{key: 'sl', value: 'sl', flag: 'sl', text: 'Sierra Leone' },
{key: 'sg', value: 'sg', flag: 'sg', text: 'Singapore' },
{key: 'sk', value: 'sk', flag: 'sk', text: 'Slovakia' },
{key: 'si', value: 'si', flag: 'si', text: 'Slovenia' },
{key: 'sb', value: 'sb', flag: 'sb', text: 'Solomon Islands' },
{key: 'so', value: 'so', flag: 'so', text: 'Somalia' },
{key: 'za', value: 'za', flag: 'za', text: 'South Africa' },
{key: 'kr', value: 'kr', flag: 'kr', text: 'South Korea' },
{key: 'es', value: 'es', flag: 'es', text: 'Spain' },
{key: 'lk', value: 'lk', flag: 'lk', text: 'Sri Lanka' },
{key: 'sd', value: 'sd', flag: 'sd', text: 'Sudan' },
{key: 'sr', value: 'sr', flag: 'sr', text: 'Suriname' },
{key: 'sj', value: 'sj', flag: 'sj', text: 'Svalbard' },
{key: 'sz', value: 'sz', flag: 'sz', text: 'Swaziland' },
{key: 'se', value: 'se', flag: 'se', text: 'Sweden' },
{key: 'ch', value: 'ch', flag: 'ch', text: 'Switzerland' },
{key: 'sy', value: 'sy', flag: 'sy', text: 'Syria' },
{key: 'tw', value: 'tw', flag: 'tw', text: 'Taiwan' },
{key: 'tj', value: 'tj', flag: 'tj', text: 'Tajikistan' },
{key: 'tz', value: 'tz', flag: 'tz', text: 'Tanzania' },
{key: 'th', value: 'th', flag: 'th', text: 'Thailand' },
{key: 'tl', value: 'tl', flag: 'tl', text: 'Timorleste' },
{key: 'tg', value: 'tg', flag: 'tg', text: 'Togo' },
{key: 'tk', value: 'tk', flag: 'tk', text: 'Tokelau' },
{key: 'to', value: 'to', flag: 'to', text: 'Tonga' },
{key: 'tt', value: 'tt', flag: 'tt', text: 'Trinidad' },
{key: 'tn', value: 'tn', flag: 'tn', text: 'Tunisia' },
{key: 'tr', value: 'tr', flag: 'tr', text: 'Turkey' },
{key: 'tm', value: 'tm', flag: 'tm', text: 'Turkmenistan' },
{key: 'tv', value: 'tv', flag: 'tv', text: 'Tuvalu' },
{key: 'ug', value: 'ug', flag: 'ug', text: 'Uganda' },
{key: 'ua', value: 'ua', flag: 'ua', text: 'Ukraine' },
{key: 'ae', value: 'ae', flag: 'ae', text: 'United Arab Emirates' },
{key: 'us', value: 'us', flag: 'us', text: 'United States' },
{key: 'uy', value: 'uy', flag: 'uy', text: 'Uruguay' },
{key: 'um', value: 'um', flag: 'um', text: 'Us Minor Islands' },
{key: 'vi', value: 'vi', flag: 'vi', text: 'Us Virgin Islands' },
{key: 'uz', value: 'uz', flag: 'uz', text: 'Uzbekistan' },
{key: 'vu', value: 'vu', flag: 'vu', text: 'Vanuatu' },
{key: 'va', value: 'va', flag: 'va', text: 'Vatican City' },
{key: 've', value: 've', flag: 've', text: 'Venezuela' },
{key: 'vn', value: 'vn', flag: 'vn', text: 'Vietnam' },
{key: 'wf', value: 'wf', flag: 'wf', text: 'Wallis and Futuna' },
{key: 'eh', value: 'eh', flag: 'eh', text: 'Western Sahara' },
{key: 'ye', value: 'ye', flag: 'ye', text: 'Yemen' },
{key: 'zm', value: 'zm', flag: 'zm', text: 'Zambia' },
{key: 'zw', value: 'zw', flag: 'zw', text: 'Zimbabwe' }]

export default class Profile extends Component{

    state = {


        profileData : null,
        commentData : [],
        bio : '',
        country: '',
        newPic: '',
        imageData: [],
        open : false,
        redirect: false,
        username : null,
        comment: '',
        imageID: null,
        usernamePage: null,
        animations: ["swing right", "swing down", "swing left"],
        colors : [
            'red',
            'orange',
            'yellow',
            'olive',
            'green',
            'teal',
            'blue',
            'violet',
            'purple',
            'pink',
            'brown',
            'grey',
            'black']
 
        
    }

    convertBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
  
        fileReader.onload = () => {
          resolve(fileReader.result);
        };
  
        fileReader.onerror = (error) => {
          reject(error);
        };
      });
    };

    uploadFile = async (e) => {
        const file = e.target.files[0]
        const base64 = await this.convertBase64(file);

        this.setState({
            newPic: base64
        })


    }

    onCloseBio(){
        this.setState({
            bio: ''
        })
    }

    onCloseLocation(){
        this.setState({
            country: ''
        })
    }

    onClosePicture(){
        this.setState({
            newPic: ''
        })
    }

    onChangeLocation = (e,{value}) => {
        this.setState({
            country: value
        })
    }

    onChangeComment(e){
        this.setState({
            comment: e.target.value
        })
    }



    onChangeBio(e){
        this.setState({
            bio: e.target.value
        })
    }

    apiFollow = () =>{        
        var data = {
            "username": this.state.profileUser,
            "follow": this.state.usernamePage
        }
        follow(data)
        .then((response) => {
            if (response.status === 200){
                var responseFollowList = JSON.stringify(response.data["followList"])
                localStorage.setItem("caravan-followList",responseFollowList)
                window.location.reload()
            }
        }
        )
    }
    
    apiDeleteImage = (e) => {
        var data = {
            "username": this.state.profileUser,
            "imageUUID": e
        }

        console.log(data)

        deleteimage(data)
        .then((response) => {
            if(response.status == 200){
                window.location.reload()
            }
            else{
                console.log(response)
            }
        })
    }

    apiProfileComment = () =>{        
        var data = {
            "username": this.state.profileUser,
            "targetUsernameProfile": this.state.usernamePage,
            "comment": this.state.comment
        }
        profilecomment(data)
        .then((response) => {
            if (response.status === 200){
                window.location.reload()
            }
        }
        )
    }

    apiEditProfilePicture = () =>{        
        var data = {
            "username": this.state.profileUser,
            "profilePicture": this.state.newPic
        }
        editprofilepicture(data)
        .then((response) => {
            if (response.status === 200){
                window.location.reload()
            }
        }
        )
    }

    apiEditLocation = () =>{        
        var data = {
            "username": this.state.profileUser,
            "location": this.state.country
        }
        editlocation(data)
        .then((response) => {
            if (response.status === 200){
                window.location.reload()
            }
        }
        )
    }

    apiEditBio = () =>{        
        var data = {
            "username": this.state.profileUser,
            "bio": this.state.bio
        }
        editbio(data)
        .then((response) => {
            if (response.status === 200){
                window.location.reload()
            }
        }
        )
    }

    apiUnfollow = () =>{        
        var data = {
            "username": this.state.profileUser,
            "unfollow": this.state.usernamePage
        }
        unfollow(data)
        .then((response) => {
            if (response.status === 200){
                var responseFollowList = JSON.stringify(response.data["followList"])
                localStorage.setItem("caravan-followList",responseFollowList)
                window.location.reload()
            }
        }
        )
    }

    apiGetProfileData = () => {
        const queryStringParameters = queryString.parse(this.props.location.search)

        var params = {
            "params": queryStringParameters

        }

        getProfile(params).then((response) => {
            if(response.status === 200){
                this.setState({
                    profileData : response.data["profileData"],
                    commentData : response.data["profileData"]["comments"],
                    imageData :   response.data["profileData"]["imageData"],
                    usernamePage: queryStringParameters["username"]
                }, () => {
                    this.setState({
                        open: true
                    })
                })
            }
        })

        
    }

    checkFollowing(){

        if (this.state.profileList.includes(this.state.usernamePage)){
            return <Button icon labelPosition='right' className = {styles.upload} onClick = {() => this.apiUnfollow()}>
                Unfollow
              <Icon name='remove user' />
            </Button>
        }
        else{
            return <Button icon labelPosition='right' className = {styles.upload} onClick = {() => this.apiFollow()}>
                Follow
              <Icon name='add user' />
            </Button>
        }
    }

    visitProfile = (username) => {
        this.setState({
            username: username,
            redirect: true
        })

    }

    visitImage = (imageID) => {
        this.setState({
            imageID: imageID,
            redirect: true
        })

    }





    async componentDidMount(){
        this.setState({
            isLoggedIn : JSON.parse(localStorage.getItem("caravan-isLoggedIn")),
            profileUser : localStorage.getItem("caravan-username"),
            profileList : JSON.parse(localStorage.getItem("caravan-followList"))
        }, () => {
            this.apiGetProfileData()
        })    
    }
    render () {

        if (this.state.redirect){
            if(this.state.username){
                return <Redirect push to = {"/profile?username=" + this.state.username}/>
            }
            else if (this.state.imageID){
                return <Redirect push to = {"/image?imageUUID=" + this.state.imageID}/>

            }
        }

         

        var cardArray = this.state.imageData.map((data,index) => {
            return <Transition  animation = {this.state.animations[index % 3]} duration = {500+(index)*20} visible = {this.state.open}>
                
                {
                    this.state.isLoggedIn && (this.state.profileUser == this.state.usernamePage) ?
                    <Card as = 'a'  color = {this.state.colors[index % 13]} fluid>
                        <Image  onClick = {() => this.visitImage(this.state.imageData[index]["imageUUID"])}  src = {`data:image/jpeg;base64,${data["imageBase64"]}`}  wrapped ui = {false}/>
                        <Card.Content textAlign = {"center"} extra>
                            <Button onClick = {() => {this.apiDeleteImage(data["imageUUID"])}} negative>
                                Delete Image
                            </Button>
                        </Card.Content>
                    </Card>
                    :
                    <Card as = 'a'  color = {this.state.colors[index % 13]} fluid>
                        <Image onClick = {() => this.visitImage(this.state.imageData[index]["imageUUID"])}  src = {`data:image/jpeg;base64,${data["imageBase64"]}`}  wrapped ui = {false}/>
                    </Card>


                }
            
            </Transition>
        }
        )



        var comments = this.state.commentData.map((data,index) => {
            return <span><Transition
            animation = "fly left"
            duration = {500+index*100}
            visible = {this.state.open}
        >
                    <Comment>
                        <Comment.Avatar src = {`data:image/jpeg;base64,${data["commenterPicture"]}`}/>
                        <Comment.Content>
                            <Comment.Author>
                                {data["commenter"]}
                            </Comment.Author>
                            <Comment.Text>
                                {data["comment"]}
                            </Comment.Text>
                            <Comment.Actions>
                                <Comment.Action as = 'a' onClick = {() => this.visitProfile(data["commenter"])}>
                                    Visit Profile
                                </Comment.Action>
                            </Comment.Actions>
                        </Comment.Content>
                    </Comment>
                </Transition>
                    <br></br>
                    <br></br>
                </span>
        })

        var first = cardArray.map((data,index) => {
            if ((index + 1) % 3 == 1){
                return data
            }
        })
        var second = cardArray.map((data,index) => {
            if ((index + 1) % 3 == 2){
                return data
            }
        })
        var third = cardArray.map((data,index) => {
            if ((index + 1) % 3 == 0){
                return data
            }
        })


    
        
        return(
            <Grid.Row className = {styles.customRow}>
                <Grid.Column width = {2}/>
                <Grid.Column width = {12}>
                    {
                        this.state.profileData ?  <Transition
                        animation = "fade down"
                        duration = {500+100}
                        visible = {this.state.open}
                    >
                        <Card centered>
                            <Image  src = {`data:image/jpeg;base64,${this.state.profileData["profilePicture"]}`}/>
                            <Card.Content textAlign = {"center"}>
                                <Card.Header>
                                    {this.state.profileData["username"]}{' '}<Flag name = {this.state.profileData["location"]}/> 
                                </Card.Header>
                                <Card.Meta>
                                    <Grid>
                                       <Grid.Row >
                                           <Grid.Column width = {2}/>
                                           <Grid.Column width = {4}>
       
                                                   {this.state.profileData["followers"]} 
                                                   <br></br>
                                                   Followers
       
                                           </Grid.Column>
                                           <Grid.Column width = {4}>
       
       
                                                   {this.state.profileData["following"]} 
                                                   <br></br>
                                                   Following
       
                                           </Grid.Column>
                                           <Grid.Column width = {4}>
       
                                                   
                                                   {this.state.profileData["imageCount"]} 
                                                   <br></br>
                                                   Images 
       
                                           </Grid.Column>
                                           <Grid.Column width = {2}/>
                                       </Grid.Row>
                                    </Grid>
       
       
                                </Card.Meta>
                                <Card.Description>
                                    {this.state.profileData["bio"]}
                                </Card.Description>
                            </Card.Content>
                            {
                                this.state.isLoggedIn ?
                                <Card.Content textAlign = 'center' extra>
                                    {
                                        this.state.usernamePage == this.state.profileUser ?
                                        <span>
                                            <Button.Group fluid>
                                                <Popup
                                                    onClose = {() => this.onCloseBio()}
                                                    trigger={
                                                        <Button animated = 'vertical' className = {styles.upload}>
                                                            <Button.Content hidden>
                                                                Edit Bio
                                                            </Button.Content>
                                                            <Button.Content visible>
                                                                <Icon name = 'edit'/>
                                                            </Button.Content>
                                                        </Button>
                                                    }
                                                    content={
                                                        <Form reply>
                                                            <Form.TextArea onChange = {(e) => this.onChangeBio(e)} />
                                                            {
                                                                this.state.bio.length ? 
                                                                <Button onClick = {() => this.apiEditBio()} className = {styles.upload} content='Confirm Bio Edit' floated = 'right' labelPosition='left' icon='edit' primary />
                                                                :
                                                                <Button disabled content='Confirm Bio Edit' floated = 'right' labelPosition='left' icon='edit' />
                                                            }
                                                            
                                                        </Form>
                                                    }
                                                    on='click'
                                                    position='bottom left'
                                                />
                                                <Popup
                                                    onClose = {() => this.onClosePicture()}
                                                    trigger={
                                                        <Button  animated = 'vertical' className = {styles.upload}>
                                                            <Button.Content hidden>
                                                                Edit Picture
                                                            </Button.Content>
                                                            <Button.Content visible>
                                                                <Icon name = 'user circle'/>
                                                            </Button.Content>
                                                        </Button>
                                                    }
                                                    content={
                                                        <Form Reply>
                                                            <input type="file" id="file" name="filename" accept="image/*" onChange={(e) => this.uploadFile(e)} />
                                                            <br></br>
                                                            <br></br>
                                                            {
                                                                this.state.newPic.length ? 
                                                                <Button onClick = {() => this.apiEditProfilePicture()} className = {styles.upload} content='Confirm New Profile Picture' floated = 'right' labelPosition='left' icon='edit' primary />
                                                                :
                                                                <Button disabled content='Confirm New Picture' floated = 'right' labelPosition='left' icon='edit' />
                                                            }
                                                        </Form>
                                                    }
                                                    on='click'
                                                    position='bottom left'
                                                />
                                                <Popup
                                                    onClose = {() => this.onCloseLocation()}
                                                    trigger={
                                                        <Button  animated = 'vertical' className = {styles.upload}>
                                                            <Button.Content hidden>
                                                                Edit Country
                                                            </Button.Content>
                                                            <Button.Content visible>
                                                                <Icon name = 'map marker alternate'/>
                                                            </Button.Content>
                                                        </Button>
                                                    }
                                                    content={
                                                        <Form Reply>
                                                            <Dropdown
                                                            placeholder='Select Country'
                                                            fluid
                                                            search
                                                            selection
                                                            onChange = {this.onChangeLocation}
                                                            options={countryOptions}
                                                            />
                                                            <br></br>
                                                            {
                                                                this.state.country.length ? 
                                                                <Button onClick = {() => this.apiEditLocation()} content = 'Confirm Country Edit' className = {styles.upload} floated = 'right' labelPosition='left' icon='edit' primary />
                                                                :
                                                                <Button disabled content='Confirm Country Edit' floated = 'right' labelPosition='left' icon='edit' />
                                                            }
                                                            
                                                        </Form>
                                                    }
                                                    on='click'
                                                    position='bottom left'
                                                />
    
                                            </Button.Group>
    
                                        </span>
    
                                            
                    
                                        :
                                        <span>
                                            {this.checkFollowing()}
                                        </span>
                                    }
                                </Card.Content>
                                :
                                null

                            }
                        </Card>
                    </Transition>
         
                        :
                        null

                    }
                </Grid.Column>
                <Grid.Column width = {2}/>

                <Grid.Column width = {1}/>
 
                <Grid.Column  width = {14}>
                    {
                        this.state.profileData ?
                            <Grid padded = "vertically">
                                <Grid.Row>
                                        <Grid.Column  padded = "horizontally" width = {8}>
                                            <Grid >
                                                <Grid.Row >
                                                    <Grid.Column  width = {2} />
                                                    <Grid.Column  width = {12}>
                                                        <Header textAlign = 'center' as ='h1' dividing>
                                                            {this.state.usernamePage}<span>'s</span>{' '}<span>Wares</span>
                                                        </Header>
                                                        <br></br>
                                                    </Grid.Column>
                                                    <Grid.Column  width = {2}/>

                                                    <Grid.Column  width = {2} />
                                                    <Grid.Column  width = {4}>
                                                            {first}
                                                    </Grid.Column>
                                                    <Grid.Column width = {4}>
                                                            {second}
                                                    </Grid.Column>
                                                    <Grid.Column width = {4}>
                                                            {third}
                                                    </Grid.Column>
                                                    <Grid.Column  width = {2}/>
                                                </Grid.Row>
                                            </Grid>
                                        </Grid.Column>
                                    <Grid.Column  width = {8}>
                                            <Comment.Group size = {"massive"}>
                                                <Header as ='h1' dividing>
                                                    Comments
                                                </Header>
                                                {comments}

                                                {
                                                    this.state.isLoggedIn ?
                                                        <Form reply>
                                                            <Form.TextArea onChange = {(e) => this.onChangeComment(e)} />
                                                            {
                                                                this.state.comment.length ? 
                                                                <Button onClick = {() => this.apiProfileComment()} className = {styles.upload} content='Add Reply' floated = 'right' labelPosition='left' icon='edit' primary />
                                                                :
                                                                <Button disabled content='Add Reply' floated = 'right' labelPosition='left' icon='edit' />
                                                            }
                                                            
                                                        </Form>
                                                    :
                                                    null

                                                }
                                            </Comment.Group>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        :
                        <Loader size = 'large' active inline = 'centered'>
                            Signaling traveler...
                        </Loader>

                    }
                </Grid.Column>
                <Grid.Column width = {1}/>
            </Grid.Row>
        )
    } 
}