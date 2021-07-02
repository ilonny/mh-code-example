import React from 'react';
import {Text, SafeAreaView} from 'react-native';
import {CreateServer, CustomHeader} from '../../features';
export const CreateServerScreen = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomHeader backButton />
      <CreateServer />
    </SafeAreaView>
  );
};
