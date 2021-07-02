import React, {useRef, useEffect} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {styles} from './styles';
type TProps = {
  tabs: Array<any>;
  activeIndex: number;
  changeIndex: (index: number) => void;
};

export const Tabs = (props: TProps) => {
  const {tabs, activeIndex, changeIndex} = props;
  const scrollRef = useRef<ScrollView>(null);
  useEffect(() => {
    if (activeIndex === tabs?.length - 1) {
      // console.log('scroll to end?', scrollRef);
      scrollRef?.current?.scrollToEnd();
    }
    if (activeIndex === 0) {
      scrollRef?.current?.scrollTo(0);
    }
  }, [activeIndex]);
  return (
    <View style={styles.wrapper}>
      <ScrollView
        ref={scrollRef}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        {tabs?.map((tab: string, index: number) => {
          const isActive = index === activeIndex;
          return (
            <TouchableOpacity
              onPress={() => changeIndex(index)}
              style={[styles.tab, isActive && styles.tabActive]}
              key={tab}
              activeOpacity={isActive ? 1 : 0.7}>
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};
