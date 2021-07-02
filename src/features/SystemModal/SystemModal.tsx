import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {useSelector, useDispatch} from 'react-redux';
import {modalReducer} from '../../features';
import {CustomButton} from '../../ui';
import {Colors} from '../../lib';
import {styles} from './styles';
export const SystemModal = () => {
  const modalState = useSelector((state: any) => state?.modal);
  const dispatch = useDispatch();
  // console.log('modalState', modalState)
  const {title, content, buttons} = modalState;
  return (
    <Modal
      isVisible={modalState?.isOpen}
      onBackdropPress={() => {
        dispatch(modalReducer.closeModal());
      }}>
      <View style={styles.modalContent}>
        <Text>{content}</Text>
        <View style={styles.buttonsRow}>
          {buttons?.map((btn: any) => {
            // console.log('btn', btn)
            return (
              <View style={styles.buttonsRowBtn} key={btn.title}>
                <CustomButton
                  disabled={false}
                  onPress={() => btn.onPress()}
                  text={btn.title}
                  wrapperStyle={{
                    padding: 10,
                    minWidth: 100,
                    backgroundColor:
                      btn?.type == 'cancel'
                        ? 'transparent'
                        : Colors.buttonActive,
                  }}
                />
              </View>
            );
          })}
        </View>
      </View>
    </Modal>
  );
};
