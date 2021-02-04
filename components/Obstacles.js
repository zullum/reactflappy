import React from 'react';
import { View } from 'react-native';

const Obstacles = ({obstaclesLeft, obstacleHeight, obstacleWidth, gap, color, randomBottom}) => {


    return (
        <>
            <View style={
                {
                    position: 'absolute',
                    backgroundColor: color,
                    width: obstacleWidth,
                    height: obstacleHeight,
                    left: obstaclesLeft,
                    bottom: randomBottom + obstacleHeight + gap,
                }
            }
            />

            <View style={
                {
                    position: 'absolute',
                    backgroundColor: color,
                    width: obstacleWidth,
                    height: obstacleHeight,
                    left: obstaclesLeft,
                    bottom: randomBottom,
                }
            }
            />
        </>
    )
}

export default Obstacles

