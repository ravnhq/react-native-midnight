#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(Midnight, NSObject)
RCT_EXTERN_METHOD(multiply:(nonnull double*)a
                  withB:(nonnull double*)b
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(subscribe)
RCT_EXTERN_METHOD(unsubscribe)
RCT_EXTERN_METHOD(postNotification)

@end
