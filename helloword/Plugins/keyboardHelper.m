//
//  keyboardHelper.m
//  soft keyboard displaying plugin for PhoneGap
//
//  Copyright 2012 Martin Ambrus.
//

#import "keyboardHelper.h"
#import "AppDelegate.h"

@implementation keyboardHelper
@synthesize callbackID;

-(void)showKeyboard:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options {
    self.callbackID = [arguments pop];
    
    //Get text field coordinate from webview. - You should do this after the webview gets loaded
    //myCustomDiv is a div in the html that contains the textField.
    int textFieldContainerHeightOutput = [[((AppDelegate *)[[UIApplication sharedApplication] delegate]).viewController.webView stringByEvaluatingJavaScriptFromString:@"document.getElementById(\"myCustomDiv\").offsetHeight;"] intValue];
    
    int textFieldContainerWidthOutput = [[((AppDelegate *)[[UIApplication sharedApplication] delegate]).viewController.webView  stringByEvaluatingJavaScriptFromString:@"document.getElementById(\"myCustomDiv\").offsetWidth;"] intValue];
    
    int textFieldContainerYOffset = [[((AppDelegate *)[[UIApplication sharedApplication] delegate]).viewController.webView  stringByEvaluatingJavaScriptFromString:@"document.getElementById(\"myCustomDiv\").offsetTop;"] intValue];
    
    int textFieldContainerXOffset = [[((AppDelegate *)[[UIApplication sharedApplication] delegate]).viewController.webView  stringByEvaluatingJavaScriptFromString:@"document.getElementById(\"myCustomDiv\").offsetLeft;"] intValue];
    
    UITextField *myTextField = [[UITextField alloc] initWithFrame: CGRectMake(textFieldContainerXOffset, textFieldContainerYOffset, textFieldContainerWidthOutput, textFieldContainerHeightOutput)];
    
    [((AppDelegate *)[[UIApplication sharedApplication] delegate]).viewController.webView addSubview:myTextField];
    myTextField.delegate = self;
    
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString: @"ok"];
    
    [self writeJavascript:[pluginResult toSuccessCallbackString:self.callbackID]];
}

-(BOOL)textFieldShouldReturn:(UITextField *)textField
{
    //here you create your request to the server
    return NO;
}

-(BOOL)textFieldDidEndEditing:(UITextField *)textField
{
    //here you create your request to the server
    return NO;
}

@end