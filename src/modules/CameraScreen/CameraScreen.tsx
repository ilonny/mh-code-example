import React, {useState, useEffect, useCallback, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
  SafeAreaView,
  Keyboard,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {useNavigation} from '@react-navigation/native';
import {throttle, debounce as debounceLodash} from 'lodash';
import {useSelector, useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {
  ImageView,
  selectDocumentScannedCodes,
  modalReducer,
  documentReducer,
} from '../../features';
import {CustomButton, ItemsList, ItemTabRow, PageTitle} from '../../ui';
import {images, Colors} from '../../lib';
import {styles} from './styles';
import {debounce, useShouldComponentUpdate} from './helpers';
const CameraScreenWrapper = (props: any) => {
  // console.log('CameraScreen props', props);
  const {t} = useTranslation();
  const {route} = props;
  let {
    params: {onBarcodeRead, isDocument, isScanServer, isTsd},
  } = route;
  const navigation = useNavigation();
  const [testVal, setTestVal] = useState('');
  const scanned = useSelector(selectDocumentScannedCodes);
  const [localScanned, setLocalScanned] = useState<Array<string>>([]);
  const [canScan, setCanScan] = useState(true);
  const totalScanned = scanned?.concat(localScanned);
  const manualInputRef = useRef(null);
  const [manualInput, setManualInput] = useState('');
  // console.log('scanned ', scanned);
  // console.log('totalScanned ', totalScanned);

  const dispatch = useDispatch();
  const [buttonsCollapsed, setButtonsCollapsed] = useState<boolean>(false);
  let throttledReadBarcodeFunc: any = [throttle, 5000];
  // if (isScanServer) {
  //   throttledReadBarcodeFunc = [debounce, 2000];
  // }
  if (!onBarcodeRead) {
    onBarcodeRead = debounce((barcode: string) => {
      // console.log('before barcode read onBarcodeRead', barcode);
      setManualInput('');
      if (!totalScanned.includes(barcode)) {
        // console.log('CODE NOT ALREADY SCANNED');
        if (!isTsd) setCanScan(false);
        setLocalScanned(localScanned.concat(barcode));
        if (!isTsd) {
          setTimeout(() => {
            setCanScan(true);
          }, 2000);
        }
      } else {
        // console.log('CODE ALREADY SCANNED');
        dispatch(
          modalReducer.openModal({
            content: t('AlreadyScanned'),
            buttons: [
              {
                type: 'confirm',
                title: t('Ok'),
                onPress: () => {
                  dispatch(modalReducer.closeModal());
                },
              },
            ],
          }),
        );
      }
    }, throttledReadBarcodeFunc[1]);
  }
  //@ts-ignore
  const throttledReadBarcode = throttledReadBarcodeFunc[0](data => {
    if (mounted && canScan) {
      // console.log(
      //   'before barcode read?',
      //   throttledReadBarcodeFunc,
      //   data,
      //   onBarcodeRead,
      // );
      onBarcodeRead(data);
    } else {
      // console.log('not can scan');
    }
  }, throttledReadBarcodeFunc[1]);
  let mounted = true;
  useEffect(() => {
    return () => {
      mounted = false;
    };
  }, []);
  useEffect(() => {
    if (manualInput) {
      throttledReadBarcode(manualInput);
    }
  }, [manualInput]);
  if (!isDocument) {
    return (
      <>
        <RNCamera
          style={styles.camera}
          captureAudio={false}
          onBarCodeRead={throttledReadBarcode}>
          <ImageView source={images.window} style={styles.window} />
        </RNCamera>
        <TouchableOpacity
          style={styles.backIconWrapper}
          onPress={() => navigation.goBack()}
        />
        <View pointerEvents={'none'} style={styles.backIcon}>
          <ImageView
            source={images.error_icon}
            style={{width: 12, height: 12}}
            tintColorProp={Colors.mainBackground}
          />
        </View>
        <View style={styles.bottomTextWrapper}>
          <Text style={styles.bottomText}>Поместите изображение в рамку</Text>
        </View>
        {__DEV__ && (
          <View
            style={{
              position: 'absolute',
              top: 180,
              zIndex: 1000,
              alignSelf: 'center',
            }}>
            <TextInput
              onChangeText={text => setTestVal(text)}
              style={{
                borderWidth: 1,
                borderColor: '#000',
                width: 300,
                height: 40,
              }}
            />
            <Button
              title="Считать"
              //@ts-ignore
              onPress={() => throttledReadBarcode(testVal)}
            />
          </View>
        )}
      </>
    );
  }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      {!isTsd ? (
        <>
          <RNCamera
            style={styles.camera}
            captureAudio={false}
            onBarCodeRead={({data}) => {
              //@ts-ignore
              throttledReadBarcode(data);
            }}>
            <ImageView source={images.window} style={styles.windowSmall} />
            {__DEV__ && (
              <View
                style={{
                  position: 'absolute',
                  top: 180,
                  zIndex: 1000,
                  alignSelf: 'center',
                }}>
                <TextInput
                  onChangeText={text => setTestVal(text)}
                  style={{
                    borderWidth: 1,
                    borderColor: '#fff',
                    width: 300,
                    height: 40,
                    color: '#fff',
                  }}
                />
                <Button
                  title="Считать"
                  //@ts-ignore
                  onPress={() => throttledReadBarcode(testVal)}
                />
              </View>
            )}
          </RNCamera>
        </>
      ) : (
        <>
          <View style={styles.manualInputWrapper}>
            <TextInput
              style={styles.manualInput}
              value={manualInput}
              onBlur={() => {
                // console.log('onBlur fired');
                // @ts-ignore
                manualInputRef?.current?.focus();
              }}
              //@ts-ignore
              keyboardType={null}
              autoFocus={true}
              // @ts-ignore
              ref={manualInputRef}
              onChangeText={text => {
                // console.log('onChangeText', text);
                setManualInput(text);
              }}
            />
          </View>
          <PageTitle>{t('Scanning')}...</PageTitle>
        </>
      )}
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        {totalScanned?.length ? (
          <View style={{flex: 1}}>
            <ItemsList
              items={totalScanned.reverse()}
              itemDescription={() => 'UIT'}
              keyExtractor={item => item}
              renderItem={({item}: any) => {
                return <ItemTabRow title={item} description={'UIT'} />;
              }}
              flatListProps={{contentContainerStyle: {paddingTop: 16}}}
            />
            <TouchableOpacity
              onPress={() => setButtonsCollapsed(!buttonsCollapsed)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.emptyText}>
                {t('Scanned')}: {totalScanned?.length || 0}
              </Text>
              <ImageView
                style={[
                  styles.downIcon,
                  {
                    transform: [
                      {rotate: `${buttonsCollapsed ? '180' : '0'}deg`},
                    ],
                  },
                ]}
                source={images.collapse_down}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{flex: 1}}>
            <ImageView
              source={images.empty_codes}
              style={styles.emptyCodes}
              resizeMode={'contain'}
            />
            <Text style={styles.emptyText}>{t('ScannedEmpty')}</Text>
          </View>
        )}
        {!buttonsCollapsed && (
          <View
            style={{
              padding: 16,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <CustomButton
              onPress={() => {
                if (localScanned?.length) {
                  dispatch(
                    modalReducer.openModal({
                      content: t('ConfirmCancelScan'),
                      buttons: [
                        {
                          type: 'confirm',
                          title: t('ConfirmCancelScanButton'),
                          onPress: () => {
                            navigation.goBack();
                            dispatch(modalReducer.closeModal());
                          },
                        },
                        {
                          title: t('Back'),
                          onPress: () => {
                            dispatch(modalReducer.closeModal());
                          },
                        },
                      ],
                    }),
                  );
                } else {
                  navigation.goBack();
                }
              }}
              disabled={false}
              text={t('cancel')}
              isGray
            />
            <CustomButton
              onPress={() => {
                dispatch(documentReducer.addScannedCodes(localScanned));
                setLocalScanned([]);
                navigation.goBack();
              }}
              disabled={false}
              text={t('Save')}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export const CameraScreen = React.memo(
  CameraScreenWrapper,
  (prevProps, nextProps) => {
    return true;
  },
);
