/**
* Appcelerator Titanium Mobile
* This is generated code. Do not modify. Your changes *will* be lost.
* Generated code is Copyright (c) 2009-2011 by Appcelerator, Inc.
* All Rights Reserved.
*/
#import <Foundation/Foundation.h>
#import "TiUtils.h"
#import "ApplicationDefaults.h"
 
@implementation ApplicationDefaults
  
+ (NSMutableDictionary*) copyDefaults
{
    NSMutableDictionary * _property = [[NSMutableDictionary alloc] init];

    [_property setObject:[TiUtils stringValue:@"1yjkI93PH7rCdVYV0G36tSCILdYGfQ7B"] forKey:@"acs-oauth-secret-production"];
    [_property setObject:[TiUtils stringValue:@"O9DVRCCOMGk0igLM47ubHD2wBEgokCU7"] forKey:@"acs-oauth-key-production"];
    [_property setObject:[TiUtils stringValue:@"5NF98MhvgflACqUiXgm8iCewWpUb1yp8"] forKey:@"acs-api-key-production"];
    [_property setObject:[TiUtils stringValue:@"b8TpBnHC3Dgul5QjpqUbNLx66B8IQ3W4"] forKey:@"acs-oauth-secret-development"];
    [_property setObject:[TiUtils stringValue:@"wg3L3b4dj9hOP36REIsY3GZ3HNkbSo9V"] forKey:@"acs-oauth-key-development"];
    [_property setObject:[TiUtils stringValue:@"X3W1GaW0r0BtwHs3NpPuUQT6s1rkyG3k"] forKey:@"acs-api-key-development"];
    [_property setObject:[TiUtils stringValue:@"system"] forKey:@"ti.ui.defaultunit"];

    return _property;
}
@end
