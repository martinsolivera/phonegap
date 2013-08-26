//
//  keyboardHelper.h
//  soft keyboard displaying plugin for PhoneGap
//
//  Copyright 2012 Martin Ambrus.
//

#import <Foundation/Foundation.h>

#import <Cordova/CDVPlugin.h>


@interface keyboardHelper : CDVPlugin {
    NSString *callbackID;
}

@property (nonatomic, copy) NSString *callbackID;

- (void)showKeyboard:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options;

@end
