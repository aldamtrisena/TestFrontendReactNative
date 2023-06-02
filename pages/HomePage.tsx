/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useState} from 'react';
import {Alert, Text, View} from 'react-native';
import {Cat, fetchCatListAPI} from '../api';

const HomePage = () => {
  const [data, setData] = useState<Cat[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);

  const getListCat = async (limit: number) => {
    try {
      setLoading(true);
      const result: Cat[] = await fetchCatListAPI(limit);
      setData(result);
      setLoading(false);
    } catch (error: any) {
      Alert.alert(error.message.toString());
    } finally {
      setLoading(false);
    }
  };
  console.log('DATA', data);
  useEffect(() => {
    getListCat(10);
  }, []);

  return (
    <View>
      <Text>djndjnfd</Text>
    </View>
  );
};

export default HomePage;
