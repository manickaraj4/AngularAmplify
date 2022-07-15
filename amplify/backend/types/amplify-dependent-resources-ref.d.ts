export type AmplifyDependentResourcesAttributes = {
    "auth": {
        "firstangulartrial": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string"
        },
        "userPoolGroups": {
            "SampleUserGroupRole": "string"
        }
    },
    "analytics": {
        "firstangulartrialKinesis": {
            "kinesisStreamArn": "string",
            "kinesisStreamId": "string",
            "kinesisStreamShardCount": "string"
        }
    }
}