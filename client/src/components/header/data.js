import React from 'react';
import {Icon} from 'semantic-ui-react';


export const menuJson = [
    {
        "display": "Image Caravan"
    },
    {
        "name": "Home",
        "to": "/",
        "display": <span><Icon name = {"home"}/> Home </span>
    },
    {
        "name": "Goods",
        "to": "/goods",
        "display": <span><Icon name = {"hashtag"}/> Goods </span>
    },
    {
        "name": "Caravaners",
        "to": "/caravaners",
        "display": <span><Icon name = {"users"}/> Caravaners </span>
    }
]