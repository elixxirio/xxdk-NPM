export declare enum LogLevel {
    TRACE = 0,
    DEBUG = 1,
    INFO = 2,
    WARN = 3,
    ERROR = 4,
    CRITICAL = 5,
    FATAL = 6
}
export declare enum PrivacyLevel {
    Public = 0,
    Private = 1,
    Secret = 2
}
export type Cipher = {
    GetID: () => number;
    Decrypt: (plaintext: Uint8Array) => Uint8Array;
};
export type ChannelManager = {
    GetID: () => number;
    AreDMsEnabled: (channelId: Uint8Array) => boolean;
    DisableDirectMessages: (channelId: Uint8Array) => void;
    EnableDirectMessages: (channelId: Uint8Array) => void;
    JoinChannel: (channelId: string) => Promise<Uint8Array>;
    LeaveChannel: (channelId: Uint8Array) => Promise<void>;
    GetMutedUsers: (channelId: Uint8Array) => Uint8Array;
    Muted: (channelId: Uint8Array) => boolean;
    MuteUser: (channelId: Uint8Array, publicKey: Uint8Array, mute: boolean, messageValidityTimeoutMilliseconds: number, cmixParams?: Uint8Array) => Promise<void>;
    SendMessage: (channelId: Uint8Array, message: string, messageValidityTimeoutMilliseconds: number, cmixParams: Uint8Array) => Promise<Uint8Array>;
    PinMessage: (channelId: Uint8Array, messageId: Uint8Array, unpin: boolean, pinDurationInMilliseconds: number, cmixParams: Uint8Array) => Promise<Uint8Array>;
    DeleteMessage: (channelId: Uint8Array, messageId: Uint8Array, cmixParams: Uint8Array) => Promise<void>;
    SendReaction: (channelId: Uint8Array, reaction: string, messageToReactTo: Uint8Array, messageValidityTimeoutMilliseconds: number, cmixParams: Uint8Array) => Promise<Uint8Array>;
    SendReply: (channelId: Uint8Array, message: string, messageToReactTo: Uint8Array, messageValidityTimeoutMilliseconds: number, cmixParams: Uint8Array) => Promise<Uint8Array>;
    IsChannelAdmin: (channelId: Uint8Array) => boolean;
    GenerateChannel: (channelname: string, description: string, privacyLevel: PrivacyLevel) => Promise<string>;
    GetStorageTag: () => string | undefined;
    SetNickname: (newNickname: string, channel: Uint8Array) => void;
    GetNickname: (channelId: Uint8Array) => string;
    GetIdentity: () => Uint8Array;
    GetShareURL: (cmixId: number, host: string, maxUses: number, channelId: Uint8Array) => Uint8Array;
    JoinChannelFromURL: (url: string, password: string) => Uint8Array;
    ExportPrivateIdentity: (password: string) => Uint8Array;
    ExportChannelAdminKey: (channelId: Uint8Array, encryptionPassword: string) => Uint8Array;
    ImportChannelAdminKey: (channelId: Uint8Array, encryptionPassword: string, privateKey: Uint8Array) => void;
};
type HealthCallback = {
    Callback: (healthy: boolean) => void;
};
export type CMix = {
    AddHealthCallback: (callback: HealthCallback) => number;
    GetID: () => number;
    IsReady: (threshold: number) => Uint8Array;
    ReadyToSend: () => boolean;
    StartNetworkFollower: (timeoutMilliseconds: number) => void;
    StopNetworkFollower: () => void;
    WaitForNetwork: (timeoutMilliseconds: number) => Promise<void>;
};
export type DMClient = {
    SendText: (pubkey: Uint8Array, dmToken: number, message: string, leaseTimeMs: number, cmixParams: Uint8Array) => Promise<void>;
    SendReply: (pubkey: Uint8Array, dmToken: number, message: string, replyToId: Uint8Array, leaseTimeMs: number, cmixParams: Uint8Array) => Promise<void>;
    SendReaction: (pubkey: Uint8Array, dmToken: number, message: string, reactToId: Uint8Array, cmixParams: Uint8Array) => Promise<void>;
    GetIdentity: () => Uint8Array;
    SetNickname: (nickname: string) => void;
    GetNickname: () => string;
    GetDatabaseName: () => string;
};
export type DummyTraffic = {
    GetStatus: () => boolean;
    Pause: () => void;
    Start: () => void;
};
export type MessageReceivedCallback = (uuid: string, channelId: Uint8Array, update: boolean) => void;
export type MessageDeletedCallback = (uuid: Uint8Array) => void;
export type UserMutedCallback = (channelId: Uint8Array, pubkey: string, unmute: boolean) => void;
export type DMReceivedCallback = (uuid: string, pubkey: Uint8Array, update: boolean, updateConversation: boolean) => void;
export type XXDKUtils = {
    logger?: Logger;
    Crash: () => void;
    GetLogger: () => Logger;
    LogLevel: (level: LogLevel) => void;
    getCrashedLogFile: () => Promise<string>;
    NewCmix: (ndf: string, storageDir: string, password: Uint8Array, registrationCode: string) => Promise<void>;
    LoadCmix: (storageDirectory: string, password: Uint8Array, cmixParams: Uint8Array) => Promise<CMix>;
    GetDefaultCMixParams: () => Uint8Array;
    GetChannelInfo: (prettyPrint: string) => Uint8Array;
    Base64ToUint8Array: (base64: string) => Uint8Array;
    GenerateChannelIdentity: (cmixId: number) => Uint8Array;
    NewChannelsManagerWithIndexedDb: (cmixId: number, wasmJsPath: string, privateIdentity: Uint8Array, onMessage: MessageReceivedCallback, onDelete: MessageDeletedCallback, onMuted: UserMutedCallback, channelDbCipher: number) => Promise<ChannelManager>;
    NewDMClientWithIndexedDb: (cmixId: number, wasmJsPath: string, privateIdentity: Uint8Array, messageCallback: DMReceivedCallback, cipherId: number) => Promise<DMClient>;
    NewDMsDatabaseCipher: (cmixId: number, storagePassword: Uint8Array, payloadMaximumSize: number) => Cipher;
    LoadChannelsManagerWithIndexedDb: (cmixId: number, wasmJsPath: string, storageTag: string, onMessage: MessageReceivedCallback, onDelete: MessageDeletedCallback, onMuted: UserMutedCallback, channelDbCipher: number) => Promise<ChannelManager>;
    GetPublicChannelIdentityFromPrivate: (privateKey: Uint8Array) => Uint8Array;
    IsNicknameValid: (nickname: string) => null;
    GetShareUrlType: (url: string) => PrivacyLevel;
    GetVersion: () => string;
    GetClientVersion: () => string;
    GetOrInitPassword: (password: string) => Uint8Array;
    ImportPrivateIdentity: (password: string, privateIdentity: Uint8Array) => Uint8Array;
    ConstructIdentity: (publicKey: Uint8Array, codesetVersion: number) => Uint8Array;
    DecodePrivateURL: (url: string, password: string) => string;
    DecodePublicURL: (url: string) => string;
    GetChannelJSON: (prettyPrint: string) => Uint8Array;
    NewDummyTrafficManager: (cmixId: number, maximumOfMessagesPerCycle: number, durationToWaitBetweenSendsMilliseconds: number, upperBoundIntervalBetweenCyclesMilliseconds: number) => DummyTraffic;
    GetWasmSemanticVersion: () => Uint8Array;
    NewChannelsDatabaseCipher: (cmixId: number, storagePassword: Uint8Array, payloadMaximumSize: number) => Cipher;
    Purge: (storageDirectory: string, userPassword: string) => void;
    ValidForever: () => number;
};
export type Logger = {
    LogToFile: (level: number, maxLogFileSizeBytes: number) => void;
    LogToFileWorker: (level: number, maxLogFileSizeBytes: number, wasmJsPath: string, workerName: string) => Promise<void>;
    StopLogging: () => void;
    GetFile: () => Promise<string>;
    Threshold: () => number;
    MaxSize: () => number;
    Size: () => Promise<number>;
    Worker: () => Worker;
};
export {};
