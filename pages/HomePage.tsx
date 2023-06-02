/* eslint-disable react-hooks/exhaustive-deps */
import React, {ReactElement, useEffect, useState} from 'react';
import {Alert, Text, View, StyleSheet, FlatList, TextInput} from 'react-native';
import {Cat, fetchCatListAPI} from '../api';
import Loading from '../components/Loading';
import ItemCat from '../components/ItemCat';

const HomePage = () => {
  const [data, setData] = useState<Cat[]>([]);
  const [renderData, setRenderData] = useState<Cat[]>([]);
  const [search, setSearch] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isRefreshing, setRefreshing] = useState<boolean>(false);

  const getListCat = async (): Promise<void> => {
    try {
      setLoading(true);
      const result: Cat[] = await fetchCatListAPI();
      setData(result);
      setLoading(false);
    } catch (error: any) {
      Alert.alert(error.message.toString());
    } finally {
      setLoading(false);
    }
  };

  const loadMoreData = (): void => {
    if (data.length === renderData.length || search !== '') {
      return;
    }
    const restIndex = data.length - renderData.length;
    const newIndex =
      restIndex > 10 ? currentIndex + 10 : currentIndex + restIndex;
    setCurrentIndex(newIndex);
    setRenderData(data.slice(0, newIndex));
  };

  const handleRefresh = () => {
    if (!isRefreshing) {
      setRefreshing(true);
      getListCat();
      setRefreshing(false);
    }
  };
  const renderFooter = (): ReactElement => {
    return data.length === renderData.length || search !== '' ? (
      <Text style={styles.footerText}>
        {' '}
        {search !== '' ? '' : 'tidak ada data'}
      </Text>
    ) : (
      <Loading />
    );
  };

  const handleSearch = (q: string): void => {
    setSearch(q);
    setTimeout(() => {
      const filteredData = data.filter((el: Cat) =>
        el.name.toLowerCase().includes(q.toLowerCase()),
      );
      setRenderData(filteredData);
    }, 500);
  };

  useEffect(() => {
    getListCat();
    loadMoreData();
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={search}
        onChangeText={handleSearch}
        placeholder="Search"
      />
      {isLoading ? (
        <Loading />
      ) : (
        <View>
          <FlatList
            data={renderData}
            keyExtractor={(item: Cat, index: number) =>
              item.id.toString() + index.toString()
            }
            renderItem={({item}) => <ItemCat data={item} />}
            ListFooterComponent={renderFooter}
            onEndReached={loadMoreData}
            onEndReachedThreshold={0.2}
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  input: {
    height: 40,
    borderColor: '#B7B7B7',
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontSize: 10,
  },
  footerText: {
    textAlign: 'center',
    fontSize: 12,
  },
});

export default HomePage;
