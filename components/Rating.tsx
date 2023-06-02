import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Stars from 'react-native-stars';

interface PropsRating {
  keyword: string;
  rating: number;
}
const Rating: React.FC<PropsRating> = ({keyword, rating}) => {
  return (
    <View>
      <Text style={styles.titleDetail}>{keyword}</Text>
      <Stars display={rating} spacing={8} count={5} starSize={15} />
    </View>
  );
};

const styles = StyleSheet.create({
  titleDetail: {
    fontSize: 8,
    color: '#9BABB8',
    marginTop: 4,
  },
});

export default Rating;
