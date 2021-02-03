import React from 'react';
import { View } from 'react-native';

const Bird = ({birdBottom, birdLeft}) =>{

    const birdWidth = 50;
    const birdHeight = 50;

    return (
        <View style={
            {
                position: 'absolute',
                height: birdHeight,
                width: birdWidth,
                backgroundColor: 'blue',
                left: birdLeft - (birdWidth/2),
                bottom: birdBottom - (birdHeight/2),
            }
        }/>
    )
}

export default Bird
