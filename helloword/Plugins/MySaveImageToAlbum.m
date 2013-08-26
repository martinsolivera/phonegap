//
//  MySaveImageToAlbum.m
//  helloword
//
//  Created by Michel dos Prazeres on 8/21/13.
//
//

#import "MySaveImageToAlbum.h"

#import <UIKit/UIKit.h>


@implementation MySaveImageToAlbum

- (void)saveImageToAlbum:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult* pluginResult = nil;
    NSURL *url = [NSURL URLWithString:[command.arguments objectAtIndex:0]];
    NSData *args = [NSData dataWithContentsOfURL:url];
    
    
    if (args != nil && [args length] > 0) {
        
        @try
        {
            UIImage *image = [UIImage imageWithData:args];
            NSData *imgdata = UIImagePNGRepresentation(image);
            UIImage *image2 = [UIImage imageWithData:imgdata];
            UIImageWriteToSavedPhotosAlbum(image2, self, @selector(image:didFinishSavingWithError:contextInfo:), nil);
            
            
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"success"];
            [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
        }
        @catch (NSException *exception) {
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
            [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
        }
        
    } else {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }
    
}


- (void)image:(UIImage *)image didFinishSavingWithError:(NSError *)error
  contextInfo:(void *)contextInfo
{
    // Was there an error?
    if (error != NULL)
    {
        // Show error message...
        
    }
    else  // No errors
    {
        // Show message image successfully saved
        
    }
}


@end
