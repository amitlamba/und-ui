import {MessageType} from "./email";

export class NotificationTemplate {
  id: number;
  clientID: number;
  appuserID: number;
  name: string;
  notificationTemplateTitle: string;
  notificationTemplateBody: string;
  parentID: number;
  messageType: MessageType;
  tags: string;
}

/*
class WebPushTemplate :Serializable{

    var id:Long?=null
    @NotNull
    lateinit var title: String
    @NotNull
    lateinit var body: String
    @NotNull
    lateinit var name:String
    var lang: String? = null
    var badgeUrl: String? = null      //url of badge icon
    var iconUrl: String? = null       //url if icon
    var imageUrl: String? = null      //url of image in notification
    var tag: String? = null             //used to group notification
    var requireInteraction: Boolean = false
    var actionGroup: List<WebAction>? = null
    var urgency: String? = null
    var ttl: Long? = null
    var link: String? = null
    var customDataPair: HashMap<String, String>? = null
    var creationTime = LocalDateTime.now()
    var modifiedTime = LocalDateTime.now()
    var fromUserndot: Boolean = true
}

class WebAction :Serializable{
    var id:Long?=null
    var action: String? = null  //action id unique used to determine which action is clicked
    @NotNull
    lateinit var title: String
    var iconUrl: String? = null //url of icon
    var creationTime = LocalDateTime.now()
    var modifiedTime = LocalDateTime.now()
}
 */

export class WebPushTemplate {
  id?: number;
  title: string;
  body: string;
  name: string;
  lang?: string;
  badgeUrl?: string;
  iconUrl?: string;
  imageUrl?: string;
  tag?: string;
  requireInteraction: boolean;
  actionGroup?: WebPushAction[];
  urgency?: string;
  ttl?: number;
  link?: string;
  customDataPair?: any; //HashMap<String, String>
  creationTime?: string;
  modifiedTime?: string;
  fromUserndot?: boolean;
}

export class WebPushAction {
  id?: number;
  action?: string;
  title: string;
  iconUrl?: string;
  creationTime?: string;
  modifiedTime?: string
}

/*
class AndroidTemplate :Serializable{

    var id:Long?=null
    @NotNull
    lateinit var name:String
    @NotNull
//    @Size(min=8,max = 45)
    lateinit var title:String
    @NotNull
    lateinit var body:String
    var channelId:String?=null           //mandatory for api 28 sdk 26+
    var channelName:String?=null        //mandatory for api 28 sdk 26+
    @Pattern(regexp = "^http.{0,1}://.*$")
    var imageUrl:String?=null
    @Pattern(regexp = "^http.{0,1}://.*$")
    var largeIconUrl:String?=null
    var deepLink:String?=null
    var actionGroup:List<AndroidAction>?=null
    @Pattern(regexp = "^.*(.mp3)$")
    var sound:String?=null
    var badgeIcon=BadgeIconType.BADGE_ICON_NONE
    var collapse_key:String?=null
    var priority= Priority.NORMAL
    var timeToLive:Long?=null                //seconds
    @NotNull
    var fromUserNDot:Boolean=true
    var customKeyValuePair:HashMap<String,String>?=null
    var creationTime: LocalDateTime= LocalDateTime.now()

}

class AndroidAction :Serializable{
    var id:Long?=null
    @NotNull
    lateinit var actionId: String
    @NotNull
    lateinit var label: String
    var clientId:Long?=null
    var deepLink: String? = null
    var icon: String? = null
    var autoCancel: Boolean = true
    var creationTime:LocalDateTime= LocalDateTime.now()
}

enum class Priority(name:String){
    NORMAL("normal"),
    HIGH("high")
}

enum class BadgeIconType(name:String){
    BADGE_ICON_SMALL("small"),
    BADGE_ICON_NONE("none"),
    BADGE_ICON_LARGE("large")
}
 */

export class AndroidTemplate {
  id?: number;
  name: string;
  title: string;
  body: string;
  channelId?: string;           //mandatory for api 28 sdk 26+
  channelName?: string;     //mandatory for api 28 sdk 26+
  imageUrl?: string;
  largeIconUrl?: string;
  deepLink?: string;
  actionGroup?: AndroidAction[];
  sound?: string;
  badgeIcon = BadgeIconType.BADGE_ICON_NONE;
  collapse_key?: string;
  priority = Priority.NORMAL;
  timeToLive?: number;              //seconds
  fromUserNDot: boolean = true;
  customKeyValuePair?: KeyValuePair[];
  creationTime?: string;
}

export class KeyValuePair {
  key: string;
  value: string;
}

export class AndroidAction {
  id?: number;
  actionId: String;
  label: String;
  clientId?: number;
  deepLink?: string;
  icon?: string;
  autoCancel: boolean = true;
  creationTime?: string;
}

export enum BadgeIconType {
  BADGE_ICON_SMALL = "BADGE_ICON_SMALL",
  BADGE_ICON_NONE = "BADGE_ICON_NONE",
  BADGE_ICON_LARGE = "BADGE_ICON_LARGE"
}

export enum Priority {
  NORMAL = "NORMAL",
  HIGH = "HIGH"
}
