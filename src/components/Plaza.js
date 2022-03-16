import React from 'react'
import {Marker} from 'react-leaflet'
import { IconLocation } from './IconLocation'

const Plaza = () => {
    return (
        <Marker position={{lat: '37.38406547983248', lng: '-5.970668744392564'}} icon={IconLocation} />
    )
}

export default Plaza;