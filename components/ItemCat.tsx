/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useState} from 'react';
import {Cat, DetailImage, fetchImageByIdAPI} from '../api';
import {
  ActivityIndicator,
  Alert,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Rating from './Rating';

interface PropsItemCat {
  data: Cat;
}

const DetailItem: React.FC<PropsItemCat> = ({data}) => {
  return (
    <View style={styles.containerDescription}>
      <Text style={styles.titleDetail}>Description :</Text>
      <Text style={styles.textValue}>{data.description}</Text>
      <Text style={styles.titleDetail}>Life Span</Text>
      <Text style={styles.textValue}>{data.life_span}</Text>
      <Text style={styles.titleDetail}>Temperament</Text>
      <Text style={styles.textValue}>{data.temperament}</Text>
      <Rating keyword={'Adaptability'} rating={data.adaptability} />
      <Rating keyword={'Affection Level'} rating={data.affection_level} />
      <Rating keyword={'Child Friendly'} rating={data.child_friendly} />
      <Rating keyword={'Dog Friendly'} rating={data.dog_friendly} />
      <Rating keyword={'Energy Level'} rating={data.energy_level} />
      <Rating keyword={'Grooming'} rating={data.grooming} />
      <Rating keyword={'Health Issues'} rating={data.health_issues} />
      <Rating keyword={'Intelligence'} rating={data.intelligence} />
      <Rating keyword={'Shedding Level'} rating={data.shedding_level} />
      <Rating keyword={'Social Needs'} rating={data.social_needs} />
      <Text style={styles.titleDetail}>Wikipedia</Text>
      <Text
        style={styles.textLink}
        onPress={() => {
          if (data.wikipedia_url) {
            Linking.openURL(data.wikipedia_url);
          }
        }}>
        {data.wikipedia_url ? 'Browse' : '-'}
      </Text>
    </View>
  );
};

const ItemCat: React.FC<PropsItemCat> = ({data}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [image, setImage] = useState<DetailImage[]>([]);

  const getImageById = async () => {
    try {
      const result: DetailImage[] = await fetchImageByIdAPI(data.id);
      setImage(result);
    } catch (error: any) {
      Alert.alert(error.message.toString());
    }
  };

  useEffect(() => {
    getImageById();
  }, []);

  return (
    <TouchableOpacity onPress={() => setIsOpen(prev => !prev)}>
      <View style={styles.container}>
        <View style={styles.wrapFlex}>
          <View>
            <Text style={styles.title}>{data.name}</Text>
            <View style={styles.origin}>
              <Text style={styles.titleDetail}>Origin From :</Text>
              <Text style={styles.titleOrigin}>{data.origin}</Text>
            </View>
          </View>
          {image.length > 0 && image[0].url !== undefined && (
            <Image source={{uri: image[0].url}} style={styles.image} />
          )}
        </View>

        {isOpen ? <DetailItem data={data} /> : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    elevation: 2,
  },
  wrapFlex: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  title: {
    fontSize: 16,
    marginBottom: 3,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  origin: {
    flex: 1,
    width: 'auto',
    marginTop: 8,
  },
  titleOrigin: {
    fontSize: 10,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  containerDescription: {
    marginTop: 5,
  },
  titleDetail: {
    fontSize: 8,
    color: '#9BABB8',
    marginTop: 4,
  },
  textValue: {
    fontSize: 10,
    marginVertical: 4,
  },
  textLink: {
    color: '#0079FF',
    fontSize: 10,
    marginVertical: 4,
  },
});

export default ItemCat;
