import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableWithoutFeedback} from 'react-native';
import Bird from './components/Bird';
import Obstacles from './components/Obstacles';

export default function App() {

  const screenWidth = Dimensions.get('screen').width;
  const screenHeight = Dimensions.get('screen').height;
  const birdLeft = screenWidth/2;
  const [birdBottom, setBirdBottom] = useState(screenHeight/2);

  const obstacleHeight = 300;
  const obstacleWidth = 60;
  const gap = 200;

  const [obstaclesLeft, setObstaclesLeft] = useState(screenWidth);
  const [obstaclesLeftTwo, setObstaclesLeftTwo] = useState(screenWidth + screenWidth/2 + obstacleWidth/2);
  const [obstaclesNegHeight, setObstaclesNegHeight] = useState(0);
  const [obstaclesNegHeightTwo, setObstaclesNegHeightTwo] = useState(0);

  const gravity = 3;
  let gameTimerId;
  let obstaclesLeftTimerId;
  let obstaclesLeftTimerIdTwo;
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const refreshButton = 'Restart';

  // start bird falling
  useEffect(() => {
    if (birdBottom > 0) {
      gameTimerId = setInterval(() => {
        setBirdBottom(birdBottom => birdBottom - gravity);
      }, 30);
    }
    return () => {
      clearInterval(gameTimerId);
    }
  }, [birdBottom])

  // set first obstacles
  useEffect(() => {
    if (obstaclesLeft > -obstacleWidth) {
      obstaclesLeftTimerId = setInterval(() => {
        setObstaclesLeft(obstaclesLeft => obstaclesLeft - 5);
      }, 30);
      return () => {
        clearInterval(obstaclesLeftTimerId);
      }
    } else {
      setObstaclesLeft(screenWidth);
      setObstaclesNegHeight(-Math.random() * 100);
      setScore(score => score + 1);
    }

  }, [obstaclesLeft])

  // set second obstacles
  useEffect(() => {
    if (obstaclesLeftTwo > -obstacleWidth) {
      obstaclesLeftTimerIdTwo = setInterval(() => {
        setObstaclesLeftTwo(obstaclesLeftTwo => obstaclesLeftTwo - 5);
      }, 30);
      return () => {
        clearInterval(obstaclesLeftTimerIdTwo);
      }
    } else {
      setObstaclesLeftTwo(screenWidth);
      setObstaclesNegHeightTwo(-Math.random() * 100);
      setScore(score => score + 1);

    }

  }, [obstaclesLeftTwo])


  // check for collisions
  useEffect(() => {

    if (
      ((birdBottom < (obstaclesNegHeight + obstacleHeight + 30) ||
      birdBottom > (obstaclesNegHeight + obstacleHeight + gap -30)) &&
      (obstaclesLeft > screenWidth/2 -30 && obstaclesLeft < screenWidth/2 + 30)
      )
      ||
      ((birdBottom < (obstaclesNegHeightTwo + obstacleHeight + 30) ||
      birdBottom > (obstaclesNegHeightTwo + obstacleHeight + gap -30)) &&
      (obstaclesLeftTwo > screenWidth/2 -30 && obstaclesLeftTwo < screenWidth/2 + 30)
      )
    ) {
      gameOver();
    }

  })

  const gameOver = () => {
    clearInterval(gameTimerId);
    clearInterval(obstaclesLeftTimerId);
    clearInterval(obstaclesLeftTimerIdTwo);
    console.log('Game over!');
    setIsGameOver(true);
  }

  const jump = () => {
    if (!isGameOver && (birdBottom < screenHeight)) {
      setBirdBottom(birdBottom => birdBottom + 50);
      console.log('jumped');
    }
  }

  const refresh = ()=>{
    // re-renders the component
    setBirdBottom(screenHeight/2);
    setObstaclesLeft(screenWidth);
    setObstaclesLeftTwo(screenWidth + screenWidth/2 + obstacleWidth/2);
    setObstaclesNegHeight(0);
    setObstaclesNegHeightTwo(0);
    setIsGameOver(false);
    setScore(0);
}

  return (
    <TouchableWithoutFeedback onPress={jump}>
      <View style={styles.container}>
        {isGameOver && <Text onPress={refresh}>{score} {refreshButton}</Text>}
        <Bird
          birdBottom={birdBottom}
          birdLeft={birdLeft}
        />
        <Obstacles
          color = {'yellow'}
          obstacleHeight={obstacleHeight}
          obstacleWidth={obstacleWidth}
          gap={gap}
          obstaclesLeft={obstaclesLeft}
          randomBottom={obstaclesNegHeight}
        />

        <Obstacles
          color = {'green'}
          obstacleHeight={obstacleHeight}
          obstacleWidth={obstacleWidth}
          gap={gap}
          obstaclesLeft={obstaclesLeftTwo}
          randomBottom={obstaclesNegHeightTwo}
        />
      </View>
    </TouchableWithoutFeedback>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
